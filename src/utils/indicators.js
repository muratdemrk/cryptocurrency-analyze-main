export function sma(data, period) {
  if (data.length < period) return null;
  return data.slice(-period).reduce((a, b) => a + b, 0) / period;
}

export function ema(data, period) {
  if (data.length < period) return null;
  const k = 2 / (period + 1);
  let ema = data[0];
  for (let i = 1; i < data.length; i++) {
    ema = data[i] * k + ema * (1 - k);
  }
  return ema;
}

export function rsi(data, period = 14) {
  if (data.length < period + 1) return null;
  let gains = 0, losses = 0;
  for (let i = data.length - period; i < data.length - 1; i++) {
    const diff = data[i + 1] - data[i];
    diff >= 0 ? gains += diff : losses -= diff;
  }
  const rs = gains / (losses || 1);
  return 100 - 100 / (1 + rs);
}

export function macd(data) {
  const fast = ema(data, 12);
  const slow = ema(data, 26);
  if (fast == null || slow == null) return null;
  return fast - slow;
}

export function bollinger(data, period = 20) {
  const mean = sma(data, period);
  if (mean == null) return null;
  const slice = data.slice(-period);
  const variance =
    slice.reduce((a, b) => a + (b - mean) ** 2, 0) / period;
  const dev = Math.sqrt(variance);
  return { upper: mean + 2 * dev, lower: mean - 2 * dev };
}

export function atr(candles, period = 14) {
  if (candles.length < period + 1) return null;
  const trs = candles.slice(-period).map(c =>
    Math.max(
      c.high - c.low,
      Math.abs(c.high - c.close),
      Math.abs(c.low - c.close)
    )
  );
  return trs.reduce((a, b) => a + b, 0) / period;
}

export function cci(candles, period = 20) {
  if (candles.length < period) return null;
  const tps = candles.map(c => (c.high + c.low + c.close) / 3);
  const ma = sma(tps, period);
  if (ma == null) return null;
  const dev =
    tps.slice(-period).reduce((a, b) => a + Math.abs(b - ma), 0) /
    period;
  return (tps.at(-1) - ma) / (0.015 * dev || 1);
}

export function williamsR(candles, period = 14) {
  if (candles.length < period) return null;
  const slice = candles.slice(-period);
  const high = Math.max(...slice.map(c => c.high));
  const low = Math.min(...slice.map(c => c.low));
  return ((high - slice.at(-1).close) / (high - low || 1)) * -100;
}

export function momentum(data, period = 10) {
  if (data.length < period) return null;
  return data.at(-1) - data.at(-period);
}

export function roc(data, period = 10) {
  if (data.length < period) return null;
  return ((data.at(-1) - data.at(-period)) / data.at(-period)) * 100;
}

export function stochasticRSI(data, period = 14) {
  if (data.length < period * 2) return null;
  const rsis = [];
  for (let i = period; i < data.length; i++) {
    const r = rsi(data.slice(0, i), period);
    if (r != null) rsis.push(r);
  }
  if (!rsis.length) return null;
  const min = Math.min(...rsis);
  const max = Math.max(...rsis);
  return ((rsis.at(-1) - min) / (max - min || 1)) * 100;
}

export function adx(candles) {
  if (candles.length < 2) return null;
  return Math.abs(candles.at(-1).close - candles.at(-2).close);
}

export function parabolicSAR(candles) {
  if (candles.length < 2) return null;
  return candles.at(-2).low;
}

export function ichimoku(candles) {
  if (candles.length < 26) return null;
  const high9 = Math.max(...candles.slice(-9).map(c => c.high));
  const low9 = Math.min(...candles.slice(-9).map(c => c.low));
  const high26 = Math.max(...candles.slice(-26).map(c => c.high));
  const low26 = Math.min(...candles.slice(-26).map(c => c.low));
  return {
    conversion: (high9 + low9) / 2,
    base: (high26 + low26) / 2,
  };
}

export function vwap(candles) {
  let vol = 0, pv = 0;
  candles.forEach(c => {
    const v = c.volume ?? 1;
    vol += v;
    pv += c.close * v;
  });
  return vol ? pv / vol : null;
}
