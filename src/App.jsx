import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import logoCalmee from "./assets/logo-calmee.png";
import logoCalmeeWord from "./assets/logo-calmee-type.png";
import ingredientMilk from "./assets/milk.png";
import ingredientLemon from "./assets/lemon.png";
import ingredientChamomile from "./assets/chamomile.png";
import ingredientTheanine from "./assets/l-theanine.png";
import susuCalmee from "./assets/susu-calmee.png";
import productPreview from "./assets/preview-susu.png";
import "./index.css";

const shopeeLink = "https://shopee.co.id/";
const whatsappLink =
  "https://wa.me/6280000000000?text=Halo%20Calmee%2C%20saya%20ingin%20tanya%20produk%20dan%20promo%20hari%20ini.";
const logoImageUrl =
  "https://leadpages.com/api/pages/6iiMfu2VLj/assets/ds79epg3l4pyyd6yxxe7w6ps";
const productImageUrl =
  "https://leadpages.com/api/pages/6iiMfu2VLj/assets/wejjf15rwhp6ax2du91hl65c";
const moonImageUrl =
  "https://leadpages.com/api/pages/6iiMfu2VLj/assets/l9wvwcqukd1bfjlp62r3pefa";

const navItems = [
  { label: "Tentang Kami", href: "#tentang-kami" },
  { label: "Produk", href: "#produk" },
  { label: "Manfaat", href: "#manfaat" },
  { label: "Paket", href: "#paket" },
  { label: "FAQ", href: "#faq" },
];

const trustSignals = [
  "Terdaftar BPOM",
  "100% Halal",
  "Diproduksi dengan standar bermutu",
];

const heroFloatingCards = [
  {
    label: "Night Ritual",
    title: "Teman ritual malam.",
    positionClass: "left-0 top-12 -translate-x-15",
    motionClass: "animate-[cardDriftRight_5s_ease-in-out_infinite]",
  },
  {
    label: "Creamy Comfort",
    title: "Hangat. Creamy. Lembut.",
    positionClass: "right-0 bottom-14 translate-x-30",
    motionClass: "animate-[cardDriftLeft_5.8s_ease-in-out_infinite]",
  },
];


const problems = [
  "Pikiran masih aktif saat tubuh sudah lelah",
  "Sulit merasa rileks setelah hari yang panjang",
  "Malam terasa panjang karena overthinking",
  "Tidur terasa kurang dalam dan kurang memulihkan",
  "Butuh rutinitas malam yang lebih lembut",
  "Ingin pilihan hangat yang bukan obat tidur",
];

const sleepInsightCards = [
  {
    icon: "☾",
    label: "Background",
    title: "Pikiran yang aktif sering membuat tubuh sulit masuk mode istirahat.",
    desc:
      "Stres, kekhawatiran, dan rutinitas tidur yang terganggu dapat membuat malam terasa lebih panjang.",
  },
  {
    icon: "✦",
    label: "Dampak Harian",
    title: "Kurang tidur bukan cuma soal mengantuk.",
    desc:
      "Tidur yang terganggu dapat berhubungan dengan suasana hati, fokus, energi, dan kualitas hidup sehari-hari.",
  },
  {
    icon: "◐",
    label: "Bukan solusi instan",
    title: "Calmee hadir bukan sebagai obat tidur.",
    desc:
      "Calmee diposisikan sebagai teman ritual malam yang hangat, creamy, dan menenangkan.",
  },
];

const ingredients = [
  {
    key: "milk",
    display: "Milk",
    title: "Milk + Tryptophan",
    tag: "Comfort base",
    desc: "Basis susu yang creamy dengan tryptophan, memberi sensasi hangat dan nyaman untuk menemani ritual malam.",
    image: ingredientMilk,
    wrapClass: "left-0 top-8 items-start text-left",
    lineClass: "left-[12.5rem] top-[8.5rem] w-[10rem] rotate-[28deg] origin-left",
  },
  {
    key: "lemon",
    display: "Lemon",
    title: "Lemon",
    tag: "Bright finish",
    desc: "Memberi sentuhan rasa ringan dan segar agar Calmee tetap nyaman dinikmati pada malam hari.",
    image: ingredientLemon,
    wrapClass: "right-0 top-8 items-end text-right",
    lineClass: "right-[12.5rem] top-[8.5rem] w-[10rem] -rotate-[28deg] origin-right",
  },
  {
    key: "chamomile",
    display: "Chamomile",
    title: "Chamomile",
    tag: "Calming botanical",
    desc: "Bunga herbal yang umum digunakan dalam ritual malam untuk membantu tubuh terasa lebih rileks dan tenang.",
    image: ingredientChamomile,
    wrapClass: "left-0 bottom-8 items-start text-left",
    lineClass: "left-[12.5rem] bottom-[8.5rem] w-[10rem] -rotate-[28deg] origin-left",
  },
  {
    key: "theanine",
    display: "L-Theanine",
    title: "L-Theanine",
    tag: "Relaxed focus",
    desc: "Asam amino yang dikenal membantu rasa rileks, cocok untuk membantu pikiran pelan-pelan melambat sebelum tidur.",
    image: ingredientTheanine,
    wrapClass: "right-0 bottom-8 items-end text-right",
    lineClass: "right-[12.5rem] bottom-[8.5rem] w-[10rem] rotate-[28deg] origin-right",
  },
];

const benefits = [
  {
    title: "Membantu tubuh lebih rileks",
    desc: "Cocok untuk menutup hari dengan ritme yang lebih pelan dan suasana yang lebih nyaman.",
  },
  {
    title: "Menenangkan pikiran sebelum tidur",
    desc: "Mendukung transisi dari mode sibuk ke mode istirahat lewat ritual malam yang konsisten.",
  },
  {
    title: "Mendukung tidur lebih nyenyak",
    desc: "Dirancang sebagai bagian dari kebiasaan tidur yang lebih lembut, hangat, dan mindful.",
  },
  {
    title: "Tanpa ketergantungan",
    desc: "Calmee bukan obat tidur dan tidak diposisikan sebagai produk yang memaksa tubuh tertidur.",
  },
];

const packages = [
  {
    name: "Trial",
    subtitle: "Untuk mulai coba",
    price: "Mulai dari 1 box",
    highlight: false,
    perks: ["Cocok untuk pemula", "Praktis untuk rutinitas malam", "Bisa konsultasi via WhatsApp"],
  },
  {
    name: "Sleep Routine",
    subtitle: "Pilihan paling populer",
    price: "Paket hemat bulanan",
    highlight: true,
    perks: ["Untuk konsumsi rutin", "Lebih hemat dari pembelian satuan", "Prioritas info promo"],
  },
  {
    name: "Family Pack",
    subtitle: "Untuk stok di rumah",
    price: "Paket keluarga",
    highlight: false,
    perks: ["Stok lebih panjang", "Cocok dibagi dengan keluarga", "Tanyakan bundle terbaru"],
  },
];

const testimonials = [
  {
    name: "Anisa R.",
    meta: "Karyawan, Jakarta",
    quote:
      "Aku suka karena rasanya lembut dan jadi punya ritual malam yang bikin lebih tenang sebelum tidur.",
  },
  {
    name: "Bagas D.",
    meta: "Mahasiswa, Surabaya",
    quote:
      "Biasanya malam masih kepikiran tugas. Sekarang minum Calmee jadi sinyal untuk pelan-pelan istirahat.",
  },
  {
    name: "Sari W.",
    meta: "Ibu rumah tangga, Bandung",
    quote:
      "Bukan tipe rasa herbal yang menusuk. Creamy, nyaman, dan cocok diminum saat rumah sudah mulai sepi.",
  },
];

const faqs = [
  {
    question: "Apakah Calmee obat tidur?",
    answer:
      "Bukan. Calmee adalah minuman susu herbal untuk mendukung rutinitas relaksasi sebelum tidur, bukan obat atau pengganti saran medis.",
  },
  {
    question: "Kapan sebaiknya diminum?",
    answer:
      "Umumnya diminum pada malam hari sebelum tidur. Untuk pengalaman terbaik, nikmati bersama rutinitas yang tenang seperti lampu redup dan mengurangi layar.",
  },
  {
    question: "Apakah aman dikonsumsi rutin?",
    answer:
      "Calmee diposisikan sebagai minuman wellness. Jika sedang hamil, menyusui, punya kondisi medis, alergi susu, atau sedang mengonsumsi obat, konsultasikan dulu dengan tenaga kesehatan.",
  },
  {
    question: "Di mana bisa membeli Calmee?",
    answer:
      "Kamu bisa klik tombol Beli Sekarang untuk menuju Shopee, atau chat WhatsApp untuk bertanya stok, harga, dan promo terbaru.",
  },
];

const sectionClass = "snap-section px-5 py-16 lg:px-8";
const sectionInnerClass = "mx-auto w-full max-w-[var(--content-max)]";

function MoonIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.2 15.7A8.4 8.4 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SparkleIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5 14.3 9.7 21.5 12 14.3 14.3 12 21.5 9.7 14.3 2.5 12 9.7 9.7 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaButtons({ align = "start", light = false }) {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${justify}`}>
      <a
        href={shopeeLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4A843] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#241256] shadow-[0_0px_25px_rgba(212,168,67,0.28)] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#e3ba5c] active:scale-95"
      >
        Beli Sekarang
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${
          light
            ? "border-white/35 text-white hover:bg-white/10"
            : "border-[#6B4FA0]/25 bg-white text-[#2D1B6B] hover:bg-[#F0EAFF]"
        }`}
      >
        Chat WhatsApp
      </a>
    </div>
  );
}

function SectionHeading({ eyebrow, title, children, light = false, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] ${
          light ? "text-[#C4ADDF]" : "text-[#8A6FC2]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[3.15rem] ${
          light ? "text-white" : "text-[#2D1B6B]"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-4 text-base leading-7 ${
            light ? "text-white/70" : "text-[#594878]"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
function AnimatedWords({ children, className = "" }) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-3"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            // delay: index * 0.08,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
function IngredientLabel({ item, active, className, lineClass }) {
  return (
    <>
      <span
        className={`absolute z-10 h-[2px] origin-center bg-white/30 transition-all duration-300 ${
          lineClass
        } ${active ? "bg-[#D4A843]" : ""}`}
      />

      <div
        className={`absolute z-20 w-[19rem] transition-all duration-300 ${className} ${
          active ? "scale-105" : "scale-100"
        }`}
      >
        <h3 className="font-display text-3xl font-bold italic leading-none text-white underline decoration-[#D4A843]/70 underline-offset-4">
          {item.display}
        </h3>

        <div
          className={`mt-3 rounded-[1.2rem] border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur transition-all duration-300 ${
            active
              ? "opacity-100 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              : "opacity-75"
          }`}
        >
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#D4A843]">
            {item.tag}
          </p>

          <p className="mt-2 text-sm leading-6 text-white/72">
            {item.desc}
          </p>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);

  const titles = useMemo(
    () => [
      "Bangun lebih siap.",
      "Pikiran lebih rileks.",
      "Malam lebih nyaman.",
      "Hari lebih ringan.",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) =>
        prev === titles.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  return (
  <div className="min-h-screen bg-[var(--calmee-cream)] font-body text-[var(--calmee-text)] antialiased">

      <nav className="fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b border-[var(--calmee-purple-light)]/20 bg-[var(--calmee-cream)]/92 shadow-[0_10px_35px_rgba(45,27,107,0.2)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center" aria-label="Calmee">
            <img
              src={logoCalmeeWord}
              alt="Calmee"
              className="h-8 w-auto md:h-10"
            />
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B4FA0] transition hover:text-[#2D1B6B]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={shopeeLink}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-full bg-[#2D1B6B] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(45,27,107,0.25)] transition-all duration-500 ease-out hover:scale-105 hover:bg-[var(--calmee-purple-light)] hover:text-[#2D1B6B] sm:inline-flex"
          >
            Beli Sekarang
          </a>
        </div>
      </nav>

      <main>
        <section
          id="home"
          className="snap-section relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_20%_45%,#4A2E8A_0%,#2D1B6B_42%,#160A35_100%)] px-5 pb-14 pt-28 text-white md:pt-32 lg:px-8 lg:pb-0"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* top left purple haze */}
            <div className="absolute left-[-8rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-[#8E72D9]/18 blur-3xl" />

            {/* big gold glow behind circle */}
            <div className="absolute left-[16%] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#D4A843]/18 blur-[120px]" />

            {/* soft cream glow around middle */}
            <div className="absolute left-[28%] top-[54%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF7EA]/14 blur-[90px]" />

            {/* right side purple glow */}
            <div className="absolute right-[8%] top-[22%] h-[22rem] w-[22rem] rounded-full bg-[#9B7CC8]/14 blur-[110px]" />

            {/* bottom right gold haze */}
            <div className="absolute right-[-6rem] bottom-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#D4A843]/10 blur-[120px]" />

            {/* subtle bottom center mist */}
            <div className="absolute bottom-[-8rem] left-1/2 h-[20rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/6 blur-[120px]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="calmee-glass-pill mb-6 inline-flex items-center gap-2 rounded-full border border-[#C4ADDF]/35 bg-white/[0.08] px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#C4ADDF] backdrop-blur transition-all duration-300 hover:border-white/50 hover:text-white">
                <SparkleIcon className="h-3.5 w-3.5" />
                #TidurNyenyakDenganCalmee
              </div>

              <h1 className="font-display text-5xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
                Tidur lebih tenang,
                <span className="relative mt-2 block h-[1.15em] overflow-hidden italic text-[#CBB6E8]">
                  {titles.map((title, index) => (
                    <motion.span
                      key={title}
                      className="absolute left-0 top-0"
                      initial={{ opacity: 0, y: 40 }}
                      animate={
                        titleNumber === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: titleNumber > index ? -40 : 40 }
                      }
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                Calmee membantu tubuh lebih rileks, menenangkan pikiran, dan mendukung tidur
                lebih nyenyak secara alami lewat minuman susu herbal yang lembut dan premium.
              </p>

              <div className="mt-8">
                <CtaButtons light />
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {trustSignals.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A843]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[26rem] w-full max-w-lg items-center justify-center lg:min-h-[32rem]">
              <span className="hero-dot hero-dot-1" />
              <span className="hero-dot hero-dot-2" />
              <span className="hero-dot hero-dot-3" />
              <span className="hero-dot hero-dot-4" />
              <span className="hero-dot hero-dot-5" />
              <span className="hero-dot hero-dot-6" />
              <span className="hero-dot hero-dot-7" />
              <span className="hero-dot hero-dot-8" />
              <span className="hero-dot hero-dot-9" />
              <span className="hero-dot hero-dot-10" />
              <div className="absolute h-80 w-80 rounded-full bg-[#C4ADDF]/20 blur-3xl md:h-[28rem] md:w-[28rem]" />
              <div className="absolute h-64 w-64 rounded-full border border-white/10 md:h-96 md:w-96 animate-[slowSpin_30s_linear_infinite]" />
              <div className="absolute h-48 w-48 rounded-full bg-[#FDF9F0] shadow-[0_0_80px_rgba(253,249,240,0.34)] md:h-64 md:w-64 animate-[calmPulse_4s_ease-in-out_infinite]" />
              <img
                src={logoCalmee}
                alt="Calmee calming milk powder"
                className="relative z-10 w-40 md:w-56 lg:w-62 aspect-square rounded-full object-cover"
              />
              {heroFloatingCards.map((card) => (
                <div
                  key={card.title}
                  className={`absolute z-20 ${card.positionClass}`}
                >
                  <div
                    className={`rounded-2xl border border-white/45 bg-white/90 px-5 py-4 text-[#2D1B6B] shadow-xl backdrop-blur ${card.motionClass}`}
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A6FC2]">
                      {card.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold md:text-2xl">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tentang-kami"
          className={`${sectionClass} relative isolate overflow-hidden bg-[var(--calmee-cream)]`}
        >
          <div className="absolute left-[-12rem] top-[-10rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#E8DEFF]/60 blur-3xl" />
          <div className="absolute right-[-10rem] bottom-[-12rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-[#C4ADDF]/35 blur-3xl" />

          <div className={`${sectionInnerClass} grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]`}>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#8A6FC2]">
                Tentang Kami
              </p>

              <h2 className="font-display text-4xl font-bold leading-[1.02] text-[#2D1B6B] md:text-5xl lg:text-6xl">
                Saat tubuh lelah,
                <span className="mt-2 block text-[#D4A843]">
                  Tapi pikiran belum mau berhenti.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#594878] md:text-lg">
                Banyak orang tidak benar-benar tidak mau tidur. Kadang, tubuh sudah
                lelah — tetapi pikiran masih aktif, suasana hati belum tenang, dan malam
                terasa lebih panjang dari yang seharusnya.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#594878] md:text-lg">
                Dari pemahaman itulah <span className="font-bold text-[#2D1B6B]">Calmee</span>{" "}
                hadir. Bukan sebagai solusi instan, melainkan sebagai teman ritual malam
                yang hangat, lembut, dan menenangkan.
              </p>

              <div className="mt-8 border-l-4 border-[#D4A843] pl-5">
                <p className="font-display text-xl italic leading-8 text-[#2D1B6B]">
                  “Kami percaya tidur yang baik bukan kemewahan — melainkan bagian dari
                  tubuh yang diberi ruang untuk pulih.”
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-[#E6DDF6] bg-white/85 p-6 shadow-[0_24px_70px_rgba(45,27,107,0.08)] backdrop-blur transition hover:shadow-[0_22px_65px_rgba(45,27,107,0.12)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EAFF] text-2xl text-[#D4A843]">
                  ☾
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A6FC2]">
                  Latar Belakang
                </p>

                <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-[#2D1B6B]">
                  33,3% orang Indonesia usia 15+ menunjukkan gejala{" "}
                  <span className="inline bg-[#EEE7FA] px-1">
                    insomnia ringan.
                  </span>
                </h3>

                <p className="mt-4 leading-7 text-[#594878]">
                  Dalam studi populasi Indonesia, sebagian responden menunjukkan gejala insomnia 
                  ringan — tanda bahwa masalah tidur bukan hal yang jarang terjadi.
                </p>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#D4A843]">
                  BERDASARKAN STUDI POPULASI INDONESIA · 2019
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {sleepInsightCards.slice(1).map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.5rem] border border-[#E6DDF6] bg-white/80 p-5 shadow-[0_18px_55px_rgba(45,27,107,0.07)] backdrop-blur transition hover:shadow-[0_22px_65px_rgba(45,27,107,0.12)]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F0EAFF] text-xl text-[#D4A843]">
                      {card.icon}
                    </div>

                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#8A6FC2]">
                      {card.label}
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-[#2D1B6B]">
                      {card.label === "Dampak Harian" ? (
                        <>
                          <span className="inline bg-[#EEE7FA] px-1">Kurang tidur</span>{" "}
                          bukan cuma soal mengantuk.
                        </>
                      ) : card.label === "Bukan solusi instan" ? (
                        <>
                          Calmee hadir <span className="inline bg-[#EEE7FA] px-1">bukan</span> sebagai{" "}
                          <span className="inline bg-[#EEE7FA] px-1">obat tidur.</span>
                        </>
                      ) : (
                        card.title
                      )}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#594878]">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="produk"
          className={`${sectionClass} relative isolate overflow-hidden bg-[linear-gradient(160deg,#2D1B6B_0%,#4A2E8A_55%,#241256_100%)] text-white`}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[-10rem] top-[10%] h-[26rem] w-[26rem] rounded-full bg-[#C4ADDF]/10 blur-3xl" />
            <div className="absolute right-[-8rem] bottom-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#D4A843]/10 blur-3xl" />
          </div>

          <div
            className={`${sectionInnerClass} grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]`}
            onMouseLeave={() => setHoveredIngredient(null)}
          >
            <div className="relative mx-auto flex aspect-square w-full max-w-[40rem] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />

              <div className="relative h-[32rem] w-[32rem] overflow-hidden rounded-full border border-white/20 shadow-[0_30px_90px_rgba(18,9,46,0.32)]">
                <div className="grid h-full w-full grid-cols-2">
                  {ingredients.map((item) => {
                    const isActive = hoveredIngredient?.key === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onMouseEnter={() => setHoveredIngredient(item)}
                        onFocus={() => setHoveredIngredient(item)}
                        onClick={() => setHoveredIngredient(item)}
                        className={`relative overflow-hidden transition-all duration-500 ${
                          isActive ? "z-10 scale-110" : "scale-100"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />

                        <div
                          className={`absolute inset-0 transition-all duration-500 ${
                            hoveredIngredient && !isActive
                              ? "bg-[#160A35]/45"
                              : "bg-[#160A35]/10"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="absolute z-20 flex h-[18rem] w-[18rem] items-center justify-center rounded-full bg-[var(--calmee-cream)] shadow-[0_20px_70px_rgba(18,9,46,0.35)]">
                <img
                  src={productPreview}
                  alt="Calmee product"
                  className="h-[14.5rem] w-auto object-contain drop-shadow-[0_20px_40px_rgba(45,27,107,0.28)]"
                />
              </div>

              <div className="absolute bottom-[-0.8rem] left-1/2 z-30 w-max -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-7 py-3 text-center text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#2D1B6B] shadow-xl">
                No Added Sugar · No Preservatives · Non Addictive Formula
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#C4ADDF]">
                Produk Calmee
              </p>

              <h2 className="font-display text-4xl font-bold leading-[1.02] text-white md:text-5xl lg:text-6xl">
                Satu sachet hangat,
                <span className="mt-2 block text-[#D4A843]">
                  Empat kandungan pilihan.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                Calmee memadukan susu creamy dengan kandungan pilihan seperti chamomile,
                L-theanine, lemon, dan tryptophan untuk menemani ritual malam yang lebih
                tenang, lembut, dan nyaman.
              </p>

              <div className="mt-8 rounded-[1.6rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur transition-all duration-300">
                {hoveredIngredient ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A843]">
                      {hoveredIngredient.tag}
                    </p>

                    <h3 className="mt-2 font-display text-3xl font-bold text-white">
                      {hoveredIngredient.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/72">
                      {hoveredIngredient.desc}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A843]">
                      Kandungan Calmee
                    </p>

                    <h3 className="mt-2 font-display text-3xl font-bold text-white">
                      Arahkan ke salah satu kandungan
                    </h3>

                    <p className="mt-3 leading-7 text-white/72">
                      Arahkan ke Milk, Lemon, Chamomile, atau L-Theanine untuk melihat
                      peran masing-masing dalam ritual malam Calmee.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {ingredients.map((item) => {
                  const isActive = hoveredIngredient?.key === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onMouseEnter={() => setHoveredIngredient(item)}
                      onFocus={() => setHoveredIngredient(item)}
                      onClick={() => setHoveredIngredient(item)}
                      className={`rounded-full border px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "border-[#D4A843]/60 bg-[#D4A843] text-[#241256]"
                          : "border-white/15 bg-white/[0.06] text-white/65 hover:bg-white/[0.10] hover:text-white"
                      }`}
                    >
                      {item.display}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="manfaat" className={sectionClass}>
          <div className={`${sectionInnerClass} grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]`}>
            <div className="relative mx-auto flex h-[30rem] w-full max-w-[34rem] items-center justify-center">
              {/* soft background glow */}
              <div className="absolute h-[27rem] w-[27rem] rounded-full bg-[#C4ADDF]/45 blur-3xl" />
              <div className="absolute h-[22rem] w-[22rem] rounded-full bg-[#D4A843]/10 blur-[90px]" />

              {/* main circular product photo */}
              <div className="relative h-[24rem] w-[24rem] overflow-hidden rounded-full border border-white/70 bg-[#E8DEFF] shadow-[0_30px_90px_rgba(45,27,107,0.18)] md:h-[27rem] md:w-[27rem]">
                <img
                  src={susuCalmee}
                  alt="Calmee dengan susu hangat"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_45%,rgba(45,27,107,0.12)_100%)]" />
              </div>

              {/* floating card 1 */}
              <div className="absolute -left-20 top-14 rounded-2xl border border-[#E6DDF6] bg-white/95 px-5 py-4 text-[#2D1B6B] shadow-[0_18px_45px_rgba(45,27,107,0.12)] backdrop-blur animate-[cardDriftRight_5.5s_ease-in-out_infinite] transition-all duration-300 hover:border-[#D4A843]/70 hover:bg-white hover:shadow-[0_22px_55px_rgba(212,168,67,0.18)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A6FC2]">
                  Mind Ease
                </p>
                <p className="mt-1 font-display text-xl font-bold">
                  Pikiran lebih tenang.
                </p>
              </div>

              {/* floating card 2 */}
              <div className="absolute -right-0 top-[0%] rounded-2xl border border-[#E6DDF6] bg-white/95 px-5 py-4 text-[#2D1B6B] shadow-[0_18px_45px_rgba(45,27,107,0.12)] backdrop-blur animate-[cardDriftLeft_6s_ease-in-out_infinite] transition-all duration-300 hover:border-[#D4A843]/70 hover:bg-white hover:shadow-[0_22px_55px_rgba(212,168,67,0.18)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A6FC2]">
                  Night Ritual
                </p>
                <p className="mt-1 font-display text-xl font-bold">
                  Transisi lebih lembut.
                </p>
              </div>

              {/* floating card 3 */}
              <div className="absolute bottom-1 left-10 rounded-2xl border border-[#E6DDF6] bg-white/95 px-5 py-4 text-[#2D1B6B] shadow-[0_18px_45px_rgba(45,27,107,0.12)] backdrop-blur animate-[cardDriftRight_6.4s_ease-in-out_infinite] transition-all duration-300 hover:border-[#D4A843]/70 hover:bg-white hover:shadow-[0_22px_55px_rgba(212,168,67,0.18)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A6FC2]">
                  Recovery
                </p>
                <p className="mt-1 font-display text-xl font-bold">
                  Tidur lebih nyaman.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Manfaat"
                title="Lebih dari tidur, ini tentang pemulihan."
              >
                Calmee mendukung kebiasaan malam yang lebih tenang sehingga tubuh lebih
                siap untuk masuk ke fase istirahat.
              </SectionHeading>

              <div className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2D1B6B] text-white">
                      <CheckIcon />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.4rem] font-bold leading-tight text-[#2D1B6B]">
                        {item.title}
                      </h3>
                      <p className="mt-1 leading-7 text-[#594878]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="paket" className={`${sectionClass} bg-[#F0EAFF]`}>
          <div className={sectionInnerClass}>
            <SectionHeading
              eyebrow="Paket Harga"
              title="Pilih paket yang cocok untuk rutinitasmu."
              center
            >
              Harga dan promo dapat berubah. Klik Shopee atau chat WhatsApp untuk melihat
              penawaran terbaru Calmee.
            </SectionHeading>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-6 shadow-[0_22px_65px_rgba(45,27,107,0.09)] ${
                    pkg.highlight
                      ? "bg-[#2D1B6B] text-white ring-4 ring-[#D4A843]/[0.35]"
                      : "bg-white text-[#2D1B6B]"
                  }`}
                >
                  {pkg.highlight ? (
                    <span className="absolute right-5 top-5 rounded-full bg-[#D4A843] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#241256]">
                      Populer
                    </span>
                  ) : null}
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.2em] ${
                      pkg.highlight ? "text-[#C4ADDF]" : "text-[#8A6FC2]"
                    }`}
                  >
                    {pkg.subtitle}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-bold">{pkg.name}</h3>
                  <p
                    className={`mt-3 text-lg font-bold ${
                      pkg.highlight ? "text-[#D4A843]" : "text-[#6B4FA0]"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex gap-3 text-sm leading-6">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#D4A843]" />
                        <span className={pkg.highlight ? "text-white/75" : "text-[#594878]"}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pkg.highlight ? shopeeLink : whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition hover:-translate-y-0.5 ${
                      pkg.highlight
                        ? "bg-[#D4A843] text-[#241256] hover:bg-[#e3ba5c]"
                        : "bg-[#2D1B6B] text-white hover:bg-[#6B4FA0]"
                    }`}
                  >
                    {pkg.highlight ? "Beli di Shopee" : "Tanya Paket"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className={sectionClass}>
          <div className={sectionInnerClass}>
            <SectionHeading
              eyebrow="Cerita Pengguna"
              title="Malam yang lebih tenang, satu ritual kecil."
              center
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="rounded-2xl bg-white p-6 shadow-[0_18px_55px_rgba(45,27,107,0.08)]"
                >
                  <div className="mb-5 flex gap-1 text-[#D4A843]" aria-label="5 bintang">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SparkleIcon key={index} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="text-base italic leading-7 text-[#594878]">
                    "{item.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6B4FA0] font-display text-xl font-bold text-white">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-bold text-[#2D1B6B]">{item.name}</span>
                      <span className="text-sm text-[#8A6FC2]">{item.meta}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={`${sectionClass} bg-[var(--calmee-cream-alt)]`}>
          <div className={`${sectionInnerClass} grid gap-10 lg:grid-cols-[0.85fr_1.15fr]`}>
            <SectionHeading eyebrow="FAQ" title="Pertanyaan sebelum mulai." />

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl bg-white p-5 shadow-[0_14px_44px_rgba(45,27,107,0.07)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.35rem] font-bold text-[#2D1B6B]">
                    <span>{faq.question}</span>
                    <span className="text-[#D4A843] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-7 text-[#594878]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionClass} relative isolate overflow-hidden bg-[#2D1B6B] text-center text-white`}>
          <div className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6B4FA0]/[0.34] blur-3xl" />
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#C4ADDF]">
              Mulai Malam Ini
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-6xl">
              Buat malam terasa lebih pelan.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Jadikan Calmee bagian dari ritual tidur yang hangat, lembut, dan menenangkan.
              Beli melalui Shopee atau tanyakan promo terbaru via WhatsApp.
            </p>
            <div className="mt-9">
              <CtaButtons align="center" light />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#12092E] px-5 py-10 text-white lg:snap-start lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={logoImageUrl} alt="" className="h-8 w-auto opacity-90" />
            <span className="font-display text-3xl font-bold">Calmee</span>
          </a>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.16em] text-white/50 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Calmee Indonesia. Seluruh hak cipta dilindungi.</p>
          <p>Minuman wellness. Bukan obat atau pengganti konsultasi medis.</p>
        </div>
      </footer>
    </div>
  );
}