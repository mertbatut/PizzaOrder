import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './Pages/Home';
import Success from './Pages/Success';
import ProductSection from './Pages/ProductSection';
import ProductsPage from './Pages/ProductPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dinamik ürün rotası - ID ile */}
          <Route path="/product/:id" element={<ProductSection />} />
          
          {/* Varsayılan ürün rotası - ID olmadan */}
          <Route path="/PizzaMenu" element={<ProductSection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout" element={<ShoppingCart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;