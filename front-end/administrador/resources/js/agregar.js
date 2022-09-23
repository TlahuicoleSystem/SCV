var codigo_barras,nombre,descripcion_breve,descripcion,precio,existencias;

function guardar() {
    fetch(`http://localhost:5000/scv/insertarI`, {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: new FormData(document.getElementById('form-imagen'))
        })
        .then(res => res.json())
        .then(datos => {
            procesar(datos)
        })
        .catch(function(err) {
            console.log(err);
            alert("Lo sentimos, error al carga la imagen intenta de nuevo")
        });
}

function procesar(datos) {
    if(datos.message == "Imagen insertada"){
        if(numerosMa() != false && textosPla() != false){
            insertarDatos(datos);
        }else{
            alert("LLena todos los campos de manera correcta");
        }
    }else{
        alert("Lo sentimos hubo un error al cargar la imagen");
    }
}

function insertarDatos(datos){
    var categoria = "default";
    var foto = datos.data
    codigo_barras = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    descripcion_breve = document.getElementById("descripcion_breve").value;
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;
    existencias = document.getElementById("existencias").value;
    if (document.getElementById("categoria1").checked) {
        categoria = "Artes"
    } else {
        if (document.getElementById("categoria2").checked) {
            categoria = "Oficina"
        } else {
            if (document.getElementById("categoria3").checked) {
                categoria = "Escolar"
            } else {
                categoria = "No selecciono nada"
            }
        }
    }
    const cuerpo = new URLSearchParams("codigo_barras=" + codigo_barras);
    cuerpo.append('nombre', nombre)
    cuerpo.append('foto', foto);
    cuerpo.append('descripcion_breve', descripcion_breve);
    cuerpo.append('descripcion', descripcion);
    cuerpo.append('precio', precio);
    cuerpo.append('existencias', existencias);
    cuerpo.append('categoria', categoria);
    fetch('http://localhost:5000/scv/insertar', {
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
            alert("Error el guardar el producto")
        });
}

//Validaciones
function textosPla(){
    codigo_barras = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    descripcion_breve = document.getElementById("descripcion_breve").value;
    descripcion = document.getElementById("descripcion").value;
    if(codigo_barras != "" && nombre !="" && descripcion_breve !="" && descripcion !=""){
        return true
    }else{
        return false
    }
}

function numerosMa(){
    precio = document.getElementById("precio").value;
    existencias = document.getElementById("existencias").value;
    if(precio > 0 && existencias >= 0){
        return true
    }else{
        return false
    }
}