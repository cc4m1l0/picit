<?php
$conexion=@mysql_connect("localhost","root","root");//configuramos la conexion al servidor de la BD
if (mysql_error())//condicion para manejo de errores
{
	echo "Imposible conectarse a servidor",mysql_error(),mysql_error(),"<a href='javascript:history.go(-1)'>Regresar</a>";//se muestra este error si no se pudo establecer la conexion con el servidor
	exit();
}
mysql_select_db("picit_bd",$conexion); 	//seleccionamos la base de datos a la que nos queremos conectar
?>