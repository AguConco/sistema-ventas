import { createContext, useState } from "react";
import $ from 'jquery'

export const OrdersContext = createContext()

const OrdersProvider = ({ children }) => {

    const [clientSelected, setClientSelected] = useState("")
    const [currentOrder, setCurrentOrder] = useState(undefined)
    const [pending, setPending] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [productsOrder, setproductsOrder] = useState({ products: [] })
    const [remit, setRemit] = useState(null)

    const newOrder = (e, setModalVisible) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/newOrder.php',
            type: 'POST',
            data: e,
            success: e => {
                if (e) {
                    setModalVisible(false)
                    pendingOrders(JSON.parse(e)[0].id)
                }
            }
        })
    }

    const pendingOrders = e => {
        fetch(`http://localhost:80/Bazar-Backend/pendingOrders.php?c=${e}`)
            .then(e => e.json())
            .then(e => e.length > 1 ? setPending(e) : setCurrentOrder(e[0]))
    }

    const searchProduct = e => {
        if (e.code.length === 1 || e.name.length === 1) {
            // VER LA FORMA DE QUE NO ENVIE LA UNICA LETRA/NÚMERO QUE QUEDA CUANDO VOY BORRANDO
            fetch(`http://localhost:80/Bazar-Backend/searchProduct.php?name=${e.name}&code=${e.code}`)
                .then(e => e.json())
                .then(e => setSearchResult(e))
        }
    }

    const addProductToOrder = (e, setSelectedProduct) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/order.php',
            type: 'POST',
            data: e,
            success: e => {
                if (e) {
                    setSelectedProduct(null)
                    getProductsOrder(currentOrder.order_id)
                }
            }
        })
    }

    const removeProductToOrder = e => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/order.php',
            type: 'DELETE',
            data: e,
            success: e => e && getProductsOrder(currentOrder.order_id)

        })
    }

    const getProductsOrder = e => {
        fetch(`http://localhost:80/Bazar-Backend/order.php?orderId=${e}`)
            .then(e => e.json())
            .then(e => setproductsOrder(e))
    }

    const generateRemit = e => {
        fetch(`http://localhost:80/Bazar-Backend/generatePDF.php?orderId=${e}`)
            .then(e => e.json())
            .then(e => setRemit(e.pdf))
    }

    return <OrdersContext.Provider value={{
        clientSelected,
        currentOrder,
        pending,
        searchResult,
        productsOrder,
        remit,
        setClientSelected,
        setCurrentOrder,
        newOrder,
        pendingOrders,
        searchProduct,
        addProductToOrder,
        getProductsOrder,
        removeProductToOrder,
        generateRemit
    }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider