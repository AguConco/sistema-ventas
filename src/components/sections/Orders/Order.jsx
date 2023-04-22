import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import Modal from "../../Modal/Modal"
import OptionsOrder from "./OptionsOrder"
import ProductOrder from "./ProductOrder"
import { filterSearch } from "../../../funtions/filterSearch"

const Order = () => {

    const {
        currentOrder,
        searchProduct,
        searchResult,
        addProductToOrder,
        getProductsOrder,
        productsOrder,
        remit,
        viewProductSearch,
        setViewProductSearch
    } = useContext(OrdersContext)

    const [quantity, setQuantity] = useState()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')

    const changeValueName = e => {
        const valueInputName = e.value.trim()
        const dataSearch = { code: '', name: valueInputName }
        searchProduct(dataSearch)
        setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))
    }

    const changeValueCode = e => {
        const valueInputCode = e.value.trim()
        const dataSearch = { code: valueInputCode, name: '' }
        searchProduct(dataSearch)
        setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))
    }

    const submitForm = e => {
        e.preventDefault()
        if (selectedProduct !== null && quantity >= 1) {
            addProductToOrder({
                productId: selectedProduct.id,
                name: selectedProduct.name,
                picture: selectedProduct.picture,
                price: selectedProduct.price.price_wholesaler,
                code: selectedProduct.code,
                orderId: currentOrder.order_id,
                quantity,
                subtotal: quantity * selectedProduct.price.price_wholesaler
            }, setSelectedProduct)
            setQuantity(0)
            document.querySelectorAll('.formSearch')[0].reset()
        }
    }

    useEffect(() => {
        currentOrder !== undefined && getProductsOrder(currentOrder.order_id)
    }, [currentOrder])

    return (
        <div className='detailOrder'>
            <form className="formSearch" onSubmit={e => submitForm(e)}>
                <input
                    type="text"
                    maxLength="10"
                    placeholder="Código"
                    onChange={({ target }) => {
                        setSelectedProduct(null)
                        setCode(target.value)
                        changeValueCode(target)
                    }}
                    value={selectedProduct !== null ? selectedProduct.code : code}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    min={1}
                    max={selectedProduct !== null ? selectedProduct.available_quantity : 0}
                    onChange={e => setQuantity(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nombre producto"
                    onChange={({ target }) => {
                        setSelectedProduct(null)
                        setName(target.value)
                        changeValueName(target)
                    }}
                    value={selectedProduct !== null ? selectedProduct.name : name}

                />
                <button type="submit">Agregar al pedido</button>
                <div className="containerResultSearch">
                    {viewProductSearch.map(e =>
                        <button
                            onClick={() => {
                                setViewProductSearch([])
                                setSelectedProduct(e)
                            }}
                            type="button"
                            className="resultSearch">
                            <img src={e.picture} />
                            <div>
                                <span> {e.code} <br /> {e.name} </span>
                            </div>
                        </button>
                    )}
                </div>
            </form>
            <div className='infoOrder' >
                <div>
                    <h4>Pedido para: <span>{currentOrder.client}</span></h4>
                    <h4>Total: <span>${productsOrder.total}</span></h4>
                </div>
                <OptionsOrder setModalVisible={setModalVisible} />
            </div>
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
                    {productsOrder.products.map(e => (<ProductOrder key={e.id} e={e} />))}
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
                </div>
            }
            {modalVisible && remit &&
                <Modal setModalVisible={setModalVisible} >
                    <object className="viewGenerateRemit" data={remit} type="application/pdf"></object>
                </Modal>
            }
        </div >
    )
}

export default Order

