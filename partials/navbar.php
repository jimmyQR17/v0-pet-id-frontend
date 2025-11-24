<?php
$user = getUser();
$currentPage = basename($_SERVER['PHP_SELF'], '.php');
$baseUrl = strpos($_SERVER['PHP_SELF'], '/views/') !== false ? '../../' : '';
?>

<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
    <div class="container-fluid">
        <a class="navbar-brand" href="<?php echo $baseUrl; ?>dashboard.php">
            <i class="bi bi-heart-fill text-danger"></i> PetID
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage === 'dashboard' ? 'active' : ''; ?>" href="<?php echo $baseUrl; ?>dashboard.php">
                        <i class="bi bi-speedometer2"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo strpos($currentPage, 'duenos') !== false ? 'active' : ''; ?>" href="<?php echo $baseUrl; ?>views/duenos/duenos_list.php">
                        <i class="bi bi-people-fill"></i> Dueños
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                        <i class="bi bi-hospital"></i> Clínicas
                    </a>
                </li>
            </ul>
            
            <div class="d-flex align-items-center gap-3">
                <span class="text-muted">
                    <i class="bi bi-person-circle"></i> <?php echo htmlspecialchars($user['username']); ?>
                </span>
                <a href="<?php echo $baseUrl; ?>logout.php" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-box-arrow-right"></i> Salir
                </a>
            </div>
        </div>
    </div>
</nav>
