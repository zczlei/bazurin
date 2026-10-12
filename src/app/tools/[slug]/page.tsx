import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  JsonLd,
  SectionHead,
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
            <li>会員登録不要</li>
            <li>プレビューは無料</li>
            <li>縦型9:16対応</li>
          </ul>
        </div>
      </section>

      <div className="shell">
        <VideoGenerator
          effects={effects.map(toGeneratorEffect)}
          initialSlug={effects[0]?.slug}
          selectable={effects.length > 1}
        />

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

        <section className="section">
          <SectionHead eyebrow="TEMPLATES" title="使えるテンプレート" />
          <TemplateGrid effects={effects} uidPrefix={`tool-${tool.slug}`} />
        </section>

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="よくある質問" />
          <FaqList items={tool.faq} />
        </section>

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
