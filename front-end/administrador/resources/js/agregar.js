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
    var foto = datos.data
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