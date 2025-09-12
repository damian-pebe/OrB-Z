import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./src/pages/help/Loader";
import routes from "./router";
import getBackground from "../lib/utils/getBackground";

const Navbar = lazy(() => import("./src/pages/navbar/Navbar"));

function App() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center overflow-hidden text-white flex flex-col rounded-2xl"
      style={{ backgroundImage: `url('${getBackground()}')` }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="flex-1 min-h-0">
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
