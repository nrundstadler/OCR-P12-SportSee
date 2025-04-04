/**
 * Class responsible for formatting and standardizing raw user data
 */
class DataFormatter {
  /**
   * Creates an instance of DataFormatter
   * @param {Object} rawData - Raw data object containing all user information
   * @param {Object} rawData.userData - User's main information
   * @param {Object} rawData.activityData - User's activity data
   * @param {Object} rawData.averageSessionData - User's average session data
   * @param {Object} rawData.performanceData - User's performance data
   */
  constructor(rawData) {
    this.userMainData = this.formatUserMainData(rawData.userData);
    this.activityData = this.formatActivityData(rawData.activityData);
    this.averageSessionData = this.formatAverageSessionData(
      rawData.averageSessionData,
    );
    this.performanceData = this.formatPerformanceData(rawData.performanceData);
  }

  /**
   * Formats user's main information and standardizes score property
   * @param {Object} data - Raw user main data
   * @param {Object} [data.userInfos] - User's personal information
   * @param {string} [data.userInfos.firstName] - User's first name
   * @param {string} [data.userInfos.lastName] - User's last name
   * @param {number} [data.userInfos.age] - User's age
   * @param {number} [data.todayScore] - User's score (0-1)
   * @param {number} [data.score] - Alternative score property
   * @param {Object} [data.keyData] - User's nutrition information
   * @returns {Object} Formatted user main data with standardized properties
   */
  formatUserMainData(data = {}) {
    const score = data.todayScore ?? data.score ?? 0;
    const validScore = score >= 0 && score <= 1 ? score : 0;

    return {
      userInfos: {
        firstName: data.userInfos?.firstName || "",
        lastName: data.userInfos?.lastName || "",
        age: data.userInfos?.age || 0,
      },
      score: validScore,
      scorePercentage: validScore * 100,
      keyData: {
        calorieCount: data.keyData?.calorieCount || 0,
        proteinCount: data.keyData?.proteinCount || 0,
        carbohydrateCount: data.keyData?.carbohydrateCount || 0,
        lipidCount: data.keyData?.lipidCount || 0,
      },
    };
  }

  /**
   * Formats user's daily activity data
   * @param {Object} data - Raw activity data
   * @param {Array<Object>} [data.sessions] - Array of daily activity sessions
   * @returns {Object} Formatted activity data
   */
  formatActivityData(data = {}) {
    return {
      sessions: (data.sessions || []).map((session) => ({
        day: session.day || "",
        kilogram: session.kilogram || 0,
        calories: session.calories || 0,
      })),
    };
  }

  /**
   * Formats user's average session data and filters invalid days
   * @param {Object} data - Raw average session data
   * @param {Array<Object>} [data.sessions] - Array of average session data
   * @returns {Object} Formatted and filtered average session data
   */
  formatAverageSessionData(data = {}) {
    return {
      sessions: (data.sessions || [])
        .filter(
          (session) => session.day && session.day >= 1 && session.day <= 7,
        )
        .map((session) => ({
          day: session.day,
          sessionLength: session.sessionLength || 0,
        })),
    };
  }

  /**
   * Formats user's performance data
   * @param {Object} data - Raw performance data
   * @param {Object} [data.kind] - Performance types mapping
   * @param {Array<Object>} [data.data] - Array of performance measurements
   * @returns {Object} Formatted performance data
   */
  formatPerformanceData(data = {}) {
    return {
      kind: data.kind || {},
      data: (data.data || []).map((item) => ({
        value: item.value || 0,
        kind: item.kind || 0,
      })),
    };
  }
}

export default DataFormatter;
