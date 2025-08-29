import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./src/components/Help/Loader";
const Landing = lazy(() => import("./src/components/Landing/LandingPage"));
// const FontsView = lazy(() => import("./src/components/Help/fontsView"));
const Navbar = lazy(() => import("./src/components/Navbar/Navbar"));

function App() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center overflow-hidden text-white flex flex-col"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="flex-1 min-h-0">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              {/* <Route path="/dashboard" element={<FontsView />} /> */}
              {/* <Route path="/loading" element={<Loader />} /> */}
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
