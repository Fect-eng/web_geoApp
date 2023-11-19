<?php

include_once "../controladores/gpsonline.controlador.php";
include_once "../modelos/gpsonline.modelo.php";

class DataOnline {

  public function mostrarOnline(){

    $gps = ControladorOnline::ctrMostrarOnline();

    $data=array();
    foreach($gps as $value) {
      $data[] = array('EQUIP_IDENT' => $value['EQUIP_IDENT'],
                          'EASTING' => $value['EASTING'],
                         'NORTHING' => $value['NORTHING'],
                        'ELEVATION' => $value['ELEVATION'],
                            'SPEED' => $value['SPEED'],
                            'Banco' => $value['Banco'],
                         'Poligono' => $value['Poligono'],
                          'Destino' => $value['Destino'],
                         'Cargador' => $value['Cargador'],
                    'Oper_Cargador' => $value['Oper_Cargador'],
                      'Oper_Camion' => $value['Oper_Camion'],
                           'Estado' => $value['DESCRIP'],
                               'id' => $value['id']);
    }
    echo json_encode($data);

  }

}

/* /////////////////////////
Activar datos
////////////////////////*/

$activaronline = new DataOnline();
$activaronline -> mostrarOnline();
