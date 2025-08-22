export class FuzzySearchEngine {
  constructor(threshold = 0.6) {
    this.threshold = threshold;
    this.cache = new Map();
  }

  /**
   * Calculates Levenshtein distance between two strings
   * @param {string} source - Source string
   * @param {string} target - Target string
   * @returns {number} Distance value
   */
  calculateLevenshteinDistance(source, target) {
    const sourceLength = source.length;
    const targetLength = target.length;

    if (sourceLength === 0) return targetLength;
    if (targetLength === 0) return sourceLength;

    const matrix = Array(targetLength + 1)
      .fill(null)
      .map(() => Array(sourceLength + 1).fill(null));

    // Initialize first row and column
    for (let i = 0; i <= sourceLength; i++) matrix[0][i] = i;
    for (let j = 0; j <= targetLength; j++) matrix[j][0] = j;

    // Fill the matrix
    for (let j = 1; j <= targetLength; j++) {
      for (let i = 1; i <= sourceLength; i++) {
        const cost = source[i - 1] === target[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,     // deletion
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i - 1] + cost // substitution
        );
      }
    }

    return matrix[targetLength][sourceLength];
  }

  /**
   * Calculates similarity score between two strings
   * @param {string} source - Source string
   * @param {string} target - Target string
   * @returns {number} Similarity score between 0 and 1
   */
  calculateSimilarityScore(source, target) {
    const normalizedSource = source.toLowerCase().trim();
    const normalizedTarget = target.toLowerCase().trim();

    if (normalizedSource === normalizedTarget) return 1;

    const distance = this.calculateLevenshteinDistance(normalizedSource, normalizedTarget);
    const maxLength = Math.max(normalizedSource.length, normalizedTarget.length);
    
    return maxLength === 0 ? 0 : 1 - (distance / maxLength);
  }

  /**
   * Performs fuzzy matching on individual words
   * @param {string} searchTerm - Search term
   * @param {string} targetText - Target text to search in
   * @returns {Object} Match result with score
   */
  matchWords(searchTerm, targetText) {
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    const targetWords = targetText.toLowerCase().split(/\s+/).filter(Boolean);

    if (searchWords.length === 0) return { matches: true, score: 1 };

    let totalScore = 0;
    let matchedWords = 0;

    for (const searchWord of searchWords) {
      let bestWordScore = 0;

      for (const targetWord of targetWords) {
        // Check for exact substring match first
        if (targetWord.includes(searchWord)) {
          bestWordScore = Math.max(bestWordScore, 1);
        } else {
          // Calculate fuzzy similarity
          const similarity = this.calculateSimilarityScore(searchWord, targetWord);
          bestWordScore = Math.max(bestWordScore, similarity);
        }
      }

      totalScore += bestWordScore;
      if (bestWordScore >= this.threshold) {
        matchedWords++;
      }
    }

    const averageScore = totalScore / searchWords.length;
    const matchPercentage = matchedWords / searchWords.length;
    
    return {
      matches: matchPercentage >= 0.5 || averageScore >= this.threshold,
      score: Math.max(averageScore, matchPercentage)
    };
  }

  /**
   * Performs comprehensive fuzzy search on text
   * @param {string} searchTerm - Search term
   * @param {string} targetText - Target text
   * @returns {Object} Search result
   */
  search(searchTerm, targetText) {
    if (!searchTerm || !targetText) {
      return { matches: false, score: 0 };
    }

    const cacheKey = `${searchTerm}_${targetText}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const normalizedTarget = targetText.toLowerCase().trim();

    // Exact match check
    if (normalizedTarget.includes(normalizedSearch)) {
      const result = { matches: true, score: 1 };
      this.cache.set(cacheKey, result);
      return result;
    }

    // Word-based fuzzy matching
    const wordResult = this.matchWords(normalizedSearch, normalizedTarget);
    
    // Overall similarity as fallback
    const overallSimilarity = this.calculateSimilarityScore(normalizedSearch, normalizedTarget);
    
    const finalScore = Math.max(wordResult.score, overallSimilarity);
    const result = {
      matches: wordResult.matches || overallSimilarity >= this.threshold,
      score: finalScore
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Clears the search cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Updates the threshold value
   * @param {number} newThreshold - New threshold value
   */
  setThreshold(newThreshold) {
    if (newThreshold >= 0 && newThreshold <= 1) {
      this.threshold = newThreshold;
      this.clearCache(); // Clear cache when threshold changes
    }
  }
}

// Default instance for easy usage
export const fuzzySearchEngine = new FuzzySearchEngine();

/**
 * Simple fuzzy search function for backward compatibility
 * @param {string} searchTerm - Search term
 * @param {string} targetText - Target text
 * @param {number} threshold - Optional threshold
 * @returns {Object} Search result
 */
export const fuzzySearch = (searchTerm, targetText, threshold = 0.6) => {
  const engine = new FuzzySearchEngine(threshold);
  return engine.search(searchTerm, targetText);
};