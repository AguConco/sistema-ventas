import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import Modal from "../../Modal/Modal"
import OptionsOrder from "./OptionsOrder"
import ProductOrder from "./ProductOrder"
import { useParams } from "react-router-dom"

const Order = () => {

    const { getProductsOrder, productsOrder, remit } = useContext(OrdersContext)
    const [modalVisible, setModalVisible] = useState(false)
    const { orderId } = useParams()

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
            </div>
            {productsOrder.total === null &&
                <div className="orderEmpty">
                    Todavía no se agregaron productos al pedido
                </div>
            }
            {modalVisible && remit &&
                <Modal setModalVisible={setModalVisible} >
                    <iframe className="viewGenerateRemit" src={remit} type="application/pdf"></iframe>
                </Modal>
            }
        </div >
    )
}

export default Order

