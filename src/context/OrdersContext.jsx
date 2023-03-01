import { createContext, useState } from "react";
import $ from 'jquery'

export const OrdersContext = createContext()

const OrdersProvider = ({ children }) => {

    const [clientSelected, setClientSelected] = useState("")
    const [currentOrder, setCurrentOrder] = useState(undefined)
    const [pending, setPending] = useState([])
    const [searchResult,setSearchResult] = useState([])

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
        if(e.code.length === 1 || e.name.length === 1){
            fetch(`http://localhost:80/Bazar-Backend/searchProduct.php?name=${e.name}&code=${e.code}`)
            .then(e => e.json())
            .then(e => setSearchResult(e))
        }
    }

    const addProductToOrder = e => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/addProductOrder.php',
            type: 'POST',
            data: e,
            success: e => {
                    if (e) {
                        alert(e)
                    }
            }
        })
    }

    return <OrdersContext.Provider value={{
        clientSelected,
        currentOrder,
        pending,
        searchResult,
        setClientSelected,
        setCurrentOrder,
        newOrder,
        pendingOrders,
        searchProduct,
        addProductToOrder,
    }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider