import { useEffect, useState } from "react";

export default function CoinSelector({ symbol, setSymbol }) {
  const [coins, setCoins] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      // 24h ticker -> volume bilgisi
      const tickers = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      ).then(r => r.json());

      // sadece USDT pariteleri
      const usdt = tickers
        .filter(c => c.symbol.endsWith("USDT"))
        .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
        .slice(0, 100)
        .map(c => ({
          symbol: c.symbol,
          base: c.symbol.replace("USDT", ""),
        }));

      setCoins(usdt);
    }

    load();
  }, []);

  const filtered = coins.filter(c =>
    c.base.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-sm text-slate-400 mb-1 block">
        Coin Seç
      </label>

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full h-10 px-4 rounded-lg
          bg-black/40 border border-white/15
          text-left flex items-center justify-between
          hover:border-yellow-400 transition
        "
      >
        <span>{symbol}</span>
        <span className="text-slate-400">▼</span>
      </button>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full max-h-72 overflow-y-auto
            bg-[#0b1220] border border-white/10 rounded-xl
            shadow-xl
          "
        >
          <input
            placeholder="Ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full px-3 py-2
              bg-black/40 border-b border-white/10
              text-sm outline-none
            "
          />

          {filtered.map(c => (
            <button
              key={c.symbol}
              onClick={() => {
                setSymbol(c.symbol);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2 text-left text-sm
                hover:bg-white/10 transition
                flex items-center gap-3
              "
            >
              <img
                src={`https://cryptoicons.org/api/icon/${c.base.toLowerCase()}/32`}
                onError={e => (e.currentTarget.style.display = "none")}
                alt=""
                className="w-5 h-5"
              />

              <span>{c.base}</span>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-400">
              Coin bulunamadı
            </div>
          )}
        </div>
      )}
    </div>
  );
}
