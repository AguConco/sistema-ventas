import './OrdersHistory.css'

const OrdersHistory = ({ client }) => {
    return (
        <div className='sectionOrdersHistory'>
            <h2>Historial de pedidos</h2>
            <div className='ordersHistoryEmpty'>
                <p>Todavia no se realizó ningún pedido</p>
            </div>
        </div>
    )
}

export default OrdersHistory