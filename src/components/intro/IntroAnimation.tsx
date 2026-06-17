"use client";

import { useEffect, useMemo, useState } from "react";

/** Colores mundialistas para el confeti (oro + banderas de las selecciones). */
const CONFETTI_COLORS = [
  "#C9A84C",
  "#E8C97A",
  "#74b9e8",
  "#e63946",
  "#f4c213",
  "#f9e12b",
  "#00853e",
  "#FAFAFA",
];

interface ConfettiPiece {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  size: number;
  round: boolean;
}

/**
 * Animación de bienvenida: una ráfaga rápida de confeti, un balón que cruza
 * la pantalla y un trofeo que aparece. Se reproduce una vez por sesión y se
 * desvanece sola. Respeta `prefers-reduced-motion`.
 */
export default function IntroAnimation() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.3 + Math.random() * 0.9,
        drift: (Math.random() * 2 - 1) * 16,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 9,
        round: Math.random() > 0.6,
      })),
    [],
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || sessionStorage.getItem("intro-played")) return;

    sessionStorage.setItem("intro-played", "1");
    setActive(true);

    const leaveTimer = setTimeout(() => setLeaving(true), 2000);
    const endTimer = setTimeout(() => setActive(false), 2500);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!active) return null;

  return (
    <div className={`intro${leaving ? " intro--out" : ""}`} aria-hidden="true">
      <div className="intro-confetti">
        {pieces.map((p, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.round ? "50%" : "2px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--drift" as string]: `${p.drift}vw`,
            }}
          />
        ))}
      </div>
      <span className="intro-ball" role="img" aria-label="balón">
        ⚽
      </span>
      <span className="intro-trophy" role="img" aria-label="trofeo">
        🏆
      </span>
    </div>
  );
}
