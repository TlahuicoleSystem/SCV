var admin = sessionStorage.getItem("admin");
if (admin == null) {
    alert("Ingresa para continuar")
    window.location = './login.html';
} 
fetch(`http://localhost:5000/scv/consultarCS`, {
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
        contenido.innerHTML += `
        <tr>
            <td>${valor.idCliente}</td>
            <td>${valor.nombre}</td>
            <td>${valor.apellidos}</td>
            <td>${valor.telefono}</td>
            <td>${valor.correo}</td>
        </tr>
    `;
    }
}