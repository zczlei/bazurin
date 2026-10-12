import { BuyPackButton } from "@/components/BuyPackButton";
import { SectionHead } from "@/components/sections";
import { CREDIT_PACKS, perVideoJpy } from "@/lib/packs";
import { yen } from "@/lib/site";

type Props = {
  returnPath?: string;
};

export function PricingSection({ returnPath }: Props) {
  return (
    <section className="section" id="pricing">
      <SectionHead
        eyebrow="PRICE"
        title="料金"
        lede="月額課金はありません。必要な本数だけお買い求めください。"
      />
      <div className="price-grid">
        {CREDIT_PACKS.map((pack) => (
          <article key={pack.id} className={pack.badge ? "price-card featured" : "price-card"}>
            {pack.badge ? <span className="price-badge">{pack.badge}</span> : null}
            <h3>{pack.label}</h3>
            <p className="price">
              <span className="price-num">{pack.priceJpy.toLocaleString("ja-JP")}</span>
              <span className="price-unit">円（税込）</span>
            </p>
            <p className="price-per">
              {pack.videos > 1 ? `※1本あたり約${yen(perVideoJpy(pack))}` : "\u00a0"}
            </p>
            <ul className="price-features">
              {pack.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <BuyPackButton
              packId={pack.id}
              returnPath={returnPath}
              label={`${pack.label}を購入する`}
              className={pack.badge ? "btn btn-primary btn-block" : "btn btn-outline btn-block"}
            />
          </article>
        ))}
      </div>
      <p className="price-foot">
        プレビュー（配置の確認）は何度でも無料です。生成に失敗した場合、クレジットは自動で返却されます。
      </p>
    </section>
  );
}
