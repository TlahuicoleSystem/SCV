function entrar() {
    var correo = document.getElementById("correo2").value;
    var contraseña = document.getElementById("contraseñaL").value;
    console.log(correo + "  " + contraseña)
    const cuerpo = new URLSearchParams("correo=" + correo);
    cuerpo.append('contraseña', contraseña);
    fetch('http://localhost:5000/scv/consultarC', {
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
            alert("Bienvenido")
        })
        .catch(function(err) {
            console.log(err);
            alert("Lo sentimos correo o contraseña invalidos")
        });
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