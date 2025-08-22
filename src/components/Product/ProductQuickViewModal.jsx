import React from 'react';
import PropTypes from 'prop-types';

const ProductQuickViewModal = ({ product, open, onClose }) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2 md:px-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto p-4 relative animate-fadeInUp">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-contain rounded-xl bg-gray-50"
            onError={e => { e.target.src = '/images/pizzaresim.png'; }}
          />
          <h2 className="text-xl font-bold text-gray-900 text-center">{product.name}</h2>
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium mb-2">
            {product.category.split(',')[0].trim()}
          </span>
          <p className="text-gray-700 text-center text-sm mb-2">{product.description || 'Ürün açıklaması mevcut değil.'}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 font-bold">★ {product.rating}</span>
            <span className="text-xs text-gray-400">{product.comments}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{product.originalPrice}₺</span>
            )}
            <span className="text-2xl font-bold text-red-600">{product.price}₺</span>
          </div>
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={onClose}
            aria-label="Sipariş Ver"
          >
            Sipariş Ver
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.3s cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>
    </div>
  );
};

ProductQuickViewModal.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default ProductQuickViewModal;
