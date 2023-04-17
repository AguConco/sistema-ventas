import { faEdit, faTrash, faArrowAltCircleLeft, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Detail.css'
import { ProductContext } from '../../context/ProductContext'
import { roundToSpecialNumber } from '../../funtions/roundNumber'


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
    const [availableQuantity, setAvailableQuantity] = useState()
    const [picture, setPicture] = useState()

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
                    setAvailableQuantity(e[0].available_quantity)
                    setPicture(e[0].picture)
                    setLoading(false)
                } else {
                    navigate('/productos/all')
                }
            })
    }, [productId])

    const cancelChange = () => {
        setEdit(false)
        setName(detail.name)
        setDiscount(detail.price.discount)
        setPricePublic(detail.price.price_public)
        setPriceWholesaler(detail.price.price_wholesaler)
        setState(detail.state)
        setAvailableQuantity(detail.available_quantity)
        setPicture(detail.picture)
    }

    const saveChange = () => {
        const newData = {
            name,
            pricePublic,
            priceWholesaler,
            id: detail.id,
            discount,
            code: detail.code,
            mainFeatures: detail.main_features,
            availableQuantity,
            state,
            picture
        }
        if (edit) {
            editProduct(newData)
            setDetail(newData)
        }
        setEdit(!edit)
    }


    return (
        <section className='sectionDetail'>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        <div className='back' onClick={() => edit ? alert('Guarda los cambios antes de salir') : window.history.back()}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            <span>Volver para atras</span>
                        </div>
                        <div className='containerDetail'>
                            <div className='containerImage'>
                                <img src={picture.length !== undefined ? detail.picture : URL.createObjectURL(picture)} alt={detail.name} />
                                {edit &&
                                    <div className='editPicture'>
                                        <button type='button'>Cambiar Foto</button>
                                        <input onChange={e => setPicture(e.target.files[0])} type="file" accept="image/png, image/jpeg" />
                                    </div>
                                }
                            </div>
                            <div>
                                {edit ?
                                    <input type={"text"} className={'detailName edit'} disabled={!edit} onChange={({ target }) => setName(target.value)} value={name} /> :
                                    <h1 className={'detailName'}>{name}</h1>
                                }
                                <div>
                                    <span className='detailCode'>Código: {detail.code}</span>
                                    <span className={state === 'active' ? 'active' : 'inactive'}>
                                        {edit && <div onClick={() => edit && state === 'active' ? setState('inactive') : setState('active')}></div>}
                                        {state === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                                <div className='price'>
                                    <p>Precio mayorista
                                        <div>
                                            <span>$ </span>
                                            <input type={"number"} disabled={!edit} className={edit ? 'edit' : ''}
                                                onChange={({ target }) => {
                                                    let value = target.value
                                                    let pricePublic = parseInt(value > 999 ? value * 1.3 : value * 1.4)

                                                    setPriceWholesaler(value)
                                                    setPricePublic(roundToSpecialNumber(pricePublic))
                                                }}
                                                value={priceWholesaler} />
                                        </div>
                                    </p>
                                    <p>Precio al público
                                        <div>
                                            <span>$ </span>
                                            <input type={"number"} disabled={!edit} className={edit ? 'edit' : ''} onChange={({ target }) => setPricePublic(target.value)} value={pricePublic} />
                                        </div>
                                    </p>
                                    <p>Descuento (%)
                                        <div>
                                            <input type={"number"} disabled={!edit} className={edit ? 'edit' : ''} onChange={({ target }) => setDiscount(target.value)} value={discount} />
                                        </div>
                                    </p>
                                    <p>Stock
                                        <div>
                                            <input type={"number"} disabled={!edit} className={edit ? 'edit' : ''} onChange={e => setAvailableQuantity(e.target.value)} value={availableQuantity} />
                                        </div>
                                    </p>
                                </div >
                                <div className="options">
                                    {!edit ?
                                        <button onClick={() => setEdit(!edit)}> <FontAwesomeIcon className='editIcon' icon={faEdit} /> Editar </button>
                                        :
                                        <div>
                                            <button onClick={() => cancelChange()}> <FontAwesomeIcon className='deleteIcon' icon={faXmark} />Cancelar cambios</button>
                                            <button onClick={() => saveChange()}> <FontAwesomeIcon className='saveIcon' icon={faFloppyDisk} />Guardar cambios</button>
                                        </div>
                                    }
                                    <button onClick={() => setConfirmed(!confirmed)} ><FontAwesomeIcon className='deleteIcon' icon={faTrash} />
                                        Eliminar
                                        {confirmed &&
                                            <div id='confirmedRemove'>
                                                <h4>¿Quieres eliminar <span>"{detail.name}"</span> de código <span>"{detail.code}"</span>?</h4>
                                                <button>Cancelar</button>
                                                <button onClick={() => {
                                                    setDetail({})
                                                    removeProduct(detail.id)
                                                    navigate('/productos/all')
                                                }}>Eliminar</button>
                                            </div>
                                        }
                                    </button>
                                </div>
                            </div >
                        </div >
                    </div >
            }
        </section >
    )
}

export default Detail