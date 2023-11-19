<?php

class Conexion {

  static public function conectar(){

          
          //$link = new PDO("sqlsrv:Server=SVPUCAVOCA;Database=Pucamarca", "sa", "W3nc02019*");
          /*MySql*/
          $link = new PDO("mysql:host=localhost;dbname=city_nueva","root","");

          $link->exec("set names utf8");

          return($link);
    }


}
