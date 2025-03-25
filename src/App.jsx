import { Outlet } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="mt-23 ml-29 flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
