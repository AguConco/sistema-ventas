import { useContext, useState } from "react"
import { filterSearch } from "../../../funtions/filterSearch"
import { OrdersContext } from "../../../context/OrdersContext"

const FormSearchProduct = () => {

    const {
        currentOrder,
        searchProduct,
        searchResult,
        addProductToOrder,
        viewProductSearch,
        setViewProductSearch
    } = useContext(OrdersContext)

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState()
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [loadedProducts, setLoadedProducts] = useState(1);

    const products = viewProductSearch.slice(0, loadedProducts * 10)

    const changeValueName = e => {
        const valueInputName = e.value.trim()
        const dataSearch = { code: '', name: valueInputName }
        searchProduct(dataSearch)
        setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))
    }

    const changeValueCode = e => {
        const valueInputCode = e.value.trim()
        const dataSearch = { code: valueInputCode, name: '' }
        searchProduct(dataSearch)
        setViewProductSearch(filterSearch({ ...dataSearch, searchResult }))
    }

    const submitForm = e => {
        e.preventDefault()
        if (selectedProduct !== null && quantity >= 1) {
            addProductToOrder({
                productId: selectedProduct.id,
                name: selectedProduct.name,
                picture: selectedProduct.picture,
                price: selectedProduct.price.price_wholesaler,
                code: selectedProduct.code,
                orderId: currentOrder.order_id,
                quantity,
                subtotal: quantity * selectedProduct.price.price_wholesaler
            }, setSelectedProduct)
            setQuantity('')
            setCode('')
            setName('')
        }
    }

    const loadOnScroll = e => {
        if (products.length < viewProductSearch.length)
            if ((e.scrollTop + e.clientHeight + 5) >= e.scrollHeight) setLoadedProducts(loadedProducts + 1)
    }

    return (
        <form className="formSearch" onSubmit={e => submitForm(e)}>
            <input
                type="text"
                maxLength="10"
                placeholder="Código"
                onChange={({ target }) => {
                    setSelectedProduct(null)
                    setCode(target.value)
                    changeValueCode(target)
                }}
                value={selectedProduct !== null ? selectedProduct.code : code}
            />
            <input
                type="number"
                placeholder="Cantidad"
                min={1}
                max={selectedProduct !== null ? selectedProduct.available_quantity : 0}
                onChange={e => setQuantity(e.target.value)}
                required
                value={quantity}
            />
            <input
                type="text"
                placeholder="Nombre producto"
                onChange={({ target }) => {
                    setSelectedProduct(null)
                    setName(target.value)
                    changeValueName(target)
                }}
                value={selectedProduct !== null ? selectedProduct.name : name}

            />
            <button type="submit">Agregar al pedido</button>
            <div className="containerResultSearch" onScroll={({ target }) => loadOnScroll(target)}>
                {products.map(e =>
                    <button
                        key={e.id}
                        onClick={() => {
                            setViewProductSearch([])
                            setSelectedProduct(e)
                        }}
                        type="button"
                        className="resultSearch"
                    >
                        <img src={e.picture} alt={e.name} />
                        <div>
                            <span> {e.code} <br /> {e.name} </span>
                        </div>
                    </button>
                )}
            </div>
        </form>
    )
}

export default FormSearchProduct