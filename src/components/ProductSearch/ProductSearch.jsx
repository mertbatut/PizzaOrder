import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useProductSearch, CONFIDENCE_ICONS } from '../../hooks/useProductSearch';
import SearchInput from './SearchInput';
import SearchSuggestions from './SearchSuggestions';
import SearchFilters from './SearchFilters';
import SearchStats from './SearchStats';

const ProductSearch = ({
  products,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  viewMode,
  onViewModeChange,
  resultsCount,
  onSearchResults,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    searchTerm,
    suggestions,
    fuzzyResults,
    isSearching,
    handleSearchChange,
    clearSearch,
    hasResults,
    hasSuggestions,
    isActive
  } = useProductSearch(products);

  // Dropdown otomatik açılması için useEffect - moved after state declarations
  React.useEffect(() => {
    if (isFocused && hasSuggestions) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [isFocused, hasSuggestions]);


  // Handle search input focus
  const handleFocus = () => {
    setIsFocused(true);
    if (hasSuggestions) {
      setShowSuggestions(true);
    }
  };

  // Handle search input blur
  const handleBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestionText) => {
    handleSearchChange(suggestionText);
    setShowSuggestions(false);
  };

  // Handle clear all filters
  const handleClearAll = () => {
    clearSearch();
    onCategoryChange('all');
    onSortChange('name');
  };

  // Send results to parent component
  React.useEffect(() => {
    if (onSearchResults) {
      onSearchResults(fuzzyResults);
    }
  }, [fuzzyResults, onSearchResults]);

  const hasActiveFilters = Boolean(searchTerm) || selectedCategory !== 'all' || sortBy !== 'name';

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Search Statistics */}
        <SearchStats
          resultsCount={resultsCount}
          searchTerm={searchTerm}
          hasResults={hasResults}
          isActive={isActive}
        />

        {/* Main Search Container */}
        <div className="space-y-4">

          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search Input */}
            <div className="relative flex-1">
              <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClear={clearSearch}
                isFocused={isFocused}
                isSearching={isSearching}
                hasResults={hasResults}
                placeholder="Ürün ara... (örn: 'piza', 'burgr', 'tvuk')"
              />

              {/* Search Suggestions */}
              {(() => {
                // suggestions, hasSuggestions, isFocused, showSuggestions logları debug için bırakılabilir
                // Dropdown her zaman (arama kutusu focus'ta ve input doluysa) görünsün
                if (isFocused && searchTerm.length > 0 && showSuggestions) {
                  return (
                    <SearchSuggestions
                      suggestions={suggestions}
                      searchTerm={searchTerm}
                      onSelect={handleSuggestionSelect}
                      confidenceIcons={CONFIDENCE_ICONS}
                    />
                  );
                }
                return null;
              })()}
            </div>

            {/* View Mode Toggle - Desktop */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <ViewModeButton
                mode="grid"
                currentMode={viewMode}
                onClick={() => onViewModeChange('grid')}
                icon={<GridIcon />}
                title="Grid Görünümü"
              />
              <ViewModeButton
                mode="list"
                currentMode={viewMode}
                onClick={() => onViewModeChange('list')}
                icon={<ListIcon />}
                title="Liste Görünümü"
              />
            </div>
          </div>

          {/* Filters Row */}
          <SearchFilters
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            categories={categories}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            searchTerm={searchTerm}
            hasActiveFilters={hasActiveFilters}
            onClearAll={handleClearAll}
          />

          {/* Fuzzy Search Result Info */}
          {hasResults && isActive && (
            <FuzzySearchInfo
              searchTerm={searchTerm}
              resultsCount={fuzzyResults.length}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// View Mode Button Component
const ViewModeButton = ({ mode, currentMode, onClick, icon, title }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded transition-all duration-200 ${currentMode === mode
        ? 'bg-white text-red-600 shadow'
        : 'text-gray-600 hover:text-gray-900'
      }`}
    title={title}
    aria-label={title}
  >
    {icon}
  </button>
);

// Fuzzy Search Info Component
const FuzzySearchInfo = ({ searchTerm, resultsCount }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
    <div className="flex items-center gap-2 text-sm text-blue-700">
      <span className="text-lg" role="img" aria-label="fuzzy search">🔮</span>
      <span className="font-medium">
        Fuzzy Search aktif - "{searchTerm}" için {resultsCount} benzer sonuç bulundu
      </span>
    </div>
    <p className="text-xs text-blue-600 mt-1 ml-7">
      Yazım hatalarını ve benzer kelimeleri tolere ediyoruz
    </p>
  </div>
);

// Icon Components
const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
);

// PropTypes for type checking
ProductSearch.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  resultsCount: PropTypes.number.isRequired,
  onSearchResults: PropTypes.func,
  className: PropTypes.string
};

ViewModeButton.propTypes = {
  mode: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};

FuzzySearchInfo.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  resultsCount: PropTypes.number.isRequired
};

export default ProductSearch;