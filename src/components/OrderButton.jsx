import React, { useState } from 'react';

const OrderButton = ({ totalPrice, handleOrder }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  const total = (count * totalPrice).toFixed(2);

  return (
    <div className='OrderMain'>
      <hr />
      <div className='OrderButton flex pl-[47rem]'>
        <div className='TotalButon'>
          <button className='w-[47px] h-[47px] bg-[#FAF7F2]' onClick={decrement}>-</button>
          <input
            className='w-[47px] h-[47px] bg-[#FAF7F2] pl-4'
            type="number"
            value={count}
            readOnly
          />
          <button className='w-[47px] h-[47px] bg-[#FAF7F2]' onClick={increment}>+</button>
        </div>
        <div className='OrderDiv2'>
          <div className='w-[386px] h-[197px] bg-[#FAF7F2] flex flex-col justify-center pl-12 gap-8'>
            <p className='font-semibold text-xl text-[#292929]'>Sipariş Toplamı</p>
            <div className='flex gap-40'>
              <p className='font-semibold text-lg text-[#5F5F5F]'>Seçimler</p>
              <p className='font-semibold text-lg text-[#5F5F5F]'>{totalPrice.toFixed(2)}₺</p>
            </div>
            <div className='flex gap-40'>
              <p className='font-semibold text-lg text-[#CE2829]'>Toplam</p>
              <p className='font-semibold text-lg text-[#CE2829]'>{total}₺</p>
            </div>
          </div>
          <button 
            className='w-[386px] h-[62px] rounded-md bg-[#FDC913] font-semibold text-lg text-[#292929]'
            onClick={handleOrder}
          >
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderButton;
