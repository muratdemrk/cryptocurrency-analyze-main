export default function IndicatorBadge({ label, value }) {
  return (
    <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
      {label}: {value}
    </span>
  );
}
