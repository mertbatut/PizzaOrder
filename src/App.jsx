import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Success from './Pages/Success';
import ProductSection from './Pages/ProductSection';


function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PizzaMenu" element={<ProductSection />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;