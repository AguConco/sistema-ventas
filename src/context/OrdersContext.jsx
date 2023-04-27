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
    const [viewProductSearch, setViewProductSearch] = useState([])


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

    const pendingOrders = id => {
        if (id === undefined) {
            setCurrentOrder(undefined)
            return
        }

        fetch(`http://localhost:80/Bazar-Backend/pendingOrders.php`)
            .then(e => e.json())
            .then(e => {
                setPending(e)
                for (const p of e) {
                    if (p.client_id === id) {
                        setCurrentOrder(p)
                        return
                    }
                }
            })
    }

    const searchProduct = ({ code, name }) => {
        if (code.length === 1 || name.length === 1) {
            fetch(`http://localhost:80/Bazar-Backend/searchProduct.php?name=${name}&code=${code}`)
                .then(e => e.json())
                .then(e => {
                    setSearchResult(e)
                    setViewProductSearch(e)
                })
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

    const editQuantity = (data, setAvailableQuantity, state) => {
        if (state)
            fetch('http://localhost:80/Bazar-Backend/productDetail.php?id=' + data)
                .then(e => e.json())
                .then(e => setAvailableQuantity(e[0].available_quantity))
        else
            $.ajax({
                url: 'http://localhost:80/Bazar-Backend/editQuantity.php',
                type: 'POST',
                data: data,
                success: e => e && getProductsOrder(currentOrder.order_id)
            })
    }

    const generateRemit = e => {
        fetch(`http://localhost:80/Bazar-Backend/generateRemit.php?orderId=${e}`)
            .then(e => e.json())
            .then(e => setRemit(e.pdf))
    }

    const cancelOrder = e => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/actionOrder.php',
            type: 'DELETE',
            data: e,
            success: e => e && setCurrentOrder(undefined)
        })
    }

    const confirmOrder = e => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/getProductOrder.php',
            type: 'POST',
            data: e,
            success: e => {
                const productsOrderUpdate = JSON.parse(e)

                for (let i = 0; i < productsOrderUpdate.length; i++) {
                    $.ajax({
                        url: 'http://localhost:80/Bazar-Backend/actionOrder.php',
                        type: 'POST',
                        data: productsOrderUpdate[i],
                        success: e => {
                            productsOrderUpdate.length === (i + 1) &&
                                $.ajax({
                                    url: 'http://localhost:80/Bazar-Backend/generateRemit.php',
                                    type: 'POST',
                                    data: { orderId: currentOrder.order_id },
                                    success: e => e && setCurrentOrder(undefined)
                                })
                        }
                    })
                }
            }
        })

    }

    return <OrdersContext.Provider value={{
        clientSelected,
        currentOrder,
        pending,
        searchResult,
        productsOrder,
        remit,
        viewProductSearch,
        setViewProductSearch,
        setClientSelected,
        setCurrentOrder,
        newOrder,
        pendingOrders,
        searchProduct,
        addProductToOrder,
        getProductsOrder,
        removeProductToOrder,
        generateRemit,
        editQuantity,
        cancelOrder,
        confirmOrder
    }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider