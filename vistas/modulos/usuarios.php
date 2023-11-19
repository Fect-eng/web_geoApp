<div class="content-wrapper">

  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Usuarios</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="inicio">Inicio</a></li>
            <li class="breadcrumb-item active">Usuarios</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="content">

    <!-- Default box -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Usuarios</h3>

        <div class="card-tools">
          <button class="btn btn-tool btn-sm" data-toggle="modal" data-target="#modalAgregarUsuario">
            <i class="fas fa-user-plus"></i></button>
        </div>
      </div>
      <div class="card-body">

        <table id="puc_table" class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Foto</th>
              <th>Area</th>
              <th>Estado</th>
              <th>Ultimo login</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>
            <?php
            $item= null;
            $valor= null;
            $i = 1;
            $usuarios = ControladorUsuarios::ctrMostrarUsuarios($item,$valor);

            foreach ($usuarios as $key => $value) {

              echo '<tr>
                      <td>'.$i.'</td>
                      <td>'.$value["nombre"].'</td>
                      <td>'.$value["usuario"].'</td>';

                        if($value["foto"] != ""){
                          echo '<td><img src="'.$value["foto"].'" class="img-thumbnail" width="40px" /></td>';
                        }else{

                          echo '<td><img src="vistas/img/usuarios/default/anonymous.png" class="img-thumbnail" width="40px" /></td>';
                        }

                echo '<td>'.$value["perfil"].'</td>';

                      if($value["estado"] != 0) {

                        echo '<td><button class="btn btn-block btn-success btn-sm btnActivar" idUsuario="'.$value["id"].'" estadoUsuario="0">Activado</button></td>';
                      }else{
                        echo '<td><button class="btn btn-block btn-danger btn-sm btnActivar" idUsuario="'.$value["id"].'" estadoUsuario="1">Desactivado</button></td>';
                      }


                  echo'<td>'.$value["ultimo_login"].'</td>
                      <td><button class="btn btn-info btn-sm btnEditarUsuario" idUsuario="'.$value["id"].'" data-toggle="modal" data-target="#modalEditarUsuario">
                              <i class="fas fa-pencil-alt">
                              </i>
                          </button>

                         <button class="btn btn-danger btn-sm btnEliminarUsuario" idUsuario="'.$value["id"].'" fotoUsuario="'.$value["foto"].'" usuario="'.$value["usuario"].'">
                              <i class="fas fa-trash">
                              </i>
                          </button>
                        </td>
                      </tr>';
            $i++;
            }
             ?>
          </tbody>

        </table>

      </div>

    </div>


  </section>

</div>


<!-- Modal Agregar Usuarios -->

<div class="modal fade" id="modalAgregarUsuario" tabindex="-1" role="dialog" aria-labelledby="modalAgregarUsuario" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form role="form" method="post" enctype="multipart/form-data">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAgregarUsuario">Agregar Usuario</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="box-body">

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-user"></i></span>
          </div>
          <input type="text" class="form-control" name="nuevoNombre" placeholder="Ingresar Nombre" required>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-key"></i></span>
          </div>
          <input type="text" class="form-control" id="nuevoUsuario" name="nuevoUsuario" placeholder="Ingresa Usuario" required>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" name="nuevoPassword" placeholder="Contraseña" required>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-users"></i></span>
          </div>
          <select class="form-control" name="nuevoPerfil">
            <option value="">Seleccionar Perfil</option>
            <option value="Administrador">Administrador</option>
            <option value="Mina">Mina</option>
            <option value="Planta">Planta</option>
            <option value="Geologia">Geología</option>
            <option value="Laboratorio">Laboratorio</option>
            <option value="Geotecnia">Geotecnia</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div class="media">
            <img src="vistas/img/usuarios/default/anonymous.png" alt="User Avatar" class="preview img-size-50 mr-3 img-circle">
            <div class="media-body">
              <h3 class="dropdown-item-title text-success font-weight-bold">Subir Imagen</h3>
              <p class="text-sm text-muted mb-0">Imagen por defecto</p>
              <p class="text-sm text-muted">Peso máximo de la imagen 2mb</p>
            </div>
          </div>
          <input type="file" class="form-control-file nuevaFoto" name="nuevaFoto">
        </div>
      </div>
      <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
      <?php

      $crearUsuario = new ControladorUsuarios();
      $crearUsuario -> ctrCrearUsuario();

      ?>
      </form>
    </div>
  </div>
</div>


<!-- Modal Editar Usuarios -->

<div class="modal fade" id="modalEditarUsuario" tabindex="-1" role="dialog" aria-labelledby="modalEditarUsuario" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form role="form" method="post" enctype="multipart/form-data">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditarUsuario">Editar Usuario</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="box-body">

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-user"></i></span>
          </div>
          <input type="text" class="form-control" id="editarNombre" name="editarNombre" value="" required>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-key"></i></span>
          </div>
          <input type="text" class="form-control" id="editarUsuario" name="editarUsuario" value="" readonly>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <input type="password" class="form-control" name="editarPassword" placeholder="Modificar contraseña">
          <input type="hidden" name="passwordActual" id="passwordActual">
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-users"></i></span>
          </div>
          <select class="form-control" name="editarPerfil">
            <option value="" id="editarPerfil"></option>
            <option value="Administrador">Administrador</option>
            <option value="Mina">Mina</option>
            <option value="Planta">Planta</option>
            <option value="Geologia">Geología</option>
            <option value="Laboratorio">Laboratorio</option>
            <option value="Geotecnia">Geotecnia</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div class="media">
            <img src="vistas/img/usuarios/default/anonymous.png" alt="User Avatar" class="previewEditar img-size-50 mr-3 img-circle">
            <div class="media-body">
              <h3 class="dropdown-item-title text-success font-weight-bold">Subir Imagen</h3>
              <p class="text-sm text-muted mb-0">Imagen por defecto</p>
              <p class="text-sm text-muted">Peso máximo de la imagen 2mb</p>
            </div>
          </div>
          <input type="file" class="form-control-file nuevaFoto" name="editarFoto">
          <input type="hidden" name="fotoActual" id="fotoActual">
        </div>
      </div>
      <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Editar Usuario</button>
      </div>

      <?php

      $editarUsuario = new ControladorUsuarios();
      $editarUsuario -> ctrEditarUsuario();

      ?>
      </form>
    </div>
  </div>
</div>

<?php

$borrarUsuario = new ControladorUsuarios();
$borrarUsuario -> ctrBorrarUsuario();

?>
