import { useEffect, useState } from "react";
import TradingChart from "../components/app/TradingChart";
import PricePanel from "../components/app/PricePanel";
import CoinSelector from "../components/app/CoinSelector";
import AnalysisSummary from "../components/analysis/AnalysisSummary";
import AnalysisDetail from "../components/analysis/AnalysisDetail";
import AnalysisHistory from "../components/analysis/AnalysisHistory";
import { analyzeMarket } from "../services/analysisEngine";

const TIMEFRAMES = [
  { label: "5 Dakika", value: "5m", mode: "short", limit: 200 },
  { label: "15 Dakika", value: "15m", mode: "short", limit: 200 },
  { label: "1 Saat", value: "1h", mode: "short", limit: 200 },
  { label: "4 Saat", value: "4h", mode: "long", limit: 200 },
  { label: "1 Gün", value: "1d", mode: "long", limit: 200 },
  { label: "1 Hafta", value: "1w", mode: "long", limit: 200 },
  { label: "1 Ay", value: "1M", mode: "long", limit: 120 },
];

export default function AppPage() {
  const [symbol, setSymbol] = useState("SOLUSDT");
  const [tf, setTf] = useState(TIMEFRAMES[2]);

  const [price, setPrice] = useState(null);
  const [usdtTry, setUsdtTry] = useState(null);
  const [candles, setCandles] = useState([]);

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("analysis_history") || "[]")
  );

  /* ===== DATA LOAD ===== */
  useEffect(() => {
    async function load() {
      setCandles([]);
      setReport(null);

      const p = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      ).then((r) => r.json());

      const t = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=USDTTRY"
      ).then((r) => r.json());

      const c = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${tf.value}&limit=${tf.limit}`
      ).then((r) => r.json());

      setPrice(Number(p.price));
      setUsdtTry(Number(t.price));

      setCandles(
        c.map((k) => ({
          time: Math.floor(k[0] / 1000),
          open: +k[1],
          high: +k[2],
          low: +k[3],
          close: +k[4],
        }))
      );
    }

    load();
  }, [symbol, tf]);

  /* ===== ANALYZE ===== */
  function analyze() {
    if (!candles || candles.length < 10) return;

    const r = analyzeMarket({
      candles,
      symbol: symbol.replace("USDT", ""),
      interval: tf.label,
      mode: tf.mode,
    });

    setReport(r);

    const next = [r, ...history].slice(0, 10);
    setHistory(next);
    localStorage.setItem("analysis_history", JSON.stringify(next));
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("analysis_history");
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* ===== BACKGROUND LAYERS (HOME İLE AYNI) ===== */}
      {/* Ana lacivert zemin */}
      <div className="absolute inset-0 bg-[#050914]" />

      {/* Sol üst lacivert-mor ışık */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-700/40 rounded-full blur-[180px]" />

      {/* Sağ alt sarı-amber ışık */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-amber-400/30 rounded-full blur-[200px]" />

      {/* Cam buğusu */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 pt-24 flex justify-center">
        <div className="max-w-6xl w-full px-4 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="grid md:grid-cols-5 gap-4 items-end">
              <CoinSelector symbol={symbol} setSymbol={setSymbol} />

              {/* TIMEFRAME */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Zaman Dilimi
                </label>
                <select
                  value={tf.label}
                  onChange={(e) =>
                    setTf(TIMEFRAMES.find((t) => t.label === e.target.value))
                  }
                  className="
                  w-full h-11 px-3 rounded-lg
                  bg-black/40 border border-white/15
                  outline-none
                "
                >
                  {TIMEFRAMES.map((t) => (
                    <option key={t.label} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <PricePanel price={price} usdtTry={usdtTry} />

              <button
                onClick={analyze}
                className="
                h-11 rounded-lg
                bg-blue-600 hover:bg-blue-500
                transition font-semibold
              "
              >
                Analiz Et
              </button>
            </div>

            {candles.length > 0 && <TradingChart candles={candles} />}

            {report && (
              <>
                <AnalysisSummary report={report} />
                <AnalysisDetail report={report} />
              </>
            )}
          </div>

          {history.length > 0 && (
            <AnalysisHistory history={history} onClear={clearHistory} />
          )}
        </div>
      </div>
    </main>
  );
}
