<?php

    include './config.php';

    $categoryId = $_GET['categoryId'];

    if(!empty($_GET['subcategoryId'])){ 
        $subcategoryId = $_GET['subcategoryId'] == 'all' ? '' : $_GET['subcategoryId'];
    }else{
        $subcategoryId = '';
    }
    $categoryId != 'all' ?
    $category = "SELECT * FROM products WHERE category_id = '$categoryId' and subcategory LIKE '%$subcategoryId%'"  
    :
    $category = "SELECT * FROM products";
    $response = mysqli_query($connection_db,$category);

    $json = array();
    while($array = mysqli_fetch_array($response)){
        $json[] = array(
            'name' => $array['name'],
            'category' => array(
                'category_id' => $array['category_id'],
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
            'picture' =>   'data:'.$array['picture_type'].';base64,'.base64_encode($array['picture'])
        );
     }
    
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>