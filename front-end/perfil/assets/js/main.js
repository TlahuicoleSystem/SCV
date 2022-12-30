let cliente = sessionStorage.getItem("cliente");
let nombre = sessionStorage.getItem("nombre");

if (nombre == null || nombre == "null") {
    alert("Ingresa para continuar")
    window.location = "../login/registro.html";
} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}

fetch(`http://localhost:5000/scv/reporteDatosCli?id=` + cliente, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar1(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });

//este metodo muestra los datos del perfil
function mostrar1() {
    document.getElementById('seccion1').style.display = 'block';
    document.getElementById('seccion2').style.display = 'none';
    document.getElementById('seccion3').style.display = 'none';

}

//este metodo muestra la lista de compras
function mostrar2() {
    document.getElementById('seccion1').style.display = 'none';
    document.getElementById('seccion2').style.display = 'block';
    document.getElementById('seccion3').style.display = 'none';

    fetch(`http://localhost:5000/scv/reporteCom?idCliente=` + cliente, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar2(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

//este metodo muestra los pedidos abiertos
function mostrar3() {
    document.getElementById('seccion1').style.display = 'none';
    document.getElementById('seccion2').style.display = 'none';
    document.getElementById('seccion3').style.display = 'block';

    fetch(`http://localhost:5000/scv/reporteAbi?idCliente=` + cliente, {
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
}

function recuperar1(datos){
    var contenido = document.getElementById("contenido-1")
    contenido.innerHTML = ''
    for (let valor of datos.data) {
        contenido.innerHTML += `
        <tr>
            <td>Nombre:</td>
            <td>Hola ${valor.nombre}</td>
        </tr>
        <tr>
            <td>Telefono:</td>
            <td>${valor.telefono}</td>
        </tr>
         <tr>
            <td>Correo:</td>
            <td>${valor.correo}</td>
        </tr>
    `;
    }
}

function recuperar2(datos) {
    var contenido = document.getElementById("contenido-2")
    contenido.innerHTML = ''
    for (let valor of datos.data) {
        contenido.innerHTML += `
        <tr>
            <td><img src="${valor.foto}" class="img-fluid"></td>
            <td>${valor.nombre}</td>
            <td>${valor.descripcion_breve}</td>
            <td>$${valor.precio}</td>
            <td>
                <a href="../productos/producto.html?codido=${valor.codigoBarras}" class="btn btn-success"> Comprar</a>
            </td>
        </tr>
    `;
    }
}

function recuperar3(datos) {
    var contenido = document.getElementById("contenido-3")
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

function salir(){
    let temporar = null
    sessionStorage.setItem("cliente", temporar);
    sessionStorage.setItem("nombre", temporar);
    window.location = "../index.html";
}