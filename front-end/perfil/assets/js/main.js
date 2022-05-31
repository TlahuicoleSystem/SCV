var cliente = sessionStorage.getItem("cliente");
var nombre = sessionStorage.getItem("nombre");
document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`


function mostrar1() {
    document.getElementById('seccion1').style.display = 'block';
    document.getElementById('seccion2').style.display = 'none';
    document.getElementById('seccion3').style.display = 'none';
}

function mostrar2() {
    document.getElementById('seccion1').style.display = 'none';
    document.getElementById('seccion2').style.display = 'block';
    document.getElementById('seccion3').style.display = 'none';
}

function mostrar3() {
    document.getElementById('seccion1').style.display = 'none';
    document.getElementById('seccion2').style.display = 'none';
    document.getElementById('seccion3').style.display = 'block';
}