/**
 * POST /api/jobs rejects when the photo data-URLs together exceed this many
 * characters (HTTP 413). Displayed sizes are derived from this check.
 * KIE's base64 upload asks files over 10MB to use the stream API; this request
 * cap is the one the client actually hits.
 */
export const MAX_JOB_IMAGE_CHARS = 8_000_000;

const JPEG_DATA_URL_PREFIX = "data:image/jpeg;base64,".length;

/** Character budget for each photo when `photoCount` photos share one request. */
export function imagePayloadBudget(photoCount = 1) {
  return Math.floor(MAX_JOB_IMAGE_CHARS / Math.max(1, photoCount));
}

/** JPEG bytes that fit in that budget, after the data-URL prefix. */
export function maxImageBytes(photoCount = 1) {
  const budget = imagePayloadBudget(photoCount) - JPEG_DATA_URL_PREFIX;
  return Math.max(0, Math.floor((budget * 3) / 4));
}

/** One decimal, floored, so the label never exceeds the jobs API budget. */
export function maxImageMbLabel(photoCount = 1) {
  const tenth = Math.floor((maxImageBytes(photoCount) / 1_000_000) * 10);
  const whole = Math.floor(tenth / 10);
  const frac = tenth % 10;
  return frac === 0 ? String(whole) : `${whole}.${frac}`;
}

/** Pages that list both 1-photo and 2-photo templates. */
export function uploadSizeCopy() {
  return `1枚の型は最大${maxImageMbLabel(1)}MB、2枚の型は1枚あたり最大${maxImageMbLabel(2)}MB`;
}
