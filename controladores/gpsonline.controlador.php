<?php

class ControladorOnline {

static public function ctrMostrarOnline(){

$tabla = "PUC_CA_TIME_REAL";
$respuesta = ModeloOnline::mdlMostrarOnline($tabla);
return  $respuesta;
}
}
