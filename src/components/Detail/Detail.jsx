import { faEdit, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imageDrive from '../../assets/images/drive.png'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Detail.css'
import { ProductContext } from '../../context/ProductContext'


const Detail = () => {

    const { productId } = useParams()
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(true)
    const [confirmed, setConfirmed] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [pricePublic, setPricePublic] = useState(0)
    const [priceWholesaler, setPriceWholesaler] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [state, setState] = useState(null)

    const { removeProduct, editProduct } = useContext(ProductContext)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/productDetail.php?id=' + productId)
            .then(e => e.json())
            .then(e => {
                if (e.length !== 0) {
                    setDetail(e[0])
                    setName(e[0].name)
                    setPricePublic(e[0].price.price_public)
                    setPriceWholesaler(e[0].price.price_wholesaler)
                    setDiscount(e[0].price.discount)
                    setState(e[0].state)
                    setLoading(false)
                } else {
                    navigate('/productos/all')
                }
            })
    }, [productId])


    return (
        <section className='sectionDetail'>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        <div className='back' onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            <span>Volver para atras</span>
                        </div>
                        <div className='containerDetail'>
                            <div className='containerImage'>
                                <img src={detail.picture} alt={detail.name} />
                            </div>
                            <div>
                                <h1 className={edit ? 'detailName edit' : 'detailName'} contenteditable={edit && "true"} onKeyUp={e => setName(e.target.innerText)}>{detail.name}</h1>
                                <div><span className='detailCode'>Código: {detail.code}</span><span className={detail.state === 'active' ? 'active' : 'inactive'}> {state === 'active' ? 'Activo' : 'Inactivo'} </span></div>
                                <div className='price'>
                                    <p>Precio mayorista <div><span>$ </span><span className={edit ? 'edit' : ''} contenteditable={edit && "true"} onKeyUp={e => setPriceWholesaler(e.target.innerText)}>{detail.price.price_wholesaler}</span></div></p>
                                    <p>Precio al público <div><span>$ </span><span className={edit ? 'edit' : ''} contenteditable={edit && "true"} onKeyUp={e => setPricePublic(e.target.innerText)}>{detail.price.price_public}</span></div></p>
                                    <p>Descuento <div><span className={edit ? 'edit' : ''} contenteditable={edit && "true"} onKeyUp={e => setDiscount(e.target.innerText)}>{detail.price.discount}</span><span>%</span></div></p>
                                </div>
                                <div className="options">
                                    <button><img src={imageDrive} alt="logo de google drive" /> Agregar a Drive</button>
                                    <button onClick={() => {
                                        console.log(edit)
                                        edit && editProduct({
                                            name,
                                            pricePublic,
                                            priceWholesaler,
                                            id: detail.id,
                                            discount,
                                            code: detail.code,
                                            mainFeatures: detail.main_features,
                                            availableQuantity: detail.available_quantity,
                                            state,
                                            
                                        })
                                        setEdit(!edit)
                                    }}> <FontAwesomeIcon className='editIcon' icon={faEdit} /> {edit ? 'Guardar cambios' : 'Editar'}</button>
                                    <button onClick={() => setConfirmed(!confirmed)} ><FontAwesomeIcon className='deleteIcon' icon={faTrash} />
                                        Eliminar
                                        {confirmed &&
                                            <div id='confirmedRemove'>
                                                <h4>¿Quieres eliminar <span>"{detail.name}"</span> de código <span>"{detail.code}"</span>?</h4>
                                                <button>Cancelar</button>
                                                <button onClick={() => {
                                                    setDetail({})
                                                    removeProduct(detail.id)
                                                }}>Eliminar</button>
                                            </div>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    )
}

export default Detail