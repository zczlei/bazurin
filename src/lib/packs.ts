export type CreditPack = {
  id: string;
  videos: number;
  /** Tax-included JPY. JPY is zero-decimal in Stripe, so this is also unit_amount. */
  priceJpy: number;
  label: string;
  badge?: string;
  features: string[];
};

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "single",
    videos: 1,
    priceJpy: 980,
    label: "1本",
    features: ["書き出し1回分", "透かしなし"],
  },
  {
    id: "three",
    videos: 3,
    priceJpy: 2480,
    label: "3本パック",
    badge: "いちばん選ばれています",
    features: ["書き出し3回分", "失敗分はもう1回作り直せます"],
  },
  {
    id: "creator",
    videos: 10,
    priceJpy: 5980,
    label: "Creator Pack",
    features: ["書き出し10回分", "1本あたりがいちばんお得", "クレジットに有効期限なし"],
  },
];

export const LOWEST_PRICE_JPY = Math.min(...CREDIT_PACKS.map((p) => p.priceJpy));

export function getPack(packId: string) {
  return CREDIT_PACKS.find((p) => p.id === packId);
}

export function perVideoJpy(pack: CreditPack) {
  return Math.round(pack.priceJpy / pack.videos);
}
