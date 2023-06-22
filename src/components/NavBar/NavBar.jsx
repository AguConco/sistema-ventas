import './NavBar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { NavigationContext } from '../../context/NavigationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { ProductContext } from '../../context/ProductContext'

const Section = ({ section, sectionCurrent }) => {

    const { setCurrentCategory } = useContext(ProductContext)

    return (
        <li key={section.name}>
            {<Link
                onClick={() => setCurrentCategory(null)}
                className={section.name === sectionCurrent ? 'linkSection linkSectionCurrent' : 'linkSection'}
                to={'/' + section.url}
            >
                {section.icon} <span>{section.name}</span>
            </Link>}
        </li>
    )
}

const NavBar = () => {

    const { sections, sectionCurrent } = useContext(NavigationContext)

    return (
        sectionCurrent !== 'barcode' && 
        <div className="containerNav">
            <nav>
                <div className='logo'>
                    <h1>BR</h1>
                    <div></div>
                </div>
                <ul>{sections.map(s => (<Section section={s} sectionCurrent={sectionCurrent} />))} </ul>
            </nav>
            <Link className='config' to={'/'}><FontAwesomeIcon icon={faGear} /> Configuración</Link>
        </div>
    )
}

export default NavBar