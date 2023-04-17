<?php

    include './config.php';

    $id = $_POST['id'];

    if(!empty($id)){
        $remove = "DELETE FROM products WHERE id = '$id'";
        $verify = mysqli_query($connection_db,$remove);
        if($verify){
            echo 1;
        }else{
            echo 0;
        }
    }

?>