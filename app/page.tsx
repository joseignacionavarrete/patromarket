import InstagramIcon from "./InstagramIcon";
import { kits, IG_URL, IG_HANDLE } from "./data";

const TICKER_ITEMS = [
  "⚽ FIFA WORLD CUP 2026",
  "★ CAMISETAS OFICIALES",
  "★ RÉPLICAS PREMIUM",
  "★ ENVÍO A TODO CHILE",
  "★ STOCK LIMITADO",
  "★ CONSULTA POR INSTAGRAM",
];

export default function Home() {
  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <header>
        <div className="logo">
          MUNDIAL<span>KITS</span>
          <small>Camisetas · Selecciones · 2026</small>
        </div>
        <a
          className="hdr-ig"
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          {IG_HANDLE}
        </a>
      </header>

      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <span className="hero-trophy" role="img" aria-label="Copa Mundial">
          🏆
        </span>
        <div className="hero-eye">Colección Oficial · Mundial 2026</div>
        <h1 className="hero-h1">
          <span className="ol">LA</span> <span className="gd">GLORIA</span>
          <br />
          DEL MUNDO
        </h1>
        <p className="hero-sub">
          Viste los colores de los grandes. 5 selecciones. 1 precio.
        </p>
        <div className="hero-rule"></div>
      </section>

      <div className="sec-head">
        <div>
          <p className="sec-label">Colección 2026</p>
          <h2 className="sec-title">LAS 5 GRANDES</h2>
        </div>
        <span className="sec-count">5 selecciones · $20.000 c/u</span>
      </div>

      <main className="grid">
        {kits.map((kit) => (
          <article className="card" data-id={kit.id} key={kit.id}>
            <div className="card-glow" style={{ background: kit.glowBg }}></div>
            <div className="card-img-wrap">
              <div className="card-img-bg" style={{ background: kit.imgBg }}></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kit.img}
                alt={`Camiseta ${kit.name}`}
                className="card-img"
                loading="lazy"
              />
              <div className="card-stars">{kit.stars}</div>
              <div className="card-flag">{kit.flag}</div>
              <div className="card-shine"></div>
            </div>
            <div className="card-body">
              <div className="card-eyebrow">{kit.eyebrow}</div>
              <h2 className="card-title">{kit.name}</h2>
              <p className="card-player">{kit.player}</p>
              <p className="card-detail">{kit.detail}</p>
              <div className="card-footer-row">
                <div className="price-wrap">
                  <span className="price-label">Precio</span>
                  <span className="price">{kit.price}</span>
                  <span className="price-cur">CLP</span>
                </div>
                <div className="tallas">
                  {kit.sizes.map((s) => (
                    <span className="t" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <a
                className="btn-ig"
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ["--ac" as string]: kit.accent }}
              >
                <InstagramIcon />
                <span>Consultar en Instagram</span>
              </a>
            </div>
          </article>
        ))}
      </main>

      <section className="cta">
        <div className="cta-rule"></div>
        <h2 className="cta-h2">
          ¿LISTO PARA
          <br />
          VESTIR LA GLORIA?
        </h2>
        <p className="cta-sub">
          Escríbenos por Instagram para confirmar tu talla, coordinar el pago y
          el despacho. Atención directa, sin intermediarios.
        </p>
        <a
          className="cta-btn"
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          Escribir a {IG_HANDLE}
        </a>
      </section>

      <footer>
        <div className="ftr-logo">
          MUNDIAL<span>KITS</span>
        </div>
        <p>
          Camisetas de colección ·{" "}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer">
            {IG_HANDLE}
          </a>
        </p>
      </footer>
    </>
  );
}
