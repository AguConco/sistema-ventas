import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const ProductOrder = ({ e, orderId }) => {

    const { removeProductToOrder, editQuantity } = useContext(OrdersContext)
    const [confirmed, setConfirmed] = useState(false)
    const [confirmedEditQuantity, setConfirmedEditQuantity] = useState(false)
    const [confirmedEditPrice, setConfirmedEditPrice] = useState(false)
    const [quantity, setQuantity] = useState(e.quantity)
    const [price, setPrice] = useState(e.price)
    const [availableQuantity, setAvailableQuantity] = useState()

    const validateForm = (e, id) => {
        e.preventDefault()
        editQuantity({ id, quantity, price }, setAvailableQuantity, false, orderId)
        setConfirmedEditQuantity(false)
        setConfirmedEditPrice(false)
    }

    return (
        <tr key={e.product_id}>
            <td>{e.code}</td>
            <td className="cellProduct" onDoubleClick={() => {
                setConfirmedEditQuantity(!confirmedEditQuantity)
                editQuantity(e.product_id, setAvailableQuantity, true)
            }}>
                {e.quantity}
                {confirmedEditQuantity &&
                    <form className="editQuantity" onSubmit={p => validateForm(p, e.product_id)}>
                        <input
                            type="number"
                            placeholder="Nueva cantidad"
                            max={availableQuantity}
                            min={1}
                            onKeyUp={e => setQuantity(e.target.value)}
                            required
                        />
                        <div>
                            <button onClick={() => setConfirmedEditQuantity(!confirmedEditQuantity)} type="button">Cancelar</button>
                            <button type="submit">Cambiar</button>
                        </div>
                    </form>
                }
                <span>Doble click para editar</span>
            </td>
            <td>
                <div>
                    <img src={e.picture} alt={e.name} />
                    <span>{e.name}</span>
                </div>
            </td>
            <td className="cellProduct" onDoubleClick={() => {
                setConfirmedEditPrice(!confirmedEditPrice)
            }}>
                ${e.price}
                {confirmedEditPrice &&
                    <form className="editQuantity" onSubmit={p => validateForm(p, e.product_id)}>
                        <input
                            type="number"
                            placeholder="Nuevo precio"
                            onKeyUp={e => setPrice(e.target.value)}
                            required
                        />
                        <div>
                            <button onClick={() => setConfirmedEditPrice(!confirmedEditPrice)} type="button">Cancelar</button>
                            <button type="submit">Cambiar</button>
                        </div>
                    </form>
                }
                <span>Doble click para editar</span>
            </td>
            <td>${e.quantity * e.price}</td>
            <td>
                <div>
                    <div onClick={() => setConfirmed(!confirmed)}><FontAwesomeIcon className='deleteIcon' icon={faTrash} size={'xs'} />
                        {confirmed &&
                            <div id='confirmedRemove'>
                                <h4>¿Quieres eliminar <span>"{e.name}"</span> del pedido?</h4>
                                <button>Cancelar</button>
                                <button onClick={() => removeProductToOrder({ productId: e.product_id, orderId })}>Eliminar</button>
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