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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-3xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-evenly items-center py-8 gap-8 lg:gap-12">
                <div className="SizeDiv text-center">
                    <p className="mb-4 text-lg font-semibold text-[#292929]">Boyut Seç</p>
                    <ul className="flex gap-4">
                        {['S', 'M', 'L'].map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`w-[56px] h-[56px] rounded-3xl flex items-center justify-center font-bold transition-all duration-200 border-2 ${
                                    selectedSize === size
                                        ? 'bg-[#FFEECC] text-black border-[#FDC913] shadow-lg scale-110'
                                        : 'bg-[#FAF7F2] text-[#5F5F5F] border-[#FAF7F2] hover:bg-[#FFEECC] hover:border-[#FDC913] hover:scale-105'
                                }`}
                                onClick={() => handleSizeClick(size)}
                                aria-pressed={selectedSize === size}
                            >
                                {size}
                            </button>
                        ))}
                    </ul>
                </div>
                <div className="KalinlikDiv w-full max-w-sm">
                    <form className="max-w-sm mx-auto">
                        <label htmlFor="dough" className="block mb-2 text-lg font-semibold text-[#292929]">
                            Hamur Seç
                        </label>
                        <select
                            id="dough"
                            value={selectedDough}
                            onChange={handleDoughChange}
                            className="bg-[#FAF7F2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FDC913] focus:border-[#FDC913] block w-full p-2.5"
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
