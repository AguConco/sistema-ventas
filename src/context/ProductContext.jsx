import { createContext, useState } from "react"
import $ from 'jquery'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const [listState, setListState] = useState(false)

    const addProduct = (data) => {

        const { pictures, generarId, code, name } = data
        const { pricePublic, priceWholesaler, discount, availableQuantity } = data
        const { categoryId, subcategory, mainFeatures, state } = data

        const productData = new FormData()
        productData.append('picture', pictures)
        productData.append('id', generarId())
        productData.append('code', code)
        productData.append('name', name)
        productData.append('pricePublic', pricePublic)
        productData.append('priceWholesaler', priceWholesaler)
        productData.append('discount', discount)
        productData.append('availableQuantity', availableQuantity)
        productData.append('categoryId', categoryId)
        productData.append('subcategory', subcategory)
        productData.append('mainFeatures', mainFeatures)
        productData.append('state', state)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/addProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productData,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }    //success
        }) // ajax
    }

    const editProduct = (id) => {
        alert(id)
    }

    const removeProduct = (id) => {
        const removeProductData = new FormData()
        removeProductData.append('id', id)
        $.ajax({
            url: `http://localhost:80/Bazar-Backend/removeProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: removeProductData,      // la informacion que queres mandar
            success: response => {
                response && setListState(!listState)
            }    //success
        }) // ajax
    }

    return <ProductContext.Provider value={{ listState, addProduct, editProduct, removeProduct }}>{children}</ProductContext.Provider>
}

export default ProductProvider