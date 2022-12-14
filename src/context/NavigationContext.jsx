import { createContext, useState } from "react"
import { faHome, faBoxOpen, faAddressBook, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavigationContext = createContext()

const NavigationProvider = ({ children }) => {

    const [sectionCurrent, setSectionCurrent] = useState()

    const sections = [
        {
            name: 'inicio',
            url:'inicio',
            icon: <FontAwesomeIcon icon={faHome} />,
            description: ''
        },
        {
            name: 'productos',
            url:'productos/all',
            icon: <FontAwesomeIcon icon={faBoxOpen} />,
            description: 'Registrar, eliminar o actualizar detalles prodcutos'
        },
        {
            name: 'clientes',
            url:'clientes',
            icon: <FontAwesomeIcon icon={faAddressBook} />,
            description: 'Registrar, eliminar o actualizar detalles clientes'
        },
        {
            name: 'pedidos',
            url:'pedidos',
            icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
            description: 'Realizar pedidos, remito y comprobantes'
        }
    ]

    return <NavigationContext.Provider value={{ sections, sectionCurrent, setSectionCurrent }}>{children}</NavigationContext.Provider>
}

export default NavigationProvider