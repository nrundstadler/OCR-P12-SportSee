import { useEffect } from "react";

/**
 * Custom hook to set the page title (meta title)
 * @param {string} title - The title to display in the browser tab
 */
function usePageTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}

export default usePageTitle;
