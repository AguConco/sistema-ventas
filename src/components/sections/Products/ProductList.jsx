import { useState, useEffect, useContext } from 'react'
import BtnAddProduct from './BtnAddProduct'
import Product from './Product'
import Loading from '../../Loading/Loading'
import { ProductContext } from '../../../context/ProductContext'


const Productlist = ({ setModalVisible, categoryId }) => {

    const { listState, getProducts, productList } = useContext(ProductContext)
    const [loading, setLoading] = useState(true)
    const [loadedProducts, setLoadedProducts] = useState(2);

    const products = productList.slice(0, loadedProducts * 10)

    window.onscroll = () => {
        if (products.length < productList.length)
            if (window.innerHeight + (window.scrollY + 5) >= document.body.offsetHeight) setLoadedProducts(loadedProducts + 1)
    }

    useEffect(() => {
        getProducts(categoryId, setLoading)
    }, [categoryId, listState])

    return (
        productList.length === 0 ?
            <div className='productListEmpty'>
                <p>¡No hay productos en esta categoría!</p>
                <BtnAddProduct setModalVisible={setModalVisible} />
            </div>
            :
            !loading ?
                <table className='tableProducts' cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Público</th>
                            <th>mayorista</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(e => <Product key={e.id} detail={e} />)}
                    </tbody>
                </table> :
                <Loading />
    )
}

export default Productlist