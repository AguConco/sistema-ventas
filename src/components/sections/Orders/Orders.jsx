import './Orders.css'
import { useContext, useEffect } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'

const Orders = () => {
    
    const { setSectionCurrent } = useContext(NavigationContext)

    useEffect(() => {
        setSectionCurrent('pedidos')
    }, [])

    return (
        <section>
            Orders
        </section>
    )
}

export default Orders