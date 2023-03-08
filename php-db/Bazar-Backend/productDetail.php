<?php

    include './config.php';

    $id = $_GET['id'];

    $product = "SELECT * FROM products WHERE id = '$id'";
    $response = mysqli_query($connection_db,$product);

    $json = array();
    while($array = mysqli_fetch_array($response)){
        $json[] = array(
            'name' => $array['name'],
            'code' => $array['code'],
            'category' => array(
                'category_id' => $array['category_id'],# sin => es un array y con => es un objeto
                'subcategory' => $array['subcategory']            
            ),
            'available_quantity' => $array['available_quantity'],
            'id' => $array['id'],
            'main_features' => $array['main_features'],
            'price' => array(
                'price_public' => $array['price_public'],
                'price_wholesaler' => $array['price_wholesaler'],
                'discount' => $array['discount']
            ),
            'state' => $array['state'],
            'picture' => 'data:'.$array['picture_type'].';base64,'.base64_encode($array['picture'])

        );

     }
    
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>