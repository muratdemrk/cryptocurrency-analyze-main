import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = login(email, password);
    if (!user) {
      setError("E-posta veya şifre hatalı");
      return;
    }

    loginUser(user); // 🔥 KRİTİK SATIR
    navigate("/app");
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* ===== BACKGROUND LAYERS (HOME & APP İLE AYNI) ===== */}
      {/* Ana lacivert zemin */}
      <div className="absolute inset-0 bg-[#050914]" />

      {/* Sol üst lacivert-mor ışık */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-700/40 rounded-full blur-[180px]" />

      {/* Sağ alt sarı-amber ışık */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-amber-400/30 rounded-full blur-[200px]" />

      {/* Cam buğusu */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 pt-24 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="
          w-96
          bg-white/5 border border-white/10
          backdrop-blur
          rounded-2xl
          p-8
        "
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Oturum Aç</h2>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-white/70">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@kripto.com"
              className="
              w-full px-4 py-2 rounded-lg
              bg-black/40 border border-white/15
              outline-none
            "
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-white/70">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="123456"
              className="
              w-full px-4 py-2 rounded-lg
              bg-black/40 border border-white/15
              outline-none
            "
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-400 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="
            w-full py-2 mt-2
            rounded-full
            bg-yellow-400 text-black
            font-semibold
            hover:bg-yellow-300
            transition
          "
          >
            Giriş Yap
          </button>

          <div className="mt-4 text-xs text-white/40 text-center">
            Demo giriş: <br />
            admin@kripto.com / 123456
          </div>
        </form>
      </div>
    </main>
  );
}
