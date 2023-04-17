<?php
include './config.php';

if ($_POST) {
    $id = $_POST['id'];
    $name = $_POST['name'];

    $editClient = "UPDATE `clients` SET `name`='$name' WHERE id = '$id'";
    $verify = mysqli_query($connection_db, $editClient);

    echo $verify;
}
?>