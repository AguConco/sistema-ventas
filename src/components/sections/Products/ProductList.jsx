import { useState, useEffect, useContext } from 'react'
import BtnAddProduct from './BtnAddProduct'
import Product from './Product'
import Loading from '../../Loading/Loading'
import { ProductContext } from '../../../context/ProductContext'

const Productlist = ({ setModalVisible, categoryId }) => {

    const {
        listState,
        getProducts,
        productList,
        loadedProducts,
        setLoadedProducts
    } = useContext(ProductContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts(categoryId, setLoading)
    }, [categoryId, listState, loadedProducts])

    return (
        productList?.products?.length === 0 ?
            <div className='productListEmpty'>
                <p>¡No hay productos en esta categoría!</p>
                <BtnAddProduct setModalVisible={setModalVisible} />
            </div>
            :
            !loading ?
                <div className='containerTableProducts'>
                    <table className='tableProducts' cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>mayorista</th>
                                <th>Público</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList?.products.map(e => <Product key={e.id} detail={e} />)}
                        </tbody>
                    </table>
                    <div className='pagination'>
                       {loadedProducts > 2 && <button onClick={() =>  setLoadedProducts(loadedProducts - 2)}>Anterior</button>}
                       <span>{loadedProducts / 2} de {Math.ceil(productList.total / 20)}</span>
                       {(loadedProducts * 10) < productList.total && <button onClick={() =>  setLoadedProducts(loadedProducts + 2)}>Siguente</button>}
                    </div>
                </div>
                :
                <Loading />
    )
}

export default Productlist