var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");
var numOrden
let totalF = 0;
var precio = [],
    cantidad = [],
    codigoBarras = [],
    totalA = [];

if (nombre == null) {
    alert("Ingresa para continuar")
    window.location = "../login/registro.html";
} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}
fetch(`http://localhost:5000/scv/consultarCarri?idCliente=` + cliente, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(datos => {
        recuperar(datos)
    })
    .catch(function(err) {
        alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function recuperar(datos) {
    var contenido = document.getElementById("contenido")
    var total = document.getElementById("total")
    contenido.innerHTML = ''
    total.innerHTML = ''
    for (let j = 0; j < datos.data.length; j++) {
        contenido.innerHTML += `
        <tr>
            <td class="text-center"><button type="button" onclick="eliminar('${datos.data[j].codigoBarras}');"><i class="material-icons">&#xe16c;</i> </button></td>
            <td><img src="${datos.data[j].foto}" class="img-fluid"></td>
            <td>${datos.data[j].nombre}</td>
            <td>${datos.data[j].precio}</td>
            <td>${datos.data[j].cantidad}</td>
            <td>${datos.data[j].importe}</td>
        </tr>
        `;
        precio[j] = datos.data[j].precio;
        cantidad[j] = datos.data[j].cantidad;
        codigoBarras[j] = datos.data[j].codigoBarras;
        totalA[j] = datos.data[j].importe
        totalF = totalF + datos.data[j].importe
        total.innerHTML = `<div class="h4">Gran Total: $${totalF}</div>`
    }
}


function guardar() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear();
    var hora = hoy.getHours() + '' + hoy.getMinutes() + '' + hoy.getSeconds();
    var fechaYHora = fecha + '-' + hora;
    numOrden = fechaYHora + "-" + cliente
    fecha = oFecha()

    for (let i = 0; i < precio.length; i++) {
        const cuerpo = new URLSearchParams("precio=" + precio[i]);
        cuerpo.append('cantidad', cantidad[i]);
        cuerpo.append('fechap', fecha);
        cuerpo.append('idCliente', cliente);
        cuerpo.append('codigoBarras', codigoBarras[i]);
        cuerpo.append('status', 'Preparado');
        cuerpo.append('numOrden', numOrden);
        cuerpo.append('total', totalA[i]);
        fetch(`http://localhost:5000/scv/insertarPe`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
        })
        .then(res => res.json())
        .then(datos => {
            terminado(datos)
        })
        .catch(function(err) {
            console.log(err);
            alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
        });
    }
}

function terminado(datos) {
    if (datos.message == "Pedido guardado") {
        window.location = "../procesarpedido/procesarC.html?numOrden=" + numOrden;
    }
}

function limpiar() {
    fetch(`http://localhost:5000/scv/eliminarCarri?idCliente=` + cliente, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            resultadoLim(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function resultadoLim(datos) {
    if (datos.message == "carrito eliminado") {
        window.location = "../carrito/carrito.html";
    }
}

function eliminar(codigoBarras) {
    fetch(`http://localhost:5000/scv/eliminarProdCarri?idCliente=` + cliente + '&codigoBarras=' + codigoBarras, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            resultado(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function resultado(datos) {
    if (datos.message == "producto eliminado") {
        window.location = "../carrito/carrito.html";
    }
}

function oFecha() {
    var fecha
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
        //console.log(`${year}-0${month}-${day}`)
        fecha = year + "-0" + month + "-" + day
    } else {
        //console.log(`${year}-${month}-${day}`)
        fecha = year + "-" + month + "-" + day
    }
    return fecha
}