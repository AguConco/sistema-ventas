import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"

const Order = () => {

    const {
        currentOrder,
        searchProduct,
        searchResult,
        addProductToOrder,
        getProductsOrder,
        productsOrder
    } = useContext(OrdersContext)

    const [quantity, setQuantity] = useState()
    const [selectedProduct, setSelectedProduct] = useState(null)

    const filterSearch = e => {
        for (let i = 0; i < searchResult.length; i++) {
            const nameProduct = searchResult[i].name.toLowerCase()
            if ((searchResult[i].code.includes(e) || nameProduct.includes(e.toLowerCase())) && searchResult[i].available_quantity !== '0') {
                setSelectedProduct(searchResult[i])
                break
            } else setSelectedProduct(null)
        }
    }

    const changeValueName = e => {
        const valueInputName = e.value
        valueInputName.length !== 0 ? filterSearch(valueInputName) : setSelectedProduct(null)

        searchProduct({ code: '', name: valueInputName })
    }

    const changeValueCode = e => {
        const valueInputCode = e.value
        valueInputCode.length !== 0 ? filterSearch(valueInputCode) : setSelectedProduct(null)

        searchProduct({ code: valueInputCode, name: '' })
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
                    maxLength="5"
                    placeholder="Código"
                    onKeyUp={e => changeValueCode(e.target)}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    min={1}
                    max={selectedProduct !== null ? selectedProduct.available_quantity : 0}
                    onChange={e => setQuantity(e.target.value)} />
                <input
                    type="text"
                    placeholder="Nombre producto"
                    onKeyUp={e => changeValueName(e.target)}
                />
                <button type="submit">Agregar al pedido</button>
            </form>
            <h4>Pedido para: <span>{currentOrder.client}</span></h4>
            <h4>Total: <span>$00</span></h4>
            <table cellSpacing={0}>
                <thead>
                    {selectedProduct !== null &&
                        <tr className="trFilter">
                            <td>{selectedProduct.code}</td>
                            <td>{quantity}</td>
                            <td>
                                <div>
                                    <img src={selectedProduct.picture} alt={selectedProduct.name} />
                                    <span>{selectedProduct.name}</span>
                                </div>
                            </td>
                            <td>${selectedProduct.price.price_wholesaler}</td>
                            <td>${quantity * selectedProduct.price.price_wholesaler}</td>
                        </tr>}
                    <tr>
                        <th>Código</th>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>p/unidad</th>
                        <th>subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {productsOrder.map(e => (
                        <tr>
                            <td>{e.code}</td>
                            <td>{e.quantity}</td>
                            <td>
                                <div>
                                    <img src={e.picture} alt={e.name} />
                                    <span>{e.name}</span>
                                </div>
                            </td>
                            <td>${e.price}</td>
                            <td>${e.quantity * e.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Order

