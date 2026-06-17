"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PromoPrize } from "@/lib/message";

interface PromoContextValue {
  /** Premio ganado en la ruleta, o null si nunca la activó. */
  prize: PromoPrize | null;
  /** Registra el premio (lo usan los botones de consulta). */
  setPrize: (prize: PromoPrize | null) => void;
}

const PromoContext = createContext<PromoContextValue | null>(null);

const STORAGE_KEY = "bm_promo_prize";

/**
 * Provee el premio de la ruleta a toda la app. Lo persiste en localStorage
 * para que sobreviva a recargas y a la navegación a la ficha de producto.
 */
export function PromoProvider({ children }: { children: ReactNode }) {
  const [prize, setPrizeState] = useState<PromoPrize | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrizeState(JSON.parse(raw) as PromoPrize);
    } catch {
      /* localStorage no disponible: seguimos sin premio guardado */
    }
  }, []);

  const setPrize = useCallback((next: PromoPrize | null) => {
    setPrizeState(next);
    try {
      if (next) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignorar errores de almacenamiento */
    }
  }, []);

  return (
    <PromoContext.Provider value={{ prize, setPrize }}>
      {children}
    </PromoContext.Provider>
  );
}

export function usePromo(): PromoContextValue {
  const ctx = useContext(PromoContext);
  if (!ctx) {
    throw new Error("usePromo debe usarse dentro de <PromoProvider>");
  }
  return ctx;
}
