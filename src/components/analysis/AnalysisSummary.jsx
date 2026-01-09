export default function AnalysisSummary({ report }) {
  if (!report) return null;

  return (
    <div className="bg-black/30 border border-white/10 rounded-xl p-4">
      <div className="text-lg font-semibold">
        Sinyal: <span className="text-yellow-400">{report.signal}</span>
      </div>

      <div className="text-sm text-slate-300 mt-1">
        Skor: {report.score} / 15
      </div>

      <div className="text-xs text-slate-400 mt-2">
        {report.summary}
      </div>
    </div>
  );
}
