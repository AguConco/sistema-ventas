import { useContext, useEffect } from 'react'
import { ClientContext } from '../../context/ClientContext'
import './OrdersHistory.css'

const OrdersHistory = ({ client }) => {

    const { orderCompleted, historyClient } = useContext(ClientContext)

    useEffect(() => {
        orderCompleted()
    }, [])

    console.log(historyClient)

    return (
        <div className='sectionOrdersHistory'>
            <h2>Historial de pedidos</h2>
            {client.completedOrders === 0 ?
                <div className='ordersHistoryEmpty'>
                    <p>Todavía no se realizó ningún pedido</p>
                </div>
                :
                <div className='containerOrders'>
                    {historyClient.map(e =>
                        <div className='order'>
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
                    )}
                </div>
            }
        </div>
    )
}

export default OrdersHistory