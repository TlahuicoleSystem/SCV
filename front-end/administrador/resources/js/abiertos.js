var admin = sessionStorage.getItem("admin");
if (admin == null) {
    alert("Ingresa para continuar")
    window.location = './login.html';
} 


fetch(`http://localhost:5000/scv//reporteVenAbi`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar3(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });


        function recuperar3(datos) {
            var contenido = document.getElementById("contenido")
            contenido.innerHTML = ''
        
            for (let valor of datos.data) {
                if (valor.status != "Entregado") {
                    contenido.innerHTML += `
                    <tr>
                        <td>${valor.numOrden}</td>
                        <td>${valor.nombre}</td>
                        <td>${valor.total}</td>
                        <td>${valor.calle} ${valor.numExt} ${valor.barrio} ${valor.municipio} ${valor.estado}</td>
                        <td>${valor.numTarjeta}</td>
                        <td>${valor.status}</td>
                    </tr>
                `;
                }
            }
        }