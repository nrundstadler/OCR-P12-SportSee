import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import Error from "./components/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/profile/:id?",
        element: <Profile useMockData={false} />,
      },
      {
        path: "/profile-mocked/:id?",
        element: <Profile useMockData={true} />,
      },
      {
        path: "*", // Catch-all
        element: (
          <Error
            title="404"
            subtitle="Oups ! La page que vous avez demandée n'existe pas."
          />
        ), // Display the 404 page for unmatched routes
      },
    ],
  },
]);
