import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";

// Called by the prerender script at build time.
// Returns the static HTML string for a given URL.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );
}
