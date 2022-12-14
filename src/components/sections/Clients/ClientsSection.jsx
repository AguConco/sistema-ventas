import './Clients.css'
import { useContext, useEffect } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'

const ClientsSection = () => {

    const { setSectionCurrent } = useContext(NavigationContext)

    useEffect(() => {
        setSectionCurrent('clientes')
    }, [])

    return (
        <section>
            Clients
        </section>
    )
}

export default ClientsSection