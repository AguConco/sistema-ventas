import { createContext, useState } from "react";
import $ from 'jquery'

export const ClientContext = createContext()

const ClientProvider = ({ children }) => {

    const [clientsList, setClientsList] = useState([])
    const [listState, setListState] = useState(false)

    const addClient = (e) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/addClient.php',
            type: 'POST',
            data: e,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
    }

    const removeClient = (e) => {
        $.ajax({
            url: 'http://localhost:80/Bazar-Backend/removeClient.php',
            type: 'POST',
            data: { id: e },      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }
        })
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
        fetch('http://localhost:80/Bazar-Backend/clients.php?c=' + c)
            .then(e => e.json())
            .then(e => {
                setLoading(false)
                setClientsList(e)
            })
    }

    return <ClientContext.Provider value={{
        clientsList,
        listState,
        addClient,
        getClients,
        removeClient,
        editClient,
    }}>{children}</ClientContext.Provider>
}

export default ClientProvider