<?php
require_once 'config.php';
require_once 'helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: login.php');
    exit;
}

$user = getUser();

// Obtener estadísticas desde la API
$totalDuenos = 0;
$totalMascotas = 0;

// Llamar a la API para obtener dueños
$duenosResponse = apiGet('/Dueno');
if ($duenosResponse['success'] && isset($duenosResponse['data'])) {
    $totalDuenos = is_array($duenosResponse['data']) ? count($duenosResponse['data']) : 0;
}

// Llamar a la API para obtener todas las mascotas (asumiendo endpoint)
$mascotasResponse = apiGet('/Mascota');
if ($mascotasResponse['success'] && isset($mascotasResponse['data'])) {
    $totalMascotas = is_array($mascotasResponse['data']) ? count($mascotasResponse['data']) : 0;
}

include 'partials/header.php';
include 'partials/navbar.php';
?>

<div class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col">
            <h1 class="fw-bold">Dashboard</h1>
            <p class="text-muted">Bienvenido, <?php echo htmlspecialchars($user['nombre'] ?: $user['username']); ?>!</p>
        </div>
    </div>
    
    <!-- Tarjetas de estadísticas -->
    <div class="row g-4 mb-4">
        <div class="col-md-6 col-lg-3">
            <div class="card card-stat border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <i class="bi bi-people-fill text-primary" style="font-size: 3rem;"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h2 class="fw-bold mb-0" style="color: var(--pet-primary);"><?php echo $totalDuenos; ?></h2>
                            <p class="text-muted mb-0">Dueños Registrados</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <a href="views/duenos/duenos_list.php" class="btn btn-pet-primary btn-sm">
                            <i class="bi bi-arrow-right"></i> Ver dueños
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3">
            <div class="card card-stat border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <i class="bi bi-heart-fill text-danger" style="font-size: 3rem;"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h2 class="fw-bold mb-0" style="color: var(--pet-secondary);"><?php echo $totalMascotas; ?></h2>
                            <p class="text-muted mb-0">Mascotas Registradas</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <a href="views/duenos/duenos_list.php" class="btn btn-pet-secondary btn-sm">
                            <i class="bi bi-arrow-right"></i> Ver mascotas
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 opacity-50">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <i class="bi bi-hospital text-success" style="font-size: 3rem;"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h2 class="fw-bold mb-0">Pronto</h2>
                            <p class="text-muted mb-0">Clínicas</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-secondary btn-sm" disabled>
                            <i class="bi bi-lock"></i> Próximamente
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 opacity-50">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <i class="bi bi-calendar-check text-warning" style="font-size: 3rem;"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h2 class="fw-bold mb-0">Pronto</h2>
                            <p class="text-muted mb-0">Citas</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-secondary btn-sm" disabled>
                            <i class="bi bi-lock"></i> Próximamente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Información de funcionalidades -->
    <div class="row">
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white border-bottom">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-rocket-takeoff text-primary"></i> Próximas Funcionalidades
                    </h5>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Historial clínico de mascotas
                        </li>
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Registro de vacunas y desparasitaciones
                        </li>
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Gestión de citas veterinarias
                        </li>
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Portal para clínicas y veterinarias
                        </li>
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Inventario de productos y servicios
                        </li>
                        <li class="list-group-item">
                            <i class="bi bi-check-circle text-success"></i> Códigos QR y NFC para identificación de mascotas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'partials/footer.php'; ?>
