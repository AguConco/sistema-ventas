<?php
include './config.php';

if ($_POST) {
    $clientId = $_POST['clientId'];
    $orderId = $_POST['orderId'];
    $clientName = $_POST['client'];
    $state = $_POST['state'];

    $stateOrder = "SELECT * FROM orders WHERE state_order = '$state' and client_id = '$clientId'";
    $response = mysqli_query($connection_db, $stateOrder);
    $ordersQuantity = mysqli_num_rows($response);

    if ($ordersQuantity == 0) {

        $newOrder = "INSERT INTO `orders` 
			(`order_id`,`client`,`client_id`, `state_order`, `remit`) VALUES 
			('$orderId' ,'$clientName', '$clientId', '$state', 'null')";

        $verify = mysqli_query($connection_db, $newOrder);

        if ($verify) {
            $client = "SELECT * FROM clients WHERE id = '$clientId'";
            $response = mysqli_query($connection_db, $client);

            $json = array();
            while ($array = mysqli_fetch_array($response)) {
                $json[] = array(
                    'name' => $array['name'],
                    'id' => $array['id']
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    } else {
        echo null;
    }

}

?>