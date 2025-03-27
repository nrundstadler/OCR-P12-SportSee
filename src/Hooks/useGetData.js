import { useEffect, useState } from "react";
import { fetchDataApi, getMockData } from "../services/api";
import standardizeData from "../services/standardizeData";

/**
 * Custom hook to retrieve and manage user data
 * @param {number} userId - The ID of the user
 * @param {boolean} useMockData - Flag to determine whether to use mock data instead of API
 * @returns {Object} An object containing:
 *   - isLoading {boolean} - Indicates if data is being fetched
 *   - hasError {boolean} - Indicates if an error occurred
 *   - data {Object|null} - The normalized user data or null if not loaded
 */
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

        const normalizedData = standardizeData(data);

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
