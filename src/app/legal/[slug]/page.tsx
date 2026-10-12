import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, SpecTable } from "@/components/sections";
import { LEGAL_PAGES, getLegalPage } from "@/lib/legal";
import { absoluteUrl, pageAlternates } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEGAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  const path = `/legal/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(path),
    openGraph: { title: page.title, description: page.description, url: absoluteUrl(path) },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <main>
      <section className="page-hero page-hero-sm">
        <div className="shell shell-narrow">
          <Breadcrumbs
            items={[
              { name: "ホーム", path: "/" },
              { name: page.title, path: `/legal/${page.slug}` },
            ]}
          />
          <h1>{page.title}</h1>
          <p className="updated">最終更新日：{page.updated}</p>
        </div>
      </section>
      <div className="shell shell-narrow legal">
        {page.intro ? <p>{page.intro}</p> : null}
        {page.block.kind === "table" ? (
          <SpecTable rows={page.block.rows} />
        ) : (
          page.block.items.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </section>
          ))
        )}
        <nav className="legal-nav" aria-label="法務ページ">
          {LEGAL_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
            <Link key={p.slug} href={`/legal/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
