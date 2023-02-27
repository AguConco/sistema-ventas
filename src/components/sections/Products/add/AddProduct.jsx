import { useState, useEffect, useContext } from "react"
import './AddProduct.css'
import { ProductContext } from "../../../../context/ProductContext"
import { generateId } from "../../../../funtions/generateId"

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

    const sub = [
        ['Aluminio y acero|scc01', 'Melamina|scc02', 'Teflón|scc03', 'Cerámica|scc04', 'Herméticos|scc05', 'Platos y compoteras|scc06', 'Vasos y copas|scc07', 'Jarras, jarros y tazas|scc08', 'Cubiertos|scc09', 'Utensillos|scc10', 'Bandejas, bowls y ensaladeras|scc11', 'Botellas y bidones|scc12', 'Tablas|scc13', 'Artículos de asador|scc14', 'Secaplatos y coladores|scc15', 'Repostería|scc16', 'Electrodomésticos|scc17', 'Infantiles|scc18', 'Rigolleau|scc19', 'Carol|scc20', 'Tramontina|scc21'],
        ['Decoración|scr01', 'Portaretratos|scr02', 'Lamparas, velas y sahumerios|scr03', 'Flores y floreros|scr04', 'Bolsos, billeteras y necesers|scr05', 'Relojes|scr06'],
        ['Juegos de mesa|scj01', 'Didácticos|scj02', 'Verano|scj03', 'Vehiculos|scj04', 'Muñecas/os|scj05', 'Animales|scj06', 'Musicales|scj07', 'Pelotas|scj08'],
        ['Mates|scmt01', 'Termos|scmt02', 'Equipos de mate|scmt03', 'Bombillas|scmt04', 'Vertedores|scmt05', 'Portatermos|scmt06', 'Repuestos|scmt07', 'Pavas|scmt08', 'Lumilagro|scmt09'],
        ['Alfombras|sclb01', 'Limpieza casa|sclb02', 'Limpieza personal|sclb03', 'Baldes, fuentes y palanganas|sclb04', 'Ropa|sclb05', 'Cortinas|sclb06', 'Baño|sclb07'],
        ['Electrónica|scv01', 'Jardinería|scv02', 'Librería|scv03', 'Invierno|scv04', 'Camping|scv05', 'Organizadores|scv06']
    ]

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
                    name,
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
                    <input onKeyUp={e => setCode(e.target.value)} type="number" min={0} placeholder="Código" required />
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
                    <input value={subcategory} type="text" placeholder="subcategoría" disabled required />
                    <div className="containerSubcaterogies">
                        {categoryId === 'cc' && sub[0].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                        {categoryId === 'cr' && sub[1].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                        {categoryId === 'cj' && sub[2].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                        {categoryId === 'cmt' && sub[3].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                        {categoryId === 'clb' && sub[4].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                        {categoryId === 'cv' && sub[5].map(e => (<button onClick={e => addSubcategoria(e.target.value)} type="button" value={e.split('|')[1]}>{e.split('|')[0]}</button>))}
                    </div>
                </div>
                <button className="reset" type="button" onClick={() => resetForm()} >reset</button>
                <button className="agregar" type="submit">Agregar</button>
            </form>
        </section>
    )
}

export default AddProduct