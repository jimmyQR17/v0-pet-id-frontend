<?php
require_once '../../config.php';
require_once '../../helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: ../../login.php');
    exit;
}

// Verificar que se recibió el ID del dueño
if (!isset($_GET['idDueno']) || empty($_GET['idDueno'])) {
    header('Location: ../duenos/duenos_list.php');
    exit;
}

$idDueno = $_GET['idDueno'];
$pageTitle = 'PetID - Mascotas del Dueño';

// Obtener datos del dueño
$dueno = null;
$responseDueno = apiGet('/Dueno/' . $idDueno);
if ($responseDueno['success'] && isset($responseDueno['data'])) {
    $dueno = $responseDueno['data'];
}

// Obtener mascotas del dueño
$mascotas = [];
$error = '';

$response = apiGet('/Mascota/por-dueno/' . $idDueno);
if ($response['success'] && isset($response['data'])) {
    $mascotas = $response['data'];
} else {
    $error = 'Error al cargar las mascotas. ' . ($response['data']['message'] ?? '');
}

include '../../partials/header.php';
include '../../partials/navbar.php';
?>

<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
            <h1 class="fw-bold">Mascotas de <?php echo htmlspecialchars($dueno['nombres'] ?? 'Dueño'); ?> <?php echo htmlspecialchars($dueno['apellidos'] ?? ''); ?></h1>
            <p class="text-muted mb-0">
                <i class="bi bi-envelope"></i> <?php echo htmlspecialchars($dueno['email'] ?? ''); ?> | 
                <i class="bi bi-card-text"></i> <?php echo htmlspecialchars($dueno['documento'] ?? ''); ?>
            </p>
        </div>
        <div class="d-flex gap-2">
            <a href="mascotas_form.php?idDueno=<?php echo $idDueno; ?>" class="btn btn-pet-primary">
                <i class="bi bi-plus-circle"></i> Nueva Mascota
            </a>
            <a href="../duenos/duenos_list.php" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left"></i> Volver a Dueños
            </a>
        </div>
    </div>
    
    <?php if ($error): ?>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <?php echo htmlspecialchars($error); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    <?php endif; ?>
    
    <?php if (isset($_GET['success'])): ?>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill"></i>
            <?php 
            if ($_GET['success'] === 'created') echo 'Mascota creada exitosamente.';
            elseif ($_GET['success'] === 'updated') echo 'Mascota actualizada exitosamente.';
            elseif ($_GET['success'] === 'estado') echo 'Estado actualizado exitosamente.';
            ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    <?php endif; ?>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="px-4 py-3">Nombre</th>
                            <th class="py-3">Especie</th>
                            <th class="py-3">Raza</th>
                            <th class="py-3">Sexo</th>
                            <th class="py-3">Edad (meses)</th>
                            <th class="py-3">Microchip</th>
                            <th class="py-3">Estado</th>
                            <th class="py-3 text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($mascotas)): ?>
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <i class="bi bi-heart" style="font-size: 3rem;"></i>
                                    <p class="mt-2">No hay mascotas registradas para este dueño</p>
                                    <a href="mascotas_form.php?idDueno=<?php echo $idDueno; ?>" class="btn btn-pet-primary btn-sm">
                                        <i class="bi bi-plus-circle"></i> Agregar Primera Mascota
                                    </a>
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($mascotas as $mascota): ?>
                                <tr>
                                    <td class="px-4 py-3">
                                        <i class="bi bi-heart-fill text-danger"></i>
                                        <strong><?php echo htmlspecialchars($mascota['nombre'] ?? ''); ?></strong>
                                    </td>
                                    <td class="py-3"><?php echo htmlspecialchars($mascota['especie'] ?? ''); ?></td>
                                    <td class="py-3"><?php echo htmlspecialchars($mascota['raza'] ?? '-'); ?></td>
                                    <td class="py-3"><?php echo htmlspecialchars($mascota['sexo'] ?? ''); ?></td>
                                    <td class="py-3"><?php echo htmlspecialchars($mascota['edadAproxMeses'] ?? 'N/A'); ?></td>
                                    <td class="py-3">
                                        <small class="text-muted"><?php echo htmlspecialchars($mascota['codigoMicrochip'] ?? 'Sin chip'); ?></small>
                                    </td>
                                    <td class="py-3">
                                        <span class="badge rounded-pill <?php echo ($mascota['estado'] ?? '') === 'ACTIVO' ? 'badge-custom-active' : 'badge-custom-inactive'; ?>">
                                            <?php echo htmlspecialchars($mascota['estado'] ?? 'N/A'); ?>
                                        </span>
                                    </td>
                                    <td class="py-3 text-end pe-4">
                                        <div class="btn-group" role="group">
                                            <a href="mascotas_form.php?id=<?php echo $mascota['idMascota'] ?? 0; ?>&idDueno=<?php echo $idDueno; ?>" 
                                               class="btn btn-pet-primary btn-sm" 
                                               title="Editar">
                                                <i class="bi bi-pencil"></i> Editar
                                            </a>
                                            <a href="mascotas_estado.php?id=<?php echo $mascota['idMascota'] ?? 0; ?>&idDueno=<?php echo $idDueno; ?>&estado=<?php echo ($mascota['estado'] ?? '') === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'; ?>" 
                                               class="btn btn-outline-secondary btn-sm"
                                               onclick="return confirm('¿Está seguro de cambiar el estado?');"
                                               title="Cambiar estado">
                                                <i class="bi bi-arrow-repeat"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php include '../../partials/footer.php'; ?>
