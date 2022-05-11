var url_string = window.location.href;
var url = new URL(url_string);
var codigoF = url.searchParams.get("codido");

if (codigoF == null) {
    alert("Lo sentimos, tenemos problemas para mostrar la información")
} else {
    fetch(`http://localhost:5000/scv/consulta?codigo_barras=` + codigoF, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(datos => {
            recuperar(datos)
        })
        .catch(function(err) {
            console.log(err);
            alert("Los sentimos, tenemos problemas para optener la informacion")
        });
}

function recuperar(datos) {
    var division = datos.data[0].descripcion.split("\n");
    var imagen = document.getElementById("imagen")
    var encabezado = document.getElementById("encabezado")
    var lista = document.getElementById("lista")
    var cate = document.getElementById("cate")
    imagen.innerHTML = `
        <img src="${datos.data[0].foto}" class="img-fluid" alt="mision">
    `
    encabezado.innerHTML = `
        <h2>${datos.data[0].nombre}</h2>
        <p>${datos.data[0].descripcion_breve} <br>ID:${datos.data[0].codigo_barras}</p>
        <h3>$ ${datos.data[0].precio}</h3>
    `
    var i;
    for (i = 0; i < division.length; i++) {
        lista.innerHTML += `
        <li>${division[i]}</li>
    `
    }
    cate.innerHTML = `<li>Categoria: ${datos.data[0].categoria}</li>`




}