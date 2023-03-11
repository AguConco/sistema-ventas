import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const OptionsOrder = ({ setModalVisible }) => {

    const { currentOrder, generateRemit, cancelOrder, confirmOrder, productsOrder } = useContext(OrdersContext)

    const [confirmedCancelOrder, setConfirmedCancelOrder] = useState(false)
    const [confirmedConfirmOrder, setConfirmedConfirmOrder] = useState(false)

    return (
        <div>
            {productsOrder.total !== null &&
                <div>
                    <button onClick={() => {
                        setConfirmedConfirmOrder(!confirmedConfirmOrder)
                        setConfirmedCancelOrder(false)
                    }} className="confirmOrder">
                        Confirmar pedido
                    </button>
                    <button className="generateRemit" onClick={() => {
                        setModalVisible(true)
                        generateRemit(currentOrder.order_id)
                    }}>
                        Generear remito
                    </button>
                </div>
            }
            <button onClick={() => {
                setConfirmedCancelOrder(!confirmedCancelOrder)
                setConfirmedConfirmOrder(false)
            }} className="cancelOrder">
                Cancelar pedido
            </button>
            {confirmedCancelOrder &&
                <div className="confirmCancel">
                    <span>
                        ¿Quieres cancelar el pedido de {currentOrder.client}?
                        <br />
                        Al cancelarlo no hay forma de recuperarlo
                    </span>
                    <div>
                        <button onClick={() => setConfirmedCancelOrder(!confirmedCancelOrder)}>No</button>
                        <button onClick={() => cancelOrder({ orderId: currentOrder.order_id })}>Cancelar</button>
                    </div>
                </div>
            }
            {confirmedConfirmOrder &&
                <div className="confirmConfirm">
                    <span>¿Quieres confirmar el pedido de {currentOrder.client}?</span>
                    <div>
                        <button onClick={() => setConfirmedConfirmOrder(!confirmedConfirmOrder)}>No</button>
                        <button onClick={() => confirmOrder({ orderId: currentOrder.order_id })}>Confirmar</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default OptionsOrder