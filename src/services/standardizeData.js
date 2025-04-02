/**
 * Handles 'todayScore' and 'score' properties to ensure consistent naming
 * @param {Object} rawData - The raw user data.
 * @returns {Object} - Data with standardized property names
 */
function standardizeUserData(rawData) {
  return {
    ...rawData,
    score: rawData.todayScore ?? rawData.score, // Standardize the score property
    todayScore: undefined, // Remove the property to avoid confusion
  };
}

/**
 * Transforms and normalizes user data across both API and mock data sources
 * @param {Object} data - Raw data from API or mock
 * @returns {Object} - Clean data ready to use
 */
function standardizeData(data) {
  return {
    ...data,
    userData: standardizeUserData(data.userData),
  };
}

export default standardizeData;
