<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'PetID - Sistema de Gestión de Mascotas'; ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <!-- Custom Styles -->
    <style>
        :root {
            --pet-primary: #145DA0;
            --pet-secondary: #16A085;
            --pet-accent: #FF9F43;
            --pet-bg: #F5F7FB;
        }
        
        body {
            background-color: var(--pet-bg);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--pet-primary) !important;
        }
        
        .btn-pet-primary {
            background-color: var(--pet-primary);
            border-color: var(--pet-primary);
            color: white;
        }
        
        .btn-pet-primary:hover {
            background-color: #0f4c7f;
            border-color: #0f4c7f;
            color: white;
        }
        
        .btn-pet-secondary {
            background-color: var(--pet-secondary);
            border-color: var(--pet-secondary);
            color: white;
        }
        
        .btn-pet-secondary:hover {
            background-color: #138f75;
            border-color: #138f75;
            color: white;
        }
        
        .card-stat {
            border-left: 4px solid var(--pet-primary);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card-stat:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .table-hover tbody tr:hover {
            background-color: rgba(20, 93, 160, 0.05);
        }
        
        .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--pet-primary) 0%, var(--pet-secondary) 100%);
        }
        
        .badge-custom-active {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .badge-custom-inactive {
            background-color: #f3f4f6;
            color: #6b7280;
        }
    </style>
</head>
<body>
