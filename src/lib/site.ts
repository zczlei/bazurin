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
    accept: "image/jpeg,image/png,image/webp,image/heic,image/heif",
    acceptLabel: "JPG・PNG・WebP・HEIC 対応",
  },
  /** Fill in before launch — required by 特定商取引法. */
  operator: {
    company: "Raymond Zhao",
    representative: "Raymond Zhao",
    address: "請求があった場合、遅滞なく開示します。",
    phone: "請求があった場合、遅滞なく開示します。",
    email: "metabrowser1@gmail.com",
  },
} as const;

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
