import { useContext, useState } from "react"
import { OrdersContext } from "../../../context/OrdersContext"
import { useParams } from "react-router-dom"

const FormSearchProduct = () => {

    const { searchProduct, searchResult, addProductToOrder, setSearchResult } = useContext(OrdersContext)

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState()
    const [code, setCode] = useState('')
    const [name, setName] = useState('')

    const { orderId } = useParams()

    const changeValueName = e => {
        const valueInputName = e.value.trim()
        const dataSearch = { code: '', name: valueInputName }
        searchProduct(dataSearch)
    }

    const changeValueCode = e => {
        const valueInputCode = e.value.trim()
        const dataSearch = { code: valueInputCode, name: '' }
        searchProduct(dataSearch)
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
                orderId: orderId,
                quantity,
                subtotal: quantity * selectedProduct.price.price_wholesaler
            }, setSelectedProduct)
            setQuantity('')
            setCode('')
            setName('')
            setSearchResult(null)
        }
    }

    const onlyCode = (e) => {
        e.preventDefault()
        const code = document.getElementById('code').value
        const dataSearch = { code, name: '' }
        searchProduct(dataSearch)
    }

    return (
        <>
            <form className="formSearch" onSubmit={(e) => onlyCode(e)}>
                <input
                    id="code"
                    type="text"
                    maxLength="30"
                    placeholder="Código"
                    onChange={({ target }) => {
                        setSelectedProduct(null)
                        setCode(target.value)
                        changeValueCode(target)
                    }}
                    value={selectedProduct !== null ? selectedProduct.code : code} />
                <div className="containerResultSearch">
                    {searchResult &&
                        searchResult.map(e =>
                            <button
                                key={e.id}
                                onClick={() => {
                                    setSelectedProduct(e)
                                    setSearchResult(null)
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
            <form className="formSearch" onSubmit={e => submitForm(e)}>
                <input
                    type="number"
                    placeholder="Cantidad"
                    min={1}
                    max={selectedProduct !== null ? selectedProduct.available_quantity : 0}
                    onChange={e => setQuantity(e.target.value)}
                    required
                    value={quantity} />
                <input
                    type="text"
                    placeholder="Nombre producto"
                    onChange={({ target }) => {
                        setSelectedProduct(null)
                        setName(target.value)
                        changeValueName(target)
                    }}
                    value={selectedProduct !== null ? selectedProduct.name : name} />
                <button type="submit">Agregar al pedido</button>
            </form>
        </>
    )
}

export default FormSearchProduct