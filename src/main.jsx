import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// These routes are prerendered to static HTML at build time.
// Hydrate them in place to keep the SEO-friendly markup and avoid a flash.
// Other routes (e.g. /admin) are client-only, so we mount fresh.
const prerenderedRoutes = ["/", "/produk", "/tentang", "/faq"];

if (
  rootElement.hasChildNodes() &&
  prerenderedRoutes.includes(window.location.pathname)
) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
