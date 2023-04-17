<?php
include './config.php';

if ($_POST) {
    $productId = $_POST['productId'];
    $orderId = $_POST['orderId'];
    $quantity = $_POST['quantity'];
    $subtotal = $_POST['subtotal'];
    $code = $_POST['code'];
    $price = $_POST['price'];
    $picture = $_POST['picture'];
    $name = $_POST['name'];

    $productExist = "SELECT * FROM products_order WHERE product_id = '$productId' and order_id = '$orderId'";
    $response = mysqli_query($connection_db, $productExist);
    $productQuantity = mysqli_num_rows($response);

    if ($productQuantity == 0) {
        $addProduct = "INSERT INTO `products_order` 
        (`name`, `picture`, `price`, `code`, `product_id`, `order_id`, `quantity`, `subtotal`) VALUES
        ('$name', '$picture', '$price', '$code', '$productId', '$orderId', '$quantity', '$subtotal')";

        $verify = mysqli_query($connection_db, $addProduct);
        echo $verify;
    } else {

        $updateProduct = "UPDATE `products_order` 
        SET `quantity` = '$quantity', `subtotal` = '$subtotal' 
        WHERE product_id = '$productId' and order_id = '$orderId'";

        $verify = mysqli_query($connection_db, $updateProduct);
        echo $verify;
    }

} else if ($_GET) {
    $orderId = $_GET['orderId'];

    $productsOrder = "SELECT * FROM products_order WHERE order_id = '$orderId'";
    $response = mysqli_query($connection_db, $productsOrder);

    $total = "SELECT SUM(subtotal) AS priceTotal FROM products_order WHERE order_id = '$orderId'";
    $result = mysqli_query($connection_db, $total);
    $sum = mysqli_fetch_assoc($result);
    $priceTotal = $sum['priceTotal'];

    $json = array();
    $products = array();

    while ($array = mysqli_fetch_array($response)) {
        $products[] = array(
            'product_id' => $array['product_id'],
            'name' => $array['name'],
            'price' => $array['price'],
            'code' => $array['code'],
            'picture' => $array['picture'],
            'quantity' => $array['quantity'],
            'subtotal' => $array['subtotal']
        );
    }

    $json += array('total' => $priceTotal);
    $json += array('products' => $products);

    $jsonstring = json_encode($json);
    echo $jsonstring;
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"),$delete);
        $productId = $delete['productId'];
        $orderId = $delete['orderId'];
    
        $remove = "DELETE FROM products_order WHERE product_id = '$productId' and order_id = '$orderId'";
        $verify = mysqli_query($connection_db, $remove);

        echo $verify;
    }
}
?>