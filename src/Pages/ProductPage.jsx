// ProductPage.jsx - Ana sayfa, sadece state yönetimi ve layout
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSearch from '../components/ProductSearch/ProductSearch';
import ProductList from '../components/Product/ProductList';
import ProductQuickViewModal from '../components/Product/ProductQuickViewModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

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
  
  // Quick view modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

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

  // Filter and sort products
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
    setCurrentPage(1);
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

  const handleFuzzySearchResults = useCallback((results) => {
    setFuzzySearchResults(results);
  }, []);

  // Quick view handlers
  const handleQuickViewOpen = useCallback((product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleQuickViewClose = useCallback(() => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 200);
    document.body.style.overflow = '';
  }, []);

  const handleQuickViewOrder = useCallback((product) => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 200);
    document.body.style.overflow = '';
    navigate(`/product/${product.id}`);
  }, [navigate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  // Render functions
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

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Önceki
        </button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded transition-colors ${
              num === currentPage 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sonraki
        </button>
      </div>
    );
  };

  // Main render conditions
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
        {/* ProductList Component Usage */}
        <ProductList
          products={paginatedProducts}
          viewMode={viewMode}
          showFuzzyScore={!!fuzzySearchResults.length}
          onNavigate={handleNavigation}
          onQuickView={handleQuickViewOpen}
          loading={false}
          emptyMessage={
            fuzzySearchResults.length === 0 && filteredProducts.length === 0
              ? "Arama kriterlerinize uygun ürün bulunamadı"
              : "Ürün bulunamadı"
          }
        />

        {/* Pagination */}
        {renderPagination()}

        {/* Quick View Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          open={isQuickViewOpen}
          onClose={handleQuickViewClose}
          onOrder={handleQuickViewOrder}
        />
      </main>
    </div>
  );
};

export default ProductsPage;