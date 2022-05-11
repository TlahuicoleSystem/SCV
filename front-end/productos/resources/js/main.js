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