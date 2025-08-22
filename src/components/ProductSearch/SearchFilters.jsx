import React from 'react';
import PropTypes from 'prop-types';

const SearchFilters = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  viewMode,
  onViewModeChange,
  searchTerm,
  hasActiveFilters,
  onClearAll
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      
      {/* Kategori Filtresi */}
      <div className="flex-1 sm:flex-none sm:min-w-[200px]">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 hover:border-gray-400 text-sm"
          aria-label="Kategori filtresi"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Tüm Kategoriler' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Sıralama Filtresi */}
      <div className="flex-1 sm:flex-none sm:min-w-[200px]">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 hover:border-gray-400 text-sm"
          aria-label="Sıralama filtresi"
        >
          <option value="name">İsme Göre</option>
          <option value="price-low">Fiyat (Düşük → Yüksek)</option>
          <option value="price-high">Fiyat (Yüksek → Düşük)</option>
          <option value="rating">Puana Göre</option>
          {searchTerm && (
            <option value="relevance">Benzerlik Skoruna Göre</option>
          )}
        </select>
      </div>

      {/* Mobile View Mode Toggle */}
      <div className="flex sm:hidden items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`flex-1 p-2 rounded transition-all duration-200 text-center ${
            viewMode === 'grid' 
              ? 'bg-white text-red-600 shadow' 
              : 'text-gray-600'
          }`}
          aria-label="Grid görünümü"
        >
          <GridIcon />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`flex-1 p-2 rounded transition-all duration-200 text-center ${
            viewMode === 'list' 
              ? 'bg-white text-red-600 shadow' 
              : 'text-gray-600'
          }`}
          aria-label="Liste görünümü"
        >
          <ListIcon />
        </button>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Tüm filtreleri temizle"
        >
          <ResetIcon />
          <span className="hidden sm:inline">Temizle</span>
        </button>
      )}
    </div>
  );
};

// Icon Components
const GridIcon = () => (
  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

SearchFilters.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  hasActiveFilters: PropTypes.bool.isRequired,
  onClearAll: PropTypes.func.isRequired
};

export default SearchFilters;