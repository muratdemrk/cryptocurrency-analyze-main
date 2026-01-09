import Sparkline from "./Sparkline";

export default function PriceCard({
  name,
  symbol,
  usdt,
  tl,
  updatedAt,
  sparkline,
  onPrev,
  onNext,
}) {
  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-white w-full max-w-md mx-auto">

      {/* LEFT CHEVRON */}
      <button
        onClick={onPrev}
        aria-label="Previous"
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-white/35 text-5xl
          hover:text-white/80
          transition
          select-none
        "
      >
        ‹
      </button>

      {/* CONTENT */}
      <div className="px-8">
        <div className="mb-3">
          <div className="text-sm opacity-70">{name}</div>
          <div className="text-xl font-bold">{symbol}</div>
        </div>

        <div className="text-4xl font-bold mb-1">
          {usdt.toLocaleString("en-US")} USDT
        </div>

        <div className="text-lg opacity-80">
          {tl.toLocaleString("tr-TR")} TL
        </div>

        <div className="mt-4">
          <Sparkline data={sparkline} />
        </div>

        <div className="text-xs opacity-60 mt-3">
          Güncelleme: {updatedAt}
        </div>
      </div>

      {/* RIGHT CHEVRON */}
      <button
        onClick={onNext}
        aria-label="Next"
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-white/35 text-5xl
          hover:text-white/80
          transition
          select-none
        "
      >
        ›
      </button>
    </div>
  );
}
