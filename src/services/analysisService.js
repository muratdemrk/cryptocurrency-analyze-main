const KEY = "analysis_history_v2";

export function getHistory() {
  const h = localStorage.getItem(KEY);
  return h ? JSON.parse(h) : [];
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

export function pushHistory(item) {
  const history = getHistory();
  const updated = [item, ...history].slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
