import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumbs,
  CtaBand,
  JsonLd,
  SectionHead,
  TemplateGrid,
  breadcrumbJsonLd,
} from "@/components/sections";
import { EFFECTS } from "@/lib/effects";
import { SITE, absoluteUrl, pageAlternates } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const TITLE = "AI動画テンプレート一覧｜写真を選ぶだけで流行りの動画に";
const DESCRIPTION =
  "バズリンのAI動画テンプレート一覧。Hotel Lobby・Bulin 47・Burning Bridges・Rain Dance・Zombie Trend など、写真を選ぶだけで使える無料プレビュー付きのテンプレートを紹介します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates("/templates"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/templates") },
};

const GROUPS: { key: string; title: string; lede: string }[] = [
  { key: "duet", title: "2人で作るテンプレート", lede: "写真2枚。友達・カップル・ペット同士で。" },
  { key: "dance", title: "ダンス系テンプレート", lede: "写真1枚で、流行りのダンスの主役に。" },
  { key: "cinematic", title: "映画風テンプレート", lede: "ミュージックビデオのような1カットに。" },
  { key: "horror", title: "ホラー系テンプレート", lede: "思わず二度見する変身系。" },
];

export default function TemplatesPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "テンプレート", path: "/templates" },
  ];
  const itemList = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "ItemList",
        name: `${SITE.name}のAI動画テンプレート`,
        itemListElement: EFFECTS.map((e, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/effects/${e.slug}`),
          name: e.name,
        })),
      },
    ],
  };

  return (
    <main>
      <JsonLd data={itemList} />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>AI動画テンプレート</h1>
          <p className="hero-lede">
            流行っている動画の構図・照明・動きを、そのままテンプレートにしました。写真を選ぶだけで使えて、配置のプレビューは無料です。
          </p>
        </div>
      </section>

      <div className="shell">
        <section className="section">
          <SectionHead eyebrow="ALL" title="すべてのテンプレート" />
          <TemplateGrid effects={EFFECTS} uidPrefix="all" />
        </section>

        {GROUPS.map((g) => {
          const items = EFFECTS.filter((e) => e.category === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key} className="section section-tight">
              <SectionHead eyebrow={g.key.toUpperCase()} title={g.title} lede={g.lede} />
              <ul className="link-list">
                {items.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/effects/${e.slug}`}>
                      <strong>{e.name}</strong>
                      <span>{e.cardBlurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="section section-tight">
          <SectionHead eyebrow="TOOLS" title="目的から探す" />
          <ul className="pill-links">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`}>{t.navLabel}</Link>
              </li>
            ))}
            <li>
              <Link href="/trends">今週バズってるAI動画</Link>
            </li>
          </ul>
        </section>
      </div>
      <CtaBand />
    </main>
  );
}
