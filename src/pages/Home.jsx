import PriceCarousel from "../components/home/PriceCarousel";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden">

      {/* ===== BACKGROUND LAYERS ===== */}
      {/* Lacivert ana zemin */}
      <div className="absolute inset-0 bg-[#050914]" />

      {/* Sol üst lacivert-mor ışık */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-700/40 rounded-full blur-[180px]" />

      {/* Sağ alt sarı-amber ışık */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-amber-400/30 rounded-full blur-[200px]" />

      {/* Cam buğusu */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex flex-col items-center">

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Kripto Analiz sitesine hoş geldiniz
        </h1>

        <p className="text-slate-300 text-center max-w-xl mb-10">
          Kripto paraların anlık fiyatlarını (USDT/TL) görüntüleyin ve
          teknik indikatörlerle AL/SAT sinyali alın.
        </p>

        <div className="w-full max-w-4xl">
          <PriceCarousel />
        </div>

        <div className="text-xs text-slate-400 mt-10">
          Veriler Binance public API üzerinden alınır.
        </div>

      </div>
    </main>
  );
}
