import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageMeta from "../components/PageMeta";
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
  },
  {
    title: "Riset Formula",
    desc: "Kami memilih empat kandungan utama: susu sebagai comfort base, chamomile untuk ketenangan, L-theanine untuk relaksasi pikiran, dan lemon untuk kesegaran ringan.",
  },
  {
    title: "Standar Produksi",
    desc: "Calmee diproduksi di fasilitas berstandar GMP dan HACCP, terdaftar di BPOM, dan bersertifikat Halal MUI.",
  },
  {
    title: "Hadir untuk Kamu",
    desc: "Calmee tersedia melalui Shopee Official Store dan WhatsApp, siap menemani malam-malam yang butuh ketenangan.",
  },
];

export default function TentangPage() {
  return (
    <Layout>
      <PageMeta
        title="Tentang Calmee | Susu Herbal Indonesia untuk Ritual Malam"
        description="Kenali cerita di balik Calmee — susu herbal pertama di Indonesia untuk menemani ritual malam. Terdaftar BPOM, Halal MUI, diproduksi dengan standar GMP dan HACCP."
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--calmee-cream)] px-5 py-20 lg:px-8 lg:py-28">
        <div className="absolute left-[-12rem] top-[-10rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#E8DEFF]/60 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[-12rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-[#C4ADDF]/35 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
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
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#E6DDF6] bg-white shadow-[0_18px_45px_rgba(45,27,107,0.10)]">
            <img
              src={calmeeIntro}
              alt="Calmee susu herbal untuk ritual malam"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#2D1B6B] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-2xl italic leading-relaxed text-white md:text-3xl">
            "Kami percaya malam tidak perlu selalu dilawan. Kadang, tubuh hanya butuh ritual kecil
            yang memberi tanda bahwa hari ini sudah cukup."
          </blockquote>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#D4A843]">
            — Tim Calmee
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
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
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-6 text-center shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
              <p className="font-display text-4xl font-bold text-[#2D1B6B]">~67%</p>
              <p className="mt-2 text-sm text-[#594878]">Prevalensi insomnia di Indonesia</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-6 text-center shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
              <p className="font-display text-4xl font-bold text-[#2D1B6B]">4</p>
              <p className="mt-2 text-sm text-[#594878]">Kandungan alami yang saling melengkapi</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-6 text-center shadow-[0_14px_44px_rgba(45,27,107,0.06)]">
              <p className="font-display text-4xl font-bold text-[#2D1B6B]">0%</p>
              <p className="mt-2 text-sm text-[#594878]">Gula tambahan & pengawet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="bg-[#F0EAFF] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
              Perjalanan Kami
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
              Dari pemahaman masalah menjadi solusi yang lembut
            </h2>
          </div>

          <div className="mt-12 space-y-8">
            {timeline.map((step, index) => (
              <div key={step.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D1B6B] font-display text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-[#C4ADDF]" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-display text-xl font-bold text-[#2D1B6B]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#594878]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
            Standar & Sertifikasi
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#2D1B6B] md:text-4xl">
            Diproduksi dengan standar yang kamu bisa percaya
          </h2>

          <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-8">
            {trustLogos.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center gap-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D1B6B] px-5 py-16 text-center text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
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
        </div>
      </section>
    </Layout>
  );
}
