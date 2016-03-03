<?php
$conexion=@mysql_connect("localhost","root","root");//configuramos la conexion al servidor de la BD
if (mysql_error())//condicion para manejo de errores
{
	echo "errorbd";
	exit();
}
mysql_select_db("picit_bd",$conexion); 	//seleccionamos la base de datos a la que nos queremos conectar
?>