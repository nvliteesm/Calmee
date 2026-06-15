import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentSession, signOutAdmin } from "../services/authService";
import { getActivePackages } from "../services/packageService";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const currentSession = await getCurrentSession();

        if (!isMounted) return;

        if (!currentSession) {
          navigate("/admin/login");
          return;
        }

        setSession(currentSession);
      } catch (error) {
        console.error(error);
        navigate("/admin/login");
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    async function loadPackages() {
      try {
        setLoadingPackages(true);
        const data = await getActivePackages();

        if (isMounted) {
          setPackages(data || []);
        }
      } catch (error) {
        console.error("Failed to load admin packages:", error);
      } finally {
        if (isMounted) {
          setLoadingPackages(false);
        }
      }
    }

    if (session) {
      loadPackages();
    }

    return () => {
      isMounted = false;
    };
  }, [session]);

  async function handleLogout() {
    await signOutAdmin();
    navigate("/admin/login");
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF9F0] text-[#2D1B6B]">
        <p className="font-bold">Memeriksa akses admin...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF9F0] px-5 py-8 text-[#2D1B6B]">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-[#E6DDF6] bg-white p-6 shadow-[0_18px_55px_rgba(45,27,107,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Calmee Admin
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#594878]">
              Login sebagai {session?.user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#2D1B6B]/20 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#2D1B6B] transition hover:bg-[#F0EAFF]"
          >
            Logout
          </button>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-5 shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
            <p className="text-sm font-bold text-[#8A6FC2]">Active Packages</p>
            <p className="mt-3 font-display text-4xl font-bold">
              {loadingPackages ? "..." : packages.length}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-5 shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
            <p className="text-sm font-bold text-[#8A6FC2]">Next Feature</p>
            <p className="mt-3 font-display text-2xl font-bold">
              Package Editor
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-5 shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
            <p className="text-sm font-bold text-[#8A6FC2]">Status</p>
            <p className="mt-3 font-display text-2xl font-bold">
              Admin Ready
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#E6DDF6] bg-white p-6 shadow-[0_18px_55px_rgba(45,27,107,0.08)]">
          <h2 className="font-display text-3xl font-bold">
            Package Data Preview
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6DDF6] text-[#8A6FC2]">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Quantity</th>
                  <th className="py-3 pr-4">Normal Price</th>
                  <th className="py-3 pr-4">Discount Price</th>
                  <th className="py-3 pr-4">Badge</th>
                </tr>
              </thead>

              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="border-b border-[#F0EAFF]">
                    <td className="py-3 pr-4 font-bold">{pkg.name}</td>
                    <td className="py-3 pr-4">{pkg.quantity}</td>
                    <td className="py-3 pr-4">{pkg.normal_price}</td>
                    <td className="py-3 pr-4">{pkg.discount_price}</td>
                    <td className="py-3 pr-4">{pkg.badge || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}