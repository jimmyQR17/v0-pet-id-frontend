<?php
require_once 'config.php';

// Si no está logueado, redirigir a login
if (!isLoggedIn()) {
    header('Location: login.php');
    exit;
}

// Si ya está logueado, redirigir a dashboard
header('Location: dashboard.php');
exit;
?>
