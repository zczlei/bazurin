"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { BuyPackButton } from "@/components/BuyPackButton";
import { detectHumanFaceInBlobUrls } from "@/lib/detect-face";
import type { GeneratorEffect } from "@/lib/generator-effect";
import { normalizePhoto } from "@/lib/image-input";
import { CREDIT_PACKS } from "@/lib/packs";
import { SITE, yen } from "@/lib/site";
import { MAX_JOB_IMAGE_CHARS, maxImageMbLabel } from "@/lib/upload-limit";
import { renderStoryboard } from "@/lib/storyboard";

type Props = {
  effects: GeneratorEffect[];
  initialSlug?: string;
  /** Show the template dropdown (home / tools pages). */
  selectable?: boolean;
  heading?: string;
};

type JobStatus = "queued" | "running" | "succeeded" | "failed";

const STASH_KEY = "bazurin:draft";

export const CREDITS_EVENT = "bazurin:credits";

function emitCredits(credits: number) {
  window.dispatchEvent(new CustomEvent(CREDITS_EVENT, { detail: credits }));
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function VideoGenerator({ effects, initialSlug, selectable, heading }: Props) {
  const { data: session } = useSession();
  const [slug, setSlug] = useState(initialSlug || effects[0].slug);
  const effect = useMemo(
    () => effects.find((e) => e.slug === slug) || effects[0],
    [effects, slug],
  );
  const [templateId, setTemplateId] = useState(effect.templates[0].id);
  const template = effect.templates.find((t) => t.id === templateId) || effect.templates[0];

  const [photos, setPhotos] = useState<(string | null)[]>([null, null]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [storyboard, setStoryboard] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [needCredits, setNeedCredits] = useState(false);
  const pollCancel = useRef(false);

  const activePhotos = photos.slice(0, effect.subjects);
  const ready = activePhotos.every(Boolean);

  const refreshWallet = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet", { cache: "no-store" });
      const data = await res.json();
      if (typeof data.credits === "number") {
        setCredits(data.credits);
        emitCredits(data.credits);
      }
      setGoogleReady(Boolean(data.googleReady));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await refreshWallet();
      try {
        const raw = sessionStorage.getItem(STASH_KEY);
        if (!raw) return;
        sessionStorage.removeItem(STASH_KEY);
        const draft = JSON.parse(raw) as {
          slug: string;
          templateId: string;
          photos: (string | null)[];
        };
        if (effects.some((e) => e.slug === draft.slug)) {
          setSlug(draft.slug);
          setTemplateId(draft.templateId);
          setPhotos(draft.photos);
          setNote("購入前に選んだ写真を復元しました。");
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      pollCancel.current = true;
    };
  }, [effects, refreshWallet]);

  useEffect(() => {
    if (!loading) return;
    const started = Date.now();
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(t);
  }, [loading]);

  function resetOutput() {
    setStoryboard(null);
    setVideoUrl(null);
    setJobStatus(null);
    setError(null);
  }

  function onSelectEffect(nextSlug: string) {
    const next = effects.find((e) => e.slug === nextSlug);
    if (!next) return;
    setSlug(next.slug);
    setTemplateId(next.templates[0].id);
    resetOutput();
    setNote(null);
  }

  async function onPick(index: number, file: File | undefined | null) {
    if (!file) return;
    setError(null);
    try {
      const dataUrl = await normalizePhoto(file, effect.subjects);
      setPhotos((prev) => {
        const next = [...prev];
        next[index] = dataUrl;
        return next;
      });
      resetOutput();
    } catch (e) {
      setError(e instanceof Error ? e.message : "写真を読み込めませんでした。");
    }
  }

  function onRemove(index: number) {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    resetOutput();
  }

  async function onPreview() {
    setError(null);
    if (!ready) {
      setError(
        effect.subjects === 2
          ? "写真を2枚選んでください（左の人・右の人）。"
          : "写真を1枚選んでください。",
      );
      return;
    }
    setPreviewing(true);
    try {
      const url = await renderStoryboard({
        scene: effect.scene,
        photos: activePhotos as string[],
        templateName: template.name,
        durationSec: effect.durationSec,
      });
      setStoryboard(url);
      setVideoUrl(null);
      setNote("配置プレビューができました。クレジットは使っていません。");
    } catch (e) {
      setError(e instanceof Error ? e.message : "プレビューを作れませんでした。");
    } finally {
      setPreviewing(false);
    }
  }

  function stashDraft() {
    try {
      sessionStorage.setItem(
        STASH_KEY,
        JSON.stringify({ slug: effect.slug, templateId: template.id, photos }),
      );
    } catch {
      // Storage full or disabled — the purchase still works.
    }
  }

  async function pollUntilDone(jobId: string) {
    for (let i = 0; i < 120; i++) {
      if (pollCancel.current) return;
      await sleep(i === 0 ? 1500 : 4000);
      const res = await fetch(`/api/jobs/${jobId}`, { cache: "no-store" });
      const data = await res.json();
      if (typeof data.credits === "number") {
        setCredits(data.credits);
        emitCredits(data.credits);
      }
      if (!res.ok) throw new Error(data.message || "生成状況を確認できませんでした。");

      const status = data.status as JobStatus;
      setJobStatus(status);
      if (status === "succeeded") {
        setVideoUrl(data.videoUrl || null);
        setNote(
          data.message?.startsWith("デモ")
            ? data.message
            : "動画が完成しました。下のボタンから保存できます。",
        );
        return;
      }
      if (status === "failed") throw new Error(data.message || "生成に失敗しました。");
    }
    throw new Error(
      "生成に時間がかかっています。しばらくしてからページを再読み込みしてください。",
    );
  }

  async function onGenerate() {
    setError(null);
    setNeedCredits(false);
    if (!ready) {
      await onPreview();
      return;
    }
    if (credits !== null && credits < 1) {
      setNeedCredits(true);
      return;
    }

    pollCancel.current = false;
    setLoading(true);
    setElapsed(0);
    setVideoUrl(null);
    setJobStatus("queued");
    setNote(null);
    try {
      const imageUrls = activePhotos as string[];
      const totalChars = imageUrls.reduce((n, u) => n + u.length, 0);
      if (totalChars > MAX_JOB_IMAGE_CHARS) {
        throw new Error(
          `写真のサイズが大きすぎます。1枚あたり最大${maxImageMbLabel(effect.subjects)}MBまでです。`,
        );
      }
      const hasHumanFace = await detectHumanFaceInBlobUrls(imageUrls);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          effectSlug: effect.slug,
          templateId: template.id,
          imageUrls,
          hasHumanFace,
        }),
      });
      const data = await res.json();
      if (typeof data.credits === "number") {
        setCredits(data.credits);
        emitCredits(data.credits);
      }
      if (!res.ok) {
        if (data.code === "NO_CREDITS" || res.status === 402) {
          setNeedCredits(true);
          setJobStatus(null);
          return;
        }
        throw new Error(data.message || data.error || "生成を開始できませんでした。");
      }
      setJobStatus((data.status as JobStatus) || "queued");
      await pollUntilDone(data.id as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "生成に失敗しました。");
      setJobStatus("failed");
    } finally {
      setLoading(false);
    }
  }

  const style = {
    ["--fx" as string]: effect.accent,
    ["--fx2" as string]: effect.accent2,
  };

  const statusText =
    jobStatus === "queued" ? "順番待ちです" : jobStatus === "running" ? "動画を生成中です" : "準備中です";

  return (
    <section className="generator" style={style} id="generator">
      <div className="generator-grid">
        <div className="gen-panel">
          <h2 className="gen-title">{heading || "写真を選んでプレビュー"}</h2>

          {selectable ? (
            <label className="field">
              <span className="field-label">テンプレート</span>
              <select
                className="select"
                value={effect.slug}
                onChange={(e) => onSelectEffect(e.target.value)}
              >
                {effects.map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {e.name}（写真{e.subjects}枚）
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {effect.templates.length > 1 ? (
            <div className="field">
              <span className="field-label">スタイル</span>
              <div className="chip-row" role="radiogroup" aria-label="スタイル">
                {effect.templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={t.id === template.id}
                    className={t.id === template.id ? "chip active" : "chip"}
                    onClick={() => {
                      setTemplateId(t.id);
                      setStoryboard(null);
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <p className="field-hint">{template.blurb}</p>
            </div>
          ) : null}

          <div className={effect.subjects === 2 ? "drop-row two" : "drop-row"}>
            {Array.from({ length: effect.subjects }).map((_, i) => (
              <div
                key={i}
                className={dragIndex === i ? "dropzone dragging" : "dropzone"}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragIndex(i);
                }}
                onDragLeave={() => setDragIndex(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragIndex(null);
                  onPick(i, e.dataTransfer.files?.[0]);
                }}
              >
                {photos[i] ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photos[i]!} alt={`選択した写真${i + 1}`} />
                    <button
                      type="button"
                      className="drop-remove"
                      aria-label="写真を外す"
                      onClick={() => onRemove(i)}
                    >
                      ×
                    </button>
                    {effect.subjects === 2 ? (
                      <span className="drop-tag">{i === 0 ? "左" : "右"}</span>
                    ) : null}
                  </>
                ) : (
                  <label className="drop-empty">
                    <span className="drop-icon" aria-hidden>
                      +
                    </span>
                    <strong>
                      {effect.subjects === 2 ? (i === 0 ? "左の人" : "右の人") : (effect.slotLabel ?? "写真を選ぶ")}
                    </strong>
                    <span>ドラッグ＆ドロップ、またはタップして写真を選ぶ</span>
                    <input
                      type="file"
                      accept={SITE.upload.accept}
                      onChange={(e) => {
                        onPick(i, e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          <ul className="gen-hints">
            <li>
              {SITE.upload.acceptLabel}／1枚あたり最大 {maxImageMbLabel(effect.subjects)}MB
            </li>
            {effect.subjects === 2 ? (
              <li>{effect.name} の場合は、写真2枚をご用意ください。</li>
            ) : null}
            <li>
              {effect.uploadHint ?? "顔と上半身がはっきり写っている写真ほど、仕上がりが良くなります。"}
            </li>
          </ul>

          <div className="gen-actions">
            {storyboard && !videoUrl ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  onClick={onGenerate}
                >
                  {loading
                    ? `${statusText}…`
                    : `この配置で書き出す（1クレジット・${effect.durationSec}秒）`}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={loading || previewing}
                  onClick={onPreview}
                >
                  もう一度プレビュー
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                disabled={previewing || loading}
                onClick={onPreview}
              >
                {previewing ? "プレビューを作成中…" : "配置をプレビューする（無料）"}
              </button>
            )}
          </div>

          <p className="gen-credits">
            残りクレジット：
            <strong>{credits === null ? "…" : `${credits}本`}</strong>
            {googleReady && !session?.user ? (
              <>
                {" ・ "}
                <button type="button" className="link-btn" onClick={() => signIn("google")}>
                  Googleでログインすると別の端末でも使えます
                </button>
              </>
            ) : null}
          </p>

          {needCredits ? (
            <div className="gen-buy">
              <p className="gen-buy-title">書き出しにはクレジットが必要です</p>
              <p className="muted small">
                配置プレビューは何度でも無料です。月額課金はありません。
              </p>
              <div className="gen-buy-grid">
                {CREDIT_PACKS.map((p) => (
                  <BuyPackButton
                    key={p.id}
                    packId={p.id}
                    className={p.badge ? "btn btn-primary btn-block" : "btn btn-outline btn-block"}
                    label={`${p.label} ${yen(p.priceJpy)}`}
                    onBeforeRedirect={stashDraft}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {error ? <p className="form-error">{error}</p> : null}
          {note && !error ? <p className="form-note">{note}</p> : null}

          <p className="gen-trust">
            写真は生成にのみ使用し、一定期間後に自動削除されます。第三者への提供は行っていません。
          </p>
        </div>

        <div className="gen-stage-wrap">
          <div className="phone">
            <div className="phone-screen">
              {videoUrl ? (
                <video src={videoUrl} controls playsInline autoPlay loop muted />
              ) : storyboard ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storyboard} alt={`${effect.name} の無料配置プレビュー`} />
              ) : (
                <div className="phone-empty">
                  <span className="phone-empty-badge">9:16</span>
                  <p>
                    {effect.subjects === 2
                      ? "写真を2枚選ぶと、左右の立ち位置をここで確認できます。"
                      : "写真を選ぶと、仕上がりの配置をここで確認できます。"}
                  </p>
                  <small>プレビューは無料・会員登録不要</small>
                </div>
              )}
              {loading ? (
                <div className="phone-progress">
                  <div className="spinner" aria-hidden />
                  <p>{statusText}</p>
                  <small>
                    {elapsed}秒経過・通常数分で完成します
                    <br />
                    このページを開いたままお待ちください
                  </small>
                </div>
              ) : null}
            </div>
          </div>
          {videoUrl ? (
            <div className="stage-actions">
              <a className="btn btn-primary" href={videoUrl} target="_blank" rel="noopener noreferrer">
                動画を保存する
              </a>
              <p className="muted small">
                iPhoneは開いた動画の共有ボタンから「ビデオを保存」を選んでください。音源は付属しません。
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
