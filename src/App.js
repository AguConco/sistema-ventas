import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ClientsSection from "./components/sections/Clients/ClientsSection";
import Home from "./components/sections/Home/Home";
import Orders from './components/sections/Orders/Orders'
import ProductsSection from './components/sections/Products/ProductsSection'
import Header from './components/Header/Header';
import NavigationProvider from './context/NavigationContext';
import ProductProvider from './context/ProductContext';

function App() {
  return (
    <div className='app'>
      <NavigationProvider>
        <ProductProvider>
          <NavBar />
          <div className='containerSections'>
            <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/inicio' element={<Home />} />
              <Route exact path='/clientes' element={<ClientsSection />} />
              <Route exact path='/productos/:categoryId' element={<ProductsSection />} />
              <Route exact path='/pedidos' element={<Orders />} />
            </Routes>
          </div>
        </ProductProvider>
      </NavigationProvider>
    </div>
  )   
}

export default App;
