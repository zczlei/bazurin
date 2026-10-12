import type { Metadata } from "next";
import {
  Breadcrumbs,
  CtaBand,
  FailureCases,
  GalleryGrid,
  JsonLd,
  SectionHead,
  breadcrumbJsonLd,
} from "@/components/sections";
import { absoluteUrl, pageAlternates } from "@/lib/site";

const TITLE = "AI動画の作例と失敗例｜写真から作った実際の仕上がり";
const DESCRIPTION =
  "バズリンで写真から生成したAI動画の作例と、よくある失敗例・その対策をまとめました。うまくいく写真の条件も紹介します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates("/gallery"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/gallery") },
};

const PHOTO_RULES = [
  ["1枚に1人", "集合写真ではなく、1人だけが写った写真を使います。"],
  ["顔がはっきり", "正面か斜め45度。サングラス・マスクは外した写真がおすすめです。"],
  ["明るい場所で", "日中や明るい室内で撮った、加工の少ない写真がきれいに仕上がります。"],
  ["胸から上以上", "顔のアップだけより、上半身〜全身が写っていると動きが自然です。"],
] as const;

export default function GalleryPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "作例", path: "/gallery" },
  ];
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd(crumbs) }} />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>作例・失敗例</h1>
          <p className="hero-lede">
            うまくいった動画だけでなく、よくある失敗とその原因も正直に載せています。写真を選ぶときの参考にしてください。
          </p>
        </div>
      </section>
      <div className="shell">
        <section className="section">
          <SectionHead eyebrow="SAMPLES" title="作例" lede="音源は付属していません。" />
          <GalleryGrid />
          <p className="fine">
            作例は当社のテンプレートで生成したものです。写真の枚数・構図により、仕上がりは変わります。
          </p>
        </section>

        <section className="section" id="failures">
          <SectionHead
            eyebrow="FAILURES"
            title="よくある失敗例と対策"
            lede="失敗の多くは、写真を替えるだけで解決します。生成に失敗した場合、クレジットは自動で返却されます。"
          />
          <FailureCases />
        </section>

        <section className="section" id="photo-tips">
          <SectionHead eyebrow="PHOTO" title="写真の条件" />
          <div className="tips">
            {PHOTO_RULES.map(([t, b]) => (
              <article key={t} className="tip">
                <h3>{t}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <CtaBand />
    </main>
  );
}
