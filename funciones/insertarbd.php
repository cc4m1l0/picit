<?php
include("conexionbd.php");
$tipo = $_POST["tipo"];
switch ($tipo)
{
    case "crearusuario":
    $idusuario = $_POST["idusuario"];
    $nombreusuarior = $_POST["nombreusuarior"];
    $correousuarior = $_POST["correousuarior"];
    $claveusuarior = $_POST["claveusuarior"];
    $respuesta = "";
    
    //validamos q el correo no está en uso
    $rst = mysql_query("SELECT id_usuario FROM tbl_usuario WHERE correo_usuario= '".$correousuarior."';",$conexion);
    $numero_reg = mysql_num_rows($rst);
    if ($numero_reg == 0)
    {
        //guardamos en la BD si es un nuevo usuario
        $guardar = mysql_query("INSERT INTO tbl_usuario(id_usuario,nombre_usuario,correo_usuario,clave_usuario) VALUES ('$idusuario','$nombreusuarior','$correousuarior','$claveusuarior');"); //creamos la consulta con INSERT INTO para insertar los valores recogidos 
	    $respuesta = "creado";
    }
    else
    {
        $respuesta = "existe";
    }
    mysql_close($conexion);//cerramos la conexion

    print $respuesta;
    break;
    case "crearfoto":
    $idfoto = $_POST["idfoto"];
    $descripcionfoto = $_POST["descripcionfoto"];
    $idusuario = $_POST["idusuario"];
    $fechacreacion =  date("Y/m/d H:i");
    $carpetaguardar = "../fotosusuarios/".$idusuario."/";
    $carpetaguardarbd = "fotosusuarios/".$idusuario."/".$idfoto.".jpg";
    $respuesta = "";
    if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_FILES["imagenusuario"]["type"]))
    {
        if(!file_exists($carpetaguardar))
	    {
           mkdir($carpetaguardar, 0777, true);
	       chmod($carpetaguardar, 0777);
	    }
        $sourcePath = $_FILES['imagenusuario']['tmp_name'];       // Storing source path of the file in a variable
        if (move_uploaded_file($sourcePath, $carpetaguardar.$idfoto.".jpg")) 
        {
            $respuesta = "creado";
            $guardar = mysql_query("INSERT INTO tbl_imagen(id_imagen,descripcion_imagen,direccion_imagen,fechacreacion_imagen,fk_usario_imagen) VALUES ('$idfoto','$descripcionfoto','$carpetaguardarbd','$fechacreacion','$idusuario');"); //creamos la consulta con INSERT INTO para insertar los valores recogidos 
		    mysql_close($conexion);//cerramos la conexion
        } 
        else 
        {
            $respuesta = "error";
        }
    }
    print $respuesta;
    break;
}
?>