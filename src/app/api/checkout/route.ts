import { NextResponse } from "next/server";
import { getPack } from "@/lib/packs";
import { STRIPE_PROJECT, getAppUrl, getStripe, isStripeConfigured } from "@/lib/stripe";
import { getOrCreateWalletId } from "@/lib/wallet";

type Body = {
  packId?: string;
  /** Path to return to after checkout, e.g. /effects/hotel-lobby */
  returnPath?: string;
};

function safeReturnPath(path?: string) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path.split("#")[0];
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "決済の設定が完了していません。しばらくしてからお試しください。" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const pack = body.packId ? getPack(body.packId) : undefined;
  if (!pack) {
    return NextResponse.json({ error: "Unknown pack" }, { status: 400 });
  }

  const walletId = await getOrCreateWalletId();
  const appUrl = getAppUrl();
  const returnPath = safeReturnPath(body.returnPath);
  // Keep {CHECKOUT_SESSION_ID} literal — Stripe replaces it; do not URL-encode braces.
  const successUrl = `${appUrl}/billing/success?return=${encodeURIComponent(returnPath)}&session_id={CHECKOUT_SESSION_ID}`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "ja",
      success_url: successUrl,
      cancel_url: `${appUrl}${returnPath}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "jpy",
            // JPY is a zero-decimal currency: unit_amount is whole yen.
            unit_amount: pack.priceJpy,
            product_data: {
              name: `バズリン ${pack.label}（動画${pack.videos}本分のクレジット）`,
              description: pack.features.join("・"),
            },
          },
        },
      ],
      metadata: {
        project: STRIPE_PROJECT,
        walletId,
        packId: pack.id,
        videos: String(pack.videos),
      },
      client_reference_id: walletId,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "決済ページを開けませんでした。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
