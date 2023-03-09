<?php
include './config.php';

$orderId = $_GET['orderId'];

$order = "SELECT * FROM products_order WHERE order_id = '$orderId'";
$response = mysqli_query($connection_db, $order);

$total = "SELECT SUM(subtotal) AS priceTotal FROM products_order WHERE order_id = '$orderId'";
$result = mysqli_query($connection_db, $total);
$sum = mysqli_fetch_assoc($result);
$priceTotal = $sum['priceTotal'];

$client = "SELECT client FROM orders WHERE order_id = '$orderId'";
$result = mysqli_query($connection_db, $client);
$c = mysqli_fetch_assoc($result);
$nameClient = $c['client'];

ob_start();

?>
<style>
    @font-face {
        font-family: "Poppins-Regular";
        src: url("./dompdf/vendor/dompdf/dompdf/lib/fonts/Poppins-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;

    }

    * {
        font-family: 'Poppins-Regular';
        padding: 0;
        margin: 0;
    }

    body {
        padding: 1cm;
    }

    thead {
        margin-bottom: 10px;
    }

    th {
        font-size: 15px;
        border-bottom: 1px solid #2b2b2b;
        padding: 5px 0;
        text-align: left;
        font-family: 'Poppins-Regular';

    }

    td {
        border-bottom: 1px solid #eee;
        padding: 5px 2px;
        font-size: 13px;
        font-family: 'Poppins-Regular';
    }

    .code,
    .quantity,
    .price,
    .subtotal {
        width: 2.50cm;
    }

    .product {
        width: 9cm;
    }

    h3 {
        margin: 0;
        text-transform: uppercase;
    }

    span {
        font-size: 14px;
        color: #575758;
    }

    div {
        padding-bottom: 20px;
    }

    h4 {
        text-align: center;
        padding: 10px;
        margin: .5cm 0 0 12cm;
        border-radius: 3px;
    }
</style>

<head>
    <title>Pedido de
        <?php echo $nameClient ?> -
        <?php echo $orderId ?>
    </title>
</head>
<div>
    <h3>
        <?php echo $nameClient ?>
    </h3>
    <span>Código del pedido:
        <?php echo $orderId ?>
    </span>
</div>
<table id="tabla-productos" cellspacing="0">
    <thead>
        <tr>
            <th class="code">CÓDIGO</th>
            <th class="quantity">CANTIDAD</th>
            <th class="product">PRODUCTO</th>
            <th class="price">P/UNIDAD</th>
            <th class="subtotal">SUBTOTAL</th>
        </tr>
    </thead>
    <tbody>
        <?php
        while ($array = mysqli_fetch_array($response)) {
            ?>
            <tr>
                <td>
                    <?php echo $array['code'] ?>
                </td>
                <td>
                    <?php echo $array['quantity'] ?>
                </td>
                <td>
                    <?php echo $array['name'] ?>
                </td>
                <td>
                    <?php echo '$ ' . $array['price'] ?>
                </td>
                <td>
                    <?php echo '$ ' . $array['subtotal'] ?>
                </td>
            </tr>
            <?php
            $namePDF = $array['order_id'] . '.pdf';
        }
        ?>
    </tbody>
</table>
<div>
    <h4>Precio total:
        <?php echo '$ 8' . $priceTotal ?>
    </h4>
</div>


<?php
$html = ob_get_clean();
// echo $html; 

require_once './dompdf/autoload.inc.php';
use Dompdf\Dompdf;

$dompdf = new Dompdf();

$options = $dompdf->getOptions();
$options->set(array('isRemoteEnabled' => true));
$options->set('defaultFont', 'Courier');
$dompdf->setOptions($options);

$dompdf->loadhtml($html);
$dompdf->setPaper('A4', 'portrait');

$dompdf->render();

// la funcion stream() creo que genera los binarios del pdf, ver si se puede guardar en mysql
// $dompdf->stream($namePDF, array("Attachment" => false)); // si se cambia el false a true se descarga el pdf solo

$output = $dompdf->output();

$json = array('pdf' => 'data:application/pdf;base64,' . base64_encode($output));

echo json_encode($json);

?>