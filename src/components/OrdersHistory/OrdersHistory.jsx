import { useContext, useEffect, useState } from 'react'
import { ClientContext } from '../../context/ClientContext'
import Modal from '../Modal/Modal'
import './OrdersHistory.css'

const OrdersHistory = ({ client }) => {

    const { orderCompleted, historyClient } = useContext(ClientContext)
    const [remit, setRemit] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        orderCompleted()
    }, [])

    console.log(historyClient, client)

    return (
        <div className='sectionOrdersHistory'>
            <h2>Historial de pedidos</h2>
            {client.completedOrders === 0 ?
                <div className='ordersHistoryEmpty'>
                    <p>Todavía no se realizó ningún pedido</p>
                </div>
                :
                <div className='containerOrders'>
                    {historyClient.map(e => ( 
                        e.client_id === client.id &&
                        <div className='order' onClick={() => {
                            setModalVisible(true)
                            setRemit(e.remit)
                        }}>
                            <div>
                                <h4>
                                    {e.date.split(' ')[0].split('-').reverse().join('/')}
                                    <span>{e.date.split(' ')[1].split(':').slice(0, 2).join(':')} Hs</span>
                                </h4>
                                <span>{e.order_id}</span>
                            </div>
                            <div className='containerRemit'>
                                <object className='miniature' data={e.remit} type="application/pdf"></object>
                            </div>
                        </div>
                    )
                    )}
                </div>
            }
            {modalVisible && remit &&
                <Modal setModalVisible={setModalVisible} >
                    <object className="viewGenerateRemit" data={remit} type="application/pdf"></object>
                </Modal>
            }
        </div>
    )
}

export default OrdersHistory