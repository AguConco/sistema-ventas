import { createContext, useState } from "react";
import $ from 'jquery'

export const ClientContext = createContext()

const ClientProvider = ({ children }) => {

    const [clientsList, setClientsList] = useState([])
    const [listState, setListState] = useState(false)
    const [historyClient, setHistoryClient] = useState([])

    const addClient = (e) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/client.php',
            type: 'POST',
            data: e,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
    }

    const removeClient = (e) => {
        fetch('http://localhost:80/Bazar-Backend/client.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e }),
        })
            .then(e => e.json())
            .then(e => e.response === 'success' && setListState(!listState))
    }

    const editClient = (e) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/editClient.php',
            type: 'POST',
            data: e,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
    }

    const getClients = (c, setLoading) => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/client.php?c=' + c)
            .then(e => e.json())
            .then(e => {
                setLoading(false)
                setClientsList(e)
            })
    }

    const orderCompleted = () => {
        fetch('http://localhost:80/Bazar-Backend/historyClient.php')
            .then(e => e.json())
            .then(e => setHistoryClient(e))
    }

    return <ClientContext.Provider value={{
        clientsList,
        listState,
        historyClient,
        addClient,
        getClients,
        removeClient,
        editClient,
        orderCompleted,
    }}>{children}</ClientContext.Provider>
}

export default ClientProvider