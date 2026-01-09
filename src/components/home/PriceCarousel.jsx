import { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import {
  getPrice,
  getUsdtTry,
  getMiniChart,
} from "../../services/binance";

const COINS = [
  { name: "Bitcoin", symbol: "BTC", pair: "BTCUSDT" },
  { name: "Ethereum", symbol: "ETH", pair: "ETHUSDT" },
  { name: "Solana", symbol: "SOL", pair: "SOLUSDT" },
];

export default function PriceCarousel() {
  const [index, setIndex] = useState(0);
  const [prices, setPrices] = useState({});
  const [sparks, setSparks] = useState({});
  const [usdtTry, setUsdtTry] = useState(0);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    async function load() {
      const t = await getUsdtTry();
      setUsdtTry(t);

      const p = {};
      const s = {};

      for (const c of COINS) {
        p[c.symbol] = await getPrice(c.pair);
        s[c.symbol] = await getMiniChart(c.pair);
      }

      setPrices(p);
      setSparks(s);

      setTime(
        new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(
      () => setIndex((i) => (i + 1) % COINS.length),
      4500
    );
    return () => clearInterval(i);
  }, []);

  const coin = COINS[index];
  const usdt = prices[coin.symbol] || 0;

  return (
    <PriceCard
      name={coin.name}
      symbol={coin.symbol}
      usdt={usdt}
      tl={usdt * usdtTry}
      updatedAt={time}
      sparkline={sparks[coin.symbol]}
      onPrev={() =>
        setIndex((i) => (i - 1 + COINS.length) % COINS.length)
      }
      onNext={() =>
        setIndex((i) => (i + 1) % COINS.length)
      }
    />
  );
}
