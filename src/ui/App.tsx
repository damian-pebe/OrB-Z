import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./src/components/Loader";
const Landing = lazy(() => import("./src/components/Landing/page"));
const FontsView = lazy(() => import("./src/components/fontsView"));
const Navbar = lazy(() => import("./src/components/Navbar/page"));

function App() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<FontsView />} />
            <Route path="/loading" element={<Loader />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
