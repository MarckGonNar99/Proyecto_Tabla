<?php
// Crear conexión a la base de datos
$conexion = new mysqli('localhost', 'root', '', 'estrellas');
// Verificar conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Consulta SQL para obtener todas las estrellas
$sql = "SELECT * FROM estrella";
$resultado = $conexion->query($sql);

// Array para almacenar las estrellas
$estrellas = array();

if ($resultado->num_rows > 0) {
    // Recorrer resultados y añadir cada estrella al array
    while ($fila = $resultado->fetch_assoc()) {
        $estrella = array(
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'categoria' => $fila['categoria']
        );
        array_push($estrellas, $estrella);
    }
}

// Devolver resultados como JSON
echo json_encode($estrellas);

// Cerrar conexión
$conexion->close();
?>