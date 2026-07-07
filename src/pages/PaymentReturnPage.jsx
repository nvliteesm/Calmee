import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logoCalmeeWord from "../assets/logo-calmee-type.png";
import { getOrderStatus } from "../services/paymentService";

const statusContent = {
  pending: {
    title: "Pembayaran sedang diproses...",
    description:
      "Kami sedang menunggu konfirmasi resmi dari Duitku. Halaman ini tidak menganggap pembayaran berhasil hanya karena kamu kembali dari halaman pembayaran.",
  },
  paid: {
    title: "Pembayaran berhasil. Terima kasih!",
    description: "Konfirmasi pembayaran sudah diterima dari Duitku.",
  },
  failed: {
    title: "Pembayaran gagal atau dibatalkan.",
    description: "Silakan coba lagi atau pilih metode pembayaran lain.",
  },
  expired: {
    title: "Pembayaran kedaluwarsa.",
    description: "Waktu pembayaran sudah habis. Silakan buat checkout baru.",
  },
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const merchantOrderId = searchParams.get("merchantOrderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(merchantOrderId));
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let pollTimer = null;

    async function loadOrder() {
      if (!merchantOrderId) {
        setLoading(false);
        setError("Order ID tidak ditemukan.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getOrderStatus(merchantOrderId);

        if (isMounted) {
          setOrder(data);

          if (data.status === "pending") {
            pollTimer = window.setTimeout(loadOrder, 5000);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Gagal memuat status pembayaran.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      isMounted = false;
      window.clearTimeout(pollTimer);
    };
  }, [merchantOrderId]);

  const status = order?.status || "pending";
  const content = statusContent[status] || statusContent.pending;

  return (
    <main className="min-h-screen bg-[#F8F4FF] px-5 py-10 font-body text-[#2D1B6B]">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center">
        <img src={logoCalmeeWord} alt="Calmee" className="mb-8 h-10 w-fit" />

        <div className="rounded-[1.5rem] border border-[#E6DDF6] bg-white p-6 shadow-[0_20px_60px_rgba(45,27,107,0.10)] md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A6FC2]">
            Status Pembayaran
          </p>

          {loading ? (
            <h1 className="mt-4 font-display text-3xl font-bold">
              Memuat status pembayaran...
            </h1>
          ) : error ? (
            <>
              <h1 className="mt-4 font-display text-3xl font-bold">
                Status belum bisa ditampilkan.
              </h1>
              <p className="mt-4 leading-7 text-[#594878]">{error}</p>
            </>
          ) : (
            <>
              <h1 className="mt-4 font-display text-3xl font-bold">{content.title}</h1>
              <p className="mt-4 leading-7 text-[#594878]">{content.description}</p>

              <dl className="mt-6 grid gap-3 rounded-2xl border border-[#E6DDF6] bg-[#FDF9F0] p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8A6FC2]">Order ID</dt>
                  <dd className="text-right font-bold">{order.merchantOrderId}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8A6FC2]">Paket</dt>
                  <dd className="text-right font-bold">{order.productName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8A6FC2]">Total</dt>
                  <dd className="text-right font-bold">{formatRupiah(order.amount)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8A6FC2]">Status</dt>
                  <dd className="text-right font-bold uppercase">{order.status}</dd>
                </div>
              </dl>
            </>
          )}

          <Link
            to="/#paket"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4A843] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#241256] transition hover:bg-[#e3ba5c]"
          >
            Kembali ke Calmee
          </Link>
        </div>
      </section>
    </main>
  );
}
