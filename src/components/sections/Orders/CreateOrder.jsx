import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../../context/ClientContext"
import { OrdersContext } from "../../../context/OrdersContext"
import { generateId } from "../../../funtions/generateId"
import { Link } from "react-router-dom"

const CreateOrder = ({ setModalVisible }) => {

    const { getClients, clientsList } = useContext(ClientContext)
    const { clientSelected, setClientSelected, newOrder } = useContext(OrdersContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClients('all', setLoading)
        setClientSelected("")
    }, [])

    return (
        <form className="formNewOrder" onSubmit={e => {
            e.preventDefault()
            clientSelected !== "" && newOrder({
                clientId: clientSelected.split('|')[0],
                state: 'pending',
                client: clientSelected.split('|')[1],
                orderId: generateId()
            }, setModalVisible)
        }}>
            <h3>Nuevo pedido para</h3>
            {!loading &&
                <select className="selectClient" onChange={e => {
                    e.target.value !== "" ?
                        setClientSelected(e.target.value)
                        :
                        setClientSelected("")
                }}>
                    <option value="">Selecciona un cliente</option>
                    {clientsList.lenght !== 0 &&
                        clientsList.map(e =>
                            <option key={e.id} value={e.id + '|' + e.name}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</option>
                        )
                    }
                </select>}
            <br />
            <button className="btnAdd">Empezar pedido</button>
        </form>
    )
}

export default CreateOrder