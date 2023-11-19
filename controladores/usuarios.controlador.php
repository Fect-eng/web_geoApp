<?php

/*//////////////////
Ingreso de Usuario
///////////////// */

class ControladorUsuarios {

  static public function ctrIngresoUsuario(){
       if(isset($_POST["ingUsuario"])){
         if(preg_match('/^[a-zA-z0-9]+$/', $_POST["ingUsuario"]) &&
            preg_match('/^[a-zA-z0-9]+$/', $_POST["ingPassword"])){

              $encriptar = crypt($_POST["ingPassword"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

              $tabla = "usuarios";
              $item = "usuario";
              $valor = $_POST["ingUsuario"];

              $respuesta = ModeloUsuarios::mdlMostrarUsuarios($tabla, $item, $valor);

              if($respuesta["usuario"] == $_POST["ingUsuario"] && $respuesta["password"] == $encriptar){

                if($respuesta["estado"] == 1){

                  $_SESSION["iniciarSesion"]= "ok";
                  $_SESSION["id"]     = $respuesta["id"];
                  $_SESSION["nombre"] = $respuesta["nombre"];
                  $_SESSION["usuario"]= $respuesta["usuario"];
                  $_SESSION["foto"]   = $respuesta["foto"];
                  $_SESSION["perfil"] = $respuesta["perfil"];

                  /*//////////////////
                  Ultimo Login Usuario
                  ///////////////// */

                  date_default_timezone_set('America/Lima');

                  $fecha = date('Y-m-d');
                  $hora = date('H:i:s');

                  $fechaActual = $fecha.' '.$hora;

                  $item1 = "ultimo_login";
                  $valor1 = $fechaActual;

                  $item2= "id";
                  $valor2 = $respuesta["id"];

                  $ultimoLogin = ModeloUsuarios::mdlActualizarUsuario($tabla, $item1, $valor1, $item2, $valor2);

                  if($ultimoLogin == "ok"){

                    echo '<script>window.location= "inicio";</script>';

                  }

                }else{

                  echo '<div class="alert alert-danger mt-2">El usuario no está activado.</div>';

                }

              }else{
                echo '<div class="alert alert-danger mt-2">El usuario o la contraseña es incorrecto.</div>';
              }
            }
       }
    }

/*////////////////////////
 Registro de Usuario
 //////////////////////*/

    static public function ctrCrearUsuario(){
        if(isset($_POST["nuevoUsuario"])){

            if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["nuevoNombre"]) &&
               preg_match('/^[a-zA-Z0-9]+$/', $_POST["nuevoUsuario"]) &&
               preg_match('/^[a-zA-Z0-9]+$/', $_POST["nuevoPassword"])){

                 /* ///////////////////
                 Validar Imagen
                 ///////////////////*/

                 $ruta = "";

                 if(isset($_FILES["nuevaFoto"]["tmp_name"])){
                   list($ancho, $alto) = getimagesize($_FILES["nuevaFoto"]["tmp_name"]);
                   $nuevoAncho= 500;
                   $nuevoAlto = 500;

                   /* //////////////////////////////////////////
                   crear directorio donde se guardara el avatar
                   //////////////////////////////////////////*/

                   $directorio = "vistas/img/usuarios/".$_POST["nuevoUsuario"];
                   mkdir($directorio, 0755);

                   /* //////////////////////////////////////////
                   Subir image a la carpeta
                   //////////////////////////////////////////*/

                   if($_FILES["nuevaFoto"]["type"] == "image/jpeg") {
                     $aleatorio = mt_rand(100,999);
                     $ruta = "vistas/img/usuarios/".$_POST["nuevoUsuario"]."/".$aleatorio.".jpg";
                     $origen =imagecreatefromjpeg($_FILES["nuevaFoto"]["tmp_name"]);
                     $destino = imagecreatetruecolor($nuevoAncho,$nuevoAlto);
                     imagecopyresized($destino,$origen,0,0,0,0,$nuevoAncho,$nuevoAlto,$ancho,$alto);
                     imagejpeg($destino, $ruta);
                   }

                   /*/////////// png ////////////*/

                   if($_FILES["nuevaFoto"]["type"] == "image/png") {
                     $aleatorio = mt_rand(100,999);
                     $ruta = "vistas/img/usuarios/".$_POST["nuevoUsuario"]."/".$aleatorio.".png";
                     $origen =imagecreatefrompng($_FILES["nuevaFoto"]["tmp_name"]);
                     $destino = imagecreatetruecolor($nuevoAncho,$nuevoAlto);
                     imagecopyresized($destino,$origen,0,0,0,0,$nuevoAncho,$nuevoAlto,$ancho,$alto);
                     imagepng($destino, $ruta);
                   }


                 }


                 $tabla = "usuarios";

                 $encriptar = crypt($_POST["nuevoPassword"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

                 $datos = array("nombre" => $_POST["nuevoNombre"],
                                "usuario" => $_POST["nuevoUsuario"],
                                "password" => $encriptar,
                                "perfil" => $_POST["nuevoPerfil"],
                                "foto" => $ruta);

                 $respuesta = ModeloUsuarios::mdlIngresarUsuario($tabla, $datos);

                 if($respuesta == "ok"){

                   echo '<script>
                        Swal.fire({
                          title: "¡El usuario ha sido guardado correctamente!",
                          icon: "success",
                          showConfirmButton: true,
                          confirmButtonText: "Cerrar",
                        }).then((result)=>{
                          if(result.value){
                            window.location="usuarios";
                          }
                        });
                        </script>';

                 }


               }else{
                 echo '<script>
                      Swal.fire({
                        title: "¡El usuario no puede ir vacío o llevar caracteres especiales!",
                        icon: "error",
                        showConfirmButton: true,
                        confirmButtonText: "Cerrar",
                      }).then((result)=>{
                        if(result.value){
                          window.location="usuarios";
                        }
                      });
                      </script>';
               }
            }
          }

          /*////////////////////////
           Mostrar Usuarios
           //////////////////////*/

        static public function ctrMostrarUsuarios($item,$valor){

          $tabla = "usuarios";
          $respuesta = ModeloUsuarios::mdlMostrarUsuarios($tabla, $item, $valor);
          return  $respuesta;
        }

        /*////////////////////////
         Editar Usuarios
         //////////////////////*/

         static public function ctrEditarUsuario(){

           if(isset($_POST["editarUsuario"])){

               if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["editarNombre"])) {

                 /* //////////////////////////////////////////
                 Editar Foto
                 //////////////////////////////////////////*/
                 $ruta = $_POST["fotoActual"];

                 if(isset($_FILES["editarFoto"]["tmp_name"]) && !empty($_FILES["editarFoto"]["tmp_name"])){

                   list($ancho, $alto) = getimagesize($_FILES["editarFoto"]["tmp_name"]);
                   $nuevoAncho= 500;
                   $nuevoAlto = 500;

                   /* //////////////////////////////////////////
                   crear directorio donde se guardara el avatar
                   //////////////////////////////////////////*/

                   $directorio = "vistas/img/usuarios/".$_POST["editarUsuario"];

                   /* //////////////////////////////////////////
                   Si existe una imagen en la base de datos
                   //////////////////////////////////////////*/

                   if(!empty($_POST["fotoActual"])){

                     unlink($_POST["fotoActual"]);

                   }else{

                     mkdir($directorio, 0755);

                   }

                   /* //////////////////////////////////////////
                   Subir image a la carpeta
                   //////////////////////////////////////////*/

                   if($_FILES["editarFoto"]["type"] == "image/jpeg") {
                     $aleatorio = mt_rand(100,999);
                     $ruta = "vistas/img/usuarios/".$_POST["editarUsuario"]."/".$aleatorio.".jpg";
                     $origen =imagecreatefromjpeg($_FILES["editarFoto"]["tmp_name"]);
                     $destino = imagecreatetruecolor($nuevoAncho,$nuevoAlto);
                     imagecopyresized($destino,$origen,0,0,0,0,$nuevoAncho,$nuevoAlto,$ancho,$alto);
                     imagejpeg($destino, $ruta);
                   }

                   /*/////////// png ////////////*/

                   if($_FILES["editarFoto"]["type"] == "image/png") {
                     $aleatorio = mt_rand(100,999);
                     $ruta = "vistas/img/usuarios/".$_POST["editarUsuario"]."/".$aleatorio.".png";
                     $origen =imagecreatefrompng($_FILES["editarFoto"]["tmp_name"]);
                     $destino = imagecreatetruecolor($nuevoAncho,$nuevoAlto);
                     imagecopyresized($destino,$origen,0,0,0,0,$nuevoAncho,$nuevoAlto,$ancho,$alto);
                     imagepng($destino, $ruta);
                   }


                 }

                 $tabla = "usuarios";

                 if($_POST["editarPassword"] != "") {

                   if(preg_match('/^[a-zA-Z0-9]+$/', $_POST["editarPassword"])){

                     $encriptar = crypt($_POST["nuevoPassword"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

                 }else{
                   echo '<script>
                        Swal.fire({
                          title: "¡El usuario no puede ir vacío o llevar caracteres especiales!",
                          icon: "error",
                          showConfirmButton: true,
                          confirmButtonText: "Cerrar",
                        }).then((result)=>{
                          if(result.value){
                            window.location="usuarios";
                          }
                        });
                        </script>';
                 }

               }else{
                 $encriptar = $_POST["passwordActual"];
               }

               $datos = array("nombre" => $_POST["editarNombre"],
                              "usuario" => $_POST["editarUsuario"],
                              "password" => $encriptar,
                              "perfil" => $_POST["editarPerfil"],
                              "foto" => $ruta);

               $respuesta = ModeloUsuarios::mdlEditarUsuario($tabla, $datos);

               if($respuesta == "ok"){

                 echo '<script>
                      Swal.fire({
                        title: "¡El usuario ha sido editado correctamente!",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Cerrar",
                      }).then((result)=>{
                        if(result.value){
                          window.location="usuarios";
                        }
                      });
                      </script>';

               }

             }else{

               echo '<script>
                    Swal.fire({
                      title: "¡El nombre no puede ir vacío o llevar caracteres especiales!",
                      icon: "error",
                      showConfirmButton: true,
                      confirmButtonText: "Cerrar",
                    }).then((result)=>{
                      if(result.value){
                        window.location="usuarios";
                      }
                    });
                    </script>';

             }
          }
        }

        /*////////////////////////
          Eliminar Usuarios
         //////////////////////*/

         static public function ctrBorrarUsuario(){

           if(isset($_GET["idUsuario"])){

             $tabla = "usuarios";
             $datos = $_GET["idUsuario"];

             if($_GET["fotoUsuario"] != ""){

               unlink($_GET["fotoUsuario"]);
               rmdir('vistas/img/usuarios/'.$_GET["usuario"]);
             }

             $respuesta = ModeloUsuarios::mdlBorrarUsuario($tabla, $datos);

             if($respuesta == "ok"){

               echo '<script>
                    Swal.fire({
                      title: "¡El usuario ha sido eliminado correctamente!",
                      icon: "success",
                      showConfirmButton: true,
                      confirmButtonText: "Cerrar",
                    }).then((result)=>{
                      if(result.value){
                        window.location="usuarios";
                      }
                    });
                    </script>';

             }
           }
         }

}
