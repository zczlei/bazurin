import Link from "next/link";
import { CoverArt } from "@/components/CoverArt";
import { EFFECTS, photoCountLabel, type EffectDefinition } from "@/lib/effects";
import type { FaqItem } from "@/lib/faq";
import { FAILURE_CASES, GALLERY } from "@/lib/gallery";
import { absoluteUrl, SITE } from "@/lib/site";
import { maxImageMbLabel } from "@/lib/upload-limit";

export function SectionHead({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head" id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  );
}

export function TemplateCard({ effect, uid }: { effect: EffectDefinition; uid: string }) {
  return (
    <Link
      href={`/effects/${effect.slug}`}
      className="tpl-card"
      style={{ ["--fx" as string]: effect.accent, ["--fx2" as string]: effect.accent2 }}
    >
      <CoverArt scene={effect.scene} uid={uid} className="tpl-cover">
        <span className="tpl-chip">{photoCountLabel(effect)}</span>
        <span className="tpl-chip tpl-chip-right">{effect.durationSec}秒</span>
        <span className="tpl-name">{effect.name}</span>
      </CoverArt>
      <div className="tpl-body">
        <h3>{effect.name}</h3>
        <p>{effect.cardBlurb}</p>
        <span className="tpl-link">→ {effect.name} の作り方</span>
      </div>
    </Link>
  );
}

export function TemplateGrid({
  effects,
  uidPrefix,
}: {
  effects: EffectDefinition[];
  uidPrefix: string;
}) {
  return (
    <div className={effects.length === 1 ? "tpl-grid tpl-grid-single" : "tpl-grid"}>
      {effects.map((e) => (
        <TemplateCard key={e.slug} effect={e} uid={`${uidPrefix}-${e.slug}`} />
      ))}
    </div>
  );
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step-num">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="spec-wrap">
      <table className="spec">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function siteSpecRows(): [string, string][] {
  return [
    ["アスペクト比", `${SITE.output.aspectRatio}（TikTok・Instagram Reels・YouTube Shorts 向け）`],
    ["長さ", `${SITE.output.lengthRange}（テンプレートにより異なります）`],
    ["ファイル形式", `${SITE.output.format}（ダウンロードしてそのまま投稿できます）`],
    ["音源", "付属しません（投稿時に各アプリのサウンドをお選びください）"],
    ["背景処理", "テンプレート側のシーンを合成します"],
    ["利用範囲", "個人SNSでの利用限定・商用利用は不可"],
    ["対応端末", "PC・iPhone・Android（ブラウザのみ、アプリ不要）"],
  ];
}

export function effectSpecRows(effect: EffectDefinition): [string, string][] {
  return [
    ["必要な写真", `${photoCountLabel(effect)}（${SITE.upload.acceptLabel}・1枚${maxImageMbLabel(effect.subjects)}MBまで）`],
    ["スタイル", effect.templates.map((t) => t.name).join("・")],
    ["アスペクト比", `${SITE.output.aspectRatio}`],
    ["長さ", `${effect.durationSec}秒`],
    ["ファイル形式", SITE.output.format],
    ["プロンプト", "不要（構図・照明・動きはテンプレートに含まれています）"],
    ...(effect.subjects === 2
      ? ([["左右の立ち位置", "「左の人」の枠が左、「右の人」の枠が右で固定。動画内で入れ替わりません"]] as [
          string,
          string,
        ][])
      : []),
    ["音源", "付属しません"],
    ["利用範囲", "個人SNSでの利用限定・商用利用は不可"],
  ];
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            <span className="faq-q">Q</span>
            <h3>{item.q}</h3>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "写真1枚で、まずは配置を見てみませんか。",
  sub = "会員登録もアプリも不要です。",
  href = "/#generator",
}: {
  title?: string;
  sub?: string;
  href?: string;
}) {
  return (
    <section className="cta-band">
      <div className="cta-inner">
        <h2>{title}</h2>
        <p>{sub}</p>
        <Link href={href} className="btn btn-white btn-lg">
          無料で配置を試す
        </Link>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqJsonLd(items: FaqItem[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="crumbs" aria-label="パンくずリスト">
      {items.map((it, i) => (
        <span key={it.path}>
          {i < items.length - 1 ? <Link href={it.path}>{it.name}</Link> : <span>{it.name}</span>}
          {i < items.length - 1 ? <span className="crumb-sep">›</span> : null}
        </span>
      ))}
    </nav>
  );
}

export function GalleryGrid({ limit, effectSlug }: { limit?: number; effectSlug?: string }) {
  const pool = effectSlug ? GALLERY.filter((g) => g.effectSlug === effectSlug) : GALLERY;
  const items = limit ? pool.slice(0, limit) : pool;
  if (!items.length) return null;
  return (
    <div className="gallery-grid">
      {items.map((g) => {
        const name = EFFECTS.find((e) => e.slug === g.effectSlug)?.name;
        return (
          <Link key={g.image} href={`/effects/${g.effectSlug}`} className="gallery-card">
            <span className="gallery-cover">
              <img src={g.image} alt={g.alt} />
            </span>
            <span className="gallery-caption">{name ?? g.alt}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function FailureCases() {
  return (
    <div className="fail-grid">
      {FAILURE_CASES.map((f) => (
        <article key={f.title} className="fail-card">
          <h3>
            <span className="fail-badge">失敗例</span>
            {f.title}
          </h3>
          <p>
            <strong>原因：</strong>
            {f.cause}
          </p>
          <p>
            <strong>対策：</strong>
            {f.fix}
          </p>
        </article>
      ))}
    </div>
  );
}
