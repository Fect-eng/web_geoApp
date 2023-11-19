<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
  <!-- Left navbar links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
      <a href="inicio" class="nav-link">Inicio</a>
    </li>
    <li class="nav-item d-none d-sm-inline-block">
      <a href="#" class="nav-link">Contacto</a>
    </li>
  </ul>

  <!-- Right navbar links -->
  <ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown">
      <a class="nav-link" data-toggle="dropdown" href="#">
        <i class="far fa-user"></i> <?php echo $_SESSION["nombre"]; ?>
      </a>
      <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <a href="#" class="dropdown-item">
          <!-- Message Start -->
          <div class="media">
            <?php
              if($_SESSION["foto"] != ""){

                echo '<img src="'.$_SESSION["foto"].'" alt="User Avatar" class="img-size-50 mr-3 img-circle">';

              }else{
                echo '<img src="vistas/img/usuarios/default/anonymous.png" alt="User Avatar" class="img-size-50 mr-3 img-circle">';
              }

             ?>
            <div class="media-body">
              <h3 class="dropdown-item-title">
                <?php echo $_SESSION["nombre"]; ?>
                <span class="float-right text-sm text-success"><i class="fas fa-circle"></i></span>
              </h3>
              <p class="text-sm text-muted"><?php echo $_SESSION["perfil"]; ?></p>
            </div>
          </div>
          <!-- Message End -->
        </a>
        <div class="dropdown-divider"></div>
        <a href="salir" class="dropdown-item dropdown-footer">Cerrar Sesión</a>
      </div>
    </li>
  </ul>
</nav>
<!-- /.navbar -->
