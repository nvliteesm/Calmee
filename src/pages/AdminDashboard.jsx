import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentSession, signOutAdmin } from "../services/authService";
import { getAllPackages, updatePackage } from "../services/packageService";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [packages, setPackages] = useState([]);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [savingPackage, setSavingPackage] = useState(false);
  const [packageMessage, setPackageMessage] = useState("");
  const [packageError, setPackageError] = useState("");

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
        const data = await getAllPackages();

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

  function startEditingPackage(pkg) {
    setEditingPackageId(pkg.id);
    setEditForm({
        name: pkg.name || "",
        description: pkg.description || "",
        quantity: pkg.quantity || "",
        normal_price: pkg.normal_price ?? "",
        discount_price: pkg.discount_price ?? "",
        badge: pkg.badge || "",
        shopee_url: pkg.shopee_url || "",
        whatsapp_message: pkg.whatsapp_message || "",
        is_active: Boolean(pkg.is_active),
        sort_order: pkg.sort_order ?? 0,
    });
    setPackageMessage("");
    setPackageError("");
    }

    function cancelEditingPackage() {
    setEditingPackageId(null);
    setEditForm(null);
    setPackageMessage("");
    setPackageError("");
    }

    function updateEditField(field, value) {
    setEditForm((current) => ({
        ...current,
        [field]: value,
    }));
    }

    async function savePackageChanges(packageId) {
    try {
        setSavingPackage(true);
        setPackageMessage("");
        setPackageError("");

        const updates = {
        name: editForm.name.trim(),
        description: editForm.description.trim(),
        quantity: editForm.quantity.trim(),
        normal_price:
            editForm.normal_price === "" ? null : Number(editForm.normal_price),
        discount_price:
            editForm.discount_price === "" ? null : Number(editForm.discount_price),
        badge: editForm.badge.trim() || null,
        shopee_url: editForm.shopee_url.trim(),
        whatsapp_message: editForm.whatsapp_message.trim(),
        is_active: Boolean(editForm.is_active),
        sort_order: Number(editForm.sort_order || 0),
        };

        if (!updates.name) {
        throw new Error("Package name cannot be empty.");
        }

        if (updates.normal_price !== null && updates.normal_price < 0) {
        throw new Error("Normal price cannot be negative.");
        }

        if (updates.discount_price !== null && updates.discount_price < 0) {
        throw new Error("Discount price cannot be negative.");
        }

        const updatedPackage = await updatePackage(packageId, updates);

        setPackages((current) =>
        current
            .map((pkg) => (pkg.id === packageId ? updatedPackage : pkg))
            .sort((a, b) => a.sort_order - b.sort_order)
        );

        setEditingPackageId(null);
        setEditForm(null);
        setPackageMessage("Package updated successfully.");
    } catch (error) {
        console.error(error);
        setPackageError(error.message || "Failed to update package.");
    } finally {
        setSavingPackage(false);
    }
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
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                <h2 className="font-display text-3xl font-bold">
                    Package Editor
                </h2>
                <p className="mt-2 text-sm text-[#594878]">
                    Edit package prices, badges, Shopee links, and visibility without touching code.
                </p>
                </div>

                <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full border border-[#2D1B6B]/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2D1B6B] transition hover:bg-[#F0EAFF]"
                >
                Refresh
                </button>
            </div>

            {packageMessage ? (
                <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {packageMessage}
                </p>
            ) : null}

            {packageError ? (
                <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {packageError}
                </p>
            ) : null}

            <div className="mt-6 space-y-5">
                {loadingPackages ? (
                <p className="text-sm font-semibold text-[#594878]">
                    Loading packages...
                </p>
                ) : null}

                {!loadingPackages && packages.length === 0 ? (
                <p className="text-sm font-semibold text-[#594878]">
                    No packages found.
                </p>
                ) : null}

                {packages.map((pkg) => {
                const isEditing = editingPackageId === pkg.id;

                return (
                    <article
                    key={pkg.id}
                    className="rounded-[1.5rem] border border-[#E6DDF6] bg-[#FDF9F0] p-5"
                    >
                    {!isEditing ? (
                        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-display text-2xl font-bold text-[#2D1B6B]">
                                {pkg.name}
                            </h3>

                            <span
                                className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
                                pkg.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                                {pkg.is_active ? "Active" : "Inactive"}
                            </span>

                            {pkg.badge ? (
                                <span className="rounded-full bg-[#D4A843] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#241256]">
                                {pkg.badge}
                                </span>
                            ) : null}
                            </div>

                            <p className="mt-2 text-sm leading-6 text-[#594878]">
                            {pkg.description || "No description"}
                            </p>

                            <div className="mt-4 grid gap-3 text-sm text-[#594878] md:grid-cols-2">
                            <p>
                                <span className="font-bold text-[#2D1B6B]">Quantity:</span>{" "}
                                {pkg.quantity || "-"}
                            </p>
                            <p>
                                <span className="font-bold text-[#2D1B6B]">Sort order:</span>{" "}
                                {pkg.sort_order}
                            </p>
                            <p>
                                <span className="font-bold text-[#2D1B6B]">Normal price:</span>{" "}
                                Rp {Number(pkg.normal_price || 0).toLocaleString("id-ID")}
                            </p>
                            <p>
                                <span className="font-bold text-[#2D1B6B]">Discount price:</span>{" "}
                                Rp {Number(pkg.discount_price || 0).toLocaleString("id-ID")}
                            </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a
                            href={pkg.shopee_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-[#2D1B6B] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#6B4FA0]"
                            >
                            Open Shopee Link
                            </a>

                            <button
                            type="button"
                            onClick={() => startEditingPackage(pkg)}
                            className="rounded-full border border-[#2D1B6B]/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2D1B6B] transition hover:bg-[#F0EAFF]"
                            >
                            Edit Package
                            </button>
                        </div>
                        </div>
                    ) : (
                        <div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Package Name
                            </span>
                            <input
                                value={editForm.name}
                                onChange={(event) => updateEditField("name", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Quantity / Subtitle
                            </span>
                            <input
                                value={editForm.quantity}
                                onChange={(event) => updateEditField("quantity", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Normal Price
                            </span>
                            <input
                                type="number"
                                value={editForm.normal_price}
                                onChange={(event) => updateEditField("normal_price", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Discount Price
                            </span>
                            <input
                                type="number"
                                value={editForm.discount_price}
                                onChange={(event) => updateEditField("discount_price", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Badge
                            </span>
                            <input
                                value={editForm.badge}
                                onChange={(event) => updateEditField("badge", event.target.value)}
                                placeholder="Best Seller / Direkomendasikan"
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Sort Order
                            </span>
                            <input
                                type="number"
                                value={editForm.sort_order}
                                onChange={(event) => updateEditField("sort_order", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block md:col-span-2">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Description
                            </span>
                            <textarea
                                value={editForm.description}
                                onChange={(event) => updateEditField("description", event.target.value)}
                                rows={3}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block md:col-span-2">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                Shopee URL
                            </span>
                            <input
                                value={editForm.shopee_url}
                                onChange={(event) => updateEditField("shopee_url", event.target.value)}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="block md:col-span-2">
                            <span className="mb-2 block text-sm font-bold text-[#2D1B6B]">
                                WhatsApp Message
                            </span>
                            <textarea
                                value={editForm.whatsapp_message}
                                onChange={(event) => updateEditField("whatsapp_message", event.target.value)}
                                rows={2}
                                className="w-full rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A843]"
                            />
                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-[#E6DDF6] bg-white px-4 py-3">
                            <input
                                type="checkbox"
                                checked={editForm.is_active}
                                onChange={(event) => updateEditField("is_active", event.target.checked)}
                                className="h-4 w-4"
                            />
                            <span className="text-sm font-bold text-[#2D1B6B]">
                                Active package
                            </span>
                            </label>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                            type="button"
                            onClick={cancelEditingPackage}
                            disabled={savingPackage}
                            className="rounded-full border border-[#2D1B6B]/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#2D1B6B] transition hover:bg-[#F0EAFF] disabled:opacity-60"
                            >
                            Cancel
                            </button>

                            <button
                            type="button"
                            onClick={() => savePackageChanges(pkg.id)}
                            disabled={savingPackage}
                            className="rounded-full bg-[#D4A843] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#241256] transition hover:bg-[#e3ba5c] disabled:opacity-60"
                            >
                            {savingPackage ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                        </div>
                    )}
                    </article>
                );
                })}
            </div>
        </section>
      </div>
    </main>
  );
}