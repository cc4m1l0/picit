$('#btnLogin').click(function () {
    window.location.href = 'home.html';
});

$('#btnRegistro').click(function () {
    $("#formlogin").addClass("hidden");
    $("#formregister").removeClass("hidden");
});