import { createContext, useState } from "react"
import $ from 'jquery'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const [listState, setListState] = useState(false)
    const [productList, setProductList] = useState({ 'products': [] })
    const [currentCategory, setCurrentCategory] = useState(null)
    const [loadedProducts, setLoadedProducts] = useState(1);
    const [responseAjax, setResponseAjax] = useState('')

    const addProduct = data => {

        const {
            pictures,
            generateId,
            code,
            name,
            pricePublic,
            priceWholesaler,
            availableQuantity,
            categoryId,
            subcategory,
            state
        } = data

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
        productData.append('state', state)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/addProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productData,      // la informacion que queres mandar
            success: e => {
                const { response } = JSON.parse(e)

                setResponseAjax(JSON.parse(e))
                if (response === 'success') {
                    setCurrentCategory(null)
                    setListState(!listState)
                }
            }    //success
        }) // ajax
    }

    const editProduct = data => {

        const {
            picture,
            id,
            name,
            discount,
            pricePublic,
            priceWholesaler,
            availableQuantity,
            state
        } = data

        const productEditData = new FormData()
        picture && productEditData.append('picture', picture)
        productEditData.append('id', id)
        productEditData.append('name', name)
        productEditData.append('pricePublic', pricePublic)
        productEditData.append('priceWholesaler', priceWholesaler)
        productEditData.append('discount', discount)
        productEditData.append('availableQuantity', availableQuantity)
        productEditData.append('state', state)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/editProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productEditData,      // la informacion que queres mandar
            success: e => {
                setResponseAjax(JSON.parse(e))
            }    //success
        }) // ajax
    }

    const removeProduct = ({ id, picture }) => {

        const productData = new FormData()
        productData.append('id', id)
        productData.append('picture', picture)

        $.ajax({
            url: `http://localhost:80/Bazar-Backend/removeProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',
            processData: false,
            contentType: false,               // como la queres mandar si POST, GET, PUT o DELETE
            data: productData,      // la informacion que queres mandar
            success: e => {
                const { response, message } = JSON.parse(e)
                if (response === 'success') {
                    setCurrentCategory(null)
                    setListState(!listState)
                } else {
                    alert(message)
                }
            }    //success
        }) // ajax
    }

    const getProducts = (categoryId, setLoading, offset) => {
        setCurrentCategory(categoryId)
        setLoading(true)
        fetch(`http://localhost:80/Bazar-Backend/category.php?categoryId=${categoryId}&offset=${(offset * 10) - 10}`)
            .then(e => e.json())
            .then(e => {
                const { total, products } = e
                if (currentCategory !== categoryId || loadedProducts === 1) setProductList({ total, products }) // Serviria como para hacer una paginacion
                else setProductList({ total, 'products': [...productList.products, ...products] }) // Muestra todos los productos
            })
            .finally(() => setLoading(false))

    }

    const getProductsForSubcategory = (subcategoryId, setLoading) => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/subcategory.php?subcategoryId=' + subcategoryId)
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
            loadedProducts,
            responseAjax,
            setResponseAjax,
            setLoadedProducts,
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