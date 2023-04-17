<?php

include './config.php';

$code = $_GET['code'];
$name = $_GET['name'];

if (!empty($_GET['code'])) {
    $productList = "SELECT * FROM products WHERE code LIKE '$code%'";

} else if (!empty($_GET['name'])) {
    $productList = "SELECT * FROM products WHERE name LIKE '%$name%'";
}

$response = mysqli_query($connection_db,$productList);

$json = array();
while ($array = mysqli_fetch_array($response)) {
    $json[] = array(
        'name' => $array['name'],
        'category' => array(
            'category_id' => $array['category_id'],
            # sin => es un array y con => es un objeto
            'subcategory' => $array['subcategory']
        ),
        'available_quantity' => $array['available_quantity'],
        'code' => $array['code'],
        'id' => $array['id'],
        'main_features' => $array['main_features'],
        'price' => array(
            'price_public' => $array['price_public'],
            'price_wholesaler' => $array['price_wholesaler'],
            'discount' => $array['discount']
        ),
        'state' => $array['state'],
        'picture' => 'data:' . $array['picture_type'] . ';base64,' . base64_encode($array['picture'])
    );

}

$jsonstring = json_encode($json);
echo $jsonstring;

?>