import { StrictMode, Suspense } from "react";
import { createRoot } from 'react-dom/client'
import "./i18n";
import './global.css'
import App from './App'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  </StrictMode>
);
