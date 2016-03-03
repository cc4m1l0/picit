<?php
include("conexionbd.php");
include_once 'MysqltXML.php';
$tipo = $_POST["tipo"];
switch ($tipo)
{
    case "validarusuario":
    $nombreusuario = $_POST["nombreusuario"];
    $claveusuario = $_POST["claveusuario"];
    $respuesta = "error";
    $idusuario = "";
    $nomusuario = "";
    //validamos q el correo no está en uso
    $rst = mysql_query("SELECT id_usuario, nombre_usuario FROM tbl_usuario WHERE correo_usuario= '".$nombreusuario."' AND clave_usuario = '".$claveusuario."';",$conexion);
    $numero_reg = mysql_num_rows($rst);
    if ($numero_reg == 0)
    {
        $respuesta = "noexiste";
    }
    else
    {
        while($var = mysql_fetch_array($rst))
        {
            $idusuario = $var["id_usuario"];
            $nomusuario = $var["nombre_usuario"];
        }
        $respuesta = $idusuario."::".$nomusuario;
    }
    mysql_close($conexion);//cerramos la conexion

    print $respuesta;
    break;
    case "listarfotos":
    $respuesta = "";
    $rst = mysql_query("SELECT direccion_imagen, descripcion_imagen FROM tbl_imagen ORDER BY fechacreacion_imagen DESC;",$conexion);
    $numero_reg = mysql_num_rows($rst);
    if ($numero_reg == 0)
    {
        $respuesta = "noexiste";
    }
    else
    {
        $xml = sqlToXml($rst, "imagenes", "imagen");
        $respuesta = $xml;
    }
    mysql_close($conexion);//cerramos la conexion

    print $respuesta;
    break;
}
?>