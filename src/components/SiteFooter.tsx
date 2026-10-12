import Link from "next/link";
import { BrandMark } from "@/components/SiteHeader";
import { EFFECTS } from "@/lib/effects";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

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
              <p className="footer-head">
                <Link href="/templates">テンプレート</Link>
              </p>
              {EFFECTS.map((e) => (
                <Link key={e.slug} href={`/effects/${e.slug}`}>
                  {e.name}
                </Link>
              ))}
            </div>
            <div>
              <p className="footer-head">使い方</p>
              <Link href="/#how">3ステップの作り方</Link>
              <Link href="/gallery#photo-tips">写真の条件</Link>
              <Link href="/faq">よくある質問</Link>
              <Link href="/trends">今週バズってるAI動画</Link>
            </div>
            <div>
              <p className="footer-head">機能</p>
              {TOOLS.map((t) => (
                <Link key={t.slug} href={`/tools/${t.slug}`}>
                  {t.navLabel}
                </Link>
              ))}
            </div>
            <div>
              <p className="footer-head">その他</p>
              <Link href="/pricing">料金</Link>
              <Link href="/gallery">作例</Link>
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
