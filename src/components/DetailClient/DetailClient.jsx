import { faArrowAltCircleLeft, faEdit, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClientContext } from "../../context/ClientContext"
import OrdersHistory from "../OrdersHistory/OrdersHistory"
import './DetailClient.css'

const DetailClient = () => {

    const navigate = useNavigate()

    const { removeClient, clientsList, editClient } = useContext(ClientContext)

    const [confirmed, setConfirmed] = useState(false)
    const [edit, setEdit] = useState(false)

    const [detailClient, setdetailClient] = useState(clientsList[0])

    const [name, setName] = useState(detailClient.name)
    const [transport, setTransport] = useState(detailClient.transport)

    const cancelChange = () => {
        setEdit(false)
        setName(detailClient.name)
        setTransport(detailClient.transport)
    }

    const saveChange = () => {
        const newData = {
            name,
            transport,
            id: detailClient.id
        }
        if (edit) {
            editClient(newData)
            setdetailClient(newData)
        }
        setEdit(!edit)
    }

    return (
        <section className="sectionDetail">
            <div className='back' onClick={() => edit ? alert('Guarda los cambios antes de salir') : window.history.back()}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                <span>Volver para atras</span>
            </div>
            <div>
                {edit ?
                    <input className="nameClient" type="text" value={name.charAt(0).toUpperCase() + name.slice(1)} onChange={e => setName(e.target.value)} />
                    :
                    <h1 className="nameClient">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                }
                {edit ?
                    <div>
                        Transporte: <input className="transportClient" type="text" value={transport} onChange={e => setTransport(e.target.value)} />
                    </div>
                    :
                    <h4 className="transportClient">Transporte: <span>{transport || '---'}</span></h4>
                }
                <div className="options optionSectionClient">
                    {!edit ?
                        <button onClick={() => setEdit(!edit)}> <FontAwesomeIcon className='editIcon' icon={faEdit} /> Editar </button>
                        :
                        <div>
                            <button onClick={() => cancelChange()}> <FontAwesomeIcon className='deleteIcon' icon={faXmark} />Cancelar cambios</button>
                            <button onClick={() => saveChange()}> <FontAwesomeIcon className='saveIcon' icon={faFloppyDisk} />Guardar cambios</button>
                        </div>
                    }
                    <button onClick={() => setConfirmed(!confirmed)}><FontAwesomeIcon className='deleteIcon' icon={faTrash} />
                        Eliminar
                        {confirmed &&
                            <div id='confirmedRemove'>
                                <h4>¿Quieres eliminar <span>"{detailClient.name}"</span> de código <span>"{detailClient.code}"</span>?</h4>
                                <button>Cancelar</button>
                                <button onClick={() => {
                                    setdetailClient({})
                                    removeClient(detailClient.id)
                                    navigate('/clientes/all')
                                }}>Eliminar</button>
                            </div>
                        }
                    </button>
                </div>
            </div>
            <OrdersHistory client={{ name, transport, id: detailClient.id }} />
        </section>
    )
}
export default DetailClient