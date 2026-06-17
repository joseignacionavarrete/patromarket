"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig, whatsappLink } from "@/lib/site";

const GREETING =
  "¡Hola! Vengo de la web de BigoteMarket y quiero info de las camisetas ⚽";

/**
 * Widget de WhatsApp: un botón flotante con un popup tipo chat para iniciar
 * la conversación. El enlace abre WhatsApp con un mensaje pre-rellenado.
 */
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        className="wa-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat de WhatsApp"
        aria-expanded={open}
      >
        <WhatsAppIcon className="wa-fab-icon" />
      </button>

      {open ? (
        <div className="wa-popup" role="dialog" aria-label="Chat de WhatsApp">
          <div className="wa-popup-head">
            <div className="wa-avatar">
              <WhatsAppIcon className="wa-avatar-icon" />
            </div>
            <div className="wa-popup-meta">
              <strong>{siteConfig.name}</strong>
              <span>En línea · responde rápido</span>
            </div>
            <button
              className="wa-popup-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="wa-popup-body">
            <div className="wa-bubble">
              ¡Hola! 👋 ¿Buscas tu camiseta del Mundial? Escríbenos y
              coordinamos talla, pago y despacho.
            </div>
          </div>

          <a
            className="wa-popup-cta"
            href={whatsappLink(GREETING)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="wa-cta-icon" />
            Iniciar conversación
          </a>
          <p className="wa-popup-num">{siteConfig.whatsapp.display}</p>
        </div>
      ) : null}
    </>
  );
}
