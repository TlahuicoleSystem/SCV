var admin = sessionStorage.getItem("admin");
if (admin == null) {
    alert("Ingresa para continuar")
    window.location = './login.html';
} 
    fetch(`http://localhost:5000/scv/consultarComentario`, {
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
    contenido.innerHTML = ''

    for (let valor of datos.data) {
        let aux = valor.fecha
        var cadena2 = aux.slice(0, -14);
        contenido.innerHTML += `
        <tr>
            <td>${valor.id}</td>
            <td>${valor.nombre}</td>
            <td>${valor.apellidos}</td>
            <td>${valor.correo}</td>
            <td>${valor.telefono}</td>
            <td>${valor.mensaje}</td>
            <td>${cadena2}</td>
        </tr>
    `;
    }
}