import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../index.css';

const CheckBox = forwardRef(({ label, handleCheck }, ref) => {
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      setChecked(false);
      handleCheck(label, false);
    }
  }));

  const onChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    handleCheck(label, newChecked);
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        className={`w-[45px] h-[45px] rounded-md ${checked ? 'bg-[#FDC913]' : 'bg-[#FAF7F2]'}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label onClick={onChange} className="cursor-pointer">{label}</label>
    </div>
  );
});

export default CheckBox;
