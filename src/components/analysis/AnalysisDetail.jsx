export default function AnalysisDetail({ report }) {
  if (!report || !Array.isArray(report.details)) return null;

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-semibold mb-4">
        Detaylı Analiz Raporu
      </h3>

      <div className="space-y-2">
        {report.details.map((d, i) => (
          <div
            key={i}
            className="
              flex items-center justify-between
              text-sm px-3 py-2 rounded-lg
              bg-white/5 border border-white/10
            "
          >
            <div className="flex flex-col">
              <span className="font-medium">{d.name}</span>
              {d.note && (
                <span className="text-xs text-slate-400">
                  {d.note}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-300">
                {d.value ?? "-"}
              </span>

              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  d.ok
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {d.ok ? "POZİTİF" : "NEGATİF"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
