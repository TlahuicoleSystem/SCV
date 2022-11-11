var admin = sessionStorage.getItem("admin");
if (admin == null) {
    alert("Ingresa para continuar")
    window.location = './login.html';
} 
function buscar() {
    var inicio = document.getElementById("inicio").value;
    var fin = document.getElementById("fin").value;

    fetch(`http://localhost:5000/scv/reportesVen?inicio=` + inicio + '&fin=' + fin, {
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
        let aux = valor.fechap
        var cadena2 = aux.slice(0, -14);
        contenido.innerHTML += `
        <tr>
            <td>${valor.idPedido}</td>
            <td>${valor.nombre}</td>
            <td>${valor.idCliente}</td>
            <td>${valor.total}</td>
            <td>${cadena2}</td>
        </tr>
    `;
    }
}