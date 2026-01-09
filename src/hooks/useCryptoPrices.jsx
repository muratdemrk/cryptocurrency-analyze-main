import { useEffect, useState } from "react";

const fmtUSDT = (n) =>
  Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });

const fmtTRY = (n) =>
  Number(n).toLocaleString("tr-TR", { maximumFractionDigits: 0 });

const nowTR = () =>
  new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function useCryptoPrices() {
  const [btc, setBtc] = useState({ status: "Yükleniyor" });
  const [eth, setEth] = useState({ status: "Yükleniyor" });

  async function fetchJson(url) {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error("API");
    return r.json();
  }

  async function refresh() {
    try {
      const usdtTry = Number(
        (await fetchJson(
          "https://api.binance.com/api/v3/ticker/price?symbol=USDTTRY"
        )).price
      );

      const [btcRes, ethRes] = await Promise.all([
        fetchJson("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
        fetchJson("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"),
      ]);

      setBtc({
        usdt: fmtUSDT(btcRes.price),
        tl: fmtTRY(btcRes.price * usdtTry),
        time: nowTR(),
        status: "Canlı",
      });

      setEth({
        usdt: fmtUSDT(ethRes.price),
        tl: fmtTRY(ethRes.price * usdtTry),
        time: nowTR(),
        status: "Canlı",
      });
    } catch {
      setBtc({ status: "Hata" });
      setEth({ status: "Hata" });
    }
  }

  useEffect(() => {
    refresh();
    const i = setInterval(refresh, 4500);
    return () => clearInterval(i);
  }, []);

  return { btc, eth };
}
