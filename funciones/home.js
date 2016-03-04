var validacionimagenproducto1 = false;

function primeraCarga(){
    //cargo el dato del nombre del usuario
    var mensajeusuario = document.getElementById("txtNombreusuario");
    var nombreUsuario = window.localStorage.getItem('nombreusuario');//obtengo un dato del almacenamiento local
    mensajeusuario.innerHTML = nombreUsuario;
    //cargo las imágenes del sistema por fecha
    CargarImagenes();
}

function CargarImagenes(){
    var fd = new FormData();
    fd.append('tipo', 'listarfotos');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "funciones/listarbd.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            var response = xhr.responseText;
            if (response == "noexiste") {
                mostrarMensajeusuario("incorrecto","No hay imágenes en PicIt. Empieza subiendo una");
            }
            else if (response == "errorbd"){
                mostrarMensajeusuario("error","Hemos tenido un error en la Base de datos. Intenta nuevamente.");
            }
            //capturamos y procesamos el XML con los datos de las imágenes
            else{
                
               var htmlimagenes = "";
               $(response).find("imagen").each(function () {
                    pathimagen = $(this).find("direccion_imagen").text();
                    descripcionimagen = $(this).find("descripcion_imagen").text();
                    var res = descripcionimagen.split('/');
                    var nombreimagen = res[2];
                    //creamos cada imagen
                    htmlimagenes += "<figure class='effect-sadie  wowload fadeInUp'>";
                    htmlimagenes += "<a href=\"" + pathimagen + "\" title=\"" + descripcionimagen + "\" data-gallery>";
                    htmlimagenes += "<img src=\"" + pathimagen + "\" alt='imgusuario'/>  ";
                    htmlimagenes += "<figcaption>";
                    htmlimagenes += "<button type='submit' onclick='window.open(\"funciones/download.php?file=../"+pathimagen+"&name="+nombreimagen+"\")' class='btn btn-default btn-block'>Descargar</button>";
                    htmlimagenes += "</figcaption>";
                    htmlimagenes += "</a>";
                    htmlimagenes += "</figure>";
                });
                var imagenespicit = document.getElementById('imagenespicit');
                imagenespicit.innerHTML = htmlimagenes;
            }
        }
        else {
            mostrarMensajeusuario("error","Hemos tenido un error. Intenta nuevamente.");
            var imagenespicit = document.getElementById('imagenespicit');
            imagenespicit.innerHTML = "";
        };
    };
    xhr.send(fd);
}

$('#btnSubirfoto').click(function () {
    var descripcionfoto = $("#descripcionfoto").val();
    if (descripcionfoto == "") {
        mostrarMensajeusuario("error","Ingresa una descripción de la foto");
        return false;
    }
    //validar imágenes seleccionadas
    if (!validacionimagenproducto1) {
        mostrarMensajeusuario("error","La imagen seleccionada no es válida");
        return false;
    }
    var idfoto = generateUUID();
    var idusuario = window.localStorage.getItem('idusuario');
    var fd = new FormData($('#frmSubirfoto')[0]);
    fd.append('tipo', 'crearfoto');
    fd.append('idfoto', idfoto);
    fd.append('idusuario', idusuario);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "funciones/insertarbd.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            var response = xhr.responseText;
            if (response == "creado") {
                mostrarMensajeusuario("correcto","Tu imagen se ha subido exitosamente.");
                document.forms["frmSubirfoto"].reset();
                CargarImagenes();
            }
            else if (response == "errorbd"){
                mostrarMensajeusuario("error","Hemos tenido un error en la Base de datos. Intenta nuevamente.");
            }
            else if (response == "error"){
                mostrarMensajeusuario("error","Hemos tenido un error. Intenta nuevamente.");
            }
        }
        else {
            mostrarMensajeusuario("error","Hemos tenido un error. Intenta nuevamente.");
        };
    };
    xhr.send(fd);
});

//valido las imágenes que se suben al sistema del producto
//valido su tamaño
//valido su tipo 
var _URL = window.URL;
$("#imagenusuario").change(function (e) {
    var file, img;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function () {
            //alert("Width:" + this.width + "   Height: " + this.height);//this will give you image width and height and you can easily validate here....
            if (this.width <500){
                mostrarMensajeusuario("error","La imagen debe ser de mínimo 500 px de ancho");
                return false;
            }
               
            if (this.height < 500){
                mostrarMensajeusuario("error","La imagen debe ser de mínimo 500 px de alto");
                return false;
            }
            validacionimagenproducto1 = true;
        };
        img.src = _URL.createObjectURL(file);
    }
});

$('#cerrarsesion').click(function () {
    window.localStorage.clear();
    window.location.href = 'index.html';
});
/* función que genera un identificador único */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


/*función para mostrar mensaje*/
function mostrarMensajeusuario (tipo, mensaje){
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    var backgroundcolor = "";
    document.getElementById("txtmensajeUsuario").innerHTML = mensaje;
    if (tipo == "correcto")
    {
        backgroundcolor = "#1DB954";
    }
    else if (tipo == "incorrecto")
    {
        backgroundcolor = "#D8BF21";
    }
    else
    {
        backgroundcolor = "#D11D1D";
    }
    document.getElementById("controlMensajes").style.backgroundColor = backgroundcolor;
    $("#controlMensajes").removeClass('hidden');
    var timer = setTimeout(ocultarMensajeautomaticamente, 4000);
}
/*función que oculta el mensaje*/
function ocultarMensajeautomaticamente() {
    $("#controlMensajes").addClass('hidden');
}