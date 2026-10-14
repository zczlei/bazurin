import { EFFECTS } from "@/lib/effects";
import { absoluteUrl } from "@/lib/site";
import { LEGAL_PAGES } from "@/lib/legal";
import { TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

/** Change a page's date only when that page's content changes. The build clock must not refresh every URL. */
const PUBLISHED = "2026-10-13";

function entry(path: string, priority: number, changefreq = "weekly", lastmod = PUBLISHED) {
  return `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

function sitemapXml() {
  const urls = [
    entry("/", 1),
    entry("/templates", 0.8),
    entry("/make/ai-video-tutorial", 0.7, "monthly", "2026-10-12"),
    entry("/trends", 0.8, "daily"),
    entry("/faq", 0.5, "monthly"),
    ...EFFECTS.map((effect) =>
      entry(`/effects/${effect.slug}`, effect.featured ? 0.9 : 0.8, "weekly", effect.updated.slice(0, 10)),
    ),
    ...TOOLS.map((tool) => entry(`/tools/${tool.slug}`, 0.8)),
    ...LEGAL_PAGES.map((page) => entry(`/legal/${page.slug}`, 0.3, "yearly")),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export function GET() {
  return new Response(sitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
