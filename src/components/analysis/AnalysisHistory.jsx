export default function AnalysisHistory({ history, onClear }) {
  if (!history.length) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Analiz Geçmişi</h3>

        <button
          onClick={onClear}
          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-white/10"
        >
          Temizle
        </button>
      </div>

      {history.map((h, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between"
        >
          <div>
            <div className="font-semibold">
              {h.symbol} · {h.interval}
            </div>
            <div className="text-xs opacity-70">{h.summary}</div>
            <div className="text-xs opacity-50">{h.time}</div>
          </div>

          <button className="text-xs border border-white/20 px-3 py-1 rounded-full">
            Yeniden Uygula
          </button>
        </div>
      ))}
    </div>
  );
}
