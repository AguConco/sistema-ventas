import { createContext, useState } from "react";
import $ from 'jquery'
import { urlHost } from "../constants/constants";

export const ClientContext = createContext()

const ClientProvider = ({ children }) => {

    const [clientsList, setClientsList] = useState([])
    const [listState, setListState] = useState(false)
    const [historyClient, setHistoryClient] = useState([])

    const addClient = (e) => {
        $.ajax({
            url: `${urlHost}client.php`,
            type: 'POST',
            data: e,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
    }

    const removeClient = (e) => {
        const clientId = new FormData()
        clientId.append('id', e)

        $.ajax({
            url: `${urlHost}removeClient.php`,              // a donde queres enviar la informacion
            type: 'POST',
            processData: false,
            contentType: false,               // como la queres mandar si POST, GET, PUT o DELETE
            data: clientId,      // la informacion que queres mandar
            success: e => {
                const { response } = JSON.parse(e)
                response === 'success' && setListState(!listState)
            }    //success
        }) // ajax
    }

    const editClient = (e) => {
        $.ajax({
            url: `${urlHost}editClient.php`,
            type: 'POST',
            data: e,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
    }

    const getClients = (c, setLoading) => {
        setLoading(true)
        fetch(`${urlHost}client.php?c=${c}`)
            .then(e => e.json())
            .then(e => {
                setLoading(false)
                setClientsList(e)
            })
    }

    const orderCompleted = () => {
        fetch(`${urlHost}historyClient.php`)
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