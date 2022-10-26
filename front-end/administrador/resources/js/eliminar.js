function eliminar() {
    var codigo_barras = document.getElementById("codigo-eliminar").value;


    fetch(`http://localhost:5000/scv/eliminar?codigo_barras=` + codigo_barras, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar(datos)
        })
        .catch(function(err) {
            console.log(err);
        });
}

function recuperar(datos) {
    var mensaje = datos.message;
    if (mensaje == "producto eliminado") {
        alert("El producto se elimino de manera correcta");
        window.location = "./index.html";
    } else {
        alert("EL producto no se elimino");
    }
}