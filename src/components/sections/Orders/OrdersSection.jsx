import './Orders.css'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import BtnNewOrder from './BtnNewOrder'
import Modal from '../../Modal/Modal'
import CreateOrder from './CreateOrder'
import { OrdersContext } from '../../../context/OrdersContext'
import Order from './Order'
import FormSearchProduct from './FormSearchProduct'

const Orders = () => {

    const { setSectionCurrent } = useContext(NavigationContext)
    const { currentOrder, pendingOrders, pending, setCurrentOrder } = useContext(OrdersContext)

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setSectionCurrent('pedidos')
        pendingOrders('')
        setCurrentOrder(undefined)
    }, [])

    return (
        <section>
            <div className='headerSection headerSectionOrders'>
                <div>
                </div>
                <div>
                    {pending.length !== 0 &&
                        <select onChange={e => pendingOrders(e.target.value)}>
                            <option value={undefined}>Pedidos pendientes</option>
                            {pending.map(e => <option key={e.client_id} value={e.client_id}>{e.client}</option>)}
                        </select>}
                    <BtnNewOrder setModalVisible={setModalVisible} />
                </div>
            </div>
            {currentOrder !== undefined ?
                <div>
                    <FormSearchProduct />
                    <Order />
                </div>
                :
                <div className='selectOrder'><span>¡Crea un nuevo pedido o selecciona uno pendiente!</span></div>
            }
            {modalVisible &&
                <Modal setModalVisible={setModalVisible}>
                    <CreateOrder setModalVisible={setModalVisible} />
                </Modal>}
        </section>
    )
}

export default Orders