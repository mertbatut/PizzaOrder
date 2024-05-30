import React, { useState } from 'react';
import OrderOption from './components/OrderOption';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hamur from './components/Hamur';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState('');

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDoughChange = (dough) => {
    setSelectedDough(dough);
  };

  const handleCheck = (checked) => {
    setTotalPrice(totalPrice + (checked ? 5 : -5));
  };

  return (
    <div>
      <Hamur onSizeChange={handleSizeChange} onDoughChange={handleDoughChange} />
      <OrderOption selectedSize={selectedSize} selectedDough={selectedDough} handleCheck={handleCheck} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
