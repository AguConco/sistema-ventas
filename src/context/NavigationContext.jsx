import { createContext, useState } from "react"
import { faHome, faBoxOpen, faAddressBook, faFileInvoiceDollar, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavigationContext = createContext()

const NavigationProvider = ({ children }) => {

    const [sectionCurrent, setSectionCurrent] = useState()

    const sections = [
        {
            name: 'inicio',
            url:'inicio',
            icon: <FontAwesomeIcon icon={faHome} />,
            description: '',
            type: ''
        },
        {
            name: 'productos',
            url:'productos/all',
            icon: <FontAwesomeIcon icon={faBoxOpen} />,
            description: 'Registrar, eliminar o actualizar detalles prodcutos',
            type: ''
        },
        {
            name: 'clientes',
            url:'clientes/all',
            icon: <FontAwesomeIcon icon={faAddressBook} />,
            description: 'Registrar, eliminar o actualizar detalles clientes',
            type: ''
        },
        {
            name: 'pedidos',
            url:'pedidos',
            icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
            description: 'Realizar pedidos, remito y comprobantes',
            type: ''
        },
        {
            name: 'catálogo',
            url:'catalogo/all',
            icon: <FontAwesomeIcon icon={faBook} />,
            description: 'Muestra de los productos a los clientes',
            type: '_blank'
        }
    ]

    return <NavigationContext.Provider value={{ sections, sectionCurrent, setSectionCurrent }}>{children}</NavigationContext.Provider>
}

export default NavigationProvider