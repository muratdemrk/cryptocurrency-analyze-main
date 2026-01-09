export async function getPrice(symbol) {
  const r = await fetch(
    `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
  );
  const d = await r.json();
  return Number(d.price);
}

export async function getUsdtTry() {
  const r = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=USDTTRY"
  );
  const d = await r.json();
  return Number(d.price);
}

export async function getMiniChart(symbol) {
  const r = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
  );
  const d = await r.json();
  return d.map((k) => Number(k[4])); // close prices
}
