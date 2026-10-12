import { NextResponse } from "next/server";
import { getEffect } from "@/lib/effects";
import { MAX_JOB_IMAGE_CHARS, maxImageMbLabel } from "@/lib/upload-limit";
import { createJob, publicJobView } from "@/lib/jobs";
import { submitVideoJob } from "@/lib/video-provider";
import {
  consumeCredit,
  getOrCreateWalletId,
  getWalletBalance,
  refundCredit,
} from "@/lib/wallet";

type Body = {
  effectSlug?: string;
  templateId?: string;
  imageUrls?: string[];
  /** From client FaceDetector; used when VIDEO_PROVIDER=auto */
  hasHumanFace?: boolean | null;
};

/**
 * Create a generation job and return immediately.
 * Client should poll GET /api/jobs/[id].
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const effect = body.effectSlug ? getEffect(body.effectSlug) : undefined;
  if (!effect) {
    return NextResponse.json({ error: "Unknown effect slug" }, { status: 404 });
  }

  const template =
    effect.templates.find((t) => t.id === body.templateId) ||
    effect.templates[0];

  const imageUrls = (body.imageUrls || []).filter(Boolean);
  if (imageUrls.length < effect.subjects) {
    return NextResponse.json(
      {
        error: `このテンプレートには写真が${effect.subjects}枚必要です。`,
      },
      { status: 400 },
    );
  }

  const totalChars = imageUrls.reduce((n, u) => n + u.length, 0);
  if (totalChars > MAX_JOB_IMAGE_CHARS) {
    return NextResponse.json(
      {
        error: `写真のサイズが大きすぎます。1枚あたり最大${maxImageMbLabel(effect.subjects)}MBまでです。`,
      },
      { status: 413 },
    );
  }

  const walletId = await getOrCreateWalletId();
  const spent = await consumeCredit(walletId);
  if (!spent.ok) {
    return NextResponse.json(
      {
        error: "No credits left",
        message: "クレジットが足りません。書き出すにはクレジットをご購入ください。",
        credits: spent.credits,
        code: "NO_CREDITS",
      },
      { status: 402 },
    );
  }

  try {
    const submitted = await submitVideoJob({
      effectSlug: effect.slug,
      templateId: template.id,
      promptHint: template.promptHint,
      imageUrls: imageUrls.slice(0, effect.subjects),
      aspectRatio: effect.aspectRatio,
      durationSec: effect.durationSec,
      hasHumanFace:
        typeof body.hasHumanFace === "boolean" ? body.hasHumanFace : null,
    });

    const job = await createJob({
      walletId,
      provider: submitted.provider,
      providerJobId: submitted.providerJobId,
      status: "queued",
      effectSlug: effect.slug,
      templateId: template.id,
      falStatusUrl: submitted.falStatusUrl,
      falResponseUrl: submitted.falResponseUrl,
      demoReadyAt: submitted.demoReadyAt,
      message: "生成を受け付けました。",
    });

    return NextResponse.json(
      {
        ...publicJobView(job),
        credits: spent.credits,
        routedProvider: submitted.provider,
      },
      { status: 202 },
    );
  } catch (e) {
    console.error("[jobs] submit failed", e);
    const credits = await refundCredit(walletId);
    return NextResponse.json(
      {
        error: "Submit failed",
        message: "生成を開始できませんでした。クレジットは返却しました。",
        credits,
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  const walletId = await getOrCreateWalletId();
  const credits = await getWalletBalance(walletId);
  return NextResponse.json({
    ok: true,
    hint: "POST to create a job, then GET /api/jobs/[id] to poll.",
    credits,
  });
}
