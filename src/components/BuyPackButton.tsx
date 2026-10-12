"use client";

import { useState } from "react";

type Props = {
  packId: string;
  returnPath?: string;
  label?: string;
  className?: string;
  /** Runs right before leaving for Stripe (e.g. stash in-progress photos). */
  onBeforeRedirect?: () => void;
};

export function BuyPackButton({
  packId,
  returnPath,
  label = "購入する",
  className = "btn btn-primary btn-block",
  onBeforeRedirect,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onBuy() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId,
          returnPath: returnPath ?? window.location.pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "決済ページを開けませんでした。");
      }
      onBeforeRedirect?.();
      window.location.href = data.url as string;
    } catch (e) {
      setError(e instanceof Error ? e.message : "決済ページを開けませんでした。");
      setLoading(false);
    }
  }

  return (
    <div className="buy-pack">
      <button type="button" className={className} disabled={loading} onClick={onBuy}>
        {loading ? "決済ページへ移動中…" : label}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
