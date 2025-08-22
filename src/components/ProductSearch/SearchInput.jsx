import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  isFocused,
  isSearching,
  hasResults,
  placeholder,
  className = ''
}) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClear();
      e.target.blur();
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-200 text-base ${
          isFocused
            ? 'border-red-500 ring-2 ring-red-500/20'
            : 'border-gray-300 hover:border-gray-400'
        } focus:outline-none bg-gray-50 focus:bg-white ${className}`}
        aria-label="Ürün arama"
        aria-describedby="search-help"
      />

      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isSearching ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent" />
        ) : (
          <SearchIcon />
        )}
      </div>

      {/* Status Indicators */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {value && hasResults && <FuzzySearchIndicator />}
      </div>

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Aramayı temizle"
          type="button"
        >
          <ClearIcon />
        </button>
      )}

      {/* Screen reader help text */}
      <div id="search-help" className="sr-only">
        Ürün aramak için yazın. Yazım hatalarını tolere eden akıllı arama aktif.
      </div>
    </>
  );
};

// Icon Components
const SearchIcon = () => (
  <svg 
    className="w-5 h-5 text-gray-400" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);

const ClearIcon = () => (
  <svg 
    className="w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

const FuzzySearchIndicator = () => (
  <span 
    className="text-blue-500 text-sm" 
    title="Fuzzy Search aktif"
    aria-label="Akıllı arama aktif"
    role="img"
  >
    🔮
  </span>
);

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  hasResults: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default SearchInput;