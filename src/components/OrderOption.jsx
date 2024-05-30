import React, { useState, useRef } from 'react';
import CheckBox from './CheckBox';
import OrderButton from './OrderButton';
import '../index.css';
import { toast } from 'react-toastify';
import { HiCheck } from 'react-icons/hi';

const OrderOption = ({ selectedSize, selectedDough }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const checkBoxRefs = useRef([]);
  const orderButtonRef = useRef(null);

  const handleCheck = (label, isChecked) => {
    let updatedItems;
    if (isChecked) {
      updatedItems = [...selectedItems, label];
    } else {
      updatedItems = selectedItems.filter(item => item !== label);
    }
    setSelectedItems(updatedItems);
  };

  const handleOrder = (total) => {
    if (!selectedSize || !selectedDough) {
      toast.error('Lütfen bir boyut ve hamur tipi seçin.');
      return;
    }

    const numberedItems = selectedItems.map((item, index) => `Seçim ${index + 1}: ${item}`);
    console.log("Seçilen Malzemeler:", numberedItems);
    console.log("Seçilen Boyut:", selectedSize);
    console.log("Seçilen Hamur Tipi:", selectedDough);
    console.log("Ödenecek Tutar:", total + "₺");

    toast(
      <div className="flex items-center">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Siparişiniz Başarıyla Oluşturuldu.</div>
      </div>,
      {
        className: 'bg-green-500 text-white',
        bodyClassName: 'text-sm',
      }
    );

    // Reset all checkboxes and order button after toast is shown
    setSelectedItems([]);
    checkBoxRefs.current.forEach(ref => ref.reset());
    if (orderButtonRef.current) {
      orderButtonRef.current.reset();
    }
  };

  const totalPrice = selectedItems.length * 5;

  return (
    <div className='flex flex-col items-center'>
      <div className='Frame10 '>
        <p className='text-xl font-semibold text-[#292929]'>Ek Malzemeler</p>
        <p className='text-base font-medium text-[#5F5F5F]'>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
      </div>
      <div className='Frame9 flex gap-40 py-12'>
        <div className='Checkdiv1 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          {["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Sarımsak"].map((label, index) => (
            <CheckBox key={label} label={label} handleCheck={handleCheck} ref={el => checkBoxRefs.current[index] = el} />
          ))}
        </div>
        <div className='Checkdiv2 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          {["Mısır", "Ananas", "Soğan", "Sucuk", "Biber"].map((label, index) => (
            <CheckBox key={label} label={label} handleCheck={handleCheck} ref={el => checkBoxRefs.current[5 + index] = el} />
          ))}
        </div>
        <div className='Checkdiv3 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          {["Kabak", "Domates", "Jalepano", "Sucuk", "Füme Et"].map((label, index) => (
            <CheckBox key={label} label={label} handleCheck={handleCheck} ref={el => checkBoxRefs.current[10 + index] = el} />
          ))}
        </div>
      </div>
      <OrderButton ref={orderButtonRef} totalPrice={totalPrice} handleOrder={handleOrder} />
    </div>
  );
};

export default OrderOption;
