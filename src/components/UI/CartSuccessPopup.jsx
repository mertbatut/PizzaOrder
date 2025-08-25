import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartSuccessPopup = ({ isVisible, product, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !product) return null;

  const handleViewCart = () => {
    onClose();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md mx-4 overflow-hidden transform animate-slideUp">
        
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-4 w-16 h-16 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-2 left-4 w-12 h-12 bg-white rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Başarıyla Eklendi!</h2>
            <p className="text-green-100 text-sm">Ürün sepetinize eklendi</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/images/pizzaresim.png'; }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.category.split(',')[0].trim()}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-green-600">{product.price}₺</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}₺</span>
                )}
              </div>
            </div>

            {/* Quantity Badge */}
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
              +1
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleViewCart}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
              </svg>
              Sepeti Görüntüle
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Alışverişe Devam Et
            </button>
          </div>
        </div>

        {/* Auto Close Indicator */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          3 saniye sonra otomatik kapanacak
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(60px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default CartSuccessPopup;