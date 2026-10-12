import type { MetadataRoute } from "next";
import { EFFECTS } from "@/lib/effects";
import { LEGAL_PAGES } from "@/lib/legal";
import { SITEMAP_IDS, absoluteUrl } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export async function generateSitemaps() {
  return SITEMAP_IDS.map((id) => ({ id }));
}

type Entry = MetadataRoute.Sitemap[number];

function entry(
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  lastModified: Date = new Date(),
): Entry {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { ja: absoluteUrl(path) } },
  };
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  switch (id) {
    case "main":
      return [
        entry("/", 1, "weekly"),
        entry("/templates", 0.8, "weekly"),
        entry("/make/ai-video-tutorial", 0.7, "monthly", new Date("2026-10-12")),
        entry("/trends", 0.8, "daily"),
        entry("/faq", 0.5, "monthly"),
      ];
    case "effects":
      return EFFECTS.map((e) =>
        entry(`/effects/${e.slug}`, e.featured ? 0.9 : 0.8, "weekly", new Date(e.updated)),
      );
    case "tools":
      return TOOLS.map((t) => entry(`/tools/${t.slug}`, 0.8, "weekly"));
    case "legal":
      return LEGAL_PAGES.map((p) => entry(`/legal/${p.slug}`, 0.3, "yearly"));
    default:
      return [];
  }
}
