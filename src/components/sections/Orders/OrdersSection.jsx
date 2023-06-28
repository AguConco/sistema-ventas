import './Orders.css'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import BtnNewOrder from './BtnNewOrder'
import Modal from '../../Modal/Modal'
import CreateOrder from './CreateOrder'
import { OrdersContext } from '../../../context/OrdersContext'
import Order from './Order'
import FormSearchProduct from './FormSearchProduct'
import { useNavigate, useParams } from 'react-router-dom'

const OrdersSection = () => {

    const { setSectionCurrent } = useContext(NavigationContext)
    const { pendingOrders, pending } = useContext(OrdersContext)
    const { clientId } = useParams()
    const navigate = useNavigate()

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setSectionCurrent('pedidos')
        pendingOrders('')
    }, [clientId])

    return (
        <section>
            <div className='headerSection headerSectionOrders'>
                <div>
                </div>
                <div>
                    {pending.length !== 0 &&
                        <select onChange={e => navigate('/pedidos/' + e.target.value)}>
                            <option value={''}>Pedidos pendientes</option>
                            {pending.map(e => <option key={e.client_id} value={e.client_id+'/'+e.order_id}>{e.client}</option>)}
                        </select>}
                    <BtnNewOrder setModalVisible={setModalVisible} />
                </div>
            </div>
            {clientId !== undefined ?
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

export default OrdersSection