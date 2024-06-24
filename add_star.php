<?php
$nombre=$_POST["starName"];
$categoria=$_POST["starCategory"];


$conexion=new mysqli('localhost','root','','estrellas');
$conexion->set_charset('utf8');


$sentencia="INSERT into estrella (nombre, categoria) VALUES (?,?)";
$consulta=$conexion->prepare($sentencia);
$consulta->bind_param("ss",$nombre,$categoria);
$consulta->execute();
$consulta->close();
$conexion->close();


echo'<META HTTP-EQUIV="REFRESH"CONTENT="2;URL=http:index.html">';
?>