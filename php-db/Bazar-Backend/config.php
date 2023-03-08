<?php	
    $dominioPermitido = "http://localhost:3000";
    header("Access-Control-Allow-Origin: $dominioPermitido");
    header("Access-Control-Allow-Headers: content-type");
    header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

    $connection_db = mysqli_connect("localhost","root","","bazar_db");
    // $connection_db = mysqli_connect("localhost","id14488697_bazar_root","FKg*rak-e-vS9is(","id14488697_bazar_db");
?>