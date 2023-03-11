<?php
include './config.php';

if ($_POST) {
    $id = $_POST['generateId'];
    $name = $_POST['name'];

    $addClient = "INSERT INTO `clients` (`name`, `id`) VALUES ('$name', '$id')";
    $verify = mysqli_query($connection_db, $addClient);

    echo $verify;
} else if ($_GET) {
    $clientId = $_GET['c'];

    $clientId != 'all' ?
        $client = "SELECT * FROM clients WHERE id = '$clientId'"
        :
        $client = "SELECT * FROM clients";

    $response = mysqli_query($connection_db, $client);

    $json = array();
    while ($array = mysqli_fetch_array($response)) {

        $id = $array['id'];

        $order = "SELECT * FROM orders WHERE state_order = 'completed' and client_id = '$id'";
        $r = mysqli_query($connection_db, $order);
        $completedOrders = mysqli_num_rows($r);

        $json[] = array(
            'name' => $array['name'],
            'id' => $array['id'],
            'completedOrders' => $completedOrders
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"), $clientId);
        $id = $clientId['id'];

        $remove = "DELETE FROM clients WHERE id = '$id'";
        $verify = mysqli_query($connection_db, $remove);
        if ($verify) {
            $remove = "DELETE FROM orders WHERE client_id = '$id'";
            $verify = mysqli_query($connection_db, $remove);
            if ($verify)
                echo 1;
        } else {
            echo 0;
        }
    }
}
?>