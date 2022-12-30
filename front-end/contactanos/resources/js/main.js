var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");

if (nombre == null || nombre == "null") {} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`;
}

function enviar(){
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var mensaje = document.getElementById("mensaje").value;
    var fecha = hora();

    if(numero() != false && correoV() != false && textosPla() != false){
        const cuerpo = new URLSearchParams("nombre=" + nombre);
        cuerpo.append('apellidos', apellidos);
        cuerpo.append('correo', correo);
        cuerpo.append('telefono', telefono);
        cuerpo.append('mensaje', mensaje);
        cuerpo.append('fecha', fecha);
        console.log(cuerpo)
        fetch('http://localhost:5000/scv/insertComentario', {
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
                window.location = "./contactanos.html"
            })
            .catch(function(err) {
                console.log(err);
                alert("Error el guardar el producto")
            });
    }else{
        alert("Verifica tus datos")
    }    
}


function hora() {
    var fecha
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
        //console.log(`${year}-0${month}-${day}`)
        fecha = year + "-0" + month + "-" + day
    } else {
        //console.log(`${year}-${month}-${day}`)
        fecha = year + "-" + month + "-" + day
    }
    return fecha
}

//Validacion 

function textosPla(){
    if(document.getElementById("nombre").value != "" && document.getElementById("apellidos").value !="" && document.getElementById("mensaje").value !=""){
        return true
    }else{
        return false
    }
}

function numero() {
    const patron = /^\d{10}$/;
    const res = patron.test(document.getElementById("telefono").value);
    var telefono = document.getElementById("telefono").value;
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