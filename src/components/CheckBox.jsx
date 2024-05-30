import React from 'react';
import '../index.css';

const CheckBox = ({ label, handleCheck }) => {
  const [checked, setChecked] = React.useState(false);

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
};

export default CheckBox;
