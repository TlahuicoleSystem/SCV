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
            recuperar(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function recuperar(datos) {
    var contenido = document.getElementById("contenido")
    contenido.innerHTML = ''

    for (let valor of datos.data) {
        contenido.innerHTML += `
        <tr>
            <td>${valor.codigo_barras}</td>
            <td>${valor.nombre}</td>
            <td>${valor.descripcion}</td>
            <td>${valor.precio}</td>
            <td>${valor.categoria}</td>
        </tr>
    `;
    }
}