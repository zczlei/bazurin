import type { MetadataRoute } from "next";
import { SITE, SITEMAP_IDS } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/billing/"] }],
    sitemap: SITEMAP_IDS.map((id) => `${SITE.url}/sitemap/${id}.xml`),
    host: SITE.url,
  };
}
