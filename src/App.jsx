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
        <main className="mt-23 ml-29 flex-1 px-[109px] py-[62px]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
