import { useState, useEffect, useContext } from "react"
import './AddProduct.css'
import { ProductContext } from "../../../../context/ProductContext"
import { generateId } from "../../../../funtions/generateId"
import { sub } from "../../../../constants/constants"

const AddProduct = () => {

    const { addProduct, listState } = useContext(ProductContext)

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

    useEffect(() => {
        resetForm()
    }, [listState])

    return (
        <section className="sectionAddForm">
            <h3>Agregar producto nuevo</h3>
            <form id="addForm" onSubmit={e => {
                e.preventDefault()
                const dataProduct = {
                    pictures,
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    generateId,
                    code,
                    availableQuantity,
                    pricePublic,
                    priceWholesaler,
                    categoryId,
                    subcategory,
                    state,
                }
                addProduct(dataProduct)
            }}>
                <div className="containerInputFile">
                    <span>¡Click o arrastrar una imagen acá!</span>
                    {pictures && <div><img src={URL.createObjectURL(pictures)} alt='imagen temporal' /></div>}
                    <input onChange={e => setPictures(e.target.files[0])} type="file" accept="image/png, image/jpeg" required />
                </div>
                <div className="containerInputsInfo">
                    <input onKeyUp={e => setName(e.target.value)} type="text" placeholder="Nombre" required />
                    <input onKeyUp={e => setCode(e.target.value)} type="text" placeholder="Código" required />
                    <div className="containerPrice">
                        <h4>Precios</h4>
                        <input onKeyUp={e => setPriceWholesaler(e.target.value)} type="number" min={0} placeholder="Precio mayorista" required />
                        <input onKeyUp={e => setPricePublic(e.target.value)} type="number" min={0} placeholder="Precio minorista" required />
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
                            sub.map(s => (
                                s[0] === categoryId &&
                                s.map(e => (
                                    e !== categoryId &&
                                    <div>
                                        <input type={"checkbox"} id={e.split('|')[0]} onClick={e => addSubcategoria(e.target.value)} value={e.split('|')[1]}  required/>
                                        <label htmlFor={e.split('|')[0]}>{e.split('|')[0]}</label>
                                    </div>
                                ))
                            ))
                        }
                    </div>
                </div>
                <button className="reset" type="button" onClick={() => resetForm()} >reset</button>
                <button className="agregar" type="submit">Agregar</button>
            </form>
        </section>
    )
}

export default AddProduct