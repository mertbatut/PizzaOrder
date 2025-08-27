import React from 'react';
import Header from './components/Layout/Header';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './Pages/Home';
import ProductSection from './Pages/ProductSection';
import ShoppingCart from './components/Cart/ShoppingCart';
import Success from './Pages/Success';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { CartProvider } from './context/CartContext';
import ProductsPage from './Pages/ProductPage';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductSection />} />
              <Route path="/PizzaMenu" element={<ProductSection />} />
              <Route path="/products" element={<ProductsPage/>} />
              <Route path="/checkout" element={<ShoppingCart />} />
              <Route path="/success" element={<Success />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* reCAPTCHA için container: geliştirmede görünür, prod'da gizli */}
            <div
              id="recaptcha-container"
              style={{
                display: import.meta.env && import.meta.env.PROD ? 'none' : 'block',
                position: 'absolute',
                left: '-9999px',
                width: 0,
                height: 0,
              }}
            />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;