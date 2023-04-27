import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { ProductContext } from '../../../context/ProductContext'
import { Link } from 'react-router-dom'

const Product = ({ detail }) => {

    const { removeProduct, setCurrentCategory } = useContext(ProductContext)
    const [confirmed, setConfirmed] = useState(false)

    return (
        <tr>
            <td>
                <Link onClick={() => setCurrentCategory(null)} to={'/' + detail.id}>
                    <img src={detail.picture} alt={detail.name} />
                    <div>
                        <h3>{detail.name}</h3>
                        <span>Cód. {detail.code}</span>
                    </div>
                </Link>
            </td>
            <td>$ {detail.price.price_public}</td>
            <td>$ {detail.price.price_wholesaler}</td>
            <td>{detail.available_quantity}</td>
            <td><span className={detail.state === 'active' ? 'active' : 'inactive'}> {detail.state === 'active' ? 'Activo' : 'Inactivo'} </span></td>
            <td>
                <div>
                    <div onClick={() => setConfirmed(!confirmed)}><FontAwesomeIcon className='deleteIcon' icon={faTrash} size={'xs'} />
                        {confirmed &&
                            <div id='confirmedRemove'>
                                <h4>¿Quieres eliminar <span>"{detail.name}"</span> de código <span>"{detail.code}"</span>?</h4>
                                <button>Cancelar</button>
                                <button onClick={() => removeProduct({id: detail.id, picture: detail.picture})}>Eliminar</button>
                            </div>
                        }
                        <span>Eliminar</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}
export default Product