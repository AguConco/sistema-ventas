import { createContext, useState } from "react";
import $ from 'jquery'

export const OrdersContext = createContext()

const OrdersProvider = ({ children }) => {

    const [clientSelected, setClientSelected] = useState("")
    const [currentOrder, setCurrentOrder] = useState(undefined)
    const [pending, setPending] = useState([])
    const [searchResult, setSearchResult] = useState(null)
    const [productsOrder, setproductsOrder] = useState({ products: [] })
    const [remit, setRemit] = useState(null)
    const [viewProductSearch, setViewProductSearch] = useState([])

    // const urlHost = 'https://panel-control-bazar.000webhostapp.com/backend/'
    const urlHost = 'http://localhost:80/Bazar-Backend/'

    const newOrder = (e, setModalVisible) => {
        $.ajax({
            url: `${urlHost}newOrder.php`,
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

        fetch(`${urlHost}pendingOrders.php`)
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
        fetch(`${urlHost}searchProduct.php?name=${name}&code=${code}`)
            .then(e => e.json())
            .then(e => {
                if (e?.response === 'error') {
                    setSearchResult(null)
                } else {
                    setSearchResult(e)
                    setViewProductSearch(e)
                }
            })
    }

    const addProductToOrder = (e, setSelectedProduct) => {
        $.ajax({
            url: `${urlHost}order.php`,
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
            url: `${urlHost}removeProductOrder.php`,
            type: 'POST',
            data: e,
            success: e => e && getProductsOrder(currentOrder.order_id)

        })
    }

    const getProductsOrder = e => {
        fetch(`${urlHost}order.php?orderId=${e}`)
            .then(e => e.json())
            .then(e => setproductsOrder(e))
    }

    const editQuantity = (data, setAvailableQuantity, state) => {
        if (state)
            fetch(`${urlHost}productDetail.php?id=${data}`)
                .then(e => e.json())
                .then(e => setAvailableQuantity(e[0].available_quantity))
        else
            $.ajax({
                url: `${urlHost}editQuantity.php`,
                type: 'POST',
                data: data,
                success: e => e && getProductsOrder(currentOrder.order_id)
            })
    }

    const generateRemit = e => {
        fetch(`${urlHost}generateRemit.php?orderId=${e}`)
            .then(e => e.json())
            .then(e => setRemit(e.pdf))
    }

    const cancelOrder = e => {
        $.ajax({
            url: `${urlHost}cancelOrder.php`,
            type: 'POST',
            data: e,
            success: e => e && setCurrentOrder(undefined)
        })
    }

    const confirmOrder = e => {
        $.ajax({
            url: `${urlHost}confirmOrder.php`,
            type: 'POST',
            data: e,
            success: () => {
                $.ajax({
                    url: `${urlHost}generateRemit.php`,
                    type: 'POST',
                    data: { orderId: currentOrder.order_id },
                    success: e => e && setCurrentOrder(undefined)
                })
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
        confirmOrder,
        setSearchResult
    }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider