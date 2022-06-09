var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");
document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`

//LLama a los productos desde que entra la pagina
fetch(`http://localhost:5000/scv/consultar?categoria=` + "todas", {
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

function recuperar(datos) {
    var contenido = document.getElementById("contenido")
    for (let valor of datos.data) {
        contenido.innerHTML += `
        <div class="col-6 col-sm-6 col-md-4 col-lg-3">
                <a href="./producto.html?codido=${valor.codigo_barras}" id="direcccion">
                    <div class="card text-center">
                        <div class="card-body">
                            <img src="${valor.foto}" class="img-fluid" alt="mision" id="imagent">
                            <h4 class="card-title" id="nombre">${valor.nombre}</h4>
                            <p class="card-text" id="descripcion"> ${valor.descripcion_breve}</p>
                        </div>
                    </div>
                </a>
            </div>
        `
    }
}



//metodos que traen los datos dependiendo de la seleccion
function artes() {
    llamar("artes")
}

function oficina() {
    llamar("oficina")
}

function escolar() {
    llamar("escolar")
}

function todas() {
    llamar("todas")
}

function llamar(opcion) {
    fetch(`http://localhost:5000/scv/consultar?categoria=` + opcion, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            respuesta(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function respuesta(datos) {
    var contenido = document.getElementById("contenido")
    if (datos.message == "Lista productos") {
        contenido.innerHTML = ""
        for (let valor of datos.data) {
            contenido.innerHTML += `
            <div class="col-6 col-sm-6 col-md-4 col-lg-3">
                    <a href="./producto.html?codido=${valor.codigo_barras}" id="direcccion">
                        <div class="card text-center">
                            <div class="card-body">
                                <img src="${valor.foto}" class="img-fluid" alt="mision" id="imagent">
                                <h4 class="card-title" id="nombre">${valor.nombre}</h4>
                                <p class="card-text" id="descripcion"> ${valor.descripcion_breve}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
    } else {
        alert("No se encontraron productos relacionados")
    }
}



//metodo para buscar
function buscar() {
    var producto = document.getElementById("entBuscar").value;
    console.log(producto)
    fetch(`http://localhost:5000/scv/buscar?texto=` + producto, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(respuesta => {
            resultado(respuesta)
        })
        .catch(function(err) {
            console.log(err);
            alert("Los sentimos, tenemos problemas para optener la informacion")
        });

}

function resultado(respuesta) {
    var contenido = document.getElementById("contenido")
    if (respuesta.message == "Productos encontrados") {
        contenido.innerHTML = ""
        for (let valor of respuesta.data) {
            contenido.innerHTML += `
            <div class="col-6 col-sm-6 col-md-4 col-lg-3">
                    <a href="./producto.html?codido=${valor.codigo_barras}" id="direcccion">
                        <div class="card text-center">
                            <div class="card-body">
                                <img src="${valor.foto}" class="img-fluid" alt="mision" id="imagent">
                                <h4 class="card-title" id="nombre">${valor.nombre}</h4>
                                <p class="card-text" id="descripcion"> ${valor.descripcion_breve}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
    } else {
        alert("No se encontraron productos relacionados")
    }


}