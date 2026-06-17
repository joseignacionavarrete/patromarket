import InstagramIcon from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/lib/site";

export default function CtaSection() {
  return (
    <section className="cta">
      <div className="cta-rule"></div>
      <h2 className="cta-h2">
        ¿LISTO PARA
        <br />
        VESTIR LA GLORIA?
      </h2>
      <p className="cta-sub">
        Escríbenos por Instagram para confirmar tu talla, coordinar el pago y el
        despacho. Atención directa, sin intermediarios.
      </p>
      <a
        className="cta-btn"
        href={siteConfig.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
        Escribir a {siteConfig.instagram.handle}
      </a>
    </section>
  );
}
