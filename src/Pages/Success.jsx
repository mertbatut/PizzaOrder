import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  
  // v6'da location.state şeklinde erişilir
  const { selectedItems, selectedSize, selectedDough, total, orderData } = location.state || {};

  return (
    <>
      <div className='Success bg-[#CE2829] h-screen flex flex-col justify-center items-center gap-20'>
        <h1 className="text-5xl font-normal font-Londrina text-[#FFFFFF]">Teknolojik Yemekler</h1>
        <p className="text-4xl mb-2 font-Satisfy font-normal text-[#FDC913]">lezzetin yolda</p>
        <p className='text-[86px] text-[#FFFFFF] font-Condensed font-light'>SİPARİŞİNİZ ALINDI</p>
        <hr className='w-[581px]' />
        <p className='font-semibold text-[22px] text-[#FFFFFF]'>Position Absolute Acı Pizza</p>
        
        <div className='h-auto w-[400px] text-center space-y-3'>
          {selectedSize && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Boyut:</span> {selectedSize}
            </p>
          )}
          
          {selectedDough && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Hamur:</span> {selectedDough}
            </p>
          )}
          
          {selectedItems && selectedItems.length > 0 && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Ek Malzemeler:</span> {selectedItems.join(', ')}
            </p>
          )}
          
          {total && (
            <p className='text-lg font-bold font-Barlow text-[#FDC913] mt-4'>
              <span className='font-semibold'>Toplam Tutar:</span> {total}₺
            </p>
          )}

          {orderData && orderData.id && (
            <p className='text-sm font-normal font-Barlow text-[#FFFFFF] mt-4'>
              <span className='font-semibold'>Sipariş ID:</span> {orderData.id}
            </p>
          )}
        </div>
        
        <div className='mt-8'>
          <Link 
            to="/" 
            className='bg-[#FDC913] text-[#292929] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block'
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </>
  );
}