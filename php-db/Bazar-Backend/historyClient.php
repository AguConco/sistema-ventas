<?php 
    include './config.php';

    $order = "SELECT * FROM orders WHERE state_order = 'completed' ORDER BY `date` DESC";        
    $response = mysqli_query($connection_db, $order);
    $completedOrders = mysqli_num_rows($response);

    $json = array();

    while ($array = mysqli_fetch_array($response)) {
        $json[] = array(
            'order_id' => $array['order_id'],
            'client_id' => $array['client_id'],
            'client' => $array['client'],
            'date' => $array['date'],
            'remit' => $array['remit']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>