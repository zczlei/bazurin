import type { Metadata } from "next";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  JsonLd,
  SectionHead,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/sections";
import { BILLING_FAQ, HOME_FAQ } from "@/lib/faq";
import { absoluteUrl, pageAlternates } from "@/lib/site";

const TITLE = "よくある質問｜写真の扱い・料金・音源・商用利用";
const DESCRIPTION =
  "バズリンのよくある質問。写真の扱い、料金とお支払い、音源（楽曲）の扱い、商用利用、他人の写真の利用についてお答えします。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates("/faq"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/faq") },
};

export default function FaqPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "よくある質問", path: "/faq" },
  ];
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd(crumbs),
            faqJsonLd([...HOME_FAQ, ...BILLING_FAQ], `${absoluteUrl("/faq")}#faq`),
          ],
        }}
      />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>よくある質問</h1>
        </div>
      </section>
      <div className="shell">
        <section className="section">
          <SectionHead eyebrow="GENERAL" title="使い方・写真について" />
          <FaqList items={HOME_FAQ} />
        </section>
        <section className="section">
          <SectionHead eyebrow="BILLING" title="料金・お支払いについて" />
          <FaqList items={BILLING_FAQ} />
        </section>
      </div>
      <CtaBand />
    </main>
  );
}
