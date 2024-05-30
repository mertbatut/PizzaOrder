import React, { useState } from 'react';
import OrderOption from './components/OrderOption';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheck = (checked) => {
    setTotalPrice(totalPrice + (checked ? 5 : -5));
  };

  return (
    <div>
      <OrderOption handleCheck={handleCheck} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
