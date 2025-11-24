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
$pageTitle = 'PetID - Formulario de Mascota';
$error = '';
$isEdit = false;
$mascota = [];

// Verificar si es modo edición
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $isEdit = true;
    $idMascota = $_GET['id'];
    
    // Obtener datos de la mascota
    $response = apiGet('/Mascota/' . $idMascota);
    if ($response['success'] && isset($response['data'])) {
        $mascota = $response['data'];
    } else {
        $error = 'Error al cargar los datos de la mascota.';
    }
}

// Procesar el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'idDueno' => $idDueno,
        'especie' => $_POST['especie'] ?? '',
        'raza' => $_POST['raza'] ?? '',
        'codigoInterno' => $_POST['codigoInterno'] ?? '',
        'codigoMicrochip' => $_POST['codigoMicrochip'] ?? '',
        'nombre' => $_POST['nombre'] ?? '',
        'sexo' => $_POST['sexo'] ?? '',
        'fechaNacimiento' => !empty($_POST['fechaNacimiento']) ? $_POST['fechaNacimiento'] : null,
        'edadAproxMeses' => !empty($_POST['edadAproxMeses']) ? intval($_POST['edadAproxMeses']) : null,
        'color' => $_POST['color'] ?? '',
        'talla' => $_POST['talla'] ?? '',
        'pesoKg' => !empty($_POST['pesoKg']) ? floatval($_POST['pesoKg']) : null,
        'fotoUrl' => $_POST['fotoUrl'] ?? '',
        'castrado' => isset($_POST['castrado']),
        'alergias' => $_POST['alergias'] ?? '',
        'condicionesCronicas' => $_POST['condicionesCronicas'] ?? '',
        'notas' => $_POST['notas'] ?? ''
    ];
    
    if ($isEdit) {
        // Actualizar mascota existente
        $response = apiPut('/Mascota/' . $idMascota, $data);
        if ($response['success']) {
            header('Location: mascotas_por_dueno.php?idDueno=' . $idDueno . '&success=updated');
            exit;
        } else {
            $error = $response['data']['message'] ?? 'Error al actualizar la mascota.';
        }
    } else {
        // Crear nueva mascota
        $response = apiPost('/Mascota', $data);
        if ($response['success']) {
            header('Location: mascotas_por_dueno.php?idDueno=' . $idDueno . '&success=created');
            exit;
        } else {
            $error = $response['data']['message'] ?? 'Error al crear la mascota.';
        }
    }
}

include '../../partials/header.php';
include '../../partials/navbar.php';
?>

<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="fw-bold"><?php echo $isEdit ? 'Editar Mascota' : 'Nueva Mascota'; ?></h1>
            <p class="text-muted"><?php echo $isEdit ? 'Actualice los datos de la mascota' : 'Registre una nueva mascota'; ?></p>
        </div>
        <a href="mascotas_por_dueno.php?idDueno=<?php echo $idDueno; ?>" class="btn btn-outline-secondary">
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
                <input type="hidden" name="idDueno" value="<?php echo $idDueno; ?>">
                
                <!-- Información Básica -->
                <h5 class="text-primary mb-3"><i class="bi bi-info-circle"></i> Información Básica</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="nombre" class="form-label">Nombre *</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="nombre" 
                            name="nombre" 
                            required
                            value="<?php echo htmlspecialchars($mascota['nombre'] ?? $_POST['nombre'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-3">
                        <label for="especie" class="form-label">Especie *</label>
                        <select class="form-select" id="especie" name="especie" required>
                            <option value="">Seleccione...</option>
                            <option value="Perro" <?php echo ($mascota['especie'] ?? $_POST['especie'] ?? '') === 'Perro' ? 'selected' : ''; ?>>Perro</option>
                            <option value="Gato" <?php echo ($mascota['especie'] ?? $_POST['especie'] ?? '') === 'Gato' ? 'selected' : ''; ?>>Gato</option>
                            <option value="Ave" <?php echo ($mascota['especie'] ?? $_POST['especie'] ?? '') === 'Ave' ? 'selected' : ''; ?>>Ave</option>
                            <option value="Conejo" <?php echo ($mascota['especie'] ?? $_POST['especie'] ?? '') === 'Conejo' ? 'selected' : ''; ?>>Conejo</option>
                            <option value="Otro" <?php echo ($mascota['especie'] ?? $_POST['especie'] ?? '') === 'Otro' ? 'selected' : ''; ?>>Otro</option>
                        </select>
                    </div>
                    
                    <div class="col-md-3">
                        <label for="sexo" class="form-label">Sexo *</label>
                        <select class="form-select" id="sexo" name="sexo" required>
                            <option value="">Seleccione...</option>
                            <option value="M" <?php echo ($mascota['sexo'] ?? $_POST['sexo'] ?? '') === 'M' ? 'selected' : ''; ?>>Macho</option>
                            <option value="H" <?php echo ($mascota['sexo'] ?? $_POST['sexo'] ?? '') === 'H' ? 'selected' : ''; ?>>Hembra</option>
                        </select>
                    </div>
                    
                    <div class="col-md-12">
                        <label for="raza" class="form-label">Raza</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="raza" 
                            name="raza"
                            value="<?php echo htmlspecialchars($mascota['raza'] ?? $_POST['raza'] ?? ''); ?>"
                            placeholder="Ej: Labrador, Siamés, etc."
                        >
                    </div>
                </div>
                
                <!-- Identificación -->
                <h5 class="text-primary mb-3"><i class="bi bi-tag"></i> Identificación</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label for="codigoInterno" class="form-label">Código Interno</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="codigoInterno" 
                            name="codigoInterno"
                            value="<?php echo htmlspecialchars($mascota['codigoInterno'] ?? $_POST['codigoInterno'] ?? ''); ?>"
                            placeholder="Código único interno"
                        >
                    </div>
                    
                    <div class="col-md-6">
                        <label for="codigoMicrochip" class="form-label">Código de Microchip</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="codigoMicrochip" 
                            name="codigoMicrochip"
                            value="<?php echo htmlspecialchars($mascota['codigoMicrochip'] ?? $_POST['codigoMicrochip'] ?? ''); ?>"
                            placeholder="Número de microchip"
                        >
                    </div>
                </div>
                
                <!-- Características Físicas -->
                <h5 class="text-primary mb-3"><i class="bi bi-rulers"></i> Características Físicas</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <label for="color" class="form-label">Color</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="color" 
                            name="color"
                            value="<?php echo htmlspecialchars($mascota['color'] ?? $_POST['color'] ?? ''); ?>"
                            placeholder="Ej: Negro, Café, Blanco"
                        >
                    </div>
                    
                    <div class="col-md-4">
                        <label for="talla" class="form-label">Talla</label>
                        <select class="form-select" id="talla" name="talla">
                            <option value="">Seleccione...</option>
                            <option value="XS" <?php echo ($mascota['talla'] ?? $_POST['talla'] ?? '') === 'XS' ? 'selected' : ''; ?>>Extra Pequeño (XS)</option>
                            <option value="S" <?php echo ($mascota['talla'] ?? $_POST['talla'] ?? '') === 'S' ? 'selected' : ''; ?>>Pequeño (S)</option>
                            <option value="M" <?php echo ($mascota['talla'] ?? $_POST['talla'] ?? '') === 'M' ? 'selected' : ''; ?>>Mediano (M)</option>
                            <option value="L" <?php echo ($mascota['talla'] ?? $_POST['talla'] ?? '') === 'L' ? 'selected' : ''; ?>>Grande (L)</option>
                            <option value="XL" <?php echo ($mascota['talla'] ?? $_POST['talla'] ?? '') === 'XL' ? 'selected' : ''; ?>>Extra Grande (XL)</option>
                        </select>
                    </div>
                    
                    <div class="col-md-4">
                        <label for="pesoKg" class="form-label">Peso (kg)</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            id="pesoKg" 
                            name="pesoKg"
                            step="0.1"
                            min="0"
                            value="<?php echo htmlspecialchars($mascota['pesoKg'] ?? $_POST['pesoKg'] ?? ''); ?>"
                            placeholder="Ej: 5.5"
                        >
                    </div>
                    
                    <div class="col-md-6">
                        <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                        <input 
                            type="date" 
                            class="form-control" 
                            id="fechaNacimiento" 
                            name="fechaNacimiento"
                            value="<?php echo htmlspecialchars($mascota['fechaNacimiento'] ?? $_POST['fechaNacimiento'] ?? ''); ?>"
                        >
                    </div>
                    
                    <div class="col-md-6">
                        <label for="edadAproxMeses" class="form-label">Edad Aproximada (meses)</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            id="edadAproxMeses" 
                            name="edadAproxMeses"
                            min="0"
                            value="<?php echo htmlspecialchars($mascota['edadAproxMeses'] ?? $_POST['edadAproxMeses'] ?? ''); ?>"
                            placeholder="Ej: 24"
                        >
                    </div>
                    
                    <div class="col-12">
                        <label for="fotoUrl" class="form-label">URL de Foto</label>
                        <input 
                            type="url" 
                            class="form-control" 
                            id="fotoUrl" 
                            name="fotoUrl"
                            value="<?php echo htmlspecialchars($mascota['fotoUrl'] ?? $_POST['fotoUrl'] ?? ''); ?>"
                            placeholder="https://ejemplo.com/foto-mascota.jpg"
                        >
                    </div>
                </div>
                
                <!-- Información Médica -->
                <h5 class="text-primary mb-3"><i class="bi bi-heart-pulse"></i> Información Médica</h5>
                <div class="row g-3 mb-4">
                    <div class="col-12">
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="castrado" 
                                name="castrado"
                                <?php echo ($mascota['castrado'] ?? $_POST['castrado'] ?? false) ? 'checked' : ''; ?>
                            >
                            <label class="form-check-label" for="castrado">
                                ¿Está castrado/esterilizado?
                            </label>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <label for="alergias" class="form-label">Alergias</label>
                        <textarea 
                            class="form-control" 
                            id="alergias" 
                            name="alergias" 
                            rows="2"
                            placeholder="Describa cualquier alergia conocida..."
                        ><?php echo htmlspecialchars($mascota['alergias'] ?? $_POST['alergias'] ?? ''); ?></textarea>
                    </div>
                    
                    <div class="col-12">
                        <label for="condicionesCronicas" class="form-label">Condiciones Crónicas</label>
                        <textarea 
                            class="form-control" 
                            id="condicionesCronicas" 
                            name="condicionesCronicas" 
                            rows="2"
                            placeholder="Describa cualquier condición médica crónica..."
                        ><?php echo htmlspecialchars($mascota['condicionesCronicas'] ?? $_POST['condicionesCronicas'] ?? ''); ?></textarea>
                    </div>
                    
                    <div class="col-12">
                        <label for="notas" class="form-label">Notas Adicionales</label>
                        <textarea 
                            class="form-control" 
                            id="notas" 
                            name="notas" 
                            rows="2"
                            placeholder="Cualquier información adicional relevante..."
                        ><?php echo htmlspecialchars($mascota['notas'] ?? $_POST['notas'] ?? ''); ?></textarea>
                    </div>
                </div>
                
                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-pet-primary">
                        <i class="bi bi-<?php echo $isEdit ? 'save' : 'plus-circle'; ?>"></i>
                        <?php echo $isEdit ? 'Actualizar Mascota' : 'Crear Mascota'; ?>
                    </button>
                    <a href="mascotas_por_dueno.php?idDueno=<?php echo $idDueno; ?>" class="btn btn-outline-secondary">
                        Cancelar
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include '../../partials/footer.php'; ?>
