import React from 'react';
import PropTypes from 'prop-types';


const ProductCard = ({
  product,
  viewMode = 'grid',
  onNavigate,
  showFuzzyScore = false,
  className = '',
  onQuickView
}) => {
  const handleCardClick = (e) => {
    // On mobile: open quick view, on desktop: navigate
    if (window.innerWidth < 1024 && onQuickView) {
      e?.preventDefault?.();
      onQuickView();
    } else if (onNavigate) {
      onNavigate(`/product/${product.id}`);
    }
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView();
    }
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

  const isListView = viewMode === 'list';

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 relative ${isListView
          ? 'flex flex-row items-center p-6 min-h-[140px]'
          : 'flex flex-col h-96'
        } ${className}`}
  onClick={handleCardClick}
      data-testid="product-card"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
      aria-label={`${product.name} ürün detayına git`}
    >

      {/* Fuzzy Score Badge */}
      {showFuzzyScore && product.fuzzyScore !== undefined && (
        <div className={`absolute z-20 ${isListView ? 'top-2 right-2' : 'top-2 right-2'
          }`}>
          <span
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
            data-testid="fuzzy-score-badge"
            title={`Fuzzy Search eşleşme skoru: ${Math.round(product.fuzzyScore * 100)}%`}
          >
            🔮 {Math.round(product.fuzzyScore * 100)}%
          </span>
        </div>
      )}


      {/* Product Image */}
      <div className={`relative overflow-hidden bg-gray-50 flex items-center justify-center ${isListView
          ? 'w-24 h-24 rounded-xl flex-shrink-0 mr-6'
          : 'h-48 w-full'
        }`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-2"
          onError={(e) => {
            e.target.src = '/images/pizzaresim.png';
          }}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className={`flex ${isListView
          ? 'flex-1 items-center justify-between'
          : 'flex-col p-4 h-48'
        }`}>

        {/* Left Side - Product Details */}
        <div className={isListView ? 'flex-1' : 'w-full'}>
          {/* Category */}
          <div className={`mb-2 ${isListView ? 'mb-1' : ''}`}>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
              {product.category.split(',')[0].trim()}
            </span>
          </div>

          {/* Product Name */}
          <h3 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 ${isListView ? 'text-lg mb-2' : 'text-base mb-2'
            }`}>
            {product.name}
          </h3>

          {/* Description */}
          <p className={`text-gray-600 line-clamp-2 ${isListView ? 'text-sm mb-3 max-w-md' : 'text-xs mb-3'
            }`}>
            {getProductDescription(product.category)}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">{product.comments}</span>
          </div>

          {/* Fuzzy Match Info */}
          {showFuzzyScore && product.fuzzyScore !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-xs text-blue-600 font-medium">
                🎯 Eşleşme: {Math.round(product.fuzzyScore * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Right Side - Price and Action */}
        {isListView ? (
          <div className="flex items-center gap-6 ml-6">
            <div className="text-right">
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {product.originalPrice}₺
                </div>
              )}
              <div className="text-2xl font-bold text-red-600">
                {product.price}₺
              </div>
            </div>

              <button
                className="border border-blue-400 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center gap-1 px-3 py-2 rounded-xl font-semibold transition-all duration-200 shadow-sm min-w-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mr-2"
                style={{lineHeight:1.2, height:'40px'}} // consistent height
                onClick={handlePreviewClick}
                aria-label={`${product.name} önizle`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span className="hidden xs:inline">Önizle</span>
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 min-w-[90px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleOrderClick}
                aria-label={`${product.name} sipariş ver`}
              >
                Sipariş Ver
              </button>
          </div>
        ) : (
          <>
            <div className="flex-1"></div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}₺
                  </span>
                )}
                <span className="text-xl font-bold text-red-600">
                  {product.price}₺
                </span>
              </div>

              <button
                className="border border-blue-400 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-xl font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mr-2"
                style={{lineHeight:1.2, height:'36px'}}
                onClick={handlePreviewClick}
                aria-label={`${product.name} önizle`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <span className="hidden xs:inline">Önizle</span>
              </button>
      {/* Responsive: show label on >=375px, icon only on smaller */}
      <style>{`
        @media (max-width: 374px) {
          .xs\\:inline { display: none !important; }
        }
        @media (min-width: 375px) {
          .xs\\:inline { display: inline !important; }
        }
      `}</style>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 px-4 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleOrderClick}
                aria-label={`${product.name} sipariş ver`}
              >
                Sipariş Ver
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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