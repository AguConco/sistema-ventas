import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link className='notification' to={'#'}>
                <FontAwesomeIcon icon={faBell} />
            </Link>
            <div>
                <div>
                 <Link className='login' to={'#'}>Ingresar</Link>   
                 <Link className='register' to={'#'}>Crear Cuenta</Link>   
                </div>
            </div>
        </header>
    )
}

export default Header