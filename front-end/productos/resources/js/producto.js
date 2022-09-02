var precio = null
var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");

var url_string = window.location.href;
var url = new URL(url_string);
var codigoF = url.searchParams.get("codido");

if (nombre == "null") {} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}
if (codigoF == null) {
    alert("Lo sentimos, tenemos problemas para mostrar la información")
} else {
    fetch(`http://localhost:5000/scv/consulta?codigo_barras=` + codigoF, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar(datos)
        })
        .catch(function(err) {
            console.log(err);
            alert("Los sentimos, tenemos problemas para optener la informacion")
        });
}

function recuperar(datos) {
    precio = datos.data[0].precio
    var division = datos.data[0].descripcion.split("\n");
    var imagen = document.getElementById("imagen")
    var encabezado = document.getElementById("encabezado")
    var lista = document.getElementById("lista")
    var cate = document.getElementById("cate")
    imagen.innerHTML = `
        <img src="${datos.data[0].foto}" class="img-fluid" alt="mision">
    `
    encabezado.innerHTML = `
        <h2>${datos.data[0].nombre}</h2>
        <p>${datos.data[0].descripcion_breve} <br>ID:${datos.data[0].codigo_barras}</p>
        <h3>$${datos.data[0].precio} </h3>
        
    `
    for (var i = 0; i < division.length; i++) {
        lista.innerHTML += `
        <li>${division[i]}</li>
    `
    }
    cate.innerHTML = `<li>Categoria: ${datos.data[0].categoria}</li>`
}

function comprar() {

    if (cliente == "null") {
        alert("Ingresa para continuar")
    } else {
        if (document.getElementById("cantidad").value == "") {
            alert("Selecciona una cantidad")
        } else {
            var cantidad = document.getElementById("cantidad").value;
            window.location = "../procesarpedido/procesar.html?codido=" + codigoF + "&cantidad=" + cantidad + "&precio=" + precio;
        }
    }
}

function carrito() {

    if (cliente == "null") {
        alert("Ingresa para continuar")
    } else {
        if (document.getElementById("cantidad").value == "") {
            alert("Selecciona una cantidad")
        } else {
            var cantidad = document.getElementById("cantidad").value;
            const cuerpo = new URLSearchParams("codigoBarras=" + codigoF);
            cuerpo.append('precio', precio)
            cuerpo.append('cantidad', cantidad);
            cuerpo.append('idCliente', cliente);
            cuerpo.append('importe', precio * cantidad);
            fetch('http://localhost:5000/scv/insertarCarr', {
                    method: 'POST',
                    body: cuerpo
                })
                .then(function(response) {
                    if (response.ok) {
                        return response.text()
                    } else {
                        throw "Error en la llamada";
                    }
                })
                .then(function(texto) {
                    console.log(texto);
                    alert("Producto agregado al carrito")
                })
                .catch(function(err) {
                    console.log(err);
                    alert("Error el guardar el producto")
                });
        }
    }

}