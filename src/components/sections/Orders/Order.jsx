import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import Modal from "../../Modal/Modal"
import OptionsOrder from "./OptionsOrder"
import ProductOrder from "./ProductOrder"
import { useParams } from "react-router-dom"
import { generateId } from "../../../funtions/generateId"


const Order = () => {

    const { getProductsOrder, productsOrder, remit, addProductNotExist } = useContext(OrdersContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [name, setName] = useState()
    const { orderId } = useParams()

    const submitFormProductNotExist = (e) => {
        e.preventDefault()
        addProductNotExist({
            price,
            name,
            quantity,
            orderId,
            subtotal: price * quantity,
            id: generateId()
        })
        document.querySelectorAll('.addProductNotExist')[0].reset()
    }

    useEffect(() => {
        getProductsOrder(orderId)
    }, [orderId])

    return (
        <div className='detailOrder'>
            <div className='infoOrder' >
                <div>
                    <h4>Total: <span>${productsOrder.total}</span></h4>
                </div>
                <OptionsOrder setModalVisible={setModalVisible} orderId={orderId} />
            </div>
            <div className="containerTableOrder">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>p/unidad</th>
                            <th>subtotal</th>
                            <th>opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsOrder.products.map(e => (<ProductOrder key={e.id} e={e} orderId={orderId} />))}
                        {productsOrder.total !== null &&
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Precio total:</td>
                                <td>${productsOrder.total}</td>
                                <td></td>
                            </tr>}
                    </tbody>
                </table>
                {productsOrder.total === null &&
                    <div className="orderEmpty">
                        Todavía no se agregaron productos al pedido
                    </div>}
                <form className="addProductNotExist" onSubmit={e => submitFormProductNotExist(e)}>
                    <span>Agregar producto que no esta en el sistema</span>
                    <input type="text" onKeyUp={e => setName(e.target.value)} placeholder="Nombre producto" required/>
                    <input type="number" onKeyUp={e => setQuantity(e.target.value)} placeholder="Cantidad" required/>
                    <input type="number" onKeyUp={e => setPrice(e.target.value)} placeholder="Precio" required/>
                    <div>
                        <button type="submit">Agregar</button>
                    </div>
                </form>
            </div>
            {modalVisible && remit &&
                <Modal setModalVisible={setModalVisible} >
                    <iframe className="viewGenerateRemit" src={remit} type="application/pdf"></iframe>
                </Modal>
            }
        </div >
    )
}

export default Order

