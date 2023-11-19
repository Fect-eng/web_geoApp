/* /////////////////////////
Js Subir Avatar del Usuario
////////////////////////*/

$(".nuevaFoto").change(function(){
  var imagen = this.files[0];

  if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png") {
    $(".nuevaFoto").val("");
    Swal.fire({
      title: "¡Error al subir la imagen!",
      text: "la imagen debe estar en formato JPG o PNG",
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
    });
  }else if(imagen["size"] > 2000000) {
    $(".nuevaFoto").val("");
    Swal.fire({
      title: "¡Error al subir la imagen!",
      text: "la imagen no debe pesar más de 2MB",
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
    });
  }else{
    var datosImagen= new FileReader;
    datosImagen.readAsDataURL(imagen);

    $(datosImagen).on("load", function(event){
      var rutaImagen = event.target.result;

      $(".preview").attr("src", rutaImagen);
    })
  }
});

/* /////////////////////////
Js Editar Usuario
////////////////////////*/

$(document).on("click", ".btnEditarUsuario", function(){

  var idUsuario = $(this).attr("idUsuario");

  var datos = new FormData();
  datos.append("idUsuario", idUsuario);

  $.ajax({
    url: "ajax/usuarios.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function(respuesta){

      $("#editarNombre").val(respuesta["nombre"]);
      $("#editarUsuario").val(respuesta["usuario"]);
      $("#editarPerfil").html(respuesta["perfil"]);
      $("#editarPerfil").val(respuesta["perfil"]);
      $("#passwordActual").val(respuesta["password"]);
      $("#fotoActual").val(respuesta["foto"]);

      if(respuesta["foto"] != ""){
      $(".previewEditar").attr("src", respuesta["foto"]);
    }else{
      $(".previewEditar").attr("src", "vistas/img/usuarios/default/anonymous.png");
    }
    }
  })
})

/* /////////////////////////
Boton Activar Usuario
////////////////////////*/

$(document).on("click", ".btnActivar", function(){

  var idUsuario = $(this).attr("idUsuario");
  var estadoUsuario = $(this).attr("estadoUsuario");

  var datos = new FormData();

  datos.append("activarId", idUsuario);
  datos.append("activarUsuario", estadoUsuario);

  $.ajax({
    url: "ajax/usuarios.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    success: function(respuesta) {
      if(window.matchMedia("(max-width:767px)").matches){

        Swal.fire({
          title: "¡El usuario ha sido actualizado!",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Cerrar",
        }).then((result)=>{
          if(result.value){
            window.location="usuarios";
          }
        });

      }

    }
  })

if(estadoUsuario == 0) {

  $(this).removeClass('btn-success');
  $(this).addClass('btn-danger');
  $(this).html('Desactivado');
  $(this).attr('estadoUsuario',1);

}else {
  $(this).addClass('btn-success');
  $(this).removeClass('btn-danger');
  $(this).html('Activado');
  $(this).attr('estadoUsuario',0);
}
});

/* /////////////////////////
Si existe el Usuario
////////////////////////*/

$("#nuevoUsuario").change(function(){

  $(".alert").remove();

  var usuario = $(this).val();

  var datos = new FormData();
  datos.append("validarUsuario", usuario);

  $.ajax({
    url: "ajax/usuarios.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function(respuesta) {
      if(respuesta) {
        $("#nuevoUsuario").parent().after('<div class="alert alert-danger mt-3">¡El usuario ya existe!, ingrese uno diferente.</div>');
        $("nuevoUsuario").val("");
      }
    }
  })
});

/* /////////////////////////
Eliminar Usuario
////////////////////////*/

$(document).on("click",".btnEliminarUsuario", function(){

var idUsuario = $(this).attr("idUsuario");
var fotoUsuario = $(this).attr("fotoUsuario");
var usuario = $(this).attr("usuario");


  Swal.fire({
    title: "¿Está seguro de eliminar el usuario?",
    text: "¡Si no lo está puede cancelar la acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar usuario!'
  }).then((result)=>{
    if(result.value){
      window.location= "index.php?ruta=usuarios&idUsuario="+idUsuario+"&usuario="+usuario+"&fotoUsuario="+fotoUsuario;
    }
  });

})
