import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const ProductOrder = ({ e }) => {

    const { removeProductToOrder, currentOrder } = useContext(OrdersContext)
    const [confirmed, setConfirmed] = useState(false)

    return (
        <tr key={e.product_id}>
            <td>{e.code}</td>
            <td>{e.quantity}</td>
            <td>
                <div>
                    <img src={e.picture} alt={e.name} />
                    <span >{e.name}</span>
                </div>
            </td>
            <td>${e.price}</td>
            <td>${e.quantity * e.price}</td>
            <td>
                <div>
                    <div onClick={() => setConfirmed(!confirmed)}><FontAwesomeIcon className='deleteIcon' icon={faTrash} size={'xs'} />
                        {confirmed &&
                            <div id='confirmedRemove'>
                                <h4>¿Quieres eliminar <span>"{e.name}"</span> del pedido?</h4>
                                <button>Cancelar</button>
                                <button onClick={() => removeProductToOrder({ productId: e.product_id, orderId: currentOrder.order_id })}>Eliminar</button>
                            </div>
                        }
                        <span>Eliminar</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ProductOrder