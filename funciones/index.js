$('#btnLogin').click(function () {
    var nombreusuario = $("#nombreusuario").val();
    var claveusuario = $("#claveusuario").val();
    if (nombreusuario == "") {
        mostrarMensajeusuario("error", "Ingresa tu nombre de usuario");
        return false;
    }
    if (claveusuario == "") {
        mostrarMensajeusuario("error", "Ingresa tu contraseña");
        return false;
    }
    //validar usuario en la BD
    var fd = new FormData($('#frmLogin')[0]);
    fd.append('tipo', 'validarusuario');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "funciones/listarbd.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            var response = xhr.responseText;
            if (response == "noexiste") {
                mostrarMensajeusuario("incorrecto", "No estás registrado en PicIt.");
            }
            else if (response == "error") {
                mostrarMensajeusuario("error", "Hemos tenido un error. Intenta nuevamente.");
            }
            else if (response == "errorbd") {
                mostrarMensajeusuario("error", "Hemos tenido un error al conectarnos con la Base de datos. Intenta nuevamente.");
            }
            else {
                mostrarMensajeusuario("correcto", "Bievenido nuevamente a PicIt.");
                var res = response.split('::');
                var idusuario = res[0];
                var nomusuario = res[1];
                document.forms["frmLogin"].reset();
                window.localStorage.setItem('idusuario', idusuario); //guardo el resultado en el almacenamiento local para que persista
                window.localStorage.setItem('nombreusuario', nomusuario); //guardo el resultado en el almacenamiento local para que persista
                window.location.href = 'home.html';
            }
        }
        else {
            mostrarMensajeusuario("error", "Hemos tenido un error. Intenta nuevamente.");
        };
    };
    xhr.send(fd);
});

$('#btnRegistro').click(function () {
    $("#formlogin").addClass("hidden");
    $("#formregister").removeClass("hidden");
});

$('#btnRegistrarme').click(function () {
    var nombreusuario = $("#nombreusuarior").val();
    var correousuario = $("#correousuarior").val();
    var claveusuario = $("#claveusuarior").val();
    var reclaveusuario = $("#reclaveusuarior").val();
    if (nombreusuario == "") {
        mostrarMensajeusuario("error","Ingresa tu nombre");
        return false;
    }
    if (correousuario == "") {
        mostrarMensajeusuario("error","Ingresa tu correo electrónico");
        return false;
    }
    if (claveusuario == "") {
        mostrarMensajeusuario("error","Ingresa tu contraseña");
        return false;
    }
    if (claveusuario == "") {
        mostrarMensajeusuario("error","Verifica tu contraseña");
        return false;
    }
    if (reclaveusuario != claveusuario) {
        mostrarMensajeusuario("error","Las contraseñas ingresadas no coinciden");
        return false;
    }
    //Registrar usuario en la BD
    var idusuario = generateUUID();
    var fd = new FormData($('#frmRegister')[0]);
    fd.append('tipo', 'crearusuario');
    fd.append('idusuario', idusuario);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "funciones/insertarbd.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            var response = xhr.responseText;
            if (response == "creado") {
                mostrarMensajeusuario("correcto","Te has registrado exitosamente.");
                document.forms["frmRegister"].reset();
                window.localStorage.setItem('idusuario', idusuario);//guardo el resultado en el almacenamiento local para que persista
                window.location.href = 'home.html';
            }
            else if (response == "existe"){
                mostrarMensajeusuario("incorrecto","Este correo ya ha sido usado en PicIt.");
            }
            else if (response == "errorbd") {
                mostrarMensajeusuario("error", "Hemos tenido un error al conectarnos con la Base de datos. Intenta nuevamente.");
            }
            else {
                mostrarMensajeusuario("error","Hemos tenido un error. Intenta nuevamente.");
            }
        }
        else {
            mostrarMensajeusuario("error","Hemos tenido un error. Intenta nuevamente.");
        };
    };
    xhr.send(fd);
});

$('#btnfrmLogin').click(function () {
    $("#formlogin").removeClass("hidden");
    $("#formregister").addClass("hidden");
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