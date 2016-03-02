<?php
include("conexionbd.php");
$tipo = $_POST["tipo"];
switch ($tipo)
{
    case "crearfoto":
    $idfoto = $_POST["idfoto"];
    $nombrefoto = $_POST["nombrefoto"];
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
            $guardar = mysql_query("INSERT INTO tbl_imagen(id_imagen,nombre_imagen,descripcion_imagen,direccion_imagen,fechacreacion_imagen,fk_usario_imagen) VALUES ('$idfoto','$nombrefoto','$descripcionfoto','$carpetaguardarbd','$fechacreacion','$idusuario');"); //creamos la consulta con INSERT INTO para insertar los valores recogidos 
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