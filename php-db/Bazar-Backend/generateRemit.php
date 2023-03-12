<?php
include './config.php';
include './actionOrder.php';

if ($_POST)
    $orderId = $_POST['orderId'];
else if ($_GET)
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
        padding: 2px;
        font-size: 12px;
        font-family: 'Poppins-Regular';
    }

    tr:nth-last-child(1) td {
        border-bottom: none;
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

    .priceTotal {
        -webkit-text-stroke: 1px #000;
        font-size: 13px;
    }

    h3 {
        margin: 0;
        text-transform: uppercase;
        display: inline-block;
        width: 49%;
    }

    .infoOrder div {
        padding: 0;
    }

    .infoOrder div span {
        text-transform: none;
        color: #000;
        display: inline-block;
        width: 49%;
        text-align: right;
        margin-left: 1%;
    }

    span {
        font-size: 14px;
        color: #444;
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
<div class="infoOrder">
    <div>
        <h3>
            <?php echo $nameClient ?>
        </h3>
        <span>Fecha:
            <?php echo date('d/m/Y') ?>
        </span>
    </div>
    <span>Código del pedido:
        <?php echo $orderId ?>
    </span>
</div>
<table cellspacing="0">
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
<table cellspacing="0">
    <thead>
        <tr>
            <th class="code"></th>
            <th class="quantity"></th>
            <th class="product"></th>
            <th class="price"></th>
            <th class="subtotal"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Precio total:</td>
            <td class="priceTotal">
                <?php echo '$ ' . $priceTotal ?>
            </td>
        </tr>
    </tbody>
</table>


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

// si se ejecuta el archivo generateRemit.php por le navagador y se quiere mostrar el archivo pdf
// se hace la funcion stream()
// $dompdf->stream($namePDF, array("Attachment" => false)); // si se cambia el false a true se descarga el pdf solo

$output = $dompdf->output();

$base64pdf = 'data:application/pdf;base64,' . base64_encode($output);

$json = array('pdf' => $base64pdf);

if ($_POST) {
    $date = date("Y-m-d H:i:s");

    $updateOrder = "UPDATE orders SET `state_order` = 'completed', `date` = '$date', `remit` = '$base64pdf' WHERE order_id = '$orderId'";
    $verify = mysqli_query($connection_db, $updateOrder);

    if ($verify) {
        deleteProductsOrder($connection_db, $orderId);
    }

} else if ($_GET)
    echo json_encode($json);

?>