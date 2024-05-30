import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Hamur = forwardRef(({ onSizeChange, onDoughChange }, ref) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedDough, setSelectedDough] = useState('');

    useImperativeHandle(ref, () => ({
        resetSelections() {
            setSelectedSize(null);
            setSelectedDough('');
        }
    }));

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        onSizeChange(size);
    };

    const handleDoughChange = (e) => {
        setSelectedDough(e.target.value);
        onDoughChange(e.target.value);
    };

    return (
        <div>
            <div className='Frame16 flex justify-evenly items-center py-12'>
                <div className='SizeDiv'>
                    <ul className='flex gap-4'>
                        {['S', 'M', 'L'].map((size) => (
                            <a
                                key={size}
                                className={`w-[56px] h-[56px] rounded-3xl flex items-center justify-center ${
                                    selectedSize === size ? 'bg-[#FFEECC] text-black' : 'bg-[#FAF7F2]'
                                }`}
                                href="#"
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </a>
                        ))}
                    </ul>
                    <p>Boyut Seç</p>
                </div>
                <div className='KalinlikDiv'>
                    <form className="max-w-sm mx-auto">
                        <label htmlFor="dough" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Hamur Seç
                        </label>
                        <select
                            id="dough"
                            value={selectedDough}
                            onChange={handleDoughChange}
                            className="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">--Hamur Kalınlığı Seç--</option>
                            <option value="ince kenar">İnce Kenar</option>
                            <option value="yumuşak kenar">Yumuşak Kenar</option>
                            <option value="kalin kenar">Kalın Kenar</option>
                            <option value="ipince kenar">İpince Kenar</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Hamur;
