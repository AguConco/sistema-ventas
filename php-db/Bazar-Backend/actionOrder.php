<?php
include './config.php';

if ($_POST) {
    $productId = $_POST['product_id'];
    $quantity = $_POST['quantity'];

    $productUpdate = "SELECT available_quantity FROM products WHERE id = '$productId'";
    $response = mysqli_query($connection_db, $productUpdate);
    $c = mysqli_fetch_assoc($response);
    $availableQuantity = $c['available_quantity'];

    $currentAmount = $availableQuantity - $quantity;

    $updateAvailableQuantity = "UPDATE products SET available_quantity = '$currentAmount' WHERE id = '$productId'";
    $verify = mysqli_query($connection_db, $updateAvailableQuantity);
    echo $verify;


} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $orderId);
    $id = $orderId['orderId'];

    $remove = "DELETE FROM orders WHERE order_id = '$id'";
    $verify = mysqli_query($connection_db, $remove);
    if ($verify) {
        deleteProductsOrder($connection_db, $id);
    } else {
        echo 0;
    }
}

function deleteProductsOrder($connection_db, $id)
{
    $remove = "DELETE FROM products_order WHERE order_id = '$id'";
    $verify = mysqli_query($connection_db, $remove);
    if ($verify)
        echo 1;
}

?>