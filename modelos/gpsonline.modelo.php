<?php

require_once "conexion.php";

class ModeloOnline {

    static public function mdlMostrarOnline($tabla) {

        $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY EQUIP_IDENT");
        $stmt -> execute();
        return $stmt -> fetchAll();
        $stmt -> close();
        $stmt = null;
    }
}
