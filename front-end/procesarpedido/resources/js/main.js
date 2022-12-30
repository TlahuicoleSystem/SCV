var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");
var url_string = window.location.href;
var url = new URL(url_string);
var codigoP = url.searchParams.get("codido");
var cantidad = url.searchParams.get("cantidad");
var precio = url.searchParams.get("precio");
var nombreD, telefono, envio, calle, numext, numint, barrio, cp, municipio, estado, nombrept, tarjeta, vencimiento, codigos, numOrden, fecha;

if (nombre == null || nombre == "null") {
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
    var hoy = new Date();
    var fecha = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear();
    var hora = hoy.getHours() + '' + hoy.getMinutes() + '' + hoy.getSeconds();
    var fechaYHora = fecha + '-' + hora;
    numOrden = fechaYHora + "-" + cliente
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
            alert("Lo sentimos ocurrio un error inesperado, intente de nuevo");
        });
    }else{
        alert ("Lo sentimos verifica tus datos");
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
        fecha = hora()
        var total = precio * cantidad
        const cuerpo = new URLSearchParams("precio=" + precio);
        cuerpo.append('cantidad', cantidad);
        cuerpo.append('fechap', fecha);
        cuerpo.append('idCliente', cliente);
        cuerpo.append('codigoBarras', codigoP);
        cuerpo.append('status', 'Preparado');
        cuerpo.append('numOrden', numOrden);
        cuerpo.append('total', total);
        fetch(`http://localhost:5000/scv/insertarPe`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
            })
            .then(res => res.json())
            .then(datos => {
                terminado(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
            });
    } else {
        alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
    }
}

function terminado(datos) {
    if (datos.message == "Pedido guardado") {
        alert("Pedido confirmado")
        window.location = "../index.html";
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
