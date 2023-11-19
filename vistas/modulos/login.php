<div class="login-box">
  <div class="login-logo">
    <a href="#"><b>Ciudad</b>Nueva</a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">

      <form method="post">
        <div class="input-group mb-3">
          <input type="text" name="ingUsuario" class="form-control" placeholder="Usuario" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" name="ingPassword" class="form-control" placeholder="Contraseña" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
          </div>
          <!-- /.col -->
        </div>

        <?php
        $login = new ControladorUsuarios();
        $login -> ctrIngresoUsuario();
        ?>

      </form>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
