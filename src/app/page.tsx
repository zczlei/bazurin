import type { Metadata } from "next";
import Link from "next/link";
import { CoverArt } from "@/components/CoverArt";
import { PricingSection } from "@/components/PricingSection";
import {
  CtaBand,
  FaqList,
  GalleryGrid,
  JsonLd,
  SectionHead,
  SpecTable,
  Steps,
  TemplateGrid,
  faqJsonLd,
  siteSpecRows,
} from "@/components/sections";
import { VideoGenerator } from "@/components/VideoGenerator";
import { EFFECTS, getFeaturedEffect } from "@/lib/effects";
import { HOME_FAQ } from "@/lib/faq";
import { toGeneratorEffect } from "@/lib/generator-effect";
import { LOWEST_PRICE_JPY } from "@/lib/packs";
import { SITE, absoluteUrl, pageAlternates, yen } from "@/lib/site";

const TITLE = `写真・画像1枚からAI動画生成｜バズるテンプレート付き｜${SITE.name}`;
const DESCRIPTION =
  "写真や画像を選ぶだけで、今バズってるテンプレートからAI動画が完成。配置プレビューは会員登録不要で無料お試し可。TikTok・Instagram Reels・YouTube Shorts向けの縦型9:16に対応。1本から都度課金でお買い求めいただけます。";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates("/"),
  openGraph: {
    title: `写真・画像1枚からAI動画生成｜${SITE.name}`,
    description:
      "テンプレートを選ぶだけで、今バズってるあの形がそのまま完成。配置は無料プレビューで確認してから購入できます。",
    url: absoluteUrl("/"),
  },
};

const HOW_STEPS = [
  {
    title: "テンプレートを選ぶ",
    body: "いま流行りの形から、使いたいテンプレートを選びます。",
  },
  {
    title: "写真を選ぶ",
    body: "スマホのアルバムから、顔がはっきり写っている写真を選択します。加工・切り抜きは不要です。",
  },
  {
    title: "プレビューして、保存",
    body: `動画になる前の「配置」を無料でご確認いただけます。納得できたら1本${yen(LOWEST_PRICE_JPY)}（税込）で書き出します。`,
  },
];

function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: absoluteUrl("/"),
        name: SITE.name,
        inLanguage: "ja",
      },
      {
        "@type": "SoftwareApplication",
        name: SITE.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: absoluteUrl("/"),
        inLanguage: "ja",
        description:
          "写真や画像1枚から、人気のテンプレートを選んでAI動画を生成できるWebサービスです。",
        offers: {
          "@type": "Offer",
          price: String(LOWEST_PRICE_JPY),
          priceCurrency: "JPY",
          availability: "https://schema.org/InStock",
        },
      },
      faqJsonLd(HOME_FAQ, `${SITE.url}/#faq`),
    ],
  };
}

export default function HomePage() {
  const featured = getFeaturedEffect();
  const fan = [EFFECTS[1], featured, EFFECTS[3]];

  return (
    <main>
      <JsonLd data={homeJsonLd()} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">TikTok・Reels・Shorts の縦型動画に</p>
            <h1>
              写真・画像1枚から、
              <br />
              <span className="marker">AI動画生成</span>
            </h1>
            <p className="hero-lede">
              テンプレートを選ぶだけで、今バズってるあの形がそのまま完成。
              <br className="pc-only" />
              配置は無料プレビューで確認してから、必要な本数だけお試しください。
            </p>
            <ul className="hero-badges">
              <li>会員登録不要</li>
              <li>プレビューは無料</li>
              <li>縦型9:16対応</li>
            </ul>
            <div className="hero-ctas">
              <Link href="#generator" className="btn btn-primary btn-lg">
                無料で配置を試す
              </Link>
              <Link href="/templates" className="btn btn-outline btn-lg">
                テンプレートを見る
              </Link>
            </div>
          </div>
          <div className="hero-fan" aria-hidden>
            {fan.map((e, i) => (
              <CoverArt key={e.slug} scene={e.scene} uid={`hero-${i}`} className={`fan-card fan-${i}`}>
                <span className="tpl-name">{e.name}</span>
              </CoverArt>
            ))}
            <span className="fan-sticker">
              プレビュー
              <br />
              無料
            </span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {EFFECTS.map((e) => (
                <span key={e.slug} className="ticker-item">
                  #{e.name.replace(/\s/g, "")}
                </span>
              ))}
              <span className="ticker-item">#写真から動画</span>
              <span className="ticker-item">#AI動画</span>
              <span className="ticker-item">#バズる動画</span>
            </span>
          ))}
        </div>
      </div>

      <div className="shell">
        <VideoGenerator
          effects={EFFECTS.map(toGeneratorEffect)}
          initialSlug={featured.slug}
          selectable
        />

        <section className="section">
          <SectionHead
            eyebrow="SAMPLES"
            title="作例"
            lede={`実際に${SITE.name}で生成された動画です。音源は付属していません。`}
          />
          <GalleryGrid limit={8} />
          <p className="fine">
            作例は当社のテンプレートで生成したものです。写真の枚数・構図により、仕上がりは変わります。
          </p>
        </section>

        <section className="section" id="how">
          <SectionHead eyebrow="HOW TO" title="3ステップで完成" />
          <Steps steps={HOW_STEPS} />
        </section>

        <section className="section" id="templates">
          <SectionHead eyebrow="TEMPLATES" title="いま流行りのテンプレート" />
          <TemplateGrid effects={EFFECTS} uidPrefix="home" />
        </section>

        <section className="section">
          <SectionHead eyebrow="SPEC" title="出力の仕様" />
          <SpecTable rows={siteSpecRows()} />
        </section>

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="よくある質問" />
          <FaqList items={HOME_FAQ} />
        </section>

        <PricingSection returnPath="/" />
      </div>

      <CtaBand />
    </main>
  );
}
