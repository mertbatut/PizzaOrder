import { useState, useEffect, useCallback, useMemo } from 'react';
import { fuzzySearchEngine } from '../utils/fuzzySearch';

const SEARCH_DEBOUNCE_DELAY = 300;
const MIN_SEARCH_LENGTH = 2;
const MAX_SUGGESTIONS = 6;

export const useProductSearch = (products = [], initialThreshold = 0.6) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fuzzyResults, setFuzzyResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Memoized search terms for suggestions
  const suggestionTerms = useMemo(() => {
    const terms = new Set();
    // Add product names
    products.forEach(product => {
      terms.add(product.name);
      // Add individual words from product names
      product.name.split(/\s+/).forEach(word => {
        if (word.length > 2) terms.add(word);
      });
    });
    // Add categories
    products.forEach(product => {
      product.category.split(',').forEach(cat => {
        const cleanCat = cat.trim();
        if (cleanCat) terms.add(cleanCat);
      });
    });
    // Add common food terms
    const commonTerms = [
      'Pizza', 'Burger', 'Tavuk', 'Acı', 'Peynirli', 'BBQ', 
      'Vegetarian', 'Spicy', 'Cheese', 'Creamy', 'Terminal', 
      'Position', 'Absolute', 'useEffect', 'Hackathlon', 'useState' , 'Pide' , 'Kebap', 'Lahmacun', 'Salata', 'Tatlı', 'İçecek', 'Makarna', 'Sos', 'Izgara', 'Dürüm', 'Meze', 'Çorba', 'Balık', 'Deniz Ürünleri', 'Vejetaryen', 'Vegan', 'Glutensiz '
    ];
    commonTerms.forEach(term => terms.add(term));
    const arr = Array.from(terms);
    return arr;
  }, [products]);

  // Debounced search function
  const debouncedSearch = useCallback((term) => {
    const timeoutId = setTimeout(() => {
      if (term.length >= MIN_SEARCH_LENGTH) {
        setIsSearching(true);
        performSearch(term);
      } else {
        clearSearchResults();
      }
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [products]);

  // Generate suggestions based on search term
  const generateSuggestions = useCallback((term) => {
    if (term.length < MIN_SEARCH_LENGTH) return [];

    const fuzzyMatches = suggestionTerms
      .map(suggestionTerm => {
        const result = fuzzySearchEngine.search(term, suggestionTerm);
        return {
          term: suggestionTerm,
          score: result.score,
          matches: result.matches
        };
      })
      .filter(item => item.matches && item.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SUGGESTIONS)
      .map(item => ({
        text: item.term,
        score: item.score,
        confidence: getConfidenceLevel(item.score)
      }));
    return fuzzyMatches;
  }, [suggestionTerms]);

  // Perform fuzzy search on products
  const performSearch = useCallback((term) => {
    if (!term || term.length < MIN_SEARCH_LENGTH) {
      setFuzzyResults([]);
      setSuggestions([]);
      return;
    }

    // Generate suggestions
    const newSuggestions = generateSuggestions(term);
    setSuggestions(newSuggestions);

    // Search products
    const searchResults = products
      .map(product => {
        const nameResult = fuzzySearchEngine.search(term, product.name);
        const categoryResult = fuzzySearchEngine.search(term, product.category);
        
        const bestScore = Math.max(nameResult.score, categoryResult.score);
        const hasMatch = nameResult.matches || categoryResult.matches;
        
        return {
          ...product,
          fuzzyScore: bestScore,
          fuzzyMatch: hasMatch,
          matchType: nameResult.score >= categoryResult.score ? 'name' : 'category'
        };
      })
      .filter(product => product.fuzzyMatch)
      .sort((a, b) => b.fuzzyScore - a.fuzzyScore);

    setFuzzyResults(searchResults);
  }, [products, generateSuggestions]);

  // Clear search results
  const clearSearchResults = useCallback(() => {
    setFuzzyResults([]);
    setSuggestions([]);
    fuzzySearchEngine.clearCache();
  }, []);

  // Handle search term change
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      clearSearchResults();
      return;
    }

    return debouncedSearch(term);
  }, [debouncedSearch, clearSearchResults]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    clearSearchResults();
  }, [clearSearchResults]);

  // Effect for initial search
  useEffect(() => {
    if (searchTerm) {
      const cleanup = debouncedSearch(searchTerm);
      return cleanup;
    }
  }, [searchTerm, debouncedSearch]);

  // Update fuzzy search threshold
  const setThreshold = useCallback((threshold) => {
    fuzzySearchEngine.setThreshold(threshold);
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }, [searchTerm, performSearch]);

  return {
    // State
    searchTerm,
    suggestions,
    fuzzyResults,
    isSearching,
    
    // Actions
    handleSearchChange,
    clearSearch,
    setThreshold,
    
    // Computed values
    hasResults: fuzzyResults.length > 0,
    hasSuggestions: suggestions.length > 0,
    isActive: searchTerm.length >= MIN_SEARCH_LENGTH
  };
};

// Helper function to determine confidence level
const getConfidenceLevel = (score) => {
  if (score >= 0.8) return 'high';
  if (score >= 0.6) return 'medium';
  if (score >= 0.4) return 'low';
  return 'very-low';
};

// Confidence level icons
export const CONFIDENCE_ICONS = {
  high: '🎯',
  medium: '✨', 
  low: '📍',
  'very-low': '🔍'
};

export default useProductSearch;