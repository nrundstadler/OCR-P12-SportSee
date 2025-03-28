import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/mockUserData";

const BASE_URL_API = "http://localhost:3000/user";

/**
 * Fetches user data from the API
 * @async
 * @param {number} userId - The ID of the user
 * @returns {Promise<Object>} Object containing user data
 * @throws {Error} If the fetch fails or if data is missing
 */
export const fetchDataApi = async (userId) => {
  const endpoints = [
    `${BASE_URL_API}/${userId}`,
    `${BASE_URL_API}/${userId}/activity`,
    `${BASE_URL_API}/${userId}/average-sessions`,
    `${BASE_URL_API}/${userId}/performance`,
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
    userData,
    activityData,
    averageSessionData,
    performanceData,
  };
};

/**
 * Retrieves mock data (from a js file) for a user
 * @param {number} userId
 * @returns {Object} Object containing mock user data
 * @throws {Error} If mock data is not found for the given user ID
 */
export const getMockData = (userId) => {
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
};
