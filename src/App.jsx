import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="mt-23 ml-29 flex-1 p-4">
          <h2 className="text-xl font-bold">Bienvenue</h2>
          <p>Hello World !</p>
        </main>
      </div>
    </>
  );
}

export default App;
