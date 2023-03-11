<?php
include './config.php';

if ($_POST) {
    $orderId = $_POST['orderId'];

    $products = "SELECT * FROM products_order WHERE order_id = '$orderId'";
    $response = mysqli_query($connection_db, $products);

    $json = array();
    while ($array = mysqli_fetch_array($response)) {
        $json[] = array(
            'quantity' => $array['quantity'],
            'product_id' => $array['product_id']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
}
?>