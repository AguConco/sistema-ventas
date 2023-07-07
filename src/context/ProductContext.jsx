import { createContext, useState } from "react"
import $ from 'jquery'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const [listState, setListState] = useState(false)
    const [productList, setProductList] = useState({ 'products': [] })
    const [loadedProducts, setLoadedProducts] = useState(2);
    const [responseAjax, setResponseAjax] = useState('')

    const urlHost = 'https://panel-control-bazar.000webhostapp.com/backend/'
    // const urlHost = 'http://localhost:80/Bazar-Backend/'

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
            url: `${urlHost}addProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',                 // como la queres mandar si POST, GET, PUT o DELETE
            processData: false,
            contentType: false,
            data: productData,      // la informacion que queres mandar
            success: e => {
                const { response } = JSON.parse(e)

                setResponseAjax(JSON.parse(e))
                if (response === 'success') {
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
            state,
            category
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
        productEditData.append('subcategory', category.subcategory)

        $.ajax({
            url: `${urlHost}editProduct.php`,              // a donde queres enviar la informacion
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
            url: `${urlHost}removeProduct.php`,              // a donde queres enviar la informacion
            type: 'POST',
            processData: false,
            contentType: false,               // como la queres mandar si POST, GET, PUT o DELETE
            data: productData,      // la informacion que queres mandar
            success: e => {
                const { response, message } = JSON.parse(e)
                if (response === 'success') {
                    setListState(!listState)
                } else {
                    alert(message)
                }
            }    //success
        }) // ajax
    }

    const getProducts = (categoryId, setLoading) => {
        setLoading(true)
        fetch(`${urlHost}category.php?categoryId=${categoryId}&limit=${20}&offset=${(loadedProducts * 10) - 20}`)
            .then(e => e.json())
            .then(e => {
                setProductList(e)
                // const { total, products } = e
                // if (currentCategory !== categoryId || loadedProducts === 2) setProductList(e) // Serviria como para hacer una paginacion
                // else setProductList({ total, 'products': [...productList.products, ...products] }) // Muestra todos los productos
            })
            .finally(() => setLoading(false))

    }

    const changeFolderDrive = async (data) => {
        const dataFolder = new FormData()
        dataFolder.append('id', data.id)
        dataFolder.append('folder', data.folderId)

        return await fetch(`${urlHost}editFolderDrive.php`, {
            method: 'POST',
            body: dataFolder
        })

    }

    return <ProductContext.Provider value={
        {
            productList,
            listState,
            loadedProducts,
            responseAjax,
            setResponseAjax,
            setLoadedProducts,
            setProductList,
            addProduct,
            editProduct,
            removeProduct,
            getProducts,
            changeFolderDrive
        }
    }>{children}</ProductContext.Provider>
}

export default ProductProvider