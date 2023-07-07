import { useEffect, useContext, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import './Products.css'
import Productlist from './ProductList'
import { Link, useParams } from 'react-router-dom'
import BtnAddProduct from './BtnAddProduct'
import Modal from '../../Modal/Modal'
import AddProduct from "./add/AddProduct"
import { ProductContext } from '../../../context/ProductContext'
import { category } from '../../../constants/constants'
import Searcher from './Searcher'

const Categories = ({ categoryId, setLoadedProducts }) => category.map(e => {
  return (
    <li key={e.categoryId} onClick={() => setLoadedProducts(2)}>
      <Link className={categoryId === e.categoryId ? 'btnCategories categorySelect' : 'btnCategories'} to={"/productos/" + e.categoryId} >{e.categoryName}</Link>
    </li>
  )
})


const ProductsSection = () => {

  const { setSectionCurrent } = useContext(NavigationContext)
  const {
    sortAvailableQuantity,
    sortPriceWholesaler,
    sortPricePublic,
    sortName,
    setLoadedProducts,
  } = useContext(ProductContext)
  const { categoryId } = useParams()
  const [modalVisible, setModalVisible] = useState(false)
  const [sortVisible, setSortVisible] = useState(false)

  useEffect(() => {
    setSectionCurrent('productos')
  }, [])

  return (
    <section>
      <div className='headerSection headerSectionProducts'>
        <ul>
          <Categories categoryId={categoryId} setLoadedProducts={setLoadedProducts} />
        </ul>
        <div>
          <Searcher />
          <BtnAddProduct setModalVisible={setModalVisible} />
        </div>
      </div>
      <div>
        <Productlist categoryId={categoryId} setModalVisible={setModalVisible} />
      </div>
      {modalVisible &&
        <Modal setModalVisible={setModalVisible}>
          <AddProduct />
        </Modal>}
    </section>
  )
}

export default ProductsSection