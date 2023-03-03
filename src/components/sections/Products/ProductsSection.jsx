import { useEffect, useContext, useState } from 'react'
import { NavigationContext } from '../../../context/NavigationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Products.css'
import Productlist from './ProductList'
import { Link, useParams } from 'react-router-dom'
import BtnAddProduct from './BtnAddProduct'
import Modal from '../../Modal/Modal'
import AddProduct from "./add/AddProduct"
import { ProductContext } from '../../../context/ProductContext'

const Categories = ({ categoryId }) => {
  const category = [
    {
      categoryName: 'Todos',
      categoryId: 'all'
    },
    {
      categoryName: 'Cocina',
      categoryId: 'cc'
    },
    {
      categoryName: 'Regalería',
      categoryId: 'cr'
    },
    {
      categoryName: 'Juguetería',
      categoryId: 'cj'
    },
    {
      categoryName: 'Mates/Termos',
      categoryId: 'cmt'
    },
    {
      categoryName: 'Limpieza/Baño',
      categoryId: 'clb'
    },
    {
      categoryName: 'Varios',
      categoryId: 'cv'
    }
  ]

  return category.map(e => (<li key={e.categoryId}><Link className={categoryId === e.categoryId ? 'btnCategories categorySelect' : 'btnCategories'} to={"/productos/" + e.categoryId} >{e.categoryName}</Link></li>))
}

const ProductsSection = () => {

  const { setSectionCurrent } = useContext(NavigationContext)
  const { sortAvailableQuantity, sortPriceWholesaler, sortPricePublic, sortName } = useContext(ProductContext)
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
          <Categories categoryId={categoryId} />
        </ul>
        <div>
          <div className='sortType'>
            <button className='sortProducts' onClick={() => setSortVisible(!sortVisible)}>Ordenar</button>
            {sortVisible &&
              <ul onClick={() => setSortVisible(false)}>
                <li onClick={() => sortName(true)}>Nombre A-Z</li>
                <li onClick={() => sortName(false)}>Nombre Z-A</li>
                <li onClick={() => sortPriceWholesaler(true)}>Menor precio mayorista</li>
                <li onClick={() => sortPriceWholesaler(false)}>Mayor precio mayorista</li>
                <li onClick={() => sortPricePublic(true)}>Menor precio público</li>
                <li onClick={() => sortPricePublic(false)}>Mayor precio público</li>
                <li onClick={() => sortAvailableQuantity(true)}>Menos stock</li>
                <li onClick={() => sortAvailableQuantity(false)}>Más stock</li>
              </ul>
            }
          </div>
          <FontAwesomeIcon icon={faSearch} />
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