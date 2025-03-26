import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}

export default usePageTitle;
