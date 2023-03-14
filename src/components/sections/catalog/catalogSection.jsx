import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavigationContext } from '../../../context/NavigationContext'
import { ProductContext } from '../../../context/ProductContext'
import Loading from '../../Loading/Loading'
import ProductCatalog from './ProductCatalog'
import './catalog.css'

const Catalog = () => {

    const { setSectionCurrent } = useContext(NavigationContext)
    const { getProducts, productList } = useContext(ProductContext)

    const [loading, setLoading] = useState(false)

    const { categoryId } = useParams()

    useEffect(() => {
        setSectionCurrent('catálogo')
        getProducts(categoryId, setLoading)
    }, [categoryId])

    return (
        <section>
            <div className='headerSection headerSectionCatalog'>
                <div className="historyNavegation">
                </div>
            </div>
            {loading ?
                <Loading />
                :
                productList !== 0 &&
                <div className='containerProducts'>
                    {productList.map(e => <ProductCatalog detail={e} />)}
                </div>
            }
        </section>
    )
}

export default Catalog