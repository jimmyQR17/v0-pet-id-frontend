<?php
require_once '../../config.php';
require_once '../../helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: ../../login.php');
    exit;
}

$pageTitle = 'PetID - Listado de Dueños';

// Obtener listado de dueños desde la API
$duenos = [];
$error = '';

$response = apiGet('/Dueno');
if ($response['success'] && isset($response['data'])) {
    $duenos = $response['data'];
} else {
    $error = 'Error al cargar los dueños. ' . ($response['data']['message'] ?? '');
}

include '../../partials/header.php';
include '../../partials/navbar.php';
?>

<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="fw-bold">Dueños</h1>
            <p class="text-muted">Administración de dueños de mascotas</p>
        </div>
        <a href="duenos_form.php" class="btn btn-pet-primary">
            <i class="bi bi-plus-circle"></i> Nuevo Dueño
        </a>
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
            if ($_GET['success'] === 'created') echo 'Dueño creado exitosamente.';
            elseif ($_GET['success'] === 'updated') echo 'Dueño actualizado exitosamente.';
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
                            <th class="px-4 py-3">Nombres</th>
                            <th class="py-3">Apellidos</th>
                            <th class="py-3">Documento</th>
                            <th class="py-3">Email</th>
                            <th class="py-3">Estado</th>
                            <th class="py-3 text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($duenos)): ?>
                            <tr>
                                <td colspan="6" class="text-center py-5 text-muted">
                                    <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                                    <p class="mt-2">No hay dueños registrados</p>
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($duenos as $dueno): ?>
                                <tr>
                                    <td class="px-4 py-3">
                                        <i class="bi bi-person-circle text-primary"></i>
                                        <?php echo htmlspecialchars($dueno['nombres'] ?? ''); ?>
                                    </td>
                                    <td class="py-3"><?php echo htmlspecialchars($dueno['apellidos'] ?? ''); ?></td>
                                    <td class="py-3"><?php echo htmlspecialchars($dueno['documento'] ?? ''); ?></td>
                                    <td class="py-3">
                                        <i class="bi bi-envelope"></i>
                                        <?php echo htmlspecialchars($dueno['email'] ?? ''); ?>
                                    </td>
                                    <td class="py-3">
                                        <span class="badge rounded-pill <?php echo ($dueno['estado'] ?? '') === 'ACTIVO' ? 'badge-custom-active' : 'badge-custom-inactive'; ?>">
                                            <?php echo htmlspecialchars($dueno['estado'] ?? 'N/A'); ?>
                                        </span>
                                    </td>
                                    <td class="py-3 text-end pe-4">
                                        <div class="btn-group" role="group">
                                            <a href="../mascotas/mascotas_por_dueno.php?idDueno=<?php echo $dueno['idDueno'] ?? 0; ?>" 
                                               class="btn btn-pet-secondary btn-sm" 
                                               title="Ver mascotas">
                                                <i class="bi bi-heart"></i> Mascotas
                                            </a>
                                            <a href="duenos_form.php?id=<?php echo $dueno['idDueno'] ?? 0; ?>" 
                                               class="btn btn-pet-primary btn-sm" 
                                               title="Editar">
                                                <i class="bi bi-pencil"></i> Editar
                                            </a>
                                            <a href="duenos_estado.php?id=<?php echo $dueno['idDueno'] ?? 0; ?>&estado=<?php echo ($dueno['estado'] ?? '') === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'; ?>" 
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
