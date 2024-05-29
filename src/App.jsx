import React, { useState } from 'react';
import OrderOption from './components/OrderOption';
import OrderButton from './components/OrderButton';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheck = (checked) => {
    setTotalPrice(totalPrice + (checked ? 5 : -5));
  };

  return (
    <div>
      <OrderOption handleCheck={handleCheck} />
      <OrderButton totalPrice={totalPrice} />
    </div>
  );
}

export default App;
