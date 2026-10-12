import { imagePayloadBudget, maxImageMbLabel } from "@/lib/upload-limit";

const MAX_EDGE = 1536;

async function decode(file: File): Promise<CanvasImageSource & { width: number; height: number }> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // Fall through to <img>; Safari decodes HEIC there but not always via createImageBitmap.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return Object.assign(img, { width: img.naturalWidth, height: img.naturalHeight });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Validate, decode (incl. HEIC where the browser supports it), downscale and
 * re-encode as JPEG, then reject anything over the jobs API character budget.
 */
export async function normalizePhoto(file: File, photoCount = 1): Promise<string> {
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("画像ファイルを選んでください。");
  }

  let source: Awaited<ReturnType<typeof decode>>;
  try {
    source = await decode(file);
  } catch {
    throw new Error(
      "この写真を読み込めませんでした。HEICが開けない場合は、JPGまたはPNGに変換してお試しください。",
    );
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(source.width, source.height));
  const w = Math.round(source.width * scale);
  const h = Math.round(source.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("この端末では写真を処理できません。");
  ctx.drawImage(source, 0, 0, w, h);
  if ("close" in source && typeof source.close === "function") source.close();
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  if (dataUrl.length > imagePayloadBudget(photoCount)) {
    throw new Error(`写真のサイズは1枚あたり${maxImageMbLabel(photoCount)}MBまでです。`);
  }
  return dataUrl;
}
