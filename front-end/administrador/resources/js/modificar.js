var url_string = window.location.href;
var url = new URL(url_string);
var codigoF = url.searchParams.get("codigo");

//document.getElementById("aqui").value = c;
fetch(`http://localhost:5000/scv/consulta?codigo_barras=` + codigoF, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(datos => {
        recuperar(datos)
    })
    .catch(function(err) {
        console.log(err);
    });


function recuperar(datos) {
    var precioE = Number(datos.data[0].precio);
    var existenciasE = Number(datos.data[0].existencias);
    document.getElementById("imagen").src = datos.data[0].foto;
    document.getElementById("codigo").value = datos.data[0].codigo_barras;
    document.getElementById("nombre").value = datos.data[0].nombre;
    document.getElementById("descripcion_breve").value = datos.data[0].descripcion_breve;
    document.getElementById("descripcion").value = datos.data[0].descripcion;
    document.getElementById("precio").value = precioE;
    document.getElementById("existencias").value = existenciasE;

    if (datos.data[0].categoria == "Artes") {
        document.getElementById("categoria1").checked = true;
        document.getElementById("categoria2").checked = false;
        document.getElementById("categoria3").checked = false;
    } else {
        if (datos.data[0].categoria == "Oficina") {
            document.getElementById("categoria1").checked = false;
            document.getElementById("categoria2").checked = true;
            document.getElementById("categoria3").checked = false;
        } else {
            if (datos.data[0].categoria == "Escolar") {
                document.getElementById("categoria1").checked = false;
                document.getElementById("categoria2").checked = false;
                document.getElementById("categoria3").checked = true;
            }
        }
    }


}

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
        });
}

function procesar(datos) {
    var categoria = "default";
    var codigo_barras = document.getElementById("codigo").value;
    var nombre = document.getElementById("nombre").value;
    var foto = datos.data;
    var descripcion_breve = document.getElementById("descripcion_breve").value;
    var descripcion = document.getElementById("descripcion").value;
    var precio = document.getElementById("precio").value;
    var existencias = document.getElementById("existencias").value;
    if (document.getElementById("categoria1").checked) {
        categoria = "Artes"
    } else {
        if (document.getElementById("categoria2").checked) {
            categoria = "Oficina"
        } else {
            if (document.getElementById("categoria3").checked) {
                categoria = "Escolar"
            } else {
                categoria = "no selecciono nada"
            }
        }
    }
    const cuerpo = new URLSearchParams("nombre=" + nombre);
    cuerpo.append('foto', foto);
    cuerpo.append('descripcion_breve', descripcion_breve);
    cuerpo.append('descripcion', descripcion);
    cuerpo.append('precio', precio);
    cuerpo.append('existencias', existencias);
    cuerpo.append('categoria', categoria);


    fetch(`http://localhost:5000/scv/actualizar?codigo_barras=` + codigo_barras, {
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