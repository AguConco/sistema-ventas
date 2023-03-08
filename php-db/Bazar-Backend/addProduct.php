<?php
include './config.php';

if ($_POST) {
	$id = $_POST['id'];
	$code = $_POST['code'];
	$name = $_POST['name'];
	$pricePublic = $_POST['pricePublic'];
	$priceWholesaler = $_POST['priceWholesaler'];
	$discount = $_POST['discount'];
	$availableQuantity = $_POST['availableQuantity'];
	$categoryId = $_POST['categoryId'];
	$subcategory = $_POST['subcategory'];
	$mainFeatures = $_POST['mainFeatures'];
	$state = $_POST['state'];

	$productExist = "SELECT * FROM products WHERE id = '$id' or code = '$code'";
	$response = mysqli_query($connection_db, $productExist);
	$productQuantity = mysqli_num_rows($response);
	if ($productQuantity == 0) {

		$picture = addslashes(file_get_contents($_FILES['picture']['tmp_name']));
		$pictureType = $_FILES['picture']['type'];

		$addProduct = "INSERT INTO `products` 
			(`name`, `category_id`, `subcategory`, `available_quantity`, `id`, `code`, `main_features`, `price_public`, `price_wholesaler`, `discount`, `state`, `picture`, `picture_type`) VALUES 
			('$name', '$categoryId', '$subcategory', '$availableQuantity', '$id', '$code', '$mainFeatures', '$pricePublic', '$priceWholesaler', '$discount', '$state', '$picture', '$pictureType')";
		$verify = mysqli_query($connection_db, $addProduct);

		echo $verify;
	}

}

?>