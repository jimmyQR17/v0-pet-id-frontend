<?php
require_once '../../config.php';
require_once '../../helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: ../../login.php');
    exit;
}

// Verificar parámetros
if (!isset($_GET['id']) || !isset($_GET['estado'])) {
    header('Location: duenos_list.php');
    exit;
}

$idDueno = $_GET['id'];
$nuevoEstado = $_GET['estado'];

// Llamar a la API para cambiar el estado
$response = apiPatch('/Dueno/' . $idDueno . '/estado', [
    'codigoEstado' => $nuevoEstado
]);

if ($response['success']) {
    header('Location: duenos_list.php?success=estado');
} else {
    $error = $response['data']['message'] ?? 'Error al cambiar el estado.';
    header('Location: duenos_list.php?error=' . urlencode($error));
}
exit;
?>
