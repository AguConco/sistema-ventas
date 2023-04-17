<?php
include './config.php';

if ($_POST) {
    $id = $_POST['id'];
    $quantity = $_POST['quantity'];

    $price = "SELECT price FROM products_order WHERE product_id = '$id'";
    $result = mysqli_query($connection_db, $price);
    $p = mysqli_fetch_assoc($result);
    $subtotal = $p['price'] * $quantity;

    $editQuantity = "UPDATE products_order SET `quantity` = '$quantity', `subtotal` = '$subtotal' WHERE product_id = '$id'";
    $verify = mysqli_query($connection_db, $editQuantity);

    echo $verify;
}
?>