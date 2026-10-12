import type { Metadata } from "next";
import Link from "next/link";
import { BillingSuccessClient } from "@/components/BillingSuccessClient";

/** Stripe redirects here with session_id — must not be statically prerendered. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "お支払い完了",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string; return?: string }>;
};

function safePath(p?: string) {
  return p && p.startsWith("/") && !p.startsWith("//") ? p : "/";
}

export default async function BillingSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const backHref = safePath(params.return);

  return (
    <main className="shell billing-page">
      <p className="eyebrow">THANK YOU</p>
      <h1>お支払いが完了しました</h1>
      <p className="muted">
        ご購入ありがとうございます。クレジットをこのブラウザ（ログイン中はアカウント）に追加しています。
      </p>
      <BillingSuccessClient sessionId={params.session_id || ""} backHref={backHref} />
      <p className="billing-links">
        <Link href={backHref}>動画作成に戻る</Link>
        {" ・ "}
        <Link href="/pricing">料金を見る</Link>
      </p>
    </main>
  );
}
