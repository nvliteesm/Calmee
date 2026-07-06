import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/motion/Reveal";
import FloatingOrbs from "../components/motion/FloatingOrbs";

const shopeeLink = "https://id.shp.ee/uDja9WMf";
const whatsappLink =
  "https://wa.me/6285880877355?text=Halo%20Admin%20Calmee!%2C%20Saya%20ingin%20bertanya%20tentang%20produk%20Calmee.";

const faqs = [
  {
    category: "Tentang Produk",
    icon: "✦",
    items: [
      {
        question: "Apa itu Calmee?",
        answer:
          "Calmee adalah minuman susu bubuk yang diformulasikan untuk membantu merilekskan tubuh dan mendukung tidur yang lebih tenang dan nyenyak. Mengandung susu, chamomile, L-theanine, dan lemon.",
      },
      {
        question: "Apakah Calmee obat tidur?",
        answer:
          "Bukan. Calmee adalah minuman susu herbal untuk mendukung rutinitas relaksasi sebelum tidur, bukan obat atau pengganti saran medis. Calmee tidak mengandung bahan obat apapun.",
      },
      {
        question: "Apa bedanya Calmee dengan obat tidur?",
        answer:
          "Obat tidur bekerja dengan menekan sistem saraf untuk memaksa tubuh tidur. Calmee bekerja berbeda — membantu tubuh dan pikiran rileks secara alami dengan kandungan herbal sehingga proses tidur terjadi lebih natural tanpa efek ketergantungan.",
      },
      {
        question: "Apa saja kandungan Calmee?",
        answer:
          "Calmee mengandung empat kandungan utama: (1) Susu sebagai comfort base yang mengandung tryptophan, (2) Chamomile untuk ketenangan, (3) L-Theanine untuk relaksasi pikiran, dan (4) Lemon untuk kesegaran ringan dan antioksidan.",
      },
      {
        question: "Apakah Calmee mengandung gula?",
        answer:
          "Tidak. Calmee bebas gula tambahan sehingga lebih aman dikonsumsi rutin sebelum tidur tanpa khawatir asupan kalori berlebih.",
      },
    ],
  },
  {
    category: "Cara Konsumsi",
    icon: "☾",
    items: [
      {
        question: "Kapan waktu terbaik konsumsi Calmee?",
        answer:
          "Disarankan untuk diminum sekitar 1-2 jam sebelum tidur agar tubuh punya waktu untuk mulai rileks. Larutkan satu sachet dalam ±150ml air hangat (bukan mendidih), aduk rata, dan nikmati.",
      },
      {
        question: "Berapa kali sehari boleh minum Calmee?",
        answer:
          "Cukup satu sachet per hari, diminum menjelang waktu tidur. Tidak disarankan melebihi dosis yang direkomendasikan.",
      },
      {
        question: "Apakah bisa dicampur dengan susu lain atau minuman lain?",
        answer:
          "Bisa, tapi kami merekomendasikan minum dengan air hangat saja agar rasa dan efeknya optimal. Jika ingin variasi, bisa ditambah sedikit madu.",
      },
    ],
  },
  {
    category: "Keamanan & Efek Samping",
    icon: "✓",
    items: [
      {
        question: "Apakah aman dikonsumsi setiap hari?",
        answer:
          "Ya, Calmee bisa diminum secara rutin sesuai anjuran. Jika kamu sedang hamil, menyusui, memiliki kondisi medis tertentu, alergi susu, atau sedang mengonsumsi obat, konsultasikan dulu dengan tenaga kesehatan.",
      },
      {
        question: "Apakah Calmee dapat membuat ketergantungan?",
        answer:
          "Tidak. Calmee dibuat dari bahan-bahan alami yang membantu tubuh rileks secara natural. Tidak mengandung bahan adiktif atau obat penenang.",
      },
      {
        question: "Apakah ada efek samping?",
        answer:
          "Umumnya tidak ada efek samping jika dikonsumsi sesuai anjuran. Namun, jika kamu alergi terhadap salah satu kandungan (susu, chamomile, lemon), sebaiknya konsultasikan dengan dokter terlebih dahulu.",
      },
      {
        question: "Apakah aman untuk anak-anak?",
        answer:
          "Calmee dirancang untuk dewasa. Untuk anak-anak atau remaja di bawah 17 tahun, kami sarankan konsultasi dengan dokter anak terlebih dahulu.",
      },
    ],
  },
  {
    category: "Pembelian & Pengiriman",
    icon: "◐",
    items: [
      {
        question: "Di mana bisa membeli Calmee?",
        answer:
          "Kamu bisa membeli Calmee melalui Shopee Official Store kami atau chat via WhatsApp untuk bertanya stok, harga, dan promo terbaru.",
      },
      {
        question: "Apakah ada garansi atau jaminan uang kembali?",
        answer:
          "Untuk keluhan terkait produk cacat atau pengiriman, silakan hubungi kami melalui WhatsApp dengan menyertakan foto bukti. Kami akan membantu proses penggantian atau pengembalian.",
      },
      {
        question: "Berapa lama pengiriman?",
        answer:
          "Pengiriman mengikuti estimasi kurir yang tersedia di Shopee (biasanya 2-5 hari kerja tergantung lokasi). Untuk area Jabodetabek, biasanya lebih cepat.",
      },
      {
        question: "Apakah ada promo atau diskon paket?",
        answer:
          "Ya! Kami menyediakan beberapa pilihan paket dengan harga khusus. Paket 2 minggu (Calmee Routine) adalah yang paling direkomendasikan untuk membangun rutinitas.",
      },
    ],
  },
  {
    category: "Sertifikasi",
    icon: "◍",
    items: [
      {
        question: "Apakah Calmee terdaftar di BPOM?",
        answer:
          "Ya, Calmee telah terdaftar di BPOM (Badan Pengawas Obat dan Makanan) sehingga keamanannya telah diverifikasi oleh lembaga resmi Indonesia.",
      },
      {
        question: "Apakah Calmee halal?",
        answer:
          "Ya, Calmee telah mendapatkan sertifikasi Halal dari MUI, diproduksi di fasilitas berstandar GMP dan HACCP.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;

    const q = query.toLowerCase();
    return faqs
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <Layout>
      <PageMeta
        title="FAQ Calmee | Pertanyaan tentang Susu Herbal untuk Tidur"
        description="Jawaban lengkap tentang Calmee: cara konsumsi, keamanan, efek samping, kandungan, pembelian. Susu herbal untuk insomnia ringan yang aman, non-adiktif, terdaftar BPOM dan Halal."
      />

      {/* Hero with search */}
      <section className="relative isolate overflow-hidden bg-[var(--calmee-cream)] px-5 py-16 lg:px-8 lg:py-24">
        <FloatingOrbs variant="light" />

        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#8A6FC2]">
            Frequently Asked Questions
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-[#2D1B6B] md:text-5xl lg:text-6xl">
            Punya pertanyaan
            <span className="block text-[#D4A843]">tentang Calmee?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#594878] md:text-lg">
            Kami kumpulkan pertanyaan yang paling sering ditanyakan seputar produk, cara konsumsi,
            keamanan, dan pembelian.
          </p>

          {/* Search box */}
          <div className="mx-auto mt-8 max-w-lg">
            <div className="relative">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8A6FC2]">
                ⌕
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pertanyaan... misal: 'anak-anak', 'ketergantungan'"
                className="w-full rounded-full border border-[#E6DDF6] bg-white px-12 py-4 text-sm text-[#2D1B6B] shadow-[0_14px_44px_rgba(45,27,107,0.08)] outline-none transition focus:border-[#D4A843] focus:shadow-[0_18px_50px_rgba(212,168,67,0.15)]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A6FC2] transition hover:text-[#2D1B6B]"
                >
                  ✕
                </button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ Sections */}
      <section className="relative isolate overflow-hidden bg-[var(--calmee-cream-alt)] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-12">
          {filteredFaqs.length === 0 ? (
            <Reveal className="rounded-[1.5rem] border border-dashed border-[#C4ADDF] bg-white/60 px-6 py-12 text-center">
              <p className="font-display text-xl font-bold text-[#2D1B6B]">
                Tidak ada hasil untuk "{query}"
              </p>
              <p className="mt-2 text-sm text-[#594878]">
                Coba kata kunci lain, atau tanyakan langsung via WhatsApp.
              </p>
            </Reveal>
          ) : (
            filteredFaqs.map((category, catIndex) => (
              <Reveal key={category.category} delay={catIndex * 0.05}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D1B6B] text-lg text-[#D4A843]">
                    {category.icon}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#2D1B6B] md:text-3xl">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.items.map((faq) => {
                    const faqId = `${category.category}-${faq.question}`;
                    const isOpen = openFaq === faqId;

                    return (
                      <motion.div
                        key={faqId}
                        layout
                        className={`overflow-hidden rounded-[1.5rem] border bg-white/90 shadow-[0_14px_44px_rgba(45,27,107,0.06)] backdrop-blur transition-colors duration-300 ${
                          isOpen
                            ? "border-[#D4A843]/45 shadow-[0_20px_55px_rgba(212,168,67,0.12)]"
                            : "border-[#E6DDF6] hover:border-[#C4ADDF]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : faqId)}
                          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="font-display text-lg font-bold leading-tight text-[#2D1B6B] md:text-xl">
                            {faq.question}
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E6DDF6] text-lg font-bold text-[#D4A843] ${
                              isOpen ? "bg-[#FDF9F0]" : "bg-white"
                            }`}
                          >
                            +
                          </motion.span>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#E6DDF6] px-6 pb-6 pt-5">
                            <p className="text-base leading-8 text-[#594878]">{faq.answer}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </Reveal>
            ))
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="relative isolate overflow-hidden px-5 py-16 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <motion.span
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0EAFF] text-2xl text-[#D4A843]"
          >
            💬
          </motion.span>
          <h2 className="font-display text-3xl font-bold text-[#2D1B6B] md:text-4xl">
            Masih punya pertanyaan?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#594878]">
            Tim kami siap membantu menjawab pertanyaan kamu seputar Calmee, pembelian, atau pengiriman.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2D1B6B] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#6B4FA0]"
            >
              Chat WhatsApp
            </a>
            <a
              href={shopeeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4A843] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#241256] transition hover:bg-[#e3ba5c]"
            >
              Beli Sekarang
            </a>
          </div>
          <Link
            to="/produk"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#6B4FA0] transition hover:text-[#2D1B6B]"
          >
            ← Lihat detail produk Calmee
          </Link>
        </Reveal>
      </section>
    </Layout>
  );
}
