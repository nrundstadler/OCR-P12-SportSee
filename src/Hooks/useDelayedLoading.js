import { useState, useEffect } from "react";

/**
 * Custom hook to manage the delayed appearance and disappearance of loading indicators.
 * Prevents unwanted brief loading flashes when data is fetched quickly.
 *
 * @param {boolean} isLoading - The current loading state
 * @param {number} [delay=400] - The delay in milliseconds before showing the loading indicator
 * @param {number} [hideDelay=800] - The delay in milliseconds before hiding the loading indicator
 * @returns {boolean} showLoading - The delayed loading state
 */
export function useDelayedLoading(isLoading, delay = 400, hideDelay = 800) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (isLoading) {
      // If loading is active, set a timer to show the loading indicator after the specified delay
      timer = setTimeout(() => setShowLoading(true), delay);
    } else if (!isLoading && showLoading) {
      // If loading is no longer active, set a timer to hide the loading indicator after the specified hideDelay
      timer = setTimeout(() => setShowLoading(false), hideDelay);
    }

    // Cleanup the timer if the component unmounts or if `isLoading` changes
    return () => clearTimeout(timer);
  }, [isLoading, delay, hideDelay, showLoading]);

  return showLoading;
}
