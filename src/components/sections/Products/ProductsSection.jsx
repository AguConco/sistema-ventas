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
      categoryName: 'Mates y Termos',
      categoryId: 'cmt'
    },
    {
      categoryName: 'Limpieza y Baño',
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
  const { categoryId } = useParams()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setSectionCurrent('productos')
  }, [])

  return (
    <section>
      <div className='headerSectionProducts'>
        <ul>
          <Categories categoryId={categoryId} />
        </ul>
        <div>
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