import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderButton = forwardRef(({ totalPrice, handleOrder, selectedItems, selectedSize, selectedDough }, ref) => {
  const [count, setCount] = useState(1);
  const history = useNavigate();

  useImperativeHandle(ref, () => ({
    reset() {
      setCount(0);
    }
  }));

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  const total = (count * totalPrice).toFixed(2);

  return (
    <div className="OrderMain w-full max-w-3xl mx-auto mt-8">
      <hr className="mb-8" />
      <div className="OrderButton flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="TotalButon flex items-center gap-4 bg-white rounded-xl shadow-md p-4">
          <button
            className="w-[48px] h-[48px] rounded-full bg-[#FAF7F2] text-2xl font-bold hover:bg-[#FDC913] transition-all duration-200 shadow border border-[#FDC913]"
            onClick={decrement}
            aria-label="Azalt"
          >
            -
          </button>
          <input
            className="w-[60px] h-[48px] text-center text-lg font-semibold bg-[#FAF7F2] rounded-md border border-[#FDC913] mx-2"
            type="number"
            value={count}
            readOnly
            aria-label="Adet"
          />
          <button
            className="w-[48px] h-[48px] rounded-full bg-[#FAF7F2] text-2xl font-bold hover:bg-[#FDC913] transition-all duration-200 shadow border border-[#FDC913]"
            onClick={increment}
            aria-label="Arttır"
          >
            +
          </button>
        </div>
        <div className="OrderDiv2 flex flex-col items-center gap-4">
          <div className="w-[340px] md:w-[386px] min-h-[180px] bg-[#FAF7F2] rounded-xl shadow-md flex flex-col justify-center px-8 py-6 gap-6">
            <p className="font-semibold text-xl text-[#292929]">Sipariş Toplamı</p>
            <div className="flex justify-between">
              <p className="font-semibold text-lg text-[#5F5F5F]">Seçimler</p>
              <p className="font-semibold text-lg text-[#5F5F5F]">{totalPrice.toFixed(2)}₺</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-lg text-[#CE2829]">Toplam</p>
              <p className="font-semibold text-lg text-[#CE2829]">{total}₺</p>
            </div>
          </div>
          <button
            className="w-[340px] md:w-[386px] h-[62px] rounded-md bg-[#FDC913] font-semibold text-lg text-[#292929] shadow-md hover:bg-[#FFD600] transition-all duration-200 mt-2"
            onClick={() => handleOrder(total, selectedItems, selectedSize, selectedDough, history)}
          >
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
});

export default OrderButton;
