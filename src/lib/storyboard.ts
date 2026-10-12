import type { EffectScene } from "@/lib/effects";

/** Client-side framing preview (zero server cost, never hits the generate pipeline). */

const FONT = `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", sans-serif`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("写真を読み込めませんでした"));
    img.src = src;
  });
}

/** object-fit: cover into a rounded rect, biased toward the top (faces). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) * 0.25;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function glow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function linearBg(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  stops: string[],
) {
  const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
  stops.forEach((c, i) => bg.addColorStop(i / (stops.length - 1), c));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
}

function paintBackground(
  ctx: CanvasRenderingContext2D,
  scene: EffectScene,
  W: number,
  H: number,
) {
  const rand = seeded(47);
  switch (scene) {
    case "booth": {
      linearBg(ctx, W, H, ["#ff8a3a", "#ff5d17", "#e2460f", "#b43306"]);
      glow(ctx, W / 2, H * 0.4, H * 0.55, "rgba(255,210,140,0.28)");
      ctx.strokeStyle = "rgba(90,28,6,0.25)";
      ctx.lineWidth = 4;
      for (const x of [W * 0.22, W * 0.5, W * 0.78]) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      break;
    }
    case "party": {
      linearBg(ctx, W, H, ["#2b1a0c", "#4a2c12", "#2a170a", "#140b05"]);
      for (const [x, y] of [
        [W * 0.25, H * 0.1],
        [W * 0.72, H * 0.08],
      ]) {
        glow(ctx, x, y, 220, "rgba(255,206,120,0.55)");
        ctx.fillStyle = "rgba(255,236,190,0.9)";
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(x + Math.cos(a) * 46, y + 30 + Math.sin(a) * 16, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (let i = 0; i < 40; i++) {
        glow(ctx, rand() * W, H * 0.3 + rand() * H * 0.6, 10 + rand() * 30, "rgba(255,190,90,0.25)");
      }
      break;
    }
    case "redroom": {
      linearBg(ctx, W, H, ["#3a0410", "#7a0a1f", "#4a0613", "#1a0207"]);
      glow(ctx, W / 2, H * 0.3, H * 0.5, "rgba(255,40,70,0.45)");
      ctx.fillStyle = "rgba(10,0,3,0.85)";
      for (let i = 0; i < 9; i++) {
        const x = (i / 8) * W + (rand() - 0.5) * 40;
        const y = H * 0.83 + rand() * 40;
        ctx.beginPath();
        ctx.ellipse(x, y, 52, 70, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y - 92, 30, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 6; i++) {
        const x = 40 + rand() * (W - 80);
        const y = H * 0.68 + rand() * 60;
        glow(ctx, x, y, 26, "rgba(255,255,255,0.7)");
      }
      break;
    }
    case "rain": {
      linearBg(ctx, W, H, ["#0a1430", "#13204a", "#0b1533", "#05091a"]);
      glow(ctx, W * 0.15, H * 0.35, 260, "rgba(255,60,170,0.35)");
      glow(ctx, W * 0.88, H * 0.25, 300, "rgba(40,180,255,0.4)");
      glow(ctx, W / 2, H * 0.95, 380, "rgba(120,90,255,0.3)");
      break;
    }
    case "zombie": {
      linearBg(ctx, W, H, ["#0d1a12", "#1c2e1f", "#121f15", "#060b07"]);
      glow(ctx, W / 2, H * 0.25, H * 0.5, "rgba(140,255,110,0.18)");
      break;
    }
    case "pet": {
      linearBg(ctx, W, H, ["#e7f8ee", "#8ed9a8", "#2f9a58", "#146b38"]);
      glow(ctx, W / 2, H * 0.28, H * 0.4, "rgba(255,255,255,0.35)");
      break;
    }
  }
}

function paintForeground(
  ctx: CanvasRenderingContext2D,
  scene: EffectScene,
  W: number,
  H: number,
) {
  const rand = seeded(9);
  if (scene === "booth") {
    const cx = W / 2;
    const micY = 210;
    ctx.strokeStyle = "rgba(20,10,4,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, micY);
    ctx.stroke();
    const grad = ctx.createLinearGradient(cx - 18, micY, cx + 18, micY);
    grad.addColorStop(0, "#2a221c");
    grad.addColorStop(0.5, "#8a7a6c");
    grad.addColorStop(1, "#2a221c");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(cx - 18, micY, 36, 72, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,240,220,0.35)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 12, micY + 12 + i * 7);
      ctx.lineTo(cx + 12, micY + 12 + i * 7);
      ctx.stroke();
    }
  }
  if (scene === "rain") {
    ctx.strokeStyle = "rgba(200,225,255,0.35)";
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 260; i++) {
      const x = rand() * W;
      const y = rand() * H;
      const len = 18 + rand() * 30;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - len * 0.18, y + len);
      ctx.stroke();
    }
  }
  if (scene === "pet") {
    ctx.fillStyle = "rgba(20,80,40,0.18)";
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.9, W * 0.34, H * 0.035, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (scene === "zombie") {
    for (let i = 0; i < 8; i++) {
      glow(ctx, rand() * W, H * 0.75 + rand() * H * 0.25, 220, "rgba(170,200,170,0.16)");
    }
    const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.7);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(0,0,0,0.6)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, W, H);
  }
  if (scene === "redroom") {
    ctx.fillStyle = "rgba(255,30,60,0.08)";
    ctx.fillRect(0, 0, W, H);
  }
}

function pill(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  size: number,
) {
  ctx.font = `700 ${size}px ${FONT}`;
  const w = ctx.measureText(text).width + size * 1.6;
  const h = size * 1.9;
  ctx.fillStyle = "rgba(10,8,20,0.62)";
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, cx, cy + 1);
}

export async function renderStoryboard(opts: {
  scene: EffectScene;
  photos: string[];
  templateName: string;
  durationSec: number;
}): Promise<string> {
  const W = 720;
  const H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("この端末ではプレビューを表示できません");

  const images = await Promise.all(opts.photos.map(loadImage));
  paintBackground(ctx, opts.scene, W, H);

  const slots =
    images.length === 2
      ? [
          { x: 52, y: 330, w: 296, h: 620 },
          { x: 372, y: 330, w: 296, h: 620 },
        ]
      : [{ x: 120, y: 260, w: 480, h: 740 }];

  slots.forEach((s, i) => {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 40;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.roundRect(s.x, s.y, s.w, s.h, 28);
    ctx.fill();
    ctx.restore();
    drawCover(ctx, images[i], s.x, s.y, s.w, s.h, 28);
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(s.x, s.y, s.w, s.h, 28);
    ctx.stroke();
  });

  paintForeground(ctx, opts.scene, W, H);

  if (images.length === 2) {
    pill(ctx, "左", slots[0].x + slots[0].w / 2, slots[0].y + slots[0].h + 44, 26);
    pill(ctx, "右", slots[1].x + slots[1].w / 2, slots[1].y + slots[1].h + 44, 26);
  }

  pill(ctx, "無料の配置プレビュー（完成動画ではありません）", W / 2, 150, 22);
  pill(ctx, `${opts.templateName}・9:16・${opts.durationSec}秒`, W / 2, H - 90, 24);

  return canvas.toDataURL("image/jpeg", 0.9);
}
