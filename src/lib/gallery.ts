export type GalleryItem = {
  effectSlug: string;
  /** Path under /public, e.g. /samples/hotel-lobby-01.mp4 */
  video: string;
  poster: string;
  alt: string;
  photos: 1 | 2;
};

/**
 * Real outputs only — never put mock-ups here. Each item is rendered as a
 * playable 作例 card on the home page and effect pages.
 */
export const GALLERY: GalleryItem[] = [];

export type FailureCase = {
  title: string;
  cause: string;
  fix: string;
};

export const FAILURE_CASES: FailureCase[] = [
  {
    title: "顔が別人のようになる",
    cause: "サングラス・マスク・前髪で目元が隠れている、または真横を向いた写真。",
    fix: "正面か斜め45度で、目元がはっきり見える写真に替えると改善します。",
  },
  {
    title: "違う人が動いてしまう",
    cause: "集合写真や2人が一緒に写った写真をそのまま使った。",
    fix: "1枚に1人だけが写った写真をご用意ください。デュエットは写真を2枚に分けます。",
  },
  {
    title: "2人の大きさがちぐはぐ",
    cause: "片方が全身、片方が顔のアップなど、写り方がそろっていない。",
    fix: "どちらも胸から上の写真にそろえると、自然なデュエットになります。",
  },
  {
    title: "肌や服の色が不自然",
    cause: "暗い室内やフィルターの強い写真で、元の色がわかりにくい。",
    fix: "明るい場所で撮った、加工の少ない写真がおすすめです。",
  },
  {
    title: "手や指の形が崩れる",
    cause: "動きの大きいテンプレートで、手が顔の前にある写真を使った。",
    fix: "手が顔にかかっていない写真を選ぶと安定します。",
  },
  {
    title: "服装が変わってしまう",
    cause: "顔のアップだけの写真で、体の部分をAIが補完した。",
    fix: "服装まで再現したいときは、上半身〜全身が写った写真を使ってください。",
  },
];
