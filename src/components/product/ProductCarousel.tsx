"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ProductCarouselProps {
  /** Foto principal, siempre presente. */
  image: string;
  /** Fotos adicionales (pueden no existir todavía; se validan en cliente). */
  extras: string[];
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
 * Renderiza solo las fotos que existen de verdad: parte mostrando la foto
 * principal y, en el cliente, prueba cada foto extra con `new Image()`;
 * añade al carrusel únicamente las que cargan. Así nunca aparecen imágenes
 * rotas aunque los archivos `-2`, `-3`, … todavía no se hayan subido.
 *
 * Navegación con flechas, puntos, teclado (← →) y swipe en mobile. Con una
 * sola foto se comporta como imagen estática (sin controles).
 */
export default function ProductCarousel({
  image,
  extras,
  alt,
  accent,
  gradient,
  flag,
}: ProductCarouselProps) {
  const [images, setImages] = useState<string[]>([image]);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = images.length > 1;

  // Valida en el cliente qué fotos extra existen y las agrega en orden.
  useEffect(() => {
    if (extras.length === 0) return;
    let cancelled = false;

    Promise.all(
      extras.map(
        (src) =>
          new Promise<string | null>((resolve) => {
            const probe = new Image();
            probe.onload = () => resolve(src);
            probe.onerror = () => resolve(null);
            probe.src = src;
          }),
      ),
    ).then((results) => {
      if (cancelled) return;
      const ok = results.filter((src): src is string => src !== null);
      if (ok.length > 0) setImages([image, ...ok]);
    });

    return () => {
      cancelled = true;
    };
  }, [image, extras]);

  const goTo = useCallback(
    (index: number) => {
      const total = images.length;
      setCurrent(((index % total) + total) % total);
    },
    [images.length],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

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
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            className="pdp-img"
            src={src}
            alt={`${alt} — foto ${i + 1} de ${images.length}`}
            loading={i === 0 ? "eager" : "lazy"}
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
            {images.map((src, i) => (
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
