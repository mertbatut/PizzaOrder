import React from 'react';
import PropTypes from 'prop-types';

const SearchStats = ({
  resultsCount,
  searchTerm,
  hasResults,
  isActive
}) => {
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Akıllı Ürün Arama
          <span className="ml-2 text-sm font-normal text-gray-500">
            (Fuzzy Search destekli)
          </span>
        </h2>
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-red-600">{resultsCount}</span> ürün bulundu
          {searchTerm && hasResults && (
            <span className="ml-2 text-xs text-blue-600">
              • Benzer sonuçlar dahil
            </span>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden text-center mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-red-600">{resultsCount}</span> ürün bulundu
          {searchTerm && hasResults && (
            <span className="block text-xs text-blue-600 mt-1">
              Benzer sonuçlar dahil
            </span>
          )}
        </div>
      </div>
    </>
  );
};

SearchStats.propTypes = {
  resultsCount: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  hasResults: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default SearchStats;