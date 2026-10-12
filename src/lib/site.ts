export const SITE = {
  name: "バズリン",
  nameRomaji: "Bazurin",
  url: "https://bazurin.com",
  tagline: "写真・画像からAI動画を生成",
  /** Shown in the spec tables. No pixel size: KIE_RESOLUTION / FAL_RESOLUTION decide it. */
  output: {
    aspectRatio: "縦型9:16",
    format: "MP4",
    lengthRange: "8〜10秒",
  },
  upload: {
    maxMb: 10,
    accept: "image/jpeg,image/png,image/webp,image/heic,image/heif",
    acceptLabel: "JPG・PNG・WebP・HEIC 対応",
  },
  /** Fill in before launch — required by 特定商取引法. */
  operator: {
    company: "【要記入】運営会社名（または個人名）",
    representative: "【要記入】運営責任者",
    address: "【要記入】所在地（請求があった場合に遅滞なく開示します）",
    phone: "【要記入】電話番号（請求があった場合に遅滞なく開示します）",
    email: "support@bazurin.com",
  },
} as const;

export const SITEMAP_IDS = ["main", "effects", "tools", "legal"] as const;

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path === "/" ? "/" : path}`;
}

/** Canonical + hreflang (ja / x-default only — single-language site). */
export function pageAlternates(path: string) {
  const url = absoluteUrl(path);
  return {
    canonical: url,
    languages: { ja: url, "x-default": url },
  };
}

export function yen(amount: number) {
  return `${amount.toLocaleString("ja-JP")}円`;
}
