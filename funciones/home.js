var validacionimagenproducto1 = false;

$('#btnSubirfoto').click(function () {
    var nombrefoto = $("#nombrefoto").val();
    var descripcionfoto = $("#descripcionfoto").val();
    if (nombrefoto == "") {
        alert("Ingresa el nombre de la foto");
        return false;
    }
    if (descripcionfoto == "") {
        alert("Ingresa una descripción de la foto");
        return false;
    }
    //validar imágenes seleccionadas
    if (!validacionimagenproducto1) {
        alert("La imagen seleccionada no es válida");
        return false;
    }
    var idfoto = generateUUID();
    //var idusuario = window.localStorage.getItem('idusuario');
    var idusuario = "111";
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
                alert("Tu imagen se ha creado exitosamente.");
                document.forms["frmSubirfoto"].reset();
            }
            else{
                alert("Hemos tenido un error. Intenta nuevamente.");
            }
        }
        else {
            alert("Hemos tenido un error. Intenta nuevamente.");
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
                alert("La imagen debe ser de mínimo 500 px de ancho");
                return false;
            }
               
            if (this.height < 500){
                alert("La imagen debe ser de mínimo 500 px de alto");
                return false;
            }
            validacionimagenproducto1 = true;
        };
        img.src = _URL.createObjectURL(file);
    }
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