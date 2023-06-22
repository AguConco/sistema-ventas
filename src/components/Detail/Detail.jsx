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

    const [id, setId] = useState(null)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [pricePublic, setPricePublic] = useState(0)
    const [priceWholesaler, setPriceWholesaler] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [state, setState] = useState(null)
    const [availableQuantity, setAvailableQuantity] = useState()
    const [picture, setPicture] = useState()
    const [newPicture, setNewPicture] = useState(undefined)

    // const urlhost = 'https://panel-control-bazar.000webhostapp.com/backend/'
    const urlhost = 'http://localhost:80/Bazar-Backend/'

    const { removeProduct, editProduct, responseAjax, setResponseAjax } = useContext(ProductContext)
    const navigate = useNavigate()

    const cancelChange = () => {
        setId(null)
        setResponseAjax({ response: 'not change' })
        setEdit(false)
        setName(detail.name)
        setDiscount(detail.price.discount)
        setPricePublic(detail.price.price_public)
        setPriceWholesaler(detail.price.price_wholesaler)
        setState(detail.state)
        setAvailableQuantity(detail.available_quantity)
        setPicture(picture)
    }

    const saveChange = () => {
        const newData = {
            name,
            pricePublic,
            priceWholesaler,
            id: detail.id,
            discount,
            code: detail.code,
            availableQuantity,
            state,
            picture: newPicture
        }
        if (edit) {
            editProduct(newData)
            setDetail(newData)
        }
    }

    useEffect(() => {
        switch (responseAjax.response) {
            case 'success':
                setEdit(false)
                newPicture !== undefined && setPicture(URL.createObjectURL(newPicture))
                // setId(null)
                setNewPicture()
                break;
            case 'not change':
                setNewPicture(undefined)
                break;
            default:
                break;
        }

        if (id !== productId) {
            setLoading(true)
            setId(productId)

            fetch(`${urlhost}productDetail.php?id=${productId}`)
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
                    } else {
                        navigate('/productos/all')
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [productId, responseAjax])

    return (
        <section className='sectionDetail'>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        <div className='back' onClick={() => {
                            edit ?
                                alert('Guarda los cambios antes de salir')
                                :
                                window.history.state !== null ?
                                    window.history.back()
                                    :
                                    navigate('/productos/all')
                        }}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            <span>Volver para atras</span>
                        </div>
                        <div className='containerDetail'>
                            <div className='containerImage'>
                                {newPicture !== undefined && <img className='newImage' src={URL.createObjectURL(newPicture)} />}
                                <img src={picture} alt={detail.name} />
                                {edit &&
                                    <div className='editPicture'>
                                        <button type='button'>Cambiar Foto</button>
                                        <input onChange={({ target }) => setNewPicture(target.files[0])} type="file" accept="image/png, image/jpeg, image/webp" />
                                    </div>
                                }
                            </div>
                            <div>
                                {edit ?
                                    <input type={"text"} className={'detailName edit'} disabled={!edit} onChange={({ target }) => setName(target.value.charAt(0).toUpperCase() + target.value.slice(1))} value={name} /> :
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
                                            <button onClick={cancelChange}> <FontAwesomeIcon className='deleteIcon' icon={faXmark} />Cancelar cambios</button>
                                            <button onClick={saveChange}> <FontAwesomeIcon className='saveIcon' icon={faFloppyDisk} />Guardar cambios</button>
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
                                                    removeProduct({ id: detail.id, picture: detail.picture })
                                                    navigate('/productos/all')
                                                }}>Eliminar</button>
                                            </div>
                                        }
                                    </button>
                                </div>
                            </div >
                        </div >
                        {responseAjax.response === 'error' && <span className="responseAjax">{responseAjax.message}</span>}
                    </div >
            }
        </section >
    )
}

export default Detail