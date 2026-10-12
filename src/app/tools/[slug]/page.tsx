import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  JsonLd,
  SectionHead,
  SpecTable,
  Steps,
  TemplateGrid,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/sections";
import { VideoGenerator } from "@/components/VideoGenerator";
import { getEffect, type EffectDefinition } from "@/lib/effects";
import { toGeneratorEffect } from "@/lib/generator-effect";
import { absoluteUrl, pageAlternates } from "@/lib/site";
import { TOOLS, getTool } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: pageAlternates(path),
    openGraph: { title: tool.title, description: tool.description, url: absoluteUrl(path) },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const path = `/tools/${tool.slug}`;
  const effects = tool.effects
    .map((s) => getEffect(s))
    .filter((e): e is EffectDefinition => Boolean(e));
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: tool.navLabel, path },
  ];
  const otherTools = TOOLS.filter((t) => t.slug !== tool.slug);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbJsonLd(crumbs), faqJsonLd(tool.faq, `${absoluteUrl(path)}#faq`)],
        }}
      />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>{tool.h1}</h1>
          <p className="hero-lede">{tool.lede}</p>
          <ul className="hero-badges">
            {(tool.badges ?? ["会員登録不要", "プレビューは無料", "縦型9:16対応"]).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell">
        <VideoGenerator
          effects={effects.map(toGeneratorEffect)}
          initialSlug={effects[0]?.slug}
          selectable={effects.length > 1}
        />

        {tool.method ? (
          <section className="section prose-section">
            <SectionHead eyebrow="METHOD" title={tool.method.title} />
            <div className="prose">
              {tool.method.paragraphs.map((p) => (
                <p key={p.slice(0, 16)}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {tool.sections.map((s) => (
          <section key={s.heading} className="section prose-section">
            <SectionHead eyebrow="GUIDE" title={s.heading} />
            <div className="prose">
              {s.body.map((p) => (
                <p key={p.slice(0, 16)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {tool.steps ? (
          <section className="section">
            <SectionHead eyebrow="HOW TO" title={tool.stepsTitle ?? "3ステップで完成"} />
            <Steps steps={tool.steps} />
          </section>
        ) : null}

        <section className="section">
          <SectionHead
            eyebrow="TEMPLATES"
            title={tool.method ? "動きはテンプレートから選びます" : "使えるテンプレート"}
            lede={tool.method ? "同じ手順で、別の構図も作れます。プロンプトの入力はありません。" : undefined}
          />
          <TemplateGrid effects={effects} uidPrefix={`tool-${tool.slug}`} />
        </section>

        {tool.rules ? (
          <section className="section" id="image-tips">
            <SectionHead eyebrow="PHOTO" title={tool.rulesTitle ?? "画像の条件"} />
            <div className="tips">
              {tool.rules.map((t) => (
                <article key={t.title} className="tip">
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tool.specs ? (
          <section className="section">
            <SectionHead eyebrow="SPEC" title="仕様" />
            <SpecTable rows={tool.specs} />
          </section>
        ) : null}

        {tool.compare ? (
          <section className="section">
            <SectionHead eyebrow="COMPARE" title={tool.compare.title} lede={tool.compare.intro} />
            <div className="compare-wrap">
              <table className="compare">
                <thead>
                  <tr>
                    {tool.compare.cols.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tool.compare.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine">{tool.compare.note}</p>
          </section>
        ) : null}

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="よくある質問" />
          <FaqList items={tool.faq} />
        </section>

        {tool.related?.length ? (
          <section className="section section-tight">
            <SectionHead eyebrow="RELATED" title="こちらも" />
            <ul className="related-list">
              {tool.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.anchor}</Link>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="section section-tight">
          <SectionHead eyebrow="MORE" title="ほかの使い方" />
          <ul className="pill-links">
            {otherTools.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`}>{t.navLabel}</Link>
              </li>
            ))}
            <li>
              <Link href="/">写真・画像からAI動画生成（トップ）</Link>
            </li>
          </ul>
        </section>
      </div>
      <CtaBand />
    </main>
  );
}
