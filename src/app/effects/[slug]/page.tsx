import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/CoverArt";
import { PricingSection } from "@/components/PricingSection";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  GalleryGrid,
  JsonLd,
  SectionHead,
  SpecTable,
  Steps,
  TemplateGrid,
  breadcrumbJsonLd,
  effectSpecRows,
  faqJsonLd,
} from "@/components/sections";
import { VideoGenerator } from "@/components/VideoGenerator";
import { EFFECTS, getEffect, photoCountLabel } from "@/lib/effects";
import { GALLERY } from "@/lib/gallery";
import { toGeneratorEffect } from "@/lib/generator-effect";
import { LOWEST_PRICE_JPY } from "@/lib/packs";
import { SITE, absoluteUrl, pageAlternates, yen } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EFFECTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const effect = getEffect(slug);
  if (!effect) return {};
  const path = `/effects/${effect.slug}`;
  const sample = GALLERY.find((g) => g.effectSlug === effect.slug);
  return {
    title: effect.title,
    description: effect.description,
    keywords: effect.seoKeywords,
    alternates: pageAlternates(path),
    openGraph: {
      type: "article",
      title: effect.title,
      description: effect.description,
      url: absoluteUrl(path),
      ...(sample ? { images: [{ url: sample.poster, width: 1080, height: 1920, alt: sample.alt }] } : {}),
    },
  };
}

export default async function EffectPage({ params }: Props) {
  const { slug } = await params;
  const effect = getEffect(slug);
  if (!effect) notFound();

  const path = `/effects/${effect.slug}`;
  const others = EFFECTS.filter((e) => e.slug !== effect.slug);
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "テンプレート", path: "/templates" },
    { name: effect.name, path },
  ];
  const sample = GALLERY.find((g) => g.effectSlug === effect.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: effect.title,
        description: effect.description,
        inLanguage: "ja",
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
      breadcrumbJsonLd(crumbs),
      {
        "@type": "SoftwareApplication",
        name: `${effect.name} AI動画（${SITE.name}）`,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: absoluteUrl(path),
        offers: {
          "@type": "Offer",
          price: String(LOWEST_PRICE_JPY),
          priceCurrency: "JPY",
          availability: "https://schema.org/InStock",
        },
      },
      ...(sample
        ? [
            {
              "@type": "VideoObject",
              name: sample.alt,
              description: effect.description,
              thumbnailUrl: absoluteUrl(sample.poster),
              contentUrl: absoluteUrl(sample.video),
              uploadDate: effect.updated,
              duration: `PT${effect.durationSec}S`,
              width: 1080,
              height: 1920,
              inLanguage: "ja",
              publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            },
          ]
        : []),
      faqJsonLd(effect.faq, `${absoluteUrl(path)}#faq`),
    ],
  };

  return (
    <main style={{ ["--fx" as string]: effect.accent, ["--fx2" as string]: effect.accent2 }}>
      <JsonLd data={jsonLd} />

      <section className="hero hero-effect">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <Breadcrumbs items={crumbs} />
            <p className="hero-kicker">{effect.name} AI動画</p>
            <h1>{effect.h1}</h1>
            <p className="hero-lede">{effect.lede}</p>
            <ul className="hero-badges">
              {(
                effect.badges ?? [
                  `${effect.durationSec}秒`,
                  photoCountLabel(effect),
                  "プレビュー無料",
                  "縦型9:16",
                ]
              ).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="hero-ctas">
              <Link href="#generator" className="btn btn-primary btn-lg">
                無料で配置を試す
              </Link>
              <Link href="#examples" className="btn btn-outline btn-lg">
                作例を見る
              </Link>
            </div>
          </div>
          <div className="hero-single" aria-hidden>
            <CoverArt scene={effect.scene} uid="effect-hero" className="fan-card">
              <span className="tpl-name">{effect.name}</span>
            </CoverArt>
          </div>
        </div>
      </section>

      <div className="shell">
        <VideoGenerator
          effects={[toGeneratorEffect(effect)]}
          heading={`写真を選んで ${effect.name} を作る`}
        />

        <section className="section">
          <SectionHead eyebrow="HOW TO" title="3ステップで完成" />
          <Steps
            steps={[
              {
                title: "写真を選ぶ",
                body:
                  effect.subjects === 2
                    ? "1人1枚ずつ、写真を2枚選びます。「左の人」の枠が左、「右の人」の枠が右です。"
                    : "顔がはっきり写った写真を1枚選びます。",
              },
              {
                title: "無料でプレビュー",
                body: "仕上がりの配置を、クレジットを使わずに確認できます。",
              },
              {
                title: "書き出して投稿",
                body: `納得できたら1本${yen(LOWEST_PRICE_JPY)}（税込）から書き出し。投稿時にサウンドを選べば完成です。`,
              },
            ]}
          />
        </section>

        <section className="section prose-section">
          <SectionHead eyebrow="ABOUT" title={effect.aboutTitle ?? `${effect.name} とは`} />
          <div className="prose">
            {effect.about.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
            {effect.disclaimer ? <p className="note-box">{effect.disclaimer}</p> : null}
          </div>
        </section>

        <section className="section">
          <SectionHead eyebrow="TUTORIAL" title={effect.stepsTitle ?? `${effect.name} AI動画の具体的な作り方`} />
          <ol className="tutorial">
            {effect.steps.map((s, i) => (
              <li key={s.title}>
                <h3>
                  <span>STEP {i + 1}</span>
                  {s.title}
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          {effect.templates.length > 0 ? (
            <div className="style-cards">
              {effect.templates.map((t) => (
                <div key={t.id} className="style-card">
                  <strong>{t.name}</strong>
                  {t.tagline ? <span className="style-tagline">{t.tagline}</span> : null}
                  <p>{t.blurb}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {effect.promptGuide ? (
          <section className="section prose-section" id="prompt">
            <SectionHead eyebrow="PROMPT" title={effect.promptGuide.title} />
            <div className="prose">
              {effect.promptGuide.paragraphs.map((p) => (
                <p key={p.slice(0, 16)}>{p}</p>
              ))}
              <div className="prompt-box">
                <p className="prompt-box-label">{effect.promptGuide.boxLabel}</p>
                <p>{effect.promptGuide.order}</p>
                <pre>{effect.promptGuide.recipe}</pre>
                <p className="prompt-box-outro">{effect.promptGuide.outro}</p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="section" id="photo-tips">
          <SectionHead
            eyebrow="PHOTO"
            title={effect.photoTipsTitle ?? "写真の条件"}
            lede={
              effect.photoTipsLede ??
              "うまくいかない原因の多くは、モデルではなく元の写真です。書き出す前に、ここだけ確認してください。"
            }
          />
          <div className="tips">
            {effect.photoTips.map((t) => (
              <article key={t.title} className="tip">
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
          <p className="fine">
            <Link href="/gallery#failures">よくある失敗例と対策を見る →</Link>
          </p>
        </section>

        <section className="section">
          <SectionHead eyebrow="SPEC" title={`${effect.name} の仕様`} />
          <SpecTable rows={[...effectSpecRows(effect), ...(effect.extraSpecs ?? [])]} />
        </section>

        <section className="section" id="examples">
          <SectionHead
            eyebrow="SAMPLES"
            title="作例"
            lede="当社のテンプレートで生成した実際の出力です。音源は含まれていません。"
          />
          <GalleryGrid effectSlug={effect.slug} />
          <p className="fine">
            写真の枚数・構図・光の状態により仕上がりは変わります。配置はプレビューで確認してから購入できます。
          </p>
        </section>

        <PricingSection returnPath={path} />

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title={`${effect.name} のよくある質問`} />
          <FaqList items={effect.faq} />
        </section>

        <section className="section">
          <SectionHead
            eyebrow="MORE"
            title="関連テンプレート"
            lede="同じクレジット・同じ手順で、別のトレンドも作れます。プロンプトの入力はありません。"
          />
          <TemplateGrid effects={others} uidPrefix="related" />
          <div className="related-links">
            <Link href="/templates" className="btn btn-outline">
              テンプレート一覧へ
            </Link>
            <Link href="/trends" className="btn btn-outline">
              今週バズってるAI動画
            </Link>
          </div>
          <p className="fine">
            動画は個人SNSでの利用を前提としています。広告・商品販売などの商用利用はできません。元動画の編集・再配布は一切行っていません。
            <Link href="/legal/terms">利用規約</Link> ／ <Link href="/legal/privacy">プライバシーポリシー</Link>
          </p>
        </section>
      </div>

      <CtaBand
        href="#generator"
        title={effect.cta?.title ?? `${photoCountLabel(effect)}で、まずは配置を見てみませんか。`}
        sub={effect.cta?.sub}
      />
    </main>
  );
}
