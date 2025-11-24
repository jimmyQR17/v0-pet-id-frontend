<?php
require_once '../../config.php';
require_once '../../helpers/api_client.php';

// Verificar si está logueado
if (!isLoggedIn()) {
    header('Location: ../../login.php');
    exit;
}

$pageTitle = 'PetID - Formulario de Dueño';
$error = '';
$success = '';
$isEdit = false;
$dueno = [];

// Verificar si es modo edición
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $isEdit = true;
    $idDueno = $_GET['id'];
    
    // Obtener datos del dueño
    $response = apiGet('/Dueno/' . $idDueno);
    if ($response['success'] && isset($response['data'])) {
        $dueno = $response['data'];
    } else {
        $error = 'Error al cargar los datos del dueño.';
    }
}

// Procesar el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'nombres' => $_POST['nombres'] ?? '',
        'apellidos' => $_POST['apellidos'] ?? '',
        'tipoDocumento' => $_POST['tipoDocumento'] ?? 'DNI',
        'documento' => $_POST['documento'] ?? '',
        'genero' => $_POST['genero'] ?? '',
        'fechaNacimiento' => $_POST['fechaNacimiento'] ?? null,
        'email' => $_POST['email'] ?? '',
        'aceptaComunicaciones' => isset($_POST['aceptaComunicaciones']),
        'aceptaTerminos' => isset($_POST['aceptaTerminos'])
    ];
    
    if ($isEdit) {
        // Actualizar dueño existente
        $response = apiPut('/Dueno/' . $idDueno, $data);
        if ($response['success']) {
            header('Location: duenos_list.php?success=updated');
            exit;
        } else {
            $error = $response['data']['message'] ?? 'Error al actualizar el dueño.';
        }
    } else {
        // Crear nuevo dueño
        $response = apiPost('/Dueno', $data);
        if ($response['success']) {
            header('Location: duenos_list.php?success=created');
            exit;
        } else {
            $error = $response['data']['message'] ?? 'Error al crear el dueño.';
        }
    }
}

include '../../partials/header.php';
include '../../partials/navbar.php';
?>

<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="fw-bold"><?php echo $isEdit ? 'Editar Dueño' : 'Nuevo Dueño'; ?></h1>
            <p class="text-muted"><?php echo $isEdit ? 'Actualice los datos del dueño' : 'Registre un nuevo dueño de mascota'; ?></p>
        </div>
        <a href="duenos_list.php" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left"></i> Volver al Listado
        </a>
    </div>
    
    <?php if ($error): ?>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <?php echo htmlspecialchars($error); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    <?php endif; ?>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <form method="POST">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="nombres" class="form-label">Nombres *</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="nombres" 
                            name="nombres" 
                            required
                            value="<?php echo htmlspecialchars($dueno['nombres'] ?? $_POST['nombres'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-6">
                        <label for="apellidos" class="form-label">Apellidos *</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="apellidos" 
                            name="apellidos" 
                            required
                            value="<?php echo htmlspecialchars($dueno['apellidos'] ?? $_POST['apellidos'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-4">
                        <label for="tipoDocumento" class="form-label">Tipo de Documento *</label>
                        <select class="form-select" id="tipoDocumento" name="tipoDocumento" required>
                            <option value="DNI" <?php echo ($dueno['tipoDocumento'] ?? $_POST['tipoDocumento'] ?? '') === 'DNI' ? 'selected' : ''; ?>>DNI</option>
                            <option value="PASAPORTE" <?php echo ($dueno['tipoDocumento'] ?? $_POST['tipoDocumento'] ?? '') === 'PASAPORTE' ? 'selected' : ''; ?>>Pasaporte</option>
                            <option value="CE" <?php echo ($dueno['tipoDocumento'] ?? $_POST['tipoDocumento'] ?? '') === 'CE' ? 'selected' : ''; ?>>Carnet de Extranjería</option>
                        </select>
                    </div>
                    
                    <div class="col-md-4">
                        <label for="documento" class="form-label">Número de Documento *</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="documento" 
                            name="documento" 
                            required
                            value="<?php echo htmlspecialchars($dueno['documento'] ?? $_POST['documento'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-4">
                        <label for="genero" class="form-label">Género *</label>
                        <select class="form-select" id="genero" name="genero" required>
                            <option value="">Seleccione...</option>
                            <option value="M" <?php echo ($dueno['genero'] ?? $_POST['genero'] ?? '') === 'M' ? 'selected' : ''; ?>>Masculino</option>
                            <option value="F" <?php echo ($dueno['genero'] ?? $_POST['genero'] ?? '') === 'F' ? 'selected' : ''; ?>>Femenino</option>
                            <option value="O" <?php echo ($dueno['genero'] ?? $_POST['genero'] ?? '') === 'O' ? 'selected' : ''; ?>>Otro</option>
                        </select>
                    </div>
                    
                    <div class="col-md-6">
                        <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                        <input 
                            type="date" 
                            class="form-control" 
                            id="fechaNacimiento" 
                            name="fechaNacimiento"
                            value="<?php echo htmlspecialchars($dueno['fechaNacimiento'] ?? $_POST['fechaNacimiento'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email *</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            id="email" 
                            name="email" 
                            required
                            value="<?php echo htmlspecialchars($dueno['email'] ?? $_POST['email'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-12">
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="aceptaComunicaciones" 
                                name="aceptaComunicaciones"
                                <?php echo ($dueno['aceptaComunicaciones'] ?? $_POST['aceptaComunicaciones'] ?? false) ? 'checked' : ''; ?>
                            >
                            <label class="form-check-label" for="aceptaComunicaciones">
                                Acepta recibir comunicaciones y notificaciones
                            </label>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="aceptaTerminos" 
                                name="aceptaTerminos"
                                <?php echo ($dueno['aceptaTerminos'] ?? $_POST['aceptaTerminos'] ?? false) ? 'checked' : ''; ?>
                                required
                            >
                            <label class="form-check-label" for="aceptaTerminos">
                                Acepta los términos y condiciones *
                            </label>
                        </div>
                    </div>
                    
                    <div class="col-12 mt-4">
                        <button type="submit" class="btn btn-pet-primary me-2">
                            <i class="bi bi-<?php echo $isEdit ? 'save' : 'plus-circle'; ?>"></i>
                            <?php echo $isEdit ? 'Actualizar Dueño' : 'Crear Dueño'; ?>
                        </button>
                        <a href="duenos_list.php" class="btn btn-outline-secondary">
                            Cancelar
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include '../../partials/footer.php'; ?>
