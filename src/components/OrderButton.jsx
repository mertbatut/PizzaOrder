import React from 'react';

const OrderButton = ({ totalPrice }) => {
  return (
    <div className='OrderMain flex justify-evenly'>
      <hr />
      <div className='OrderButton flex'>
        <div className='OrderDiv2'>
          <div className='w-[386px] h-[197px] bg-[#FAF7F2] flex flex-col justify-center pl-12 gap-8'>
            <p className='font-semibold text-xl text-[#292929]'>Sipariş Toplamı</p>
            <div className='flex gap-40'>
              <p className='font-semibold text-lg text-[#5F5F5F]'>Seçimler</p>
              <p className='font-semibold text-lg text-[#5F5F5F]'>{totalPrice.toFixed(2)}₺</p> {/* totalPrice burada gösteriliyor */}
            </div>
            <div className='flex gap-40'>
              <p className='font-semibold text-lg text-[#CE2829]'>Toplam</p>
              <p className='font-semibold text-lg text-[#CE2829]'>110.50₺</p>
            </div>
          </div>
          <button className='w-[386px] h-[62px] rounded-md bg-[#FDC913] font-semibold text-lg text-[#292929]'>Sipariş Ver</button>
        </div>
      </div>
    </div>
  );
};

export default OrderButton;
