import { createContext, useState } from "react"
import { faHome, faBoxOpen, faAddressBook, faFileInvoiceDollar, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavigationContext = createContext()

const NavigationProvider = ({ children }) => {

    const [sectionCurrent, setSectionCurrent] = useState()

    const barcodeIcon = <svg height="1em" viewBox="0 0 512 512"><path fill="#575758" d="M24 32C10.7 32 0 42.7 0 56V456c0 13.3 10.7 24 24 24H40c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H24zm88 0c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H184zm96 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H280zM448 56V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H472c-13.3 0-24 10.7-24 24zm-64-8V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16s-16 7.2-16 16z"/></svg>

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
            name: 'barcode',
            url:'barcode',
            icon: barcodeIcon,
            description: 'agregar / actualizar productos y facturar por código de barras',
            type: ''
        }
    ]

    return <NavigationContext.Provider value={{ sections, sectionCurrent, setSectionCurrent }}>{children}</NavigationContext.Provider>
}

export default NavigationProvider