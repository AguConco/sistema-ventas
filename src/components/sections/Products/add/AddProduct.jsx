import { useState, useEffect, useContext } from "react"
import './AddProduct.css'
import { ProductContext } from "../../../../context/ProductContext"
import { generateId } from "../../../../funtions/generateId"
import { category } from "../../../../constants/constants"
import { roundToSpecialNumber } from "../../../../funtions/roundNumber"

const AddProduct = () => {

    const { addProduct, listState, responseAjax, setResponseAjax } = useContext(ProductContext)

    const [pictures, setPictures] = useState()
    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [availableQuantity, setAvailableQuantity] = useState()
    const [pricePublic, setPricePublic] = useState()
    const [priceWholesaler, setPriceWholesaler] = useState()
    const [categoryId, setCategoryId] = useState()
    const [subcategory, setSubcategory] = useState('')
    const [state, setState] = useState()

    const addSubcategoria = (p) => {
        const s = subcategory.split('|')

        if (s.indexOf(p) < 0) {
            setSubcategory(current => current + p + '|')
        } else {
            const sArray = s.filter(e => e !== p)
            setSubcategory(sArray.join('|'))
        }
    }

    const resetForm = () => {
        setPictures()
        setName()
        setCode()
        setAvailableQuantity()
        setPricePublic()
        setPriceWholesaler()
        setCategoryId()
        setSubcategory('')
        setState()
        document.getElementById('addForm').reset()
    }

    const submitAddProduct = e => {
        e.preventDefault()
        const dataProduct = {
            pictures,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            generateId,
            code: code.toUpperCase(),
            availableQuantity,
            pricePublic,
            priceWholesaler,
            categoryId,
            subcategory,
            state,
        }
        addProduct(dataProduct)
    }

    useEffect(() => {
        setResponseAjax('')
        resetForm()
    }, [listState])

    return (
        <section className="sectionAddForm">
            <h3>Agregar producto nuevo</h3>

            {responseAjax.response === 'error' && <span className="responseAjax">{responseAjax.message}</span>}
            <form id="addForm" onSubmit={e => submitAddProduct(e)}>
                <div className="containerInputFile">
                    <span>¡Click o arrastrar una imagen acá!</span>
                    {pictures && <div><img src={URL.createObjectURL(pictures)} alt='imagen temporal' /></div>}
                    <input onChange={e => setPictures(e.target.files[0])} type="file" accept="image/png, image/jpeg, image/webp" required />
                </div>
                <div className="containerInputsInfo">
                    <input onKeyUp={e => setName(e.target.value)} type="text" placeholder="Nombre" required />
                    <input onKeyUp={e => setCode(e.target.value)} type="text" placeholder="Código" required />
                    <div className="containerPrice">
                        <h4>Precios</h4>
                        <input
                            onChange={({ target }) => {
                                let value = target.value
                                let pricePublic = parseInt(value > 999 ? value * 1.3 : value * 1.4)

                                setPriceWholesaler(value)
                                setPricePublic(roundToSpecialNumber(pricePublic))
                            }}
                            value={priceWholesaler}
                            type="number" min={0}
                            placeholder="Precio mayorista"
                            required
                        />
                        <input
                            onChange={({ target }) => setPricePublic(target.value)} value={pricePublic}
                            type="number"
                            min={0}
                            placeholder="Precio minorista"
                            required
                        />
                    </div>
                    <input onKeyUp={e => setAvailableQuantity(e.target.value)} type="number" min={0} placeholder="Stock" required />
                    <select onChange={e => setState(e.target.value)} required>
                        <option value="">Estado</option>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                    <select onChange={e => {
                        setCategoryId(e.target.value)
                        setSubcategory('')
                    }} required>
                        <option value="">Categoría</option>
                        <option value="cc">Cocina</option>
                        <option value="cr">Regalería</option>
                        <option value="cj">Jugueretía</option>
                        <option value="cmt">Mates y Termos</option>
                        <option value="clb">Limpieza y Baño</option>
                        <option value="cv">Varios</option>
                    </select>
                    {/* <input value={subcategory} type="text" placeholder="subcategoría" disabled required /> */}
                    <div className="containerSubcaterogies">
                        {
                            category.map(c => (
                                c.categoryId === categoryId &&
                                c.subcategory.map(e => (
                                    <div key={e.code}>
                                        <input type={"checkbox"} id={e.name} onClick={e => addSubcategoria(e.target.value)} value={e.code} />
                                        <label htmlFor={e.name}>{e.name}</label>
                                    </div>
                                ))
                            ))
                        }
                    </div>
                </div>
                <div className="containerBtnAddProduct">
                    <button className="reset" type="button" onClick={() => resetForm()} >reset</button>
                    <button className="agregar" type="submit">Agregar</button>
                </div>
            </form>
        </section>
    )
}

export default AddProduct