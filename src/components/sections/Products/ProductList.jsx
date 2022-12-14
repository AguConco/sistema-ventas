import { useState, useEffect, useContext } from 'react'
import BtnAddProduct from './BtnAddProduct'
import Product from './Product'
import Loading from '../../Loading/Loading'
import { ProductContext } from '../../../context/ProductContext'

const Productlist = ({setModalVisible, categoryId}) => {

    const {listState} = useContext(ProductContext)
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:80/Bazar-Backend/category.php?categoryId='+categoryId)
        .then(e => e.json())
        .then(e => {
            setProductList(e)
            setLoading(false)
        })
    }, [categoryId, listState])

    return (
        productList.length === 0 ?
            <div className='productListEmpty'>
                <p>¡No hay productos en esta categoría!</p>
                <BtnAddProduct setModalVisible={setModalVisible} />
            </div>
            :
            !loading ? <table cellSpacing={0}>
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
                    {productList.map(p => <Product detail={p}/>)}
                </tbody>
            </table> :
            <Loading />
    )
}

export default Productlist