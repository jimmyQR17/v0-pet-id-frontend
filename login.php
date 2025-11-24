<?php
require_once 'config.php';
require_once 'helpers/api_client.php';

// Si ya está logueado, redirigir a dashboard
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
$success = '';

// Procesar el formulario de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuarioLogin = $_POST['usuario'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (empty($usuarioLogin) || empty($password)) {
        $error = 'Por favor, ingrese usuario y contraseña.';
    } else {
        // Llamar a la API de autenticación
        $response = apiPost('/Auth/login', [
            'usuarioLogin' => $usuarioLogin,
            'password' => $password
        ], false);
        
        if ($response['success'] && isset($response['data']['token'])) {
            // Guardar token y datos del usuario en sesión
            $_SESSION['jwt'] = $response['data']['token'];
            $_SESSION['username'] = $response['data']['usuario'] ?? $usuarioLogin;
            $_SESSION['rol'] = $response['data']['rol'] ?? 'USER';
            $_SESSION['nombre'] = $response['data']['nombre'] ?? '';
            
            // Redirigir a dashboard
            header('Location: dashboard.php');
            exit;
        } else {
            // Mostrar error de la API
            $error = $response['data']['message'] ?? 'Credenciales incorrectas. Por favor, intente nuevamente.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetID - Iniciar Sesión</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <style>
        :root {
            --pet-primary: #145DA0;
            --pet-secondary: #16A085;
        }
        
        .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--pet-primary) 0%, var(--pet-secondary) 100%);
        }
        
        .login-card {
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .brand-icon {
            font-size: 3rem;
        }
    </style>
</head>
<body>
    <div class="login-container d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5 col-lg-4">
                    <div class="card login-card">
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <i class="bi bi-heart-fill text-danger brand-icon"></i>
                                <h2 class="fw-bold mt-2" style="color: var(--pet-primary);">PetID</h2>
                                <p class="text-muted">Sistema de Gestión de Mascotas</p>
                            </div>
                            
                            <?php if ($error): ?>
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <i class="bi bi-exclamation-triangle-fill"></i>
                                    <?php echo htmlspecialchars($error); ?>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                </div>
                            <?php endif; ?>
                            
                            <form method="POST" action="login.php">
                                <div class="mb-3">
                                    <label for="usuario" class="form-label">Usuario</label>
                                    <div class="input-group">
                                        <span class="input-group-text">
                                            <i class="bi bi-person"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            id="usuario" 
                                            name="usuario" 
                                            placeholder="Ingrese su usuario"
                                            required
                                            value="<?php echo htmlspecialchars($_POST['usuario'] ?? ''); ?>"
                                        >
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <label for="password" class="form-label">Contraseña</label>
                                    <div class="input-group">
                                        <span class="input-group-text">
                                            <i class="bi bi-lock"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            class="form-control" 
                                            id="password" 
                                            name="password" 
                                            placeholder="Ingrese su contraseña"
                                            required
                                        >
                                    </div>
                                </div>
                                
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-lg text-white" style="background-color: var(--pet-primary);">
                                        <i class="bi bi-box-arrow-in-right"></i> Ingresar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
