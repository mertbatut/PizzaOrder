import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import CartSpinner from '../../components/UI/CartSpinner';
import CartSuccessPopup from '../../components/UI/CartSuccessPopup';
import HeartExplosion from '../../components/UI/HeartExplosion';

const ProductCard = ({
  product,
  viewMode = 'grid',
  onNavigate,
  showFuzzyScore = false,
  className = '',
  onQuickView
}) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const likeButtonRef = useRef(null);

  const handleCardClick = (e) => {
    if (window.innerWidth < 1024 && onQuickView) {
      e?.preventDefault?.();
      onQuickView(product);
    } else if (onNavigate) {
      onNavigate(`/product/${product.id}`);
    }
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleAddToCartClick = async (e) => {
    e.stopPropagation();
    
    // Start loading
    setIsAddingToCart(true);
    setAddedProduct(product);
    
    // Simulate API delay (remove this in real implementation)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      addToCart(product);
      
      // Stop loading
      setIsAddingToCart(false);
      
      // Show success popup
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
      setIsAddingToCart(false);
      // You could show an error popup here
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    
    // Get button position for heart explosion
    if (likeButtonRef.current) {
      const rect = likeButtonRef.current.getBoundingClientRect();
      setHeartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Show heart explosion only when liking (not when unliking)
    if (newLikedState) {
      setShowHeartExplosion(true);
      
      // Add to favorites logic here
      console.log(`❤️ ${product.name} favorilere eklendi!`);
      
      // You could add a favorites context here similar to cart
      // addToFavorites(product);
    } else {
      console.log(`💔 ${product.name} favorilerden çıkarıldı!`);
      // removeFromFavorites(product.id);
    }
  };

  const handleHeartExplosionComplete = () => {
    setShowHeartExplosion(false);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setAddedProduct(null);
  };

  const handleOrderClick = (e) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(`/product/${product.id}`);
    }
  };

  const getProductDescription = (category) => {
    if (category.includes('SPICY')) return 'Baharatlı ve lezzetli, acı sevenler için ideal.';
    if (category.includes('CHEESE')) return 'Bol peynirli ve kremsi dokusuyla enfes lezzet.';
    if (category.includes('BBQ')) return 'Barbekü soslu ve ızgara lezzetiyle hazırlanmış.';
    if (category.includes('VEGETARIAN')) return 'Taze sebzeler ile sağlıklı ve lezzetli.';
    if (category.includes('CREAMY')) return 'Kremsi soslar ve yumuşak dokusuyla nefis.';
    return 'Özenle hazırlanmış, taze malzemelerle yapılmış lezzetli seçenek.';
  };

  // List view için eski tasarım koruyalım
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-row items-center p-6 min-h-[140px]">
        {/* List view old design */}
        <div className="w-24 h-24 rounded-xl flex-shrink-0 mr-6 relative overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-2"
            onError={(e) => { e.target.src = '/images/pizzaresim.png'; }}
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-lg font-medium border mb-2">
              {product.category.split(',')[0].trim()}
            </span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
              <span className="text-xs text-gray-400">{product.comments}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 ml-6">
            <div className="text-right">
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through">{product.originalPrice}₺</div>
              )}
              <div className="text-2xl font-bold text-red-600">{product.price}₺</div>
            </div>
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={handleAddToCartClick}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modern Grid Card Design - Mobile & Desktop Optimized
  return (
    <div className={`group cursor-pointer ${className}`} onClick={handleCardClick}>
      <div className="bg-white rounded-3xl shadow-lg active:shadow-2xl md:hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 active:border-red-200 md:hover:border-red-200 transform active:scale-[0.98] md:hover:scale-[1.02]">
        
        {/* Card Header - Image Section */}
        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-500 rounded-full blur-2xl"></div>
          </div>

          {/* Fuzzy Score Badge */}
          {showFuzzyScore && product.fuzzyScore !== undefined && (
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                🔮 {Math.round(product.fuzzyScore * 100)}%
              </span>
            </div>
          )}

          {/* Sale Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SALE
              </div>
            </div>
          )}

          {/* Mobile-Friendly Like Button with Ref */}
          <div className="absolute top-3 right-3 z-20">
            <button
              ref={likeButtonRef}
              onClick={handleLikeClick}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm border-2 active:scale-95 ${
                isLiked 
                  ? 'bg-red-500 border-red-500 text-white shadow-xl animate-heartBeat' 
                  : 'bg-white/90 border-white/60 text-gray-400 active:text-red-500 active:border-red-200 shadow-lg'
              }`}
            >
              <svg className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'animate-heartPulse' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile-Optimized Product Image */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl active:scale-105 md:group-hover:scale-110 transition-transform duration-500"
              onError={(e) => { e.target.src = '/images/pizzaresim.png'; }}
              loading="lazy"
            />
          </div>

          {/* Mobile/Desktop Action Buttons */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0">
            <button
              onClick={handlePreviewClick}
              className="w-11 h-11 bg-white/95 backdrop-blur-sm active:bg-white rounded-2xl flex items-center justify-center text-gray-600 active:text-blue-600 transition-all duration-200 shadow-xl border border-white/30 active:scale-95"
              title="Hızlı Görüntüle"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            <button
              onClick={handleAddToCartClick}
              className="w-11 h-11 bg-green-500 active:bg-green-600 rounded-2xl flex items-center justify-center text-white transition-all duration-200 shadow-xl active:scale-95"
              title="Sepete Ekle"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L18 18m-3-3h3m-3 3v3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Body - Product Info */}
        <div className="p-6 space-y-4">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-100">
              {product.category.split(',')[0].trim()}
            </span>
            {product.originalPrice && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Product Name */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 active:text-red-600 md:group-hover:text-red-600 transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {getProductDescription(product.category)}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.comments}</span>
          </div>

          {/* Fuzzy Match Info */}
          {showFuzzyScore && product.fuzzyScore !== undefined && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-xs font-medium text-blue-700">
                🎯 Eşleşme Oranı: {Math.round(product.fuzzyScore * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Card Footer - Price & Action */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="space-y-1">
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through font-medium">
                  {product.originalPrice}₺
                </div>
              )}
              <div className="text-2xl font-bold text-gray-900">
                {product.price}₺
              </div>
            </div>

            {/* Mobile-Optimized Order Button */}
            <button
              onClick={handleOrderClick}
              className="group relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 active:from-red-600 active:via-red-700 active:to-red-800 md:hover:from-red-600 md:hover:via-red-700 md:hover:to-red-800 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg active:shadow-2xl md:hover:shadow-2xl transform active:scale-95 md:hover:scale-105 overflow-hidden"
            >
              {/* Shine Effect - Only on desktop */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative flex items-center gap-2">
                <span className="text-sm">Sipariş Ver</span>
                <svg className="w-4 h-4 transition-transform md:group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Heart Explosion Animation */}
      <HeartExplosion
        isVisible={showHeartExplosion}
        onComplete={handleHeartExplosionComplete}
        position={heartPosition}
      />

      {/* Cart Loading Spinner */}
      <CartSpinner 
        isVisible={isAddingToCart}
        productName={product.name}
      />

      {/* Success Popup */}
      <CartSuccessPopup
        isVisible={showSuccessPopup}
        product={addedProduct}
        onClose={handleCloseSuccessPopup}
      />

      <style>{`
        @keyframes heartBeat {
          0%, 50%, 100% { transform: scale(1); }
          25%, 75% { transform: scale(1.1); }
        }
        
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .animate-heartBeat {
          animation: heartBeat 1s ease-in-out;
        }
        
        .animate-heartPulse {
          animation: heartPulse 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
    image: PropTypes.string.isRequired,
    fuzzyScore: PropTypes.number
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']),
  onNavigate: PropTypes.func,
  showFuzzyScore: PropTypes.bool,
  className: PropTypes.string,
  onQuickView: PropTypes.func
};

export default ProductCard;