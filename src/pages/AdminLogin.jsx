import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInAdmin } from "../services/authService";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoggingIn(true);
      setError("");

      await signInAdmin(email.trim(), password);

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login gagal. Periksa email dan password.");
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF9F0] px-5">
      <section className="w-full max-w-md rounded-[2rem] border border-[#E6DDF6] bg-white p-8 shadow-[0_24px_70px_rgba(45,27,107,0.12)]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8A6FC2]">
          Calmee Admin
        </p>

        <h1 className="mt-3 font-display text-4xl font-bold text-[#2D1B6B]">
          Masuk Dashboard
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#594878]">
          Login untuk mengelola paket harga, CTA, dan konten website Calmee.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#2D1B6B]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-2xl border border-[#E6DDF6] bg-[#FDF9F0] px-4 py-3 text-[#2D1B6B] outline-none transition focus:border-[#D4A843]"
              placeholder="admin@calmeeofficial.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#2D1B6B]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-2xl border border-[#E6DDF6] bg-[#FDF9F0] px-4 py-3 text-[#2D1B6B] outline-none transition focus:border-[#D4A843]"
              placeholder="Password admin"
            />
          </div>

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full rounded-full bg-[#2D1B6B] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#6B4FA0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingIn ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </section>
    </main>
  );
}