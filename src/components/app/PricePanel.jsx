export default function PricePanel({ price, usdtTry }) {
  return (
    <>
      <div className="bg-slate-800/60 rounded-lg px-3 py-2">
        <div className="text-xs text-slate-400">USDT</div>
        <div>{price ? price.toFixed(4) : "--"}</div>
      </div>

      <div className="bg-slate-800/60 rounded-lg px-3 py-2">
        <div className="text-xs text-slate-400">TL</div>
        <div>
          {price && usdtTry
            ? Math.round(price * usdtTry).toLocaleString("tr-TR")
            : "--"}
        </div>
      </div>
    </>
  );
}
