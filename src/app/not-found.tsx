import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell billing-page">
      <p className="eyebrow">404</p>
      <h1>ページが見つかりません</h1>
      <p className="muted">お探しのページは移動または削除された可能性があります。</p>
      <div className="related-links">
        <Link href="/" className="btn btn-primary">
          トップへ戻る
        </Link>
        <Link href="/templates" className="btn btn-outline">
          テンプレートを見る
        </Link>
      </div>
    </main>
  );
}
