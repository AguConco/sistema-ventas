import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const ProductOrder = ({ e }) => {

    const { removeProductToOrder, currentOrder, editQuantity } = useContext(OrdersContext)
    const [confirmed, setConfirmed] = useState(false)
    const [confirmedEdit, setConfirmedEdit] = useState(false)
    const [quantity, setQuantity] = useState()
    const [availableQuantity, setAvailableQuantity] = useState()

    const validateForm = (e, id) => {
        e.preventDefault()
        editQuantity({id,quantity}, setAvailableQuantity, false)
        setConfirmedEdit(false)
    }

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

                    <div onClick={() => editQuantity(e.product_id, setAvailableQuantity, true)}>
                        <div onClick={() => setConfirmedEdit(!confirmedEdit)} style={{ width: '100%' }}>
                            <FontAwesomeIcon icon={faEdit} className='editIcon' style={{ marginRight: '20%' }} />
                        </div>
                        {confirmedEdit &&
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
                                    <button onClick={() => setConfirmedEdit(!confirmedEdit)} type="button">Cancelar</button>
                                    <button type="submit">Cambiar</button>
                                </div>
                            </form>
                        }
                        <span>Editar cantidad</span>
                    </div>
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