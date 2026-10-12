import type { Metadata } from "next";
import Link from "next/link";
import { PricingSection } from "@/components/PricingSection";
import {
  Breadcrumbs,
  FaqList,
  JsonLd,
  SectionHead,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/sections";
import { BILLING_FAQ } from "@/lib/faq";
import { LOWEST_PRICE_JPY } from "@/lib/packs";
import { absoluteUrl, pageAlternates, yen } from "@/lib/site";

const TITLE = "料金｜AI動画は1本から都度課金、月額なし";
const DESCRIPTION = `バズリンの料金案内。AI動画の書き出しは1本${yen(LOWEST_PRICE_JPY)}（税込）からの都度課金で、月額課金・会員登録は不要です。配置プレビューは何度でも無料。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates("/pricing"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/pricing") },
};

export default function PricingPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "料金", path: "/pricing" },
  ];
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbJsonLd(crumbs), faqJsonLd(BILLING_FAQ, `${absoluteUrl("/pricing")}#faq`)],
        }}
      />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>料金</h1>
          <p className="hero-lede">
            配置のプレビューは何度でも無料。納得できた動画だけ、1本から書き出せます。
          </p>
        </div>
      </section>
      <div className="shell">
        <PricingSection returnPath="/" />
        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="お支払いについて" />
          <FaqList items={BILLING_FAQ} />
          <p className="fine">
            販売条件の詳細は<Link href="/legal/tokushoho">特定商取引法に基づく表記</Link>をご確認ください。
          </p>
        </section>
      </div>
    </main>
  );
}
