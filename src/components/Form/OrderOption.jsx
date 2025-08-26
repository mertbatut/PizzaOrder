import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import CheckBox from './CheckBox';
import '../index.css';

const OrderOption = forwardRef(({ selectedSize, selectedDough, onIngredientsChange }, ref) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const checkBoxRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    resetSelections() {
      setSelectedItems([]);
      checkBoxRefs.current.forEach(ref => ref && ref.reset());
    }
  }));

  const handleCheck = (label, isChecked) => {
    let updatedItems;
    if (isChecked) {
      updatedItems = [...selectedItems, label];
    } else {
      updatedItems = selectedItems.filter(item => item !== label);
    }
    setSelectedItems(updatedItems);
    
    // Parent component'e seçilen malzemeleri bildir
    if (onIngredientsChange) {
      onIngredientsChange(updatedItems);
    }
  };

  const ingredients = [
    // İlk sütun
    ["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Sarımsak"],
    // İkinci sütun  
    ["Mısır", "Ananas", "Soğan", "Sucuk", "Biber"],
    // Üçüncü sütun
    ["Kabak", "Domates", "Jalepano", "Füme Et", "Zeytin"]
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="Frame10 text-center mb-8">
        <p className="text-2xl font-bold text-[#292929] mb-2">Ek Malzemeler</p>
        <p className="text-base font-medium text-[#5F5F5F]">
          En az 4, en fazla 10 malzeme seçebilirsiniz. <span className="font-semibold">(Her biri 5₺)</span>
        </p>
        <p className="text-sm text-[#5F5F5F] mt-1">
          Seçilen: <span className="font-bold text-[#FDC913]">{selectedItems.length}</span>/10
        </p>
      </div>

      <div className="Frame9 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 py-8 w-full justify-items-center">
        {ingredients.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4 font-bold text-base text-[#5F5F5F] w-full">
            {column.map((ingredient, index) => {
              const globalIndex = columnIndex * 5 + index;
              return (
                <CheckBox
                  key={ingredient}
                  label={ingredient}
                  handleCheck={handleCheck}
                  ref={el => checkBoxRefs.current[globalIndex] = el}
                  disabled={!selectedItems.includes(ingredient) && selectedItems.length >= 10}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Seçim durumu göstergesi */}
      <div className="mb-4 w-full flex justify-center">
        {selectedItems.length < 4 && (
          <p className="text-orange-600 text-sm bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 shadow-sm">
            En az {4 - selectedItems.length} malzeme daha seçmelisiniz
          </p>
        )}
        {selectedItems.length >= 4 && selectedItems.length <= 10 && (
          <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-2 shadow-sm">
            ✓ Malzeme seçimi tamamlandı
          </p>
        )}
      </div>
    </div>
  );
});

export default OrderOption;