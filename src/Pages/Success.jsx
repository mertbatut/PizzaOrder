import React from 'react'

export default function Success() {
  return (
    <>
    <div className='Success bg-[#CE2829] h-screen flex flex-col justify-center items-center gap-20'>
    <h1 className="text-5xl font-normal font-Londrina text-[#FFFFFF]">Teknolojik Yemekler</h1>
    <p className="text-4xl mb-2 font-Satisfy font-normal text-[#FDC913]">lezzetin yolda</p>
    <p className='text-[86px] text-[#FFFFFF] font-Condensed font-light'>SİPARİŞİNİZ ALINDI</p>
    <hr className='w-[581px]' />
    <p className='font-semibold text-[22px] text-[#FFFFFF]'>Position Absolute Acı Pizza</p>
    <div className='h-[153px] w-[201px]'>
        <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>Ek Malzemeler: Pepperoni, Sosis, Mısır, Ananas, Jalepeno*</p>
        <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>Hamur: Süpper İnce *</p>
        <p className='text-base font-normal font-Barlow text-[#FFFFFF]'>Ek Malzemeler: Pepperoni, Sosis, Mısır, Ananas, Jalepeno*</p>
    </div>

    </div>
    </>
  )

}
