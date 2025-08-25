import React from 'react';

const CartSpinner = ({ isVisible, productName }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 transform animate-scaleIn">
        {/* Spinner Container */}
        <div className="text-center space-y-6">
          {/* Animated Cart Icon with Spinner */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Spinning Ring */}
              <div className="w-20 h-20 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
              
              {/* Cart Icon in Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Sepete Ekleniyor...</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium text-green-600">{productName}</span> sepetinize ekleniyor
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default CartSpinner;