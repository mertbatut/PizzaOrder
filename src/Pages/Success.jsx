import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  
  // location.state'den gelen veriler
  const { 
    selectedItems, 
    selectedSize, 
    selectedDough, 
    total, 
    orderData, 
    product 
  } = location.state || {};

  return (
    <>
      <div className='Success bg-[#CE2829] h-screen flex flex-col justify-center items-center gap-20'>
        <h1 className="text-5xl font-normal font-Londrina text-[#FFFFFF]">Teknolojik Yemekler</h1>
        <p className="text-4xl mb-2 font-Satisfy font-normal text-[#FDC913]">lezzetin yolda</p>
        <p className='text-[86px] text-[#FFFFFF] font-Condensed font-light'>SİPARİŞİNİZ ALINDI</p>
        <hr className='w-[581px]' />
        
        {/* Dinamik ürün adı */}
        <p className='font-semibold text-[22px] text-[#FFFFFF]'>
          {product?.name || 'Position Absolute Acı Pizza'}
        </p>
        
        <div className='h-auto w-[400px] text-center space-y-3'>
          {/* Ürün kategorisi */}
          {product?.category && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Kategori:</span> {product.category}
            </p>
          )}
          
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
          
          {/* Adet bilgisi */}
          {orderData?.adet && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Adet:</span> {orderData.adet}
            </p>
          )}
          
          {/* Özel not */}
          {orderData?.ozel && (
            <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>
              <span className='font-semibold'>Özel Not:</span> {orderData.ozel}
            </p>
          )}
          
          {total && (
            <p className='text-lg font-bold font-Barlow text-[#FDC913] mt-4'>
              <span className='font-semibold'>Toplam Tutar:</span> {total.toFixed(2)}₺
            </p>
          )}

          {orderData?.tarih && (
            <p className='text-sm font-normal font-Barlow text-[#FFFFFF] mt-4'>
              <span className='font-semibold'>Sipariş Tarihi:</span> {new Date(orderData.tarih).toLocaleString('tr-TR')}
            </p>
          )}

          {/* Sipariş ID simülasyonu */}
          {orderData && (
            <p className='text-sm font-normal font-Barlow text-[#FFFFFF] mt-4'>
              <span className='font-semibold'>Sipariş ID:</span> TY-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </p>
          )}
        </div>
        
        <div className='mt-8 flex flex-col items-center gap-4'>
          <Link 
            to="/" 
            className='bg-[#FDC913] text-[#292929] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block'
          >
            Ana Sayfaya Dön
          </Link>
          
          {/* Yeni sipariş butonu */}
          <Link 
            to="/PizzaMenu" 
            className='bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#CE2829] transition-colors inline-block'
          >
            Yeni Sipariş Ver
          </Link>
        </div>
      </div>
    </>
  );
}