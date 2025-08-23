import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ 
  products, 
  viewMode = 'grid',
  showFuzzyScore = false,
  onNavigate,
  onQuickView,
  loading = false,
  emptyMessage = 'Ürün bulunamadı'
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-200 border-t-red-600"></div>
        <span className="ml-3 text-gray-600">Ürünler yükleniyor...</span>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl" role="img" aria-label="empty">📭</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{emptyMessage}</h3>
        <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin.</p>
      </div>
    );
  }

  // Grid/List layout classes
  const containerClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
    : 'flex flex-col space-y-4';

  return (
    <div className="w-full">
      <div className={containerClasses}>
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard 
              product={product}
              viewMode={viewMode}
              showFuzzyScore={showFuzzyScore}
              onNavigate={onNavigate}
              onQuickView={() => onQuickView && onQuickView(product)}
            />
          </div>
        ))}
      </div>

      {/* Products Count Info */}
      <div className="text-center mt-8 text-gray-500">
        <p className="text-sm">
          <span className="font-semibold text-red-600">{products.length}</span> ürün gösteriliyor
        </p>
      </div>

      
    </div>
  );
};

export default ProductList;