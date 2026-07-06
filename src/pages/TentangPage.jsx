import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import Layout from "../components/Layout";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/motion/Reveal";
import FloatingOrbs from "../components/motion/FloatingOrbs";
import calmeeIntro from "../assets/calmee-intro.png";
import badanPom from "../assets/badan-pom.png";
import gmp from "../assets/gmp.png";
import haccp from "../assets/logo-haccp.png";
import halalIndo from "../assets/halal-indo.png";

const shopeeLink = "https://id.shp.ee/uDja9WMf";

const trustLogos = [
  { name: "BPOM", image: badanPom },
  { name: "Halal Indonesia", image: halalIndo },
  { name: "GMP", image: gmp },
  { name: "HACCP", image: haccp },
];

const timeline = [
  {
    title: "Memahami Masalah",
    desc: "Insomnia di Indonesia diperkirakan mencapai prevalensi sekitar 67% (Jurnal Ilmiah Kesehatan, Universitas Syiah Kuala). Banyak orang bukan tidak ingin tidur — mereka sulit tenang.",
    icon: "◐",
  },
  {
    title: "Riset Formula",
    desc: "Kami memilih empat kandungan utama: susu sebagai comfort base, chamomile untuk ketenangan, L-theanine untuk relaksasi pikiran, dan lemon untuk kesegaran ringan.",
    icon: "✧",
  },
  {
    title: "Standar Produksi",
    desc: "Calmee diproduksi di fasilitas berstandar GMP dan HACCP, terdaftar di BPOM, dan bersertifikat Halal MUI.",
    icon: "✓",
  },
  {
    title: "Hadir untuk Kamu",
    desc: "Calmee tersedia melalui Shopee Official Store dan WhatsApp, siap menemani malam-malam yang butuh ketenangan.",
    icon: "☾",
  },
];

function AnimatedNumber({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function TentangPage() {
  return (
    <Layout>
      <PageMeta
        title="Tentang Calmee | Susu Herbal Indonesia untuk Ritual Malam"
        description="Kenali cerita di balik Calmee — susu herbal pertama di Indonesia untuk menemani ritual malam. Terdaftar BPOM, Halal MUI, diproduksi dengan standar GMP dan HACCP."
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--calmee-cream)] px-5 py-20 lg:px-8 lg:py-28">
        <FloatingOrbs variant="light" />

        {/* Twinkling stars, matches homepage hero-dot language */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden="true">
          {[
            { top: "15%", left: "8%" }, { top: "28%", left: "22%" }, { top: "62%", left: "12%" },
            { top: "40%", left: "5%" }, { top: "75%", left: "18%" },
          ].map((pos, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#D4A843]"
              style={pos}
              animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#8A6FC2]">
              Tentang Kami
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-[#2D1B6B] md:text-5xl lg:text-6xl">
              Saat tubuh lelah,
              <span className="mt-2 block text-[#D4A843]">tapi pikiran masih aktif.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#594878] md:text-lg">
              Ada malam ketika tubuh sebenarnya sudah ingin istirahat, tapi kepala masih berjalan
              ke mana-mana. Saat kepala terasa penuh tanpa jeda, tubuh pun menjadi lebih sulit benar-benar tenang.
              Dari malam-malam seperti inilah, insomnia sering muncul perlahan tanpa disadari.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#594878] md:text-lg">
              Dari pemahaman itulah <span className="font-bold text-[#2D1B6B]">Calmee</span> hadir.
              Bukan sebagai solusi instan, melainkan sebagai teman ritual malam yang hangat, lembut,
              dan menenangkan.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden rounded-[2rem] border border-[#E6DDF6] bg-white shadow-[0_18px_45px_rgba(45,27,107,0.10)]"
            >
              <img
                src={calmeeIntro}
                alt="Calmee susu herbal untuk ritual malam"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Quote — glowing moon backdrop */}
      <section className="relative isolate overflow-hidden bg-[#2D1B6B] px-5 py-16 lg:px-8 lg:py-20">
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A843]/10 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl text-[#D4A843]">
            ☾
          </span>
          <blockquote className="font-display text-2xl italic leading-relaxed text-white md:text-3xl">
            "Kami percaya malam tidak perlu selalu dilawan. Kadang, tubuh hanya butuh ritual kecil
            yang memberi tanda bahwa hari ini sudah cukup."
          </blockquote>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#D4A843]">
            — Tim Calmee
          </p>
        </Reveal>
      </section>

      {/* Stats — animated counters */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Latar Belakang
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl lg:text-5xl">
              Insomnia bukan pengalaman yang langka di Indonesia
            </h2>
            <p className="mt-4 text-base leading-7 text-[#594878]">
              Beberapa studi menyebut prevalensi insomnia di Indonesia dapat mencapai sekitar 67%.
              Banyak orang masih terjaga saat malam — bukan karena tidak ingin tidur,
              tapi karena tubuh dan pikiran belum benar-benar tenang.
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A843]">
              Sumber: Jurnal Ilmiah Kesehatan · Universitas Syiah Kuala
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { value: 67, suffix: "%", label: "Prevalensi insomnia di Indonesia" },
              { value: 4, suffix: "", label: "Kandungan alami yang saling melengkapi" },
              { value: 0, suffix: "%", label: "Gula tambahan & pengawet" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-6 text-center shadow-[0_14px_44px_rgba(45,27,107,0.06)]"
                >
                  <p className="font-display text-4xl font-bold text-[#2D1B6B]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-[#594878]">{stat.label}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline — animated connecting line */}
      <section className="relative isolate overflow-hidden bg-[#F0EAFF] px-5 py-16 lg:px-8 lg:py-24">
        <FloatingOrbs variant="light" />

        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Perjalanan Kami
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
              Dari pemahaman masalah menjadi solusi yang lembut
            </h2>
          </Reveal>

          <div className="relative mt-12">
            {/* Animated vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-5 top-2 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-[#D4A843] via-[#C4ADDF] to-transparent"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {timeline.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.12} className="relative flex gap-6 pl-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D1B6B] text-lg text-[#D4A843] shadow-[0_10px_24px_rgba(45,27,107,0.25)]"
                  >
                    {step.icon}
                  </motion.div>
                  <div className="pb-2 pt-1">
                    <h3 className="font-display text-xl font-bold text-[#2D1B6B]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#594878]">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Standar & Sertifikasi
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
              Diproduksi dengan standar yang kamu bisa percaya
            </h2>
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

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-[#2D1B6B] px-5 py-16 text-center text-white lg:px-8 lg:py-20">
        <FloatingOrbs variant="dark" />
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Siap memulai malam yang lebih tenang?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
            Calmee hadir bukan untuk memaksa tidur, melainkan menemani proses tubuh masuk ke mode istirahat.
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
              to="/produk"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              Lihat Produk
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
