import Link from "next/link";
import { AuthControls } from "@/components/AuthControls";
import { CreditsBadge } from "@/components/CreditsBadge";
import { SITE } from "@/lib/site";

export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="brand-mark">
      <defs>
        <linearGradient id="bz-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff2e7e" />
          <stop offset="0.55" stopColor="#ff6a1f" />
          <stop offset="1" stopColor="#ffc21a" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#bz-g)" />
      <path d="M13 10.5v11l9-5.5z" fill="#fff" />
      <circle cx="24.5" cy="8" r="2.2" fill="#fff" />
    </svg>
  );
}

const NAV = [
  { href: "/templates", label: "テンプレート" },
  { href: "/trends", label: "トレンド" },
  { href: "/faq", label: "よくある質問" },
];

/** Sync server component — no auth() here (keeps pages statically renderable). */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${SITE.name} トップ`}>
          <BrandMark />
          <span className="brand-name">{SITE.name}</span>
        </Link>
        <nav className="nav" aria-label="メインメニュー">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <CreditsBadge />
          <AuthControls />
        </div>
      </div>
      <nav className="nav-mobile" aria-label="メニュー">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
