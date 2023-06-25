import './Clients.css'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../Modal/Modal'
import AddClient from './add/addClient'
import ClientsList from './ClientsList'
import BtnAddClient from './BtnAddClient'
import { useParams } from 'react-router-dom'

const ClientsSection = () => {

    const { setSectionCurrent } = useContext(NavigationContext)

    const [modalVisible, setModalVisible] = useState(false)

    const { clientsId } = useParams()

    useEffect(() => {
        setSectionCurrent('clientes')
    }, [])

    return (
        <section>
            {clientsId === 'all' &&
            <div className='headerSection headerSectionClients'>
                <div>
                    <FontAwesomeIcon icon={faSearch} />
                    <BtnAddClient setModalVisible={setModalVisible} />
                </div>
            </div>}
            <div className='containerTableClient'>
                <ClientsList setModalVisible={setModalVisible} />
            </div>
            {modalVisible &&
                <Modal setModalVisible={setModalVisible}>
                    <AddClient />
                </Modal>}
        </section>
    )
}

export default ClientsSection