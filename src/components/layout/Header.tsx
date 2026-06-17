import Link from "next/link";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header>
      <Link href="/" aria-label={`${siteConfig.name} · inicio`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo-img" src="/logo.png" alt={siteConfig.name} />
      </Link>
      <a
        className="hdr-ig"
        href={siteConfig.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
        {siteConfig.instagram.handle}
      </a>
    </header>
  );
}
