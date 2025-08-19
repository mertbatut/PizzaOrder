import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../index.css';

const CheckBox = forwardRef(({ label, handleCheck, disabled = false }, ref) => {
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      setChecked(false);
      handleCheck(label, false);
    }
  }));

  const onChange = () => {
    if (disabled && !checked) {
      return; // Disabled durumunda yeni seçim yapılamaz
    }
    
    const newChecked = !checked;
    setChecked(newChecked);
    handleCheck(label, newChecked);
  };

  return (
    <div className={`flex items-center gap-3 ${disabled && !checked ? 'opacity-50' : ''}`}>
      <label className="relative flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled && !checked}
          aria-checked={checked}
          className="appearance-none w-[32px] h-[32px] border-2 border-[#FDC913] rounded-md bg-transparent transition-all duration-200 focus:ring-2 focus:ring-[#FDC913] disabled:cursor-not-allowed"
          style={{}}
        />
        <span className={`absolute left-0 top-0 w-[32px] h-[32px] flex items-center justify-center pointer-events-none rounded-md transition-all duration-200 ${checked ? 'bg-[#FDC913]' : 'bg-[#FAF7F2]'}`}>
          {checked && (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L17 7" stroke="#292929" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span className={`ml-4 text-base font-medium ${disabled && !checked ? 'cursor-not-allowed text-gray-400' : 'text-[#292929]'}`}>{label}</span>
      </label>
    </div>
  );
});

export default CheckBox;