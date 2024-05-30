import React, { useState } from 'react';
import CheckBox from './CheckBox';
import OrderButton from './OrderButton';
import '../index.css';

const OrderOption = () => {
  const [selectedItems, setSelectedItems] = useState([]);

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
    const numberedItems = selectedItems.map((item, index) => `Seçim ${index + 1}: ${item}`);
    console.log("Seçilen Malzemeler:", numberedItems);
    console.log("Ödenecek Tutar:", total + "₺");
  };

  const totalPrice = selectedItems.length * 5;

  return (
    <div className='flex flex-col items-center'>
      <div className='Frame10 '>
        <p className='text-xl font-semibold text-[#292929]'>Ek Malzemeler</p>
        <p className='text-base font-medium text-[#5F5F5F]'>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
      </div>
      <div className='Frame9 flex gap-40 '>
        <div className='Checkdiv1 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          <CheckBox label="Pepperoni" handleCheck={handleCheck} />
          <CheckBox label="Sosis" handleCheck={handleCheck} />
          <CheckBox label="Kanada Jambonu" handleCheck={handleCheck} />
          <CheckBox label="Tavuk Izgara" handleCheck={handleCheck} />
          <CheckBox label="Sarımsak" handleCheck={handleCheck} />
        </div>
        <div className='Checkdiv2 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          <CheckBox label="Mısır" handleCheck={handleCheck} />
          <CheckBox label="Ananas" handleCheck={handleCheck} />
          <CheckBox label="Soğan" handleCheck={handleCheck} />
          <CheckBox label="Sucuk" handleCheck={handleCheck} />
          <CheckBox label="Biber" handleCheck={handleCheck} />
        </div>
        <div className='Checkdiv3 flex flex-col gap-4 font-bold text-base text-[#5F5F5F]'>
          <CheckBox label="Kabak" handleCheck={handleCheck} />
          <CheckBox label="Domates" handleCheck={handleCheck} />
          <CheckBox label="Jalepano" handleCheck={handleCheck} />
          <CheckBox label="Sucuk" handleCheck={handleCheck} />
          <CheckBox label="Füme Et" handleCheck={handleCheck} />
        </div>
      </div>
      <OrderButton totalPrice={totalPrice} handleOrder={handleOrder} />
    </div>
  );
};

export default OrderOption;
