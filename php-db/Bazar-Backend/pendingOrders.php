<?php
    include './config.php';

    $order = "SELECT * FROM orders WHERE state_order = 'pending'";        
    $response = mysqli_query($connection_db, $order);

    $json = array();
    while ($array = mysqli_fetch_array($response)) {
        $json[] = array(
            'order_id' => $array['order_id'],
            'client_id' => $array['client_id'],
            'client' => $array['client']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>