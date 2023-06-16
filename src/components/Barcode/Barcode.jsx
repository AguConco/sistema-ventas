import { useContext, useEffect, useState } from 'react'
import './Barcode.css'
import { NavigationContext } from '../../context/NavigationContext'
import AddProduct from '../sections/Products/add/AddProduct'

export function Barcode() {

    const { setSectionCurrent } = useContext(NavigationContext)

    const [code, setCode] = useState(null)
    const [product, setProduct] = useState(null)
    const [availableQuantity, setAvailableQuantity] = useState(null)
    const [addProduct, setAddProduct] = useState(false)

    // const urlHost = 'https://panel-control-bazar.000webhostapp.com/backend/'
    const urlHost = 'http://localhost:80/Bazar-Backend/'

    const productExist = (e) => {
        e.preventDefault()

        setAddProduct(false)

        const codebar = new FormData()
        codebar.append('code', code)

        fetch(`${urlHost}barcode.php`, {
            method: 'POST',
            body: codebar
        })
            .then(e => e.json())
            .then(e => {
                if (e.message === 'el producto existe') {
                    setProduct(e.product)
                } else {
                    setProduct(null)
                    setAddProduct(true)
                }
            })
    }

    const editAvailableQuantity = (e) => {
        e.preventDefault()

        const dataProduct = new FormData()
        dataProduct.append('id', product.id)
        dataProduct.append('availableQuantity', availableQuantity)

        fetch(`${urlHost}editProductBarcode.php`, {
            method: 'POST',
            body: dataProduct
        })
            .then(e => e.json())
            .then(e => {
                if (e.response === 'success') {
                    setProduct(null)
                    alert('se modificó correctamente')
                }
            })
    }

    useEffect(() => {
        setSectionCurrent('barcode')
    }, [])

    return (
        <section className='section-barcode'>
            <form onSubmit={(e) => productExist(e)} className='form-barcode'>
                <input type="text" onKeyUp={({ target }) => setCode(target.value)} placeholder='Num. código de barras' required />
                <button type="submit">Buscar</button>
            </form>
            {product &&
                <div>
                    <div className='product-barcode'>
                        <form onSubmit={(e) => editAvailableQuantity(e)} className='form-add-available-quantity'>
                            <input type="number" placeholder='Cantidad a agregar' onKeyUp={({ target }) => setAvailableQuantity(target.value)} />
                            <button type="submit">Agregar</button>
                        </form>
                        <img src={product.picture} />
                        <h1>
                            <span className='product-barcode-code'>{product.code}</span>
                            {product.name}
                        </h1>
                        <div>Mayorísta: <span>${product.price.price_wholesaler}</span></div>
                        <div>Público: <span>${product.price.price_public}</span></div>
                        <div>stock: <span>{product.available_quantity}</span></div>
                    </div>
                </div>
            }
            {addProduct && <AddProduct />}
        </section>
    )
}