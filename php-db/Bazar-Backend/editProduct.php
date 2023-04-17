<?php
include './config.php';

if ($_POST) {
	$id = $_POST['id'];
	$name = $_POST['name'];
	$pricePublic = $_POST['pricePublic'];
	$priceWholesaler = $_POST['priceWholesaler'];
	$discount = $_POST['discount'];
	$availableQuantity = $_POST['availableQuantity'];
	$mainFeatures = $_POST['mainFeatures'];
	$state = $_POST['state'];

	if ($_FILES) {
		$picture = addslashes(file_get_contents($_FILES['picture']['tmp_name']));
		$pictureType = $_FILES['picture']['type'];

		$editProduct = "UPDATE `products` SET
		`name`='$name',`available_quantity`='$availableQuantity',`main_features`='$mainFeatures',
		`price_public`='$pricePublic',`price_wholesaler`='$priceWholesaler',`discount`='$discount',
		`state`='$state' ,`picture`='$picture',`picture_type`='$pictureType'
		WHERE id = '$id'";

		$verify = mysqli_query($connection_db, $editProduct);

	} else {
		$editProduct = "UPDATE `products` SET
		`name`='$name',`available_quantity`='$availableQuantity',`main_features`='$mainFeatures',
		`price_public`='$pricePublic',`price_wholesaler`='$priceWholesaler',`discount`='$discount',
		`state`='$state'
		WHERE id = '$id'";

		$verify = mysqli_query($connection_db, $editProduct);
	}



	echo $verify;
}
?>