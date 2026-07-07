import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProdukPage from "./pages/ProdukPage.jsx";
import TentangPage from "./pages/TentangPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PaymentReturnPage from "./pages/PaymentReturnPage.jsx";

// Shared route tree so the client (BrowserRouter) and the
// prerender step (StaticRouter) render an identical tree.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/produk" element={<ProdukPage />} />
      <Route path="/tentang" element={<TentangPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/payment/return" element={<PaymentReturnPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
