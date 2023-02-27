import './Orders.css'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import BtnNewOrder from './BtnNewOrder'
import Modal from '../../Modal/Modal'
import CreateOrder from './CreateOrder'
import { OrdersContext } from '../../../context/OrdersContext'
import Order from './Order'

const Orders = () => {

    const { setSectionCurrent } = useContext(NavigationContext)
    const { currentOrder, pendingOrders, pending } = useContext(OrdersContext)

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setSectionCurrent('pedidos')
        pendingOrders('')
    }, [])

    return (
        <section>
            <div className='headerSection headerSectionOrders'>
                {/* {currentOrder !== undefined ?
                    <div className='searcher'>
                        <input type="number" placeholder="Buscar por código" />
                        <input type="text" placeholder="Buscar por nombre" />
                    </div>
                    :
                } */}
                    <div>
                    </div>
                <div>
                    {pending.length !== 0 &&
                        <select onChange={e => pendingOrders(e.target.value)}>
                            <option value={undefined}>Pedidos pendientes</option>
                            {pending.map(e => <option key={e.id} value={e.client_id}>{e.client}</option>)}
                        </select>}
                    <BtnNewOrder setModalVisible={setModalVisible} />
                </div>
            </div>
            {currentOrder !== undefined && <Order />}
            {modalVisible &&
                <Modal setModalVisible={setModalVisible}>
                    <CreateOrder setModalVisible={setModalVisible} />
                </Modal>}
        </section>
    )
}

export default Orders