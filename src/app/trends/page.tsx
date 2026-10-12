import type { Metadata } from "next";
import Link from "next/link";
import { CoverArt } from "@/components/CoverArt";
import { Breadcrumbs, CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { EFFECTS, photoCountLabel } from "@/lib/effects";
import { absoluteUrl, pageAlternates } from "@/lib/site";

const TITLE = "今週バズってるAI動画｜TikTokトレンドを写真から作る";
const DESCRIPTION =
  "いまTikTok・Instagram Reelsでバズっている動画のトレンドまとめ。Hotel Lobby・Bulin 47 など、話題のAI動画を写真1〜2枚から作る方法を紹介します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates("/trends"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/trends") },
};

/** Update when the ranking changes; shown to users. */
const UPDATED = "2026年10月12日";

export default function TrendsPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "トレンド", path: "/trends" },
  ];

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd(crumbs) }} />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>今週バズってるAI動画</h1>
          <p className="hero-lede">
            TikTok・Instagram Reels・YouTube Shorts で投稿が増えているトレンドを、写真から作れる形でまとめました。気になるものはそのまま作れます。
          </p>
          <p className="updated">最終更新：{UPDATED}</p>
        </div>
      </section>

      <div className="shell">
        <ol className="trend-list">
          {EFFECTS.map((e, i) => (
            <li
              key={e.slug}
              className="trend-row"
              style={{ ["--fx" as string]: e.accent, ["--fx2" as string]: e.accent2 }}
            >
              <span className="trend-rank">{i + 1}</span>
              <CoverArt scene={e.scene} uid={`trend-${e.slug}`} className="trend-cover" />
              <div className="trend-body">
                <h2>{e.name}</h2>
                <p>{e.cardBlurb}</p>
                <ul className="trend-meta">
                  <li>{photoCountLabel(e)}</li>
                  <li>{e.durationSec}秒</li>
                  <li>縦型9:16</li>
                </ul>
                <Link href={`/effects/${e.slug}`} className="btn btn-primary btn-sm">
                  {e.name} を作る
                </Link>
              </div>
            </li>
          ))}
        </ol>
        <p className="fine">
          掲載順は、SNS上での投稿の伸びをもとに編集部が選んでいます。
        </p>
      </div>
      <CtaBand />
    </main>
  );
}
