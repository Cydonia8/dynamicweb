<?php
    require_once "config.php";
    //Cabeceras
	header('Content-Type: application/json');
	header("Access-Control-Allow-Origin: *");

    $conexion = new mysqli('localhost', 'root', '');
    $conexion->select_db($dbname);
    sleep(1);
    $consulta_total = $conexion->query("select count(*) total from $tablename");
    $fila = $consulta_total->fetch_array(MYSQLI_ASSOC);
    $total = $fila['total'];

    $limite_default = 3;//Arreglar problema con el límite al cambiar páginas
    // $consulta = $conexion->query("select * from $tablename");
    // while($fila = $consulta->fetch_array(MYSQLI_ASSOC)){
    //     $datos[] =
    // }
    $offset = $_REQUEST['offset'] ?? 0;
    $limite = $_REQUEST['limite'] ?? $limite_default;
    $datos = [];
    
    $sentencia = $conexion->query("select * from $tablename limit $offset, $limite");
    
    while($fila = $sentencia->fetch_array(MYSQLI_ASSOC)){
        $datos[] = $fila;
    }
    $info['total'] = $total;
    $info['datos'] = $datos;
    
    $patron_url = explode("?", $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])[0];
    
    //Determinamos el siguiente enlace
    // $offset_actualizado = $offset + $limite;

    // if($offset_actualizado < $total){
    //     $offset_siguiente = $offset_actualizado;
    //     if($offset_siguiente+$limite < $total){
    //         $nuevo_limite = $limite_default;
    //     }else{
    //         $nuevo_limite = $total - $offset_siguiente;
    //     }
    //     $info["next"] = $patron_url."?offset=$offset_siguiente&limite=$nuevo_limite";
    // }else{
    //     $info["next"] = "null";
    // }

    //Determinamos el enlace previo

    // $offset_actualizado = $offset - $limite;

    // if($offset_actualizado >= 0){
    //     $offset_previo = $offset_actualizado;
    //     if($offset_previo-$limite >= 0){
    //         $nuevo_limite = $limite_default;
    //     }else{
    //         $nuevo_limite = $limite_default;
    //         $offset_previo = 0;
    //     }
    //     $info["previous"] = $patron_url."?offset=$offset_previo&limite=$nuevo_limite";
    // }else{
    //     $info["previous"] = "null";
    // }

    $nuevo_offset=$offset+$limite;
    if($nuevo_offset<$total){
        $sig_offset=$nuevo_offset;
        if($nuevo_offset+$limite>$total){
            $sig_limite=$total-$nuevo_offset;
        }else{
            $sig_limite=$limite;
        }
        $info["next"]=$patron_url."?offset=$sig_offset&limite=$sig_limite";  
    
    }else{
        $info["next"]="null";
    }

    // echo $info["siguiente"];

    
    $nuevo_offset=$offset-$limite;

    if($offset==0){
        $info["previous"]="null";
    }else{
        if($nuevo_offset>0){
            $ant_limite=$limite_default;
            $nuevo_offset=$offset-$limite_default;
            $ant_offset=$nuevo_offset;
        }else{
            $ant_limite=$offset;
            $ant_offset=0;
        }
        $info["previous"]=$patron_url."?offset=$ant_offset&limite=$ant_limite";  
    }


    echo json_encode($info);
    
    

?>