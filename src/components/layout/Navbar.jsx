import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleAppClick() {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/app");
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-white">

        {/* LEFT */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="font-bold">
            KRIPTO Analiz
          </Link>

          <Link to="/">Ana Sayfa</Link>

          <button onClick={handleAppClick}>
            Uygulama
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4 items-center text-sm">
          {!user ? (
            <>
              <span className="opacity-60">Misafir</span>
              <Link to="/login">Oturum Aç</Link>
              <Link to="/register">Kaydol</Link>
            </>
          ) : (
            <>
              <span className="opacity-70">{user.email}</span>
              <button onClick={logout} className="text-red-400">
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
