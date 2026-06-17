const TICKER_ITEMS = [
  "⚽ FIFA WORLD CUP 2026",
  "★ CAMISETAS OFICIALES",
  "★ RÉPLICAS PREMIUM",
  "★ ENVÍO A TODO CHILE",
  "★ STOCK LIMITADO",
  "★ CONSULTA POR INSTAGRAM",
];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
