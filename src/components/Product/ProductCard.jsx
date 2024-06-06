import React from 'react';


const ProductCard = ({ product }) => {
    return (
<div className="product-card w-[416px] h-[440px] bg-[#FFFFFF] flex flex-col items-center gap-4">
      <img src={product.image} alt={product.name} />
      
      <h2 className='text-[#292929] font-semibold text-2xl font-Barlow '>{product.name}</h2>
      <div className='flex gap-32'>
      <p className='font-Barlow font-semibold text-base text-[#1B1B1BB2]'>{product.rating}</p>
      <p className='font-Barlow font-semibold text-base text-[#1B1B1BB2]'>{product.comments}</p>
      <p className='text-[#292929] font-semibold text-2xl font-Barlow '>{product.pricing}</p>
    
      </div>
    </div>
    );
};

export default ProductCard;