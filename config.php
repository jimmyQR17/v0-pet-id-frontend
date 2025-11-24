<?php
// Configuración general del sistema PetID
session_start();

// URL base de la API .NET
define('API_BASE_URL', 'https://localhost:7190/api');

// Configuración de zona horaria
date_default_timezone_set('America/Mexico_City');

// Función helper para verificar si el usuario está logueado
function isLoggedIn() {
    return isset($_SESSION['jwt']) && !empty($_SESSION['jwt']);
}

// Función helper para obtener el token JWT
function getToken() {
    return $_SESSION['jwt'] ?? '';
}

// Función helper para obtener datos del usuario
function getUser() {
    return [
        'username' => $_SESSION['username'] ?? '',
        'rol' => $_SESSION['rol'] ?? '',
        'nombre' => $_SESSION['nombre'] ?? ''
    ];
}

// Función para cerrar sesión
function logout() {
    session_destroy();
    header('Location: login.php');
    exit;
}
?>
