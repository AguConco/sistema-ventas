import './NavBar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { NavigationContext } from '../../context/NavigationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { ProductContext } from '../../context/ProductContext'

const Section = ({ section }) => {

    const { sectionCurrent } = useContext(NavigationContext)
    const { setCurrentCategory } = useContext(ProductContext)

    return (
        <li key={section.name}>
            {<Link
                onClick={() => setCurrentCategory(null)}
                className={section.name === sectionCurrent ? 'linkSection linkSectionCurrent' : 'linkSection'}
                to={'/' + section.url}
            >
                {section.icon} {section.name}
            </Link>}
        </li>
    )
}

const NavBar = () => {

    const { sections } = useContext(NavigationContext)

    return (
        <div className="containerNav">
            <nav>
                <div className='logo'>
                    <h1>BR</h1>
                    <div></div>
                </div>
                <ul>{sections.map(s => (<Section section={s} />))} </ul>
            </nav>
            <Link className='config' to={'/'}><FontAwesomeIcon icon={faGear} /> Configuración</Link>
        </div>
    )
}

export default NavBar