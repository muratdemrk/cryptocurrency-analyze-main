import * as ind from "../utils/indicators";

export function analyzeMarket({ candles, symbol, interval, mode }) {
  if (!candles || candles.length < 30) {
    return {
      symbol,
      interval,
      mode,
      signal: "BEKLE",
      score: 0,
      summary: "Yetersiz veri",
      time: new Date().toLocaleString("tr-TR"),
      details: [],
    };
  }

  const closes = candles.map(c => c.close);
  const details = [];
  let score = 0;

  function add(name, value, condition, note = "") {
    details.push({
      name,
      value: value ?? "-",
      ok: !!condition,
      note,
    });
    if (condition) score++;
  }

  const rsi = ind.rsi(closes);
  add("RSI", rsi?.toFixed(2), mode === "short" ? rsi < 30 : rsi < 40, "Aşırı satım");

  const macd = ind.macd(closes);
  add("MACD", macd?.toFixed(4), macd > 0, "Momentum");

  const bb = ind.bollinger(closes);
  add(
    "Bollinger",
    bb ? `Alt ${bb.lower.toFixed(2)}` : "-",
    bb && closes.at(-1) < bb.lower,
    "Alt banda temas"
  );

  const stoch = ind.stochasticRSI(closes);
  add("Stoch RSI", stoch?.toFixed(2), stoch < 20);

  const ema20 = ind.ema(closes, 20);
  const sma50 = ind.sma(closes, 50);
  add("EMA > SMA", null, ema20 && sma50 && ema20 > sma50, "Trend");

  const cci = ind.cci(candles);
  add("CCI", cci?.toFixed(2), cci < -100);

  const wr = ind.williamsR(candles);
  add("Williams %R", wr?.toFixed(2), wr < -80);

  const mom = ind.momentum(closes);
  add("Momentum", mom?.toFixed(2), mom > 0);

  const roc = ind.roc(closes);
  add("ROC", roc?.toFixed(2), roc > 0);

  const adx = ind.adx(candles);
  add("ADX", adx?.toFixed(2), adx > 0);

  const psar = ind.parabolicSAR(candles);
  add("Parabolic SAR", psar?.toFixed(2), psar < closes.at(-1));

  const ichi = ind.ichimoku(candles);
  add(
    "Ichimoku",
    ichi ? `Conv ${ichi.conversion.toFixed(2)}` : "-",
    ichi && ichi.conversion > ichi.base
  );

  const vwap = ind.vwap(candles);
  add("VWAP", vwap?.toFixed(2), vwap < closes.at(-1));

  const atr = ind.atr(candles);
  add("ATR", atr?.toFixed(2), atr > 0);

  add(
    "Fiyat > SMA20",
    null,
    ind.sma(closes, 20) && closes.at(-1) > ind.sma(closes, 20)
  );

  let signal = "BEKLE";
  if (score >= 9) signal = "AL";
  else if (score <= 4) signal = "SAT";

  return {
    symbol,
    interval,
    mode,
    score,
    signal,
    summary:
      mode === "short"
        ? `${signal} (Kısa Vade – ${score}/15)`
        : `${signal} (Uzun Vade – ${score}/15)`,
    time: new Date().toLocaleString("tr-TR"),
    details,
  };
}
