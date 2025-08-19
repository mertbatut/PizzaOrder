import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 w-full max-w-[320px] mx-auto border border-gray-200 p-6 cursor-pointer"
      onClick={() => navigate('/PizzaMenu')}
    >
      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
            SALE!
          </span>
        </div>
      )}
      
      {/* Hover Action Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
        {/* Add to Cart Button */}
        <button className="w-12 h-12 bg-white hover:bg-red-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group/btn">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
          </svg>
          {/* Tooltip */}
          <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add to Cart
          </div>
        </button>
        
        {/* Quick View Button */}
        <button className="w-12 h-12 bg-white hover:bg-blue-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group/btn">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {/* Tooltip */}
          <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Quick View
          </div>
        </button>
      </div>
      
      {/* Product Image */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden mb-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
          onError={(e) => {
            e.target.src = '';
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="text-center space-y-3">
        {/* Category */}
        <div className="mb-3">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {product.category}
          </span>
        </div>
        
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-lg font-medium">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-red-600">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;