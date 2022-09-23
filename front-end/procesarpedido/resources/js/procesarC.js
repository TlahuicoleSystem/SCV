var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");
var url_string = window.location.href;
var url = new URL(url_string);
var numOrden = url.searchParams.get("numOrden");
var nombreD, telefono, envio, calle, numext, numint, barrio, cp, municipio, estado, nombrept, tarjeta, vencimiento, codigos

if (nombre == null) {
    alert("Ingresa para continuar")
} else {
    document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}

function continuar() {
    nombreD = document.getElementById("nombreD").value;
    telefono = document.getElementById("telefono").value;
    tipoE = document.getElementById("tipoE").value;
    calle = document.getElementById("calle").value;
    numext = document.getElementById("numext").value;
    numint = document.getElementById("numint").value;
    barrio = document.getElementById("barrio").value;
    cp = document.getElementById("cp").value;
    municipio = document.getElementById("municipio").value;
    estado = document.getElementById("estado").value;
    if(textosPla() != false && numero() != false){
        document.getElementById('direccionCli').style.display = 'none';
        document.getElementById('pago').style.display = 'block';
    }else{
        alert("Lo sentimos verifica tus datos");
    }
}

function finalizar() {
    nombrept = document.getElementById("nombrept").value;
    tarjeta = document.getElementById("tarjeta").value;
    vencimiento = document.getElementById("vencimiento").value;
    codigos = document.getElementById("codigos").value;
    if (textoPla() != false){
        const cuerpo = new URLSearchParams("nombre=" + nombrept);
        cuerpo.append('numTarjeta', tarjeta);
        cuerpo.append('fecha_ven', vencimiento);
        cuerpo.append('cvv', codigos);
        cuerpo.append('idCliente', cliente);
        cuerpo.append('numOrden', numOrden);
        fetch(`http://localhost:5000/scv/insertarPa`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
            })
            .then(res => res.json())
            .then(datos => {
                finalizar2(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
            });
    }else{
        alert("Lo sentimos verifica tus datos");
    }
    
}

function finalizar2(datos) {
    if (datos.message == "Pago agregado") {
        const cuerpo = new URLSearchParams("nombreD=" + nombreD);
        cuerpo.append('telefono', telefono);
        cuerpo.append('tipoE', tipoE);
        cuerpo.append('calle', calle);
        cuerpo.append('numExt', numext);
        cuerpo.append('numInt', numint);
        cuerpo.append('barrio', barrio);
        cuerpo.append('cp', cp);
        cuerpo.append('municipio', municipio);
        cuerpo.append('estado', estado);
        cuerpo.append('idCliente', cliente);
        cuerpo.append('numOrden', numOrden);
        fetch(`http://localhost:5000/scv/insertarD`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
            })
            .then(res => res.json())
            .then(datos => {
                finalizar3(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
            });
    } else {
        alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
    }
}

function finalizar3(datos) {
    if (datos.message == "Direccion insertada") {
        limpiar();
    } else {
        alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
    }
}

function limpiar() {
    fetch(`http://localhost:5000/scv/eliminarCarri?idCliente=` + cliente, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            resultadoLim(datos)
        })
        .catch(function(err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function resultadoLim(datos) {
    if (datos.message == "carrito eliminado") {
        alert("Pedido confirmado")
        window.location = "../index.html";
    }else{
        alert("Lo sentimos ocurrio un error, intenta de nuevo mas tarde");
    }
}

//Validaciones
 
function textosPla(){
    if(nombreD != "" && calle != "" && numext != "" && barrio != "" && municipio != "" && estado != "" && cp.length == 5){
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
        return true;
    } else {
        document.getElementById("telefono").focus();
        return false;
    }
}

function textoPla(){
    if(nombrept != "" && tarjeta.length == 16 && vencimiento.length == 5 && codigos.length == 3){
        return true;
    }else{
        return false;
    }
}