import React from 'react';
import CheckBox from './CheckBox'; // Adjust the import path if necessary
import '../index.css';

const OrderOption = ({ handleCheck }) => {
  return (
    <div>
      <div className='Frame10'>
        <p>Ek Malzemeler</p>
        <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
      </div>
      <div className='Frame9 flex gap-40'>
        <div className='Checkdiv1 flex flex-col gap-4'>
          <CheckBox label="Pepperoni" handleCheck={handleCheck} />
          <CheckBox label="Sosis" handleCheck={handleCheck} />
          <CheckBox label="Kanada Jambonu" handleCheck={handleCheck} />
          <CheckBox label="Tavuk Izgara" handleCheck={handleCheck} />
          <CheckBox label="Sarımsak" handleCheck={handleCheck} />
        </div>
        <div className='Checkdiv2 flex flex-col gap-4'>
          <CheckBox label="Mısır" handleCheck={handleCheck} />
          <CheckBox label="Ananas" handleCheck={handleCheck} />
          <CheckBox label="Soğan" handleCheck={handleCheck} />
          <CheckBox label="Sucuk" handleCheck={handleCheck} />
          <CheckBox label="Biber" handleCheck={handleCheck} />
        </div>
        <div className='Checkdiv3 flex flex-col gap-4'>
          <CheckBox label="Kabak" handleCheck={handleCheck} />
          <CheckBox label="Domates" handleCheck={handleCheck} />
          <CheckBox label="Jalepano" handleCheck={handleCheck} />
          <CheckBox label="Sucuk" handleCheck={handleCheck} />
          <CheckBox label="Füme Et" handleCheck={handleCheck} />
        </div>
      </div>
    </div>
  );
};

export default OrderOption;
