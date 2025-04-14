import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/mockUserData";

/**
 * Class responsible for handling API calls and mock data retrieval
 */
class ApiService {
  constructor() {
    this.baseUrl = "http://localhost:3000/user";
  }

  /**
   * Fetches user data from the API
   * @async
   * @param {number} userId - The ID of the user
   * @returns {Promise<Object>} Object containing user data
   * @throws {Error} If the fetch fails or if data is missing
   */
  async fetchDataApi(userId) {
    const endpoints = [
      `${this.baseUrl}/${userId}`,
      `${this.baseUrl}/${userId}/activity`,
      `${this.baseUrl}/${userId}/average-sessions`,
      `${this.baseUrl}/${userId}/performance`,
    ];

    const responses = await Promise.all(endpoints.map((url) => fetch(url)));

    // *** Simulate a delay for testing ***
    //await new Promise((resolve) => setTimeout(resolve, 1900));

    for (const response of responses) {
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
    }

    const [userData, activityData, averageSessionData, performanceData] =
      await Promise.all(responses.map((response) => response.json()));

    if (
      !userData.data ||
      !activityData.data ||
      !averageSessionData.data ||
      !performanceData.data
    ) {
      throw new Error(
        "One or more API responses are missing the 'data' property .",
      );
    }

    return {
      userData: userData.data,
      activityData: activityData.data,
      averageSessionData: averageSessionData.data,
      performanceData: performanceData.data,
    };
  }

  /**
   * Retrieves mock data (from a js file) for a user
   * @param {number} userId
   * @returns {Object} Object containing mock user data
   * @throws {Error} If mock data is not found for the given user ID
   */
  getMockData(userId) {
    const userData = USER_MAIN_DATA.find((user) => user.id === userId);
    const activityData = USER_ACTIVITY.find(
      (activity) => activity.userId === userId,
    );
    const averageSessionData = USER_AVERAGE_SESSIONS.find(
      (averageSession) => averageSession.userId === userId,
    );
    const performanceData = USER_PERFORMANCE.find(
      (performance) => performance.userId === userId,
    );

    if (!userData || !activityData || !averageSessionData || !performanceData) {
      throw new Error(`Mock data not found for userId: ${userId}`);
    }

    return { userData, activityData, averageSessionData, performanceData };
  }
}

// Export a single instance
export default new ApiService();
