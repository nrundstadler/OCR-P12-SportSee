import { useEffect, useState } from "react";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/mockUserData";
import standardizeAllData from "../data/standardizeData";

const BASE_URL_API = "http://localhost:3000/user";

const fetchDataApi = async (userId) => {
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
      "One or more API responses are missing the 'data' property.",
    );
  }

  return {
    userData,
    activityData,
    averageSessionData,
    performanceData,
  };
};

const getMockData = (userId) => {
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

export function useGetData(userId, useMockData) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          throw new Error("No user ID provided.");
        }

        const data = useMockData
          ? getMockData(userId)
          : await fetchDataApi(userId);

        const normalizedData = standardizeAllData(data);

        setData(normalizedData);
      } catch (error) {
        setHasError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, useMockData]);

  return { isLoading, hasError, data };
}
