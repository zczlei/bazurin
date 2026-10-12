"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CREDITS_EVENT = "bazurin:credits";

export function CreditsBadge() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/wallet", { cache: "no-store" });
        const data = (await res.json()) as { credits?: number };
        if (!cancelled && typeof data.credits === "number") setCredits(data.credits);
      } catch {
        // ignore
      }
    }
    const onCredits = (e: Event) => setCredits((e as CustomEvent<number>).detail);
    load();
    window.addEventListener("focus", load);
    window.addEventListener(CREDITS_EVENT, onCredits);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
      window.removeEventListener(CREDITS_EVENT, onCredits);
    };
  }, []);

  return (
    <Link href="/pricing" className="credits-badge" title="残りクレジット（動画の本数）">
      <span className="credits-dot" aria-hidden />
      {credits === null ? "…" : `残り${credits}本`}
    </Link>
  );
}
