import { createContext, useState } from "react"
import $ from 'jquery'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const [listState, setListState] = useState(false)
    const [productList, setProductList] = useState([])
    const [currentCategory, setCurrentCategory] = useState(null)

    const addProduct = data => {

        const { pictures, generateId, code, name } = data
        const { pricePublic, priceWholesaler, availableQuantity } = data
        const { categoryId, subcategory, state } = data

        const productData = new FormData()
        productData.append('picture', pictures)
        productData.append('id', generateId())
        productData.append('code', code)
        productData.append('name', name)
        productData.append('pricePublic', pricePublic)
        productData.append('priceWholesaler', priceWholesaler)
        productData.append('discount', 0)
        productData.append('availableQuantity', availableQuantity)
        productData.append('categoryId', categoryId)
        productData.append('subcategory', subcategory)
        productData.append('mainFeatures', '')
        productData.append('state', state)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/addProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productData,      // la informacion que queres mandar
            success: response => {
                if (response) {
                    setCurrentCategory(null)
                    setListState(!listState)
                }
            }    //success
        }) // ajax
    }

    const editProduct = data => {

        const { picture, id, name, discount, pricePublic } = data
        const { priceWholesaler, mainFeatures, availableQuantity, state } = data

        const productEditData = new FormData()
        picture.length === undefined && productEditData.append('picture', picture)
        productEditData.append('id', id)
        productEditData.append('name', name)
        productEditData.append('pricePublic', pricePublic)
        productEditData.append('priceWholesaler', priceWholesaler)
        productEditData.append('discount', discount)
        productEditData.append('availableQuantity', availableQuantity)
        productEditData.append('mainFeatures', mainFeatures)
        productEditData.append('state', state)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/editProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productEditData,      // la informacion que queres mandar
            success: response => {
                if (response) {
                    setCurrentCategory(null)
                    setListState(!listState)
                }
            }    //success
        }) // ajax
    }

    const removeProduct = id => {
        const removeProductData = new FormData()
        removeProductData.append('id', id)
        $.ajax({
            url: `http://localhost:80/Bazar-Backend/removeProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: removeProductData,      // la informacion que queres mandar
            success: response => {
                if (response) {
                    setCurrentCategory(null)
                    setListState(!listState)
                }
            }    //success
        }) // ajax
    }

    const getProducts = (categoryId, setLoading) => {
        setCurrentCategory(categoryId)
        if (currentCategory !== categoryId) {
            setLoading(true)
            fetch('http://localhost:80/Bazar-Backend/category.php?categoryId=' + categoryId)
                .then(e => e.json())
                .then(e => setProductList(e))
                .finally(() => setLoading(false))

        }
    }

    const getProductsForSubcategory = (subcategoryId,setLoading) => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/subcategory.php?subcategoryId='+subcategoryId)
            .then(e => e.json())
            .then(e => setProductList(e))
            .finally(() => setLoading(false))

    }

    const sortPricePublic = e => {
        setListState(!listState)
        e ?
            setProductList(productList.sort((a, b) => a.price.price_public - b.price.price_public))
            :
            setProductList(productList.sort((a, b) => b.price.price_public - a.price.price_public))
    }

    const sortPriceWholesaler = e => {
        setListState(!listState)
        e ?
            setProductList(productList.sort((a, b) => a.price.price_wholesaler - b.price.price_wholesaler))
            :
            setProductList(productList.sort((a, b) => b.price.price_wholesaler - a.price.price_wholesaler))

    }

    const sortAvailableQuantity = e => {
        setListState(!listState)
        e ?
            setProductList(productList.sort((a, b) => a.available_quantity - b.available_quantity))
            :
            setProductList(productList.sort((a, b) => b.available_quantity - a.available_quantity))
    }

    const sortName = e => {
        setListState(!listState)
        const s = productList.sort((a, b) => {
            const name_a = a.name.toLowerCase()
            const name_b = b.name.toLowerCase()

            if (name_a > name_b) {
                return 1;
            }
            if (name_a < name_b) {
                return -1;
            }
            return 0;
        })


        e ? setProductList(s) : setProductList(s.reverse())
    }

    return <ProductContext.Provider value={
        {
            productList,
            listState,
            setCurrentCategory,
            setProductList,
            addProduct,
            editProduct,
            removeProduct,
            getProducts,
            getProductsForSubcategory,
            sortPricePublic,
            sortPriceWholesaler,
            sortAvailableQuantity,
            sortName
        }
    }>{children}</ProductContext.Provider>
}

export default ProductProvider