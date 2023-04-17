import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../../../context/ClientContext"
import DetailClient from "../../DetailClient/DetailClient"
import Loading from '../../Loading/Loading'
import BtnAddClient from "./BtnAddClient"
import Client from "./Client"


const ClientsList = ({ setModalVisible }) => {

    const { listState, clientsList, getClients } = useContext(ClientContext)
    const [loading, setLoading] = useState(true)
    const { clientsId } = useParams()

    useEffect(() => {
        getClients(clientsId, setLoading)
    }, [clientsId, listState])

    return (
        clientsList.length === 0 ?
            <div className='productListEmpty'>
                <p>¡No hay clientes registrados!</p>
                <BtnAddClient setModalVisible={setModalVisible} />
            </div>
            :
            !loading ?
                clientsId === 'all' ?
                    <table className="tableClients" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>pedidos</th>
                                <th>opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientsList.map(e => <Client key={e.id} data={e} />)}
                        </tbody>
                    </table>
                    :
                    <DetailClient />
                :
                <Loading />
    )
}

export default ClientsList