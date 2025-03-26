/**
 * Standardize user data by ensuring consistent property names.
 * @param {Object} rawData - The raw user data.
 * @returns {Object} - The standardized user data.
 */
function standardizeUserData(rawData) {
  return {
    todayScore: rawData.todayScore ?? rawData.score, // Standardize the score property
    ...rawData,
  };
}

/**
 * Standardize all fetched data.
 * @param {Object} data - The raw data object containing userData, activityData, etc.
 * @returns {Object} - The standardized data object.
 */
export function standardizeAllData(data) {
  return {
    userData: standardizeUserData(data.userData.data || data.userData),
    activityData: data.activityData.data || data.activityData,
    averageSessionData: data.averageSessionData.data || data.averageSessionData,
    performanceData: data.performanceData.data || data.performanceData,
  };
}

export default standardizeAllData;
