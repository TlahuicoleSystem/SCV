var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");

if (nombre == null) {} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}

function entrar() {
    var correo = document.getElementById("correo2").value;
    var contraseña = document.getElementById("contraseñaL").value;
    if(correo == "" && contraseña == ""){
        alert("Ingresa los datos")
    }else{
        const cuerpo = new URLSearchParams("correo=" + correo);
        cuerpo.append('contraseña', contraseña);
        console.log(cuerpo)
        fetch(`http://localhost:5000/scv/consultarC`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
            })
            .then(res => res.json())
            .then(datos => {
                entrarRes(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
                sessionStorage.setItem("cliente", null);
                sessionStorage.setItem("nombre", null);
            });
    }    
}

function entrarRes(datos) {
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
//Validacion 

function textosPla(){
    if(document.getElementById("nombre").value != "" && document.getElementById("apellidos").value !=""){
        return true
    }else{
        return false
    }
}

function numero() {
    const patron = /^\d{10}$/;
    const res = patron.test(document.getElementById("telefono").value);
    var telefono = document.getElementById("telefono").value;
    console.log("Tamaño de consula", telefono.length);
    if (res == true && telefono.length == 10) {
        console.log("esntro en el true");
        return true;
    } else {
        document.getElementById("telefono").focus();
        console.log("esntro en el false");
        return false;
    }
}
//Validacion Correo
function correoV() {
    const patron = /\w+([\.-]?\w+){3}@\w{2}([\.-]?\w+)+(\.\w{2,3})+$/;
    const res = patron.test(document.getElementById("correo").value);
    if (res == true) {
        return true;
    } else {
        document.getElementById("correo").focus();
        return false;
    }
}

function guardar() {
    if(numero() != false && correoV() != false && textosPla() != false){
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
            .then(res => res.json())
            .then(datos => {
                registrarRes(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
                sessionStorage.setItem("cliente", null);
                sessionStorage.setItem("nombre", null);
            });
        } else {
            alert("Las contraseñas no son correctas")
        }
    }else{
        alert("Lo sentimos verifica tus datos")
    }
}

function registrarRes(datos) {
    console
    if (datos.data == "") {
        alert("Lo sentimos, ocurrio un problema interno")
    } else {
        alert("Registrado Correctamente")
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