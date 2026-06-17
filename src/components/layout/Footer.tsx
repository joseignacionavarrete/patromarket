import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="ftr-logo">
        MUNDIAL<span>KITS</span>
      </div>
      <p>
        Camisetas de colección ·{" "}
        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteConfig.instagram.handle}
        </a>
      </p>
    </footer>
  );
}
