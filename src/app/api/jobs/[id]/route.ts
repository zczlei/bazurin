import { NextResponse } from "next/server";
import { getJob, publicJobView, saveJob } from "@/lib/jobs";
import { pollVideoJob } from "@/lib/video-provider";
import { getWalletBalance, refundCredit } from "@/lib/wallet";

type Ctx = { params: Promise<{ id: string }> };

/**
 * Poll one generation job. Short request — safe for Cloudflare Workers.
 */
export async function GET(_request: Request, context: Ctx) {
  const { id } = await context.params;
  const job = await getJob(id);
  if (!job) {
    return NextResponse.json({ error: "Job not found", message: "生成ジョブが見つかりません。" }, { status: 404 });
  }

  if (job.status === "succeeded" || job.status === "failed") {
    const credits = await getWalletBalance(job.walletId);
    return NextResponse.json({ ...publicJobView(job), credits });
  }

  try {
    const poll = await pollVideoJob({
      provider: job.provider,
      providerJobId: job.providerJobId,
      falStatusUrl: job.falStatusUrl,
      falResponseUrl: job.falResponseUrl,
      demoReadyAt: job.demoReadyAt,
    });

    if (poll.status === "succeeded") {
      job.status = "succeeded";
      job.videoUrl = poll.videoUrl;
      job.message = poll.message || "動画が完成しました。";
      await saveJob(job);
    } else if (poll.status === "failed") {
      job.status = "failed";
      console.error("[jobs] provider failed", job.id, poll.message);
      job.message = "生成に失敗しました。";
      if (!job.creditRefunded) {
        await refundCredit(job.walletId);
        job.creditRefunded = true;
        job.message = `${job.message}クレジットは返却しました。`;
      }
      await saveJob(job);
    } else {
      job.status = poll.status;
      job.message =
        poll.status === "queued" ? "順番待ちです…" : "生成中です…";
      await saveJob(job);
    }
  } catch (e) {
    console.error("[jobs] poll failed", job.id, e);
    job.status = "failed";
    job.message = "生成に失敗しました。クレジットは返却しました。";
    if (!job.creditRefunded) {
      await refundCredit(job.walletId);
      job.creditRefunded = true;
    }
    await saveJob(job);
  }

  const credits = await getWalletBalance(job.walletId);
  return NextResponse.json({ ...publicJobView(job), credits });
}
