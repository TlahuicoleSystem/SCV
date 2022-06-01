var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");

function entrar() {
    var correo = document.getElementById("correo2").value;
    var contraseña = document.getElementById("contraseñaL").value;
    const cuerpo = new URLSearchParams("correo=" + correo);
    cuerpo.append('contraseña', contraseña);
    fetch(`http://localhost:5000/scv/consultarC`, {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: cuerpo
        })
        .then(res => res.json())
        .then(datos => {
            prueba(datos)
        })
        .catch(function(err) {
            console.log(err);
            alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
            sessionStorage.setItem("cliente", null);
            sessionStorage.setItem("nombre", null);
        });
}


function prueba(datos) {
    if (datos.data == "") {
        alert("Lo sentimos contraseña o correo invalido")
        sessionStorage.setItem("cliente", null);
        sessionStorage.setItem("nombre", null);
    } else {
        sessionStorage.setItem("cliente", datos.data[0].idCliente);
        sessionStorage.setItem("nombre", datos.data[0].nombre);
        alert("Bienvenido")
    }
}

function guardar() {
    var contraseña1 = document.getElementById("contraseña").value
    var contraseña2 = document.getElementById("contraseñaC").value
    if (contraseña1 == contraseña2) {
        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var correo = document.getElementById("correo").value;
        var contraseña = document.getElementById("contraseña").value;
        var telefono = document.getElementById("telefono").value;
        const cuerpo = new URLSearchParams("nombre=" + nombre);
        cuerpo.append('apellidos', apellidos);
        cuerpo.append('correo', correo);
        cuerpo.append('contraseña', contraseña);
        cuerpo.append('telefono', telefono);
        fetch('http://localhost:5000/scv/insertarC', {
                method: 'POST',
                body: cuerpo
            })
            .then(function(response) {
                if (response.ok) {
                    return response.text()
                } else {
                    throw "Error en la llamada";
                }
            })
            .then(function(texto) {
                console.log(texto);
                alert("Datos guardados exitosamente")
            })
            .catch(function(err) {
                console.log(err);
                alert("Error al registrarse")
            });
    } else {
        alert("Las contraseñas no son correctas")
    }
}


function mostrar1() {
    document.getElementById('registro').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function mostrar2() {
    document.getElementById('registro').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}