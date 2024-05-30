import React, { useState, useRef } from 'react';
import OrderOption from './components/OrderOption';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hamur from './components/Hamur';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState('');
  
  const hamurRef = useRef(null);
  const orderOptionRef = useRef(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDoughChange = (dough) => {
    setSelectedDough(dough);
  };

  const handleOrderCompletion = () => {
    if (hamurRef.current) {
      hamurRef.current.resetSelections();
    }
    if (orderOptionRef.current) {
      orderOptionRef.current.resetSelections();
    }
    setTotalPrice(0);
  };

  return (
    <div>
      <Hamur ref={hamurRef} onSizeChange={handleSizeChange} onDoughChange={handleDoughChange} />
      <OrderOption ref={orderOptionRef} selectedSize={selectedSize} selectedDough={selectedDough} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
