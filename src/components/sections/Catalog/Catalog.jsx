import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { category, sub } from "../../../constants/constants"
import { NavigationContext } from "../../../context/NavigationContext"
import Loading from "../../Loading/Loading"
import { ProductContext } from "../../../context/ProductContext"
import './Catalog.css'
import Modal from "../../Modal/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const Catalog = () => {

    const { setSectionCurrent } = useContext(NavigationContext)
    const {
        getProducts,
        productList,
        getProductsForSubcategory,
        setCurrentCategory,
    } = useContext(ProductContext)

    const { categoryId, subcategoryId } = useParams()

    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [picture, setPicture] = useState('')
    const [height, setHeight] = useState(false)
    const [loadedProducts, setLoadedProducts] = useState(2);

    const products = productList.sort((a, b) => {
        const name_a = a.name.toLowerCase()
        const name_b = b.name.toLowerCase()

        if (name_a > name_b) {
            return 1;
        }
        if (name_a < name_b) {
            return -1;
        }
        return 0;
    }).slice(0, loadedProducts * 10)

    window.onscroll = () => {
        if (products.length < productList.length)
            if (window.innerHeight + (window.scrollY + 5) >= document.body.offsetHeight) setLoadedProducts(loadedProducts + 1)
    }

    useEffect(() => {
        setSectionCurrent('catálogo')
        if (subcategoryId === undefined) getProducts(categoryId, setLoading)
        else getProductsForSubcategory(subcategoryId, setLoading)
    }, [categoryId, subcategoryId])

    const Categories = () => category.map(e => (
        <li key={e.categoryId}>
            <pre>
                <Link
                    className={categoryId === e.categoryId ? 'btnCategories categorySelect' : 'btnCategories'}
                    to={"/catalogo/" + e.categoryId}
                >
                    {e.categoryName.replace('/', ' y ')}
                </Link>
            </pre>
        </li>
    ))

    const Subcategories = () => sub.map(s => (
        s[0] === categoryId &&
        s.map(e => (
            e !== categoryId &&
            <Link
                key={e.split('|')[1]}
                to={'/catalogo/' + categoryId + '/' + e.split('|')[1]}
                onClick={() => setCurrentCategory(subcategoryId)}
                className={subcategoryId === e.split('|')[1] ? "btnSubcategory  btnSubcategorySelected" : "btnSubcategory"}
            >
                {e.split('|')[0]}
            </Link>
        ))
    ))


    return (
        <section className="catalog">
            <div className="headerSectionCatalog">
                <div>
                    <nav>
                        <ul>
                            <Categories />
                        </ul>
                    </nav>
                    {categoryId !== 'all' &&
                        <div>
                            <div className="containerFilter">
                                <button className="btnFilter" onClick={() => { setHeight(!height) }}>Filtros <FontAwesomeIcon icon={faAngleDown} /></button>
                                {subcategoryId && <Link to={"/catalogo/" + categoryId} className="removeFilter">Eliminar filtros</Link>}
                            </div>
                            <ul style={height ? { height: 'auto' } : { height: 0 }} className="containerSubcategory">
                                <Subcategories />
                            </ul>
                        </div>
                    }
                </div>
            </div>
            {loading ?
                <Loading />
                :
                <div className="containerCatalog">
                    {
                        products.map(e => (
                            <div key={e.id}
                                className="productCatalog"
                                title={e.name}
                                onClick={() => {
                                    setPicture(e.picture)
                                    setModalVisible(true)
                                }}
                            >
                                <h3>{e.name}</h3>
                                <span>Código: {e.code}</span>
                                <div>
                                    <img src={e.picture} alt={e.name} />
                                </div>
                                <h5>${e.price.price_wholesaler}</h5>
                            </div>
                        ))
                    }
                </div>}
            {modalVisible &&
                <Modal setModalVisible={setModalVisible}>
                    <img src={picture} />
                </Modal>}
        </section>
    )
}

export default Catalog