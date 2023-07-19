import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ClientsSection from "./components/sections/Clients/ClientsSection";
import Home from "./components/sections/Home/Home";
import ProductsSection from './components/sections/Products/ProductsSection'
import NavigationProvider from './context/NavigationContext';
import ProductProvider from './context/ProductContext';
import Detail from './components/Detail/Detail';
import ClientProvider from './context/ClientContext';
import OrdersProvider from './context/OrdersContext';
import { Barcode } from './components/Barcode/Barcode';
import OrdersSection from './components/sections/Orders/OrdersSection';
import { SearcherSection } from './components/sections/Searcher/SectionSearcher';

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
                  <Route exact path='/pedidos/' element={<OrdersSection />} />
                  <Route exact path='/pedidos/:clientId/:orderId' element={<OrdersSection />} />
                  <Route exact path='/:productId' element={<Detail />} />
                  <Route exact path='/barcode' element={<Barcode />} />
                  <Route exact path='/buscador/:searchValue' element={<SearcherSection />} />
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
