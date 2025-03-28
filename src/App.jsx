import { Outlet } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

/**
 * Root component that provides the main layout structure of the application.
 * Renders the header, sidebar and main content using React Router's Outlet.
 *
 * @returns {JSX.Element} The application's root layout structure
 */
function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="mt-22 ml-29 flex-1 px-8 py-8 xl:px-[109px] xl:py-[62px]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
