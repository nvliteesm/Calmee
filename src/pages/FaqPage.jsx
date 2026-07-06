import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PageMeta from "../components/PageMeta";

const shopeeLink = "https://id.shp.ee/uDja9WMf";
const whatsappLink =
  "https://wa.me/6285880877355?text=Halo%20Admin%20Calmee!%2C%20Saya%20ingin%20bertanya%20tentang%20produk%20Calmee.";

const faqs = [
  {
    category: "Tentang Produk",
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

  return (
    <Layout>
      <PageMeta
        title="FAQ Calmee | Pertanyaan tentang Susu Herbal untuk Tidur"
        description="Jawaban lengkap tentang Calmee: cara konsumsi, keamanan, efek samping, kandungan, pembelian. Susu herbal untuk insomnia ringan yang aman, non-adiktif, terdaftar BPOM dan Halal."
      />

      {/* Hero */}
      <section className="bg-[var(--calmee-cream)] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#8A6FC2]">
            Frequently Asked Questions
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-[#2D1B6B] md:text-5xl lg:text-6xl">
            Punya pertanyaan
            <span className="block text-[#D4A843]">tentang Calmee?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#594878] md:text-lg">
            Kami kumpulkan pertanyaan yang paling sering ditanyakan seputar produk, cara konsumsi,
            keamanan, dan pembelian. Jika belum terjawab, kamu bisa langsung chat kami via WhatsApp.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-[var(--calmee-cream-alt)] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="mb-5 font-display text-2xl font-bold text-[#2D1B6B] md:text-3xl">
                {category.category}
              </h2>

              <div className="space-y-3">
                {category.items.map((faq) => {
                  const faqId = `${category.category}-${faq.question}`;
                  const isOpen = openFaq === faqId;

                  return (
                    <div
                      key={faqId}
                      className={`overflow-hidden rounded-[1.5rem] border bg-white/90 shadow-[0_14px_44px_rgba(45,27,107,0.06)] backdrop-blur transition-all duration-300 ${
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
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E6DDF6] text-lg font-bold text-[#D4A843] transition-all duration-300 ${
                            isOpen ? "rotate-45 bg-[#FDF9F0]" : "rotate-0 bg-white"
                          }`}
                        >
                          +
                        </span>
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
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
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
        </div>
      </section>
    </Layout>
  );
}
