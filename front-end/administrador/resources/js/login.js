function entrar() {
    var correo = document.getElementById("correo").value;
    var contraseña = document.getElementById("contraseña").value;
    if(correo == "" && contraseña == ""){
        alert("Ingresa los datos")
    }else{
        const cuerpo = new URLSearchParams("correo=" + correo);
        cuerpo.append('contraseña', contraseña);
        console.log(cuerpo)
        fetch(`http://localhost:5000/scv/consultarA`, {
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
                sessionStorage.setItem("admin", null);
            });
    }    
}

function entrarRes(datos) {
    if (datos.data == "") {
        alert("Lo sentimos contraseña o correo invalido")
        sessionStorage.setItem("admin", null);
    } else {
        sessionStorage.setItem("admin", datos.data[0].idCliente);
        alert("Bienvenido")
        window.location = "./index.html";
    }
}