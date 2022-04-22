function guardar() {
    fetch(`http://localhost:5000/scv/insertarI`, {
        method: 'POST',
        //headers: { 'Content-Type': 'multipart/form-data' },
        body: new FormData(document.getElementById('form-imagen'))
    })

    .then(function(response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error en el envio de la imagen"
            }
        })
        .then(function(texto) {
            console.log(texto);
        })
        .catch(function(err) {
            console.log(err);
        });









    /*
    var codigo_barras = document.getElementById("codigo").value;
        var nombre = document.getElementById("nombre").value;
        var foto = document.getElementById("archivo").value;
        var descripcion_breve = document.getElementById("descripcion_breve").value;
        var descripcion = document.getElementById("descripcion").value;
        var precio = document.getElementById("precio").value;
        var existencias = document.getElementById("existencias").value;
        var categoria = "Checar los radio";
        const data = new URLSearchParams("codigo_barras=" + codigo_barras);
        data.append('nombre', nombre)
        data.append('foto', foto);
        data.append('descripcion_breve', descripcion_breve);
        data.append('descripcion', descripcion);
        data.append('precio', precio);
        data.append('existencias', existencias);
        data.append('categoria', categoria);
        fetch('http://localhost:5000/scv/insertar', {
                method: 'POST',
                body: data
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
            })
            .catch(function(err) {
                console.log(err);
            });*/
}