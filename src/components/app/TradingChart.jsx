import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
} from "lightweight-charts";

export default function TradingChart({ candles }) {
  const ref = useRef(null);
  const chart = useRef(null);
  const series = useRef(null);

  useEffect(() => {
    if (!ref.current || candles.length === 0) return;

    if (!chart.current) {
      chart.current = createChart(ref.current, {
        height: 320,
        layout: { background: { color: "transparent" }, textColor: "#e5e7eb" },
        grid: {
          vertLines: { color: "rgba(255,255,255,0.06)" },
          horzLines: { color: "rgba(255,255,255,0.06)" },
        },
      });

      series.current = chart.current.addSeries(CandlestickSeries, {
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
      });
    }

    series.current.setData(candles);
  }, [candles]);

  return <div ref={ref} />;
}
