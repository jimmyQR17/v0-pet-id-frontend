<?php
require_once '../../config.php';
require_once '../../helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: ../../login.php');
    exit;
}

// Verificar parámetros
if (!isset($_GET['id']) || !isset($_GET['idDueno']) || !isset($_GET['estado'])) {
    header('Location: ../duenos/duenos_list.php');
    exit;
}

$idMascota = $_GET['id'];
$idDueno = $_GET['idDueno'];
$nuevoEstado = $_GET['estado'];

// Llamar a la API para cambiar el estado
$response = apiPatch('/Mascota/' . $idMascota . '/estado', [
    'codigoEstado' => $nuevoEstado
]);

if ($response['success']) {
    header('Location: mascotas_por_dueno.php?idDueno=' . $idDueno . '&success=estado');
} else {
    $error = $response['data']['message'] ?? 'Error al cambiar el estado.';
    header('Location: mascotas_por_dueno.php?idDueno=' . $idDueno . '&error=' . urlencode($error));
}
exit;
?>
