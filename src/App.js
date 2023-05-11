import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ClientsSection from "./components/sections/Clients/ClientsSection";
import Home from "./components/sections/Home/Home";
import Orders from './components/sections/Orders/OrdersSection'
import ProductsSection from './components/sections/Products/ProductsSection'
import NavigationProvider from './context/NavigationContext';
import ProductProvider from './context/ProductContext';
import Detail from './components/Detail/Detail';
import ClientProvider from './context/ClientContext';
import OrdersProvider from './context/OrdersContext';

function App() {
  return (
    <div className='app'>
      <NavigationProvider>
        <OrdersProvider>
          <ClientProvider>
            <ProductProvider>  
              <NavBar />
              <div className='containerSections'>
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
        </OrdersProvider>
      </NavigationProvider>
    </div>
  )
}

export default App;
