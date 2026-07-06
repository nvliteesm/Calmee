import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import FloatingOrbs from "../components/motion/FloatingOrbs";
import OrbitRing from "../components/motion/OrbitRing";
import productPreview from "../assets/preview-susu.png";
import ingredientMilk from "../assets/milk.png";
import ingredientLemon from "../assets/lemon.png";
import ingredientChamomile from "../assets/chamomile.png";
import ingredientTheanine from "../assets/l-theanine.png";
import badanPom from "../assets/badan-pom.png";
import gmp from "../assets/gmp.png";
import haccp from "../assets/logo-haccp.png";
import halalIndo from "../assets/halal-indo.png";
import { getActivePackages } from "../services/packageService";

const shopeeLink = "https://id.shp.ee/uDja9WMf";

const ingredients = [
  {
    key: "milk",
    title: "Susu",
    tag: "Comfort Base",
    icon: "✦",
    desc: "Sumber tryptophan dan magnesium yang mendukung rasa nyaman sebelum tidur. Memberi tekstur creamy dan hangat untuk ritual malam.",
    image: ingredientMilk,
  },
  {
    key: "chamomile",
    title: "Chamomile",
    tag: "Calming Botanical",
    icon: "❀",
    desc: "Herbal yang dikenal luas dalam tradisi minuman relaksasi malam. Membantu menciptakan rasa tenang dan nyaman menjelang tidur.",
    image: ingredientChamomile,
  },
  {
    key: "theanine",
    title: "L-Theanine",
    tag: "Relaxed Focus",
    icon: "◐",
    desc: "Asam amino alami dari teh hijau. Mendukung aktivitas gelombang alpha di otak yang berhubungan dengan relaksasi pikiran.",
    image: ingredientTheanine,
  },
  {
    key: "lemon",
    title: "Lemon",
    tag: "Fresh Antioxidant",
    icon: "◑",
    desc: "Sentuhan rasa segar yang ringan, menyeimbangkan rasa susu. Vitamin C dan antioksidan melengkapi formula harian.",
    image: ingredientLemon,
  },
];

const trustLogos = [
  { name: "BPOM", image: badanPom },
  { name: "Halal Indonesia", image: halalIndo },
  { name: "GMP", image: gmp },
  { name: "HACCP", image: haccp },
];

const benefits = [
  {
    title: "Bantu tubuh terasa lebih santai",
    desc: "Cocok diminum saat kamu ingin menutup hari dengan ritme yang lebih pelan dan suasana yang lebih nyaman.",
    icon: "☾",
  },
  {
    title: "Bantu pikiran pelan-pelan turun tempo",
    desc: "Untuk malam ketika badan sudah capek, tapi pikiran masih sibuk memikirkan banyak hal.",
    icon: "✧",
  },
  {
    title: "Jadi bagian dari rutinitas tidur yang lebih lembut",
    desc: "Satu sachet hangat sebelum tidur bisa menjadi sinyal kecil bahwa hari ini sudah cukup.",
    icon: "◍",
  },
  {
    title: "Bukan obat tidur — non-adiktif",
    desc: "Menemani proses tubuh masuk ke mode istirahat secara alami. Tanpa gula tambahan, tanpa pengawet.",
    icon: "✓",
  },
];

function formatRupiah(value) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProdukPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await getActivePackages();
        if (isMounted && data?.length) setPackages(data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <Layout>
      <PageMeta
        title="Produk Calmee | Susu Herbal untuk Tidur Lebih Nyenyak"
        description="Calmee mengandung susu, chamomile, L-theanine, dan lemon. Susu herbal pertama di Indonesia untuk membantu insomnia ringan. Tanpa obat tidur, bebas gula, non-adiktif. Terdaftar BPOM dan bersertifikat Halal."
      />

      {/* Hero with orbiting ingredients */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#2D1B6B_0%,#4A2E8A_55%,#241256_100%)] px-5 py-20 text-white lg:px-8 lg:py-28">
        <FloatingOrbs variant="dark" />

        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#C4ADDF]">
              Produk Calmee
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
              Satu sachet hangat,
              <span className="mt-2 block text-[#D4A843]">empat kandungan pilihan.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              Calmee adalah minuman susu bubuk yang diformulasikan khusus untuk menemani ritual malam sebelum tidur.
              Memadukan susu creamy dengan chamomile, L-theanine, dan lemon dalam satu sachet praktis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={shopeeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4A843] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#241256] shadow-[0_0px_25px_rgba(212,168,67,0.28)] transition-all hover:scale-105 hover:bg-[#e3ba5c] active:scale-95"
              >
                Beli Sekarang
              </a>
              <Link
                to="/faq"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
              >
                Punya Pertanyaan?
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex justify-center">
            {/* Desktop: orbiting ring */}
            <div className="hidden lg:block">
              <OrbitRing
                center={
                  <img
                    src={productPreview}
                    alt="Kemasan produk susu herbal Calmee"
                    className="h-[7.5rem] w-auto object-contain drop-shadow-[0_20px_40px_rgba(45,27,107,0.28)] md:h-[8.5rem]"
                  />
                }
                items={ingredients}
                radius={165}
                size={60}
              />
            </div>

            {/* Mobile/tablet: static image */}
            <div className="flex h-[16rem] w-[16rem] items-center justify-center rounded-full bg-white/10 shadow-[0_30px_90px_rgba(18,9,46,0.32)] lg:hidden">
              <img
                src={productPreview}
                alt="Kemasan produk susu herbal Calmee"
                className="h-[12rem] w-auto object-contain drop-shadow-[0_20px_40px_rgba(45,27,107,0.28)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ingredients — interactive tilt cards */}
      <section className="relative isolate overflow-hidden px-5 py-16 lg:px-8 lg:py-24">
        <FloatingOrbs variant="light" />

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Kandungan
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl lg:text-5xl">
              Apa yang ada di dalam satu sachet Calmee?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#594878]">
              Setiap kandungan dipilih berdasarkan fungsi yang saling melengkapi — dari rasa nyaman
              hingga relaksasi alami menjelang tidur. Arahkan kursor ke setiap kartu untuk melihat detailnya.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ingredients.map((item, index) => (
              <Reveal key={item.key} delay={index * 0.08}>
                <TiltCard
                  className="overflow-hidden rounded-[1.5rem] border border-[#E6DDF6] bg-white/90 p-6 shadow-[0_14px_44px_rgba(45,27,107,0.06)] transition-shadow hover:shadow-[0_24px_60px_rgba(212,168,67,0.14)]"
                  intensity={6}
                >
                  <div className="flex gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={`Kandungan Calmee: ${item.title}`}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A843] text-xs text-[#241256] shadow">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#D4A843]">
                        {item.tag}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#2D1B6B]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#594878]">{item.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-8 flex justify-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F0EAFF] px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#6B4FA0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A843]" />
              Tanpa Gula Tambahan · Tanpa Pengawet · Non-Adiktif
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits — staggered cards with icon badges */}
      <section className="relative isolate overflow-hidden bg-[#F0EAFF] px-5 py-16 lg:px-8 lg:py-24">
        <div className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Manfaat
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl lg:text-5xl">
              Lebih dari sekadar tidur — ini tentang pemulihan.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {benefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} y={20}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex gap-4 rounded-[1.5rem] border border-[#E6DDF6] bg-white/90 p-6 shadow-[0_14px_44px_rgba(45,27,107,0.06)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D1B6B] text-lg text-[#D4A843]">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2D1B6B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#594878]">{item.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications — floating badges */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Standar & Sertifikasi
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
              Terdaftar dan diproduksi dengan standar terpercaya
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#594878]">
              Calmee telah terdaftar di BPOM, bersertifikat Halal dari MUI, dan diproduksi
              di fasilitas berstandar GMP dan HACCP.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-8">
            {trustLogos.map((logo, index) => (
              <Reveal key={logo.name} delay={index * 0.06} y={16}>
                <motion.div
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? -3 : 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-16 w-20 items-center justify-center rounded-2xl bg-white px-3 shadow-[0_10px_26px_rgba(0,0,0,0.08)]">
                    <img
                      src={logo.image}
                      alt={`Sertifikasi ${logo.name}`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#6B4FA0]">
                    {logo.name}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages preview */}
      {packages.length > 0 && (
        <section className="relative isolate overflow-hidden bg-[var(--calmee-cream-alt)] px-5 py-16 lg:px-8 lg:py-24">
          <FloatingOrbs variant="light" />

          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
                Pilihan Paket
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
                Tersedia dalam beberapa ukuran paket
              </h2>
            </Reveal>

            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
              {packages.slice(0, 3).map((pkg, index) => (
                <Reveal key={pkg.id || pkg.name} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-5 shadow-[0_14px_44px_rgba(45,27,107,0.06)]"
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A6FC2]">
                      {pkg.quantity || "Paket"}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#2D1B6B]">{pkg.name}</h3>
                    <p className="mt-2 text-lg font-bold text-[#6B4FA0]">
                      {formatRupiah(pkg.discount_price || pkg.normal_price)}
                    </p>
                    <a
                      href={pkg.shopee_url || shopeeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-full justify-center rounded-full bg-[#2D1B6B] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#6B4FA0]"
                    >
                      Beli di Shopee
                    </a>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#6B4FA0] transition hover:text-[#2D1B6B]"
            >
              ← Lihat semua paket di beranda
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-[#2D1B6B] px-5 py-16 text-center text-white lg:px-8 lg:py-20">
        <FloatingOrbs variant="dark" />
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Mulai ritual malam yang lebih tenang malam ini.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
            Hangat, creamy, dan nyaman diminum saat tubuh mulai minta istirahat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4A843] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#241256] transition hover:bg-[#e3ba5c]"
            >
              Beli Sekarang
            </a>
            <Link
              to="/tentang"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              Tentang Calmee
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
