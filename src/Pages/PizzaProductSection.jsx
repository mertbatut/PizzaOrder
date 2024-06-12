import React, { useState, useRef } from 'react';
import { Breadcrumb } from "flowbite-react";
import { useHistory } from 'react-router-dom';
import OrderOption from '../components/OrderOption';
import { toast, ToastContainer } from 'react-toastify';
import Hamur from '../components/Hamur';
import OrderButton from '../components/OrderButton'; // OrderButton'ı ekleyin
import 'react-toastify/dist/ReactToastify.css';

export default function PizzaProductSection() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState('');
  
  const hamurRef = useRef(null);
  const orderOptionRef = useRef(null);
  const history = useHistory();

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
    toast.success('Siparişiniz başarı ile oluşturuldu!', {
      onClose: () => history.push('/success'),
      autoClose: 2000,
    });
  };

  return (
    <div>
      <div className='OrderHeader w-screen h-[101px] bg-[#CE2829] flex justify-center items-center absolute'>
        <a href="/"><p className='text-5xl text-[#FFFFFF] font-normal font-Londrina'>Teknolojik Yemekler</p></a>
      </div>
      <div className='bg-[#FAF7F2] w-screen h-[650px]'>
        <div className='PizzaImg flex justify-center'>
           <img className='mt-[-18rem]' src="https://s3-alpha-sig.figma.com/img/3dc3/888e/fb1b2dee44748bbd31d4f786edc3a4d1?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pYVL3p0wv-i9MeO-u~0dgPsooOWglRmSI1s1H93R1QFkls8JFbacloR5xm36CmmYmSDp78zA9ZWJdtr5G~zlM2EzK4NReYST3QAKOFY0bnRP9AP0k41SdPInTPBV~AQri~8zOl7CzIaclr6bE2a6P6jQqnw0G6~xHIjr5vVjV1UUrGXJddrkDcoqpwBtx6trHWQBZ8rt14fWnAWYq6TKyL2xA2UrHy8HHJZml~2BVCeETcR6Ctfxf6OQk1TKJujdwF2MtdYisodBVUe5Et8SfwaP1NIFvm5YMTbIG50MBX01vAP7iOv4B4vf1KHcfZcY1eBhlJ3QHlD6aR-rrp2tAQ__" alt="Pizza" />
        </div>
        <Breadcrumb aria-label="Solid background breadcrumb example" className="px-96 py-24 dark:bg-gray-800">
          <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
          <Breadcrumb.Item>Sipariş Oluştur</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex flex-col items-center gap-10'>
          <p className='font-semibold text-2xl font-Barlow text-[#292929]'>Position Absolute Acı Pizza</p>
          <div className='flex flex-row gap-[19rem]'>
            <p>85.50₺</p>
            <span className='flex flex-row gap-[10rem]'>
              <p>4.9</p>
              <p>(200)</p>
            </span>
          </div>
          <p className='w-[581px] font-normal text-base text-[#5F5F5F] font-Barlow'>
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </div>
        <Hamur ref={hamurRef} onSizeChange={handleSizeChange} onDoughChange={handleDoughChange} />
        <OrderOption ref={orderOptionRef} selectedSize={selectedSize} selectedDough={selectedDough} />
       
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}
