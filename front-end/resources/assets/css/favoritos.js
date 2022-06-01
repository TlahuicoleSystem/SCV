var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");

if (nombre == null) {} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}

fetch(`http://localhost:5000/scv/consultarFav`, {
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
    let i = 0;
    for (let valor of datos.data) {
        if (i < 9) {
            contenido.innerHTML += `
            <div class="col-6 col-sm-6 col-md-4 col-lg-3">
                    <a href="productos/producto.html?codido=${valor.codigoBarras}" id="direcccion">
                        <div class="card text-center">
                            <div class="card-body">
                                <img src="${valor.foto}" class="img-fluid" alt="mision" id="imagent">
                                <h4 class="card-title" id="nombre">${valor.nombre}</h4>
                                <p class="card-text" id="descripcion"> ${valor.descripcion_breve}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            i++;
        }

    }

}