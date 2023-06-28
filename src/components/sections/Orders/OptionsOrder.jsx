import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const OptionsOrder = ({ setModalVisible, orderId }) => {

    const { generateRemit, cancelOrder, confirmOrder, productsOrder } = useContext(OrdersContext)

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
                        generateRemit(orderId)
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
                        ¿Quieres cancelar el pedido?
                        <br />
                        Al cancelarlo no hay forma de recuperarlo
                    </span>
                    <div>
                        <button onClick={() => setConfirmedCancelOrder(!confirmedCancelOrder)}>No</button>
                        <button onClick={() => cancelOrder({ orderId })}>Cancelar</button>
                    </div>
                </div>
            }
            {confirmedConfirmOrder &&
                <div className="confirmConfirm">
                    <span>¿Quieres confirmar el pedido?</span>
                    <div>
                        <button onClick={() => setConfirmedConfirmOrder(!confirmedConfirmOrder)}>No</button>
                        <button onClick={() => confirmOrder({ orderId })}>Confirmar</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default OptionsOrder