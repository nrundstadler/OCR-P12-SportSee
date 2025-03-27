/**
 * Handles 'todayScore' and 'score' properties to ensure consistent naming
 * @param {Object} rawData - The raw user data.
 * @returns {Object} - Data with standardized property names
 */
function standardizeUserData(rawData) {
  return {
    todayScore: rawData.todayScore ?? rawData.score, // Standardize the score property
    ...rawData,
  };
}

/**
 * Standardizes all API data by handling direct or nested data structures
 * (where data might be under a 'data' property)
 * @param {Object} data - The raw data object containing userData, activityData,...
 * @returns {Object} - Data with consistent structure
 */
function standardizeData(data) {
  return {
    userData: standardizeUserData(data.userData.data || data.userData),
    activityData: data.activityData.data || data.activityData,
    averageSessionData: data.averageSessionData.data || data.averageSessionData,
    performanceData: data.performanceData.data || data.performanceData,
  };
}

export default standardizeData;
