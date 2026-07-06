import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Shared route tree so the client (BrowserRouter) and the
// prerender step (StaticRouter) render an identical tree.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
