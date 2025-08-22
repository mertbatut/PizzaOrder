import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSearch from '../components/ProductSearch/ProductSearch';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import EmptyState from '../components/UI/EmptyState';
import ProductCard from '../components/Product/ProductCard';

const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high', 
  RATING: 'rating',
  RELEVANCE: 'relevance'
};

const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list'
};

const ProductsPage = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME);
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fuzzySearchResults, setFuzzySearchResults] = useState([]);

  const navigate = useNavigate();

  // Memoized categories list
  const categories = useMemo(() => {
    const categorySet = new Set(['all']);
    products.forEach(product => {
      const productCategories = product.category
        .split(',')
        .map(cat => cat.trim())
        .filter(Boolean);
      productCategories.forEach(cat => categorySet.add(cat));
    });
    return Array.from(categorySet);
  }, [products]);

  // Navigation handler
  const handleNavigation = useCallback((path) => {
    if (path === '/') {
      navigate('/');
    } else if (path.includes('/product/')) {
      navigate('/PizzaMenu');
    } else {
      navigate(path);
    }
  }, [navigate]);

  // Data fetching
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/data/product.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: JSON dosyası bulunamadı`);
      }
      
      const data = await response.json();
      const productsData = data.products || data;
      
      if (!Array.isArray(productsData) || productsData.length === 0) {
        throw new Error('Geçerli ürün verisi bulunamadı');
      }
      
      setProducts(productsData);
      setFilteredProducts(productsData);
      
    } catch (err) {
      console.error('Ürün yükleme hatası:', err);
      setError(err.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fuzzy search results handler
  const handleFuzzySearchResults = useCallback((results) => {
    setFuzzySearchResults(results);
  }, []);

  // Product filtering and sorting
  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Apply fuzzy search results if available
    if (fuzzySearchResults.length > 0) {
      filtered = [...fuzzySearchResults];
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const productCategories = product.category
          .split(',')
          .map(cat => cat.trim());
        return productCategories.includes(selectedCategory);
      });
    }

    // Apply sorting
    const sortedFiltered = filtered.sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.PRICE_LOW:
          return parseFloat(a.price) - parseFloat(b.price);
        
        case SORT_OPTIONS.PRICE_HIGH:
          return parseFloat(b.price) - parseFloat(a.price);
        
        case SORT_OPTIONS.RATING:
          return parseFloat(b.rating) - parseFloat(a.rating);
        
        case SORT_OPTIONS.RELEVANCE:
          if (a.fuzzyScore !== undefined && b.fuzzyScore !== undefined) {
            return b.fuzzyScore - a.fuzzyScore;
          }
          return a.name.localeCompare(b.name);
        
        case SORT_OPTIONS.NAME:
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(sortedFiltered);
  }, [products, fuzzySearchResults, selectedCategory, sortBy]);

  // Effects
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  // Event handlers
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  // Render helpers
  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
              aria-label="Ana sayfaya dön"
            >
              ← Teknolojik Yemekler
            </button>
            <div className="hidden lg:block w-px h-8 bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900">
              Tüm Ürünler
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductGrid = () => {
    if (filteredProducts.length === 0) {
      return (
        <EmptyState
          icon="🔍"
          title="Ürün bulunamadı"
          description="Arama kriterlerinizi değiştirmeyi deneyin."
          showFuzzySearchTip={fuzzySearchResults.length === 0}
        />
      );
    }

    const gridClasses = viewMode === VIEW_MODES.GRID
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
      : 'flex flex-col space-y-4';

    return (
      <div className={gridClasses}>
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="opacity-0 animate-fadeInUp"
            style={{ 
              animationDelay: `${index * 0.1}s`, 
              animationFillMode: 'forwards' 
            }}
          >
            <ProductCard
              product={product}
              viewMode={viewMode}
              onNavigate={handleNavigation}
              showFuzzyScore={!!product.fuzzyScore}
            />
          </div>
        ))}
      </div>
    );
  };

  // Main render
  if (loading) {
    return <LoadingSpinner message="Ürünler yükleniyor..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Ürünler Yüklenemedi"
        message={error}
        onRetry={fetchProducts}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      <ProductSearch
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        resultsCount={filteredProducts.length}
        onSearchResults={handleFuzzySearchResults}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderProductGrid()}
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;