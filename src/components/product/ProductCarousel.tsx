"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ProductCarouselProps {
  /** Fotos a mostrar (al menos una). */
  images: string[];
  /** Texto alternativo base (se le añade el número de foto). */
  alt: string;
  /** Color de acento del producto. */
  accent: string;
  /** Degradado de fondo detrás de las imágenes. */
  gradient: string;
  /** Emoji de la bandera. */
  flag: string;
}

/**
 * Carrusel de fotos de la ficha de producto.
 *
 * Permite navegar entre las imágenes con flechas, puntos, teclado y swipe
 * en mobile. Si solo hay una foto, se comporta como una imagen estática
 * (sin controles).
 */
export default function ProductCarousel({
  images,
  alt,
  accent,
  gradient,
  flag,
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  // Fotos que aún no se han subido (404) se descartan para no mostrar
  // imágenes rotas. La primera (principal) siempre se conserva.
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const touchStartX = useRef<number | null>(null);

  const visible = images.filter((src, i) => i === 0 || !broken.has(src));
  const hasMultiple = visible.length > 1;

  const goTo = useCallback(
    (index: number) => {
      const total = visible.length;
      setCurrent(((index % total) + total) % total);
    },
    [visible.length],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Si la foto activa se descarta (404), no dejar el índice fuera de rango.
  useEffect(() => {
    if (current > visible.length - 1) setCurrent(visible.length - 1);
  }, [current, visible.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMultiple, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="pdp-media"
      style={{ ["--ac" as string]: accent }}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos del producto"
    >
      <div className="pdp-media-bg" style={{ background: gradient }} />

      <div
        className="pdp-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visible.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            className="pdp-img"
            src={src}
            alt={`${alt} — foto ${i + 1} de ${visible.length}`}
            loading={i === 0 ? "eager" : "lazy"}
            onError={() =>
              setBroken((prev) => {
                const updated = new Set(prev);
                updated.add(src);
                return updated;
              })
            }
          />
        ))}
      </div>

      <span className="pdp-flag">{flag}</span>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="pdp-arrow pdp-arrow-prev"
            onClick={prev}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="pdp-arrow pdp-arrow-next"
            onClick={next}
            aria-label="Foto siguiente"
          >
            ›
          </button>

          <div className="pdp-dots" role="tablist" aria-label="Seleccionar foto">
            {visible.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`pdp-dot${i === current ? " is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
