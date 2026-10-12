import Link from "next/link";
import { BrandMark } from "@/components/SiteHeader";
import { SITE } from "@/lib/site";

const FOOTER_TOOLS = [
  { href: "/tools/photo-to-video", label: "写真から動画を作る" },
  { href: "/tools/image-to-video", label: "画像から動画を作る" },
  { href: "/tools/dance-video", label: "ダンス動画の作り方" },
  { href: "/tools/animate-photo", label: "写真を動かす" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <BrandMark />
              <span className="brand-name">{SITE.name}</span>
            </Link>
            <p>
              {SITE.name}｜{SITE.tagline}
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <p className="footer-head">テンプレート</p>
              <Link href="/templates">動画テンプレート</Link>
            </div>
            <div>
              <p className="footer-head">使い方</p>
              <Link href="/make/ai-video-tutorial">AI動画の作り方</Link>
              <Link href="/#how">3ステップの作り方</Link>
              <Link href="/make/ai-video-tutorial#tips">写真の条件</Link>
              <Link href="/faq">よくある質問</Link>
              <Link href="/trends">今週バズってるAI動画</Link>
            </div>
            <div>
              <p className="footer-head">機能</p>
              {FOOTER_TOOLS.map((t) => (
                <Link key={t.href} href={t.href}>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <Link href="/legal/tokushoho">特定商取引法に基づく表記</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/company">運営者情報</Link>
        </div>
        <p className="footer-copy">© 2026 {SITE.name}</p>
      </div>
    </footer>
  );
}
