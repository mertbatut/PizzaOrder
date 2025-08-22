import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden hover:scale-[1.02] cursor-pointer border border-gray-100 h-[450px] w-full flex flex-col">
     
      
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button 
          className="w-8 h-8 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border border-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
          title="Favorilere Ekle"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        <button 
          className="w-8 h-8 bg-white/90 hover:bg-blue-500 text-gray-600 hover:text-white rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border border-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
          title="Hızlı Görünüm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
      
      {/* Product Image - SABİT YÜKSEK */}
      <div 
        className="relative h-[200px] flex items-center justify-center overflow-hidden bg-gray-50 p-4 flex-shrink-0"
        onClick={handleProductClick}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/images/pizzaresim.png';
          }}
        />
      </div>
      
      {/* Product Info - SABİT YÜKSEK */}
      <div className="p-4 flex-1 flex flex-col h-[180px]">
        {/* Category - SABİT */}
        <div className="mb-2 h-[24px] flex items-center flex-shrink-0">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
            {product.category}
          </span>
        </div>
        
        {/* Product Name - SABİT YÜKSEK */}
        <div className="h-[40px] mb-3 flex-shrink-0">
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight overflow-hidden line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        {/* Rating - SABİT */}
        <div className="flex items-center gap-1 mb-3 h-[16px] flex-shrink-0">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"/>
            </svg>
            <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">{product.comments}</span>
        </div>
        
        {/* SPACER - Kalan alanı doldurur */}
        <div className="flex-1"></div>
        
        {/* Price - SABİT YÜKSEK */}
        <div className="mb-3 h-[32px] flex flex-col justify-end flex-shrink-0">
          {product.originalPrice && (
            <div className="text-sm text-gray-400 line-through leading-none">
              {product.originalPrice}₺
            </div>
          )}
          <div className="text-xl font-bold text-red-600 leading-none">
            {product.price}₺
          </div>
        </div>
        
        {/* Action Button - SABİT YÜKSEK */}
        <div className="h-[40px] flex-shrink-0">
          <button 
            className="w-full h-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
          >
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;