import { faEdit, faTrash, faArrowAltCircleLeft, faFloppyDisk, faXmark, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Detail.css'
import { ProductContext } from '../../context/ProductContext'
import { roundToSpecialNumber } from '../../funtions/roundNumber'
import { category } from '../../constants/constants'
import { UploadImageDrive } from '../UploadImageDrive/UploadImageDrive'

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
    const [imageDrive, setImageDrive] = useState('')

    const urlhost = 'https://panel-control-bazar.000webhostapp.com/backend/'
    // const urlhost = 'http://localhost:80/Bazar-Backend/'

    const { removeProduct, editProduct, responseAjax, setResponseAjax } = useContext(ProductContext)
    const navigate = useNavigate()

    const cancelChange = () => {
        setId(null)
        setEdit(false)
        setName(detail.name)
        setDiscount(detail.price.discount)
        setPricePublic(detail.price.price_public)
        setPriceWholesaler(detail.price.price_wholesaler)
        setState(detail.state)
        setAvailableQuantity(detail.available_quantity)
        setPicture(picture)
        setNewPicture(undefined)
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
            picture: newPicture,
            category: {
                category_id: detail.category.category_id,
                subcategory: detail.category.subcategory
            }
        }
        if (edit) {
            editProduct(newData)
            setDetail(newData)
        }
    }

    const handleCheckboxChange = (code) => {
        const selectedSubcategories = detail.category.subcategory.split('|')
        const updatedSubcategories = selectedSubcategories.includes(code)
            ? selectedSubcategories.filter(item => item !== code)
            : [...selectedSubcategories, code]

        const updatedCategory = { ...detail.category, subcategory: updatedSubcategories.join('|') }
        setDetail(prevState => ({ ...prevState, category: updatedCategory }))
    };

    useEffect(() => {
        if (responseAjax.response === 'success') {
            setEdit(false)
            newPicture !== undefined && setPicture(URL.createObjectURL(newPicture))
            setNewPicture()
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
                                window.history.back() || navigate('/productos/all')
                        }}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            <span>Volver para atras</span>
                        </div>
                        <div className='containerDetail'>
                            <div className='containerImageAndDrive'>
                                <div className='containerImage'>
                                    {newPicture !== undefined && <img className='newImage' src={URL.createObjectURL(newPicture)} />}
                                    <img src={picture} alt={detail.name} />
                                    {edit &&
                                        <div className='editPicture'>
                                            <span><FontAwesomeIcon icon={faArrowsRotate} /> Cambiar Foto</span>
                                            <input onChange={({ target }) => setNewPicture(target.files[0])} type="file" accept="image/png, image/jpeg, image/webp" />
                                        </div>
                                    }
                                </div>
                                {imageDrive &&
                                    <div className="containerImage">
                                        <img src={imageDrive} />
                                    </div>}
                            </div>
                            <div>
                                {edit
                                    ? <input
                                        type={"text"}
                                        className={'detailName edit'}
                                        onChange={({ target }) => setName(target.value.charAt(0).toUpperCase() + target.value.slice(1))}
                                        value={name} />
                                    : <h1 className={'detailName'}>{name}</h1>
                                }
                                <div>
                                    <span className='detailCode'>Código: {detail.code}</span>
                                    <span className={state === 'active' ? 'active' : 'inactive'}>
                                        {edit && <div onClick={() => edit && state === 'active' ? setState('inactive') : setState('active')}></div>}
                                        {state === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                                <div className='containerCategoryAndSubcategories'>
                                    {edit
                                        ? category.map(c => (
                                            c.categoryId === detail.category.category_id &&
                                            <>
                                                <span>{c.categoryName}</span>
                                                {c.subcategory.map(e => (
                                                    <div key={e.code} className='containerInputSubcategories'>
                                                        <input
                                                            checked={detail.category.subcategory.split('|').includes(e.code)}
                                                            type={"checkbox"}
                                                            id={e.name}
                                                            onChange={() => handleCheckboxChange(e.code)}
                                                            value={e.code} />
                                                        <label htmlFor={e.name}>{e.name}</label>
                                                    </div>
                                                ))}
                                            </>
                                        ))
                                        : category.map(c => (
                                            c.categoryId === detail.category.category_id &&
                                            <>
                                                <span>{c.categoryName}</span>
                                                {c.subcategory.map(e => (
                                                    detail.category.subcategory.split('|').map(s => e.code === s && <span key={s}>{e.name}</span>)
                                                ))}
                                            </>
                                        ))

                                    }
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
                                <div className="options">
                                    <UploadImageDrive data={{
                                        name,
                                        price: priceWholesaler,
                                        folder: detail.folder,
                                        id: detail.id,
                                        picture
                                    }} setImageDrive={setImageDrive} />
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