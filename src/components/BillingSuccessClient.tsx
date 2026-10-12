"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  sessionId: string;
  backHref: string;
};

export function BillingSuccessClient({ sessionId, backHref }: Props) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">(
    sessionId ? "loading" : "error",
  );
  const [credits, setCredits] = useState<number | null>(null);
  const [videosGranted, setVideosGranted] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(
    sessionId ? null : "決済情報が見つかりません。決済完了画面からもう一度お進みください。",
  );

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/billing/confirm?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (!res.ok) throw new Error("お支払いを確認できませんでした。");
        if (cancelled) return;
        setCredits(data.credits);
        setVideosGranted(data.videosGranted);
        setStatus("ok");
        window.dispatchEvent(new CustomEvent("bazurin:credits", { detail: data.credits }));
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(
          `${e instanceof Error ? e.message : "お支払いを確認できませんでした。"}時間をおいて再読み込みしても反映されない場合は、お問い合わせください。`,
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="billing-card">
        <div className="spinner" aria-hidden />
        <p>お支払いを確認しています…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="billing-card">
        <p className="form-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="billing-card">
      <p className="billing-big">+{videosGranted}本</p>
      <p>
        クレジットを追加しました。現在の残りは <strong>{credits}本</strong> です。
      </p>
      <Link href={`${backHref}#generator`} className="btn btn-primary btn-lg">
        動画を書き出す
      </Link>
    </div>
  );
}
