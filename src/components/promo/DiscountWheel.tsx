"use client";

import { useEffect, useRef, useState } from "react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { usePromo } from "@/components/promo/PromoContext";
import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/format";

/** Precio base de las camisetas. */
const BASE_PRICE = 20000;

interface Prize {
  /** Descuento en pesos. */
  off: number;
  /** Etiqueta corta para la rueda. */
  label: string;
}

/**
 * Premios de la ruleta. El descuento máximo es $2.000, por lo que el precio
 * nunca baja de $18.000.
 */
const PRIZES: Prize[] = [
  { off: 0, label: "Sigue así" },
  { off: 1000, label: "$1.000" },
  { off: 2000, label: "$2.000" },
  { off: 500, label: "$500" },
  { off: 1500, label: "$1.500" },
  { off: 1000, label: "$1.000" },
];

const SEGMENT = 360 / PRIZES.length;

/** Colores alternados de los gajos (oro / oscuro). */
function segmentColor(index: number): string {
  return index % 2 === 0 ? "#C9A84C" : "#16161a";
}

function buildConicGradient(): string {
  const stops = PRIZES.map((_, i) => {
    const start = i * SEGMENT;
    const end = (i + 1) * SEGMENT;
    return `${segmentColor(i)} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

/**
 * Ruleta de descuento como easter egg: un botón pequeño y discreto la abre en
 * un modal. El premio máximo deja la camiseta en $18.000.
 */
export default function DiscountWheel() {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const targetIndex = useRef(0);
  const { setPrize } = usePromo();

  // Cerrar con Escape y bloquear el scroll de fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function spin() {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    const index = Math.floor(Math.random() * PRIZES.length);
    targetIndex.current = index;

    // Ángulo del centro del gajo elegido + pequeño jitter dentro del gajo.
    const jitter = (Math.random() - 0.5) * (SEGMENT - 12);
    const targetCenter = index * SEGMENT + SEGMENT / 2 + jitter;

    // Giro necesario (mod 360) para dejar ese centro bajo el puntero (arriba).
    const mod = (360 - targetCenter) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = mod - currentMod;
    if (delta < 0) delta += 360;

    // 5 vueltas completas extra para el efecto.
    setRotation(rotation + delta + 360 * 5);
  }

  function handleSpinEnd() {
    if (!spinning) return;
    setSpinning(false);
    const won = PRIZES[targetIndex.current];
    setResult(won);
    // Solo si activó la ruleta y ganó descuento se guarda para los mensajes.
    if (won.off > 0) {
      setPrize({
        off: won.off,
        finalPrice: BASE_PRICE - won.off,
        label: won.label,
      });
    }
  }

  const finalPrice = result ? BASE_PRICE - result.off : BASE_PRICE;

  return (
    <>
      {/* Easter egg: botón pequeño y discreto */}
      <button
        className="egg-trigger"
        onClick={() => setOpen(true)}
        aria-label="Abrir ruleta de descuento"
        title="¿Promo secreta?"
      >
        🎁
      </button>

      {open ? (
        <div
          className="egg-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Ruleta de descuento"
          onClick={() => setOpen(false)}
        >
          <div className="egg-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="egg-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="wheel-head">
              <p className="sec-label">Promo secreta</p>
              <h2 className="egg-title">GIRA Y GANA</h2>
              <p className="wheel-sub">
                Camiseta a {formatPrice(BASE_PRICE)}. Con suerte la dejas hasta en{" "}
                {formatPrice(BASE_PRICE - 2000)}.
              </p>
            </div>

            <div className="wheel-stage">
              <div className="wheel-pointer" aria-hidden="true" />
              <div
                className="wheel"
                style={{
                  background: buildConicGradient(),
                  transform: `rotate(${rotation}deg)`,
                }}
                onTransitionEnd={handleSpinEnd}
              >
                {PRIZES.map((prize, i) => (
                  <span
                    key={i}
                    className="wheel-label"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${
                        i * SEGMENT + SEGMENT / 2
                      }deg) translateY(-104px)`,
                      color: i % 2 === 0 ? "#060608" : "#F0EAD6",
                    }}
                  >
                    {prize.label}
                  </span>
                ))}
              </div>
              <div className="wheel-hub" aria-hidden="true" />
            </div>

            <button className="wheel-btn" onClick={spin} disabled={spinning}>
              {spinning
                ? "Girando…"
                : result
                  ? "Girar de nuevo"
                  : "Girar la ruleta"}
            </button>

            {result ? (
              <div className="wheel-result" role="status">
                {result.off > 0 ? (
                  <>
                    <p className="wheel-result-win">
                      ¡Ganaste {formatPrice(result.off)} de descuento!
                    </p>
                    <p className="wheel-result-price">
                      Tu camiseta queda en{" "}
                      <strong>{formatPrice(finalPrice)}</strong>
                    </p>
                  </>
                ) : (
                  <p className="wheel-result-win">
                    ¡Casi! Esta vez sin descuento — prueba de nuevo.
                  </p>
                )}
                <a
                  className="cta-btn wheel-result-cta"
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Reclamar por Instagram
                </a>
              </div>
            ) : (
              <p className="wheel-note">
                Válido mostrando el resultado por Instagram.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
