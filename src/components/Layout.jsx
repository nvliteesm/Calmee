import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logoCalmeeWord from "../assets/logo-calmee-type.png";
import logoCalmeeWhite from "../assets/logo-calmee-white.png";
import badanPom from "../assets/badan-pom.png";
import gmp from "../assets/gmp.png";
import haccp from "../assets/logo-haccp.png";
import halalIndo from "../assets/halal-indo.png";

const navItems = [
  { label: "Produk", href: "/produk" },
  { label: "Tentang", href: "/tentang" },
  { label: "FAQ", href: "/faq" },
];

const trustLogos = [
  { name: "BPOM", image: badanPom },
  { name: "Halal Indonesia", image: halalIndo },
  { name: "GMP", image: gmp },
  { name: "HACCP", image: haccp },
];

const shopeeLink = "https://id.shp.ee/uDja9WMf";
const whatsappLink =
  "https://wa.me/6285880877355?text=Halo%20Admin%20Calmee!%2C%20Saya%20ingin%20bertanya%20tentang%20produk%20Calmee.";

export default function Layout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileNavOpen(false);
  }

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-[var(--calmee-cream)] font-body text-[var(--calmee-text)] antialiased">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b border-[var(--calmee-purple-light)]/20 bg-[var(--calmee-cream)]/92 shadow-[0_10px_35px_rgba(45,27,107,0.17)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8 lg:py-4">
          <Link to="/" className="flex items-center" aria-label="Calmee - Beranda">
            <img src={logoCalmeeWord} alt="Calmee" className="h-7 w-auto md:h-10" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xs font-bold uppercase tracking-[0.16em] transition hover:text-[#2D1B6B] ${
                  location.pathname === item.href
                    ? "text-[#2D1B6B]"
                    : "text-[#6B4FA0]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center justify-center rounded-full bg-[#2D1B6B] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(45,27,107,0.25)] transition-all duration-500 ease-out hover:scale-105 hover:bg-[var(--calmee-purple-light)] hover:text-[#2D1B6B] lg:inline-flex"
            >
              Beli Sekarang
            </a>

            <a
              href={shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#2D1B6B] px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_20px_rgba(45,27,107,0.25)] transition active:scale-95 lg:hidden"
            >
              Beli
            </a>

            <button
              type="button"
              aria-label="Buka menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2D1B6B]/15 bg-white/80 text-[#2D1B6B] backdrop-blur transition active:scale-95 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            key="mobile-drawer"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-[#12092E]/55 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-[var(--calmee-cream)] shadow-[0_0_60px_rgba(45,27,107,0.35)]"
            >
              <div className="flex items-center justify-between px-6 pb-4 pt-6">
                <img src={logoCalmeeWord} alt="Calmee" className="h-8 w-auto" />
                <button
                  type="button"
                  aria-label="Tutup menu"
                  onClick={() => setMobileNavOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2D1B6B]/15 bg-white text-[#2D1B6B] transition active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col px-3 pt-4">
                <Link
                  to="/"
                  className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-xl font-bold text-[#2D1B6B] transition active:bg-[#F0EAFF]"
                >
                  <span>Beranda</span>
                  <span className="text-[#D4A843]">→</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-xl font-bold text-[#2D1B6B] transition active:bg-[#F0EAFF]"
                  >
                    <span>{item.label}</span>
                    <span className="text-[#D4A843]">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-3 px-6 pb-8">
                <a
                  href={shopeeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D4A843] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#241256] shadow-[0_10px_30px_rgba(212,168,67,0.32)] transition active:scale-[0.98]"
                >
                  Beli di Shopee
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#2D1B6B]/20 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#2D1B6B] transition active:scale-[0.98]"
                >
                  Chat WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Page content */}
      <main className="pt-[var(--nav-height)]">{children}</main>

      {/* Footer */}
      <footer className="bg-[#12092E] px-5 pb-10 pt-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoCalmeeWhite} alt="Calmee" className="h-8 w-auto opacity-90" />
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/" className="text-xs font-bold uppercase tracking-[0.16em] text-white/50 transition hover:text-white">
              Beranda
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-xs font-bold uppercase tracking-[0.16em] text-white/50 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p>&copy; 2026 Calmee Store Indonesia. Seluruh hak cipta dilindungi.</p>
            <p>Susu herbal untuk ritual malam. Bukan obat atau pengganti saran medis.</p>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="flex w-fit max-w-full items-center justify-center rounded-xl bg-white/95 px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-5">
                {trustLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.image}
                    alt={`Sertifikasi ${logo.name}`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-6 w-auto object-contain sm:max-h-7"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
