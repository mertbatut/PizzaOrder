// src/components/ProductSearch/SearchSuggestions.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestions = ({
  suggestions,
  searchTerm,
  onSelect,
  confidenceIcons,
  className = ''
}) => {
  const handleSuggestionClick = (suggestionText) => {
    onSelect(suggestionText);
  };

  const handleKeyDown = (e, suggestionText) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSuggestionClick(suggestionText);
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-blue-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const highlightMatchingText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!suggestions.length) return null;

  return (
    <div 
      className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto ${className}`}
      role="listbox"
      aria-label="Arama önerileri"
    >
      <div className="p-2">
        {/* Header */}
        <div className="text-xs text-gray-500 px-2 py-1 font-medium flex items-center gap-2 border-b border-gray-100 mb-2">
          <span role="img" aria-label="fuzzy search">🔮</span>
          <span>Akıllı Öneriler</span>
          <span className="text-blue-500">(Fuzzy Search)</span>
        </div>

        {/* Suggestions List */}
        <ul className="space-y-1" role="list">
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={`${suggestion.text}-${index}`}
              suggestion={suggestion}
              searchTerm={searchTerm}
              onSelect={handleSuggestionClick}
              onKeyDown={handleKeyDown}
              confidenceIcons={confidenceIcons}
              getConfidenceColor={getConfidenceColor}
              highlightMatchingText={highlightMatchingText}
            />
          ))}
        </ul>

        {/* Footer Info */}
        <div className="border-t border-gray-100 mt-2 pt-2 px-2">
          <p className="text-xs text-gray-500">
            💡 <strong>İpucu:</strong> Kelimeleri yanlış yazsanız bile bulabiliriz!
          </p>
        </div>
      </div>
    </div>
  );
};

// Individual Suggestion Item Component
const SuggestionItem = ({
  suggestion,
  searchTerm,
  onSelect,
  onKeyDown,
  confidenceIcons,
  getConfidenceColor,
  highlightMatchingText
}) => {
  const { text, score, confidence } = suggestion;
  
  return (
    <li role="listitem">
      <button
        onClick={() => onSelect(text)}
        onKeyDown={(e) => onKeyDown(e, text)}
        className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded text-sm transition-colors flex items-center justify-between gap-2 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-red-500/20"
        type="button"
        aria-label={`Öneri: ${text}, Güven skoru: ${Math.round(score * 100)}%`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <SearchIcon />
          <span className="text-gray-700 truncate">
            {highlightMatchingText(text, searchTerm)}
          </span>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-xs ${getConfidenceColor(confidence)}`}>
            {confidenceIcons[confidence]}
          </span>
          <span className="text-xs text-gray-400 min-w-[3rem] text-right">
            {Math.round(score * 100)}%
          </span>
        </div>
      </button>
    </li>
  );
};

// Search Icon Component
const SearchIcon = () => (
  <svg 
    className="w-3 h-3 text-gray-400 flex-shrink-0" 
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

// PropTypes
SearchSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      confidence: PropTypes.oneOf(['high', 'medium', 'low', 'very-low']).isRequired
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  confidenceIcons: PropTypes.object.isRequired,
  className: PropTypes.string
};

SuggestionItem.propTypes = {
  suggestion: PropTypes.shape({
    text: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    confidence: PropTypes.string.isRequired
  }).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  confidenceIcons: PropTypes.object.isRequired,
  getConfidenceColor: PropTypes.func.isRequired,
  highlightMatchingText: PropTypes.func.isRequired
};

export default SearchSuggestions;