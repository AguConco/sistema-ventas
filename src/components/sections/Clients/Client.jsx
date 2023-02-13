import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ClientContext } from "../../../context/ClientContext"

const Client = ({ data }) => {

    const { removeClient } = useContext(ClientContext)

    const [confirmed, setConfirmed] = useState(false)

    return (
        <tr className="client">
            <td><Link to={'/clientes/' + data.id}> <span>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</span> </Link></td>
            <td><Link to={'/clientes/' + data.id}>{data.transport.charAt(0).toUpperCase() + data.transport.slice(1) || '---'} </Link></td>
            <td><Link to={'/clientes/' + data.id}> 0 </Link></td>
            <td>
                <div>
                    <div onClick={() => setConfirmed(!confirmed)}><FontAwesomeIcon className='deleteIcon' icon={faTrash} size={'xs'} />
                        {confirmed &&
                            <div id='confirmedRemove'>
                                <h4>¿Quieres eliminar a <span>"{data.name}"</span>?</h4>
                                <button>Cancelar</button>
                                <button onClick={() => removeClient(data.id)}>Eliminar</button>
                            </div>
                        }
                        <span>Eliminar</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Client