import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ClientsSection from "./components/sections/Clients/ClientsSection";
import Home from "./components/sections/Home/Home";
import Orders from './components/sections/Orders/Orders'
import ProductsSection from './components/sections/Products/ProductsSection'
import Header from './components/Header/Header';
import NavigationProvider from './context/NavigationContext';
import ProductProvider from './context/ProductContext';
import Detail from './components/Detail/Detail';
import ClientProvider from './context/ClientContext';

function App() {
  return (
    <div className='app'>
      <NavigationProvider>
        <ClientProvider>
          <ProductProvider>
            <NavBar />
            <div className='containerSections'>
              <Header />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/inicio' element={<Home />} />
                <Route exact path='/clientes/:clientsId' element={<ClientsSection />} />
                <Route exact path='/productos/:categoryId' element={<ProductsSection />} />
                <Route exact path='/pedidos' element={<Orders />} />
                <Route exact path='/:productId' element={<Detail />} />
              </Routes>
            </div>
          </ProductProvider>
        </ClientProvider>
      </NavigationProvider>
    </div>
  )
}

export default App;
