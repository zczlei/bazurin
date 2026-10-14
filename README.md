# バズリン（bazurin.com）— 日本市场 AI 趋势视频站

架构沿用 DuetBooth：Next.js（App Router）+ OpenNext 部署到 Cloudflare Workers + KV，Google 登录（Auth.js），Stripe 日元按次收款。
全站日文、竖版 9:16 优先；一个趋势词一个内页，新增趋势只改配置。

## 页面

| 路径 | 内容 |
|------|------|
| `/` | 首页（Hero、生成器、作例、3 步、模板、规格、FAQ、料金） |
| `/effects/[slug]` | 趋势模板页：`hotel-lobby` / `bulin-47` / `burning-bridges` / `rain-dance` / `zombie-trend` |
| `/templates`、`/trends` | 模板一览、本周趋势 |
| `/tools/[slug]` | 功能词页：`image-to-video` / `photo-to-video` / `dance-video` / `animate-photo` |
| `/gallery`、`/pricing`、`/faq` | 作例（含失败例）、料金、FAQ |
| `/legal/[slug]` | `tokushoho`（特商法）/ `privacy` / `terms` / `company` |
| `/sitemap.xml` | 站点地图（`robots.txt` 已列出） |

## 本地启动

```bash
pnpm install
pnpm dev   # http://localhost:3006
```

`VIDEO_PROVIDER=demo` 时返回示例视频，可不接上游跑通流程。

## 内容配置（改这里，不用新建路由）

| 文件 | 内容 |
|------|------|
| `src/lib/site.ts` | 站名、输出规格、上传限制、**特商法运营者信息（上线前必填）** |
| `src/lib/effects.ts` | 趋势页全部文案、风格（`templates[].promptHint` 发给视频模型）、FAQ、规格追加行 |
| `src/lib/packs.ts` | 价格：1 本 ¥780 / 3 本 ¥1,980 / Creator Pack 10 本 ¥4,880 |
| `src/lib/gallery.ts` | 作例（只放真实成片）与失败例 |
| `src/lib/tools.ts`、`src/lib/faq.ts`、`src/lib/legal.ts` | 功能页、FAQ、法务页 |

新增趋势：在 `EFFECTS` 里加一条 `EffectDefinition`，首页卡片、模板页、导航、sitemap 会自动出现。

## 生成流程（异步）

1. `POST /api/jobs` — 扣 1 credit，提交上游任务，立即返回 `{ id, status }`
2. `GET /api/jobs/{id}` — 轮询上游；成功返回 `videoUrl`，失败自动退 credit

免费「配置预览」在浏览器内用 canvas 生成（`src/lib/storyboard.ts`），不调用上游、不扣 credit。

Provider：`VIDEO_PROVIDER=kie | ark | fal | auto | demo`；`auto` 为浏览器检测到人脸走 kie、否则走 ark。
输出分辨率由 `KIE_RESOLUTION` / `FAL_RESOLUTION` 决定（当前 480p），页面规格表不写像素数。

## Stripe（日元）

- Checkout 用 `currency: "jpy"`（零小数币种，金额即日元整数）、`locale: "ja"`
- metadata `project: "bazurin"`；webhook 与 `/api/billing/confirm` 都校验，避免与 DuetBooth 共用 Stripe 账号时串单
- 钱包存 KV（绑定 `BAZURIN_KV`，本地回退 `data/kv/*.json`），游客 cookie `bazurin_wallet`

本地 webhook：

```bash
stripe listen --forward-to localhost:3006/api/webhook/stripe
```

## Google 登录

OAuth 客户端的重定向 URI 需添加：

- `http://localhost:3006/api/auth/callback/google`
- `https://bazurin.com/api/auth/callback/google`

登录时把当前浏览器的游客 credit 合并进账号。

## 部署（Cloudflare Workers）

见 `.cursor/rules/cloudflare-deploy-checklist.mdc` 与 [`docs/github-cloudflare-cd.md`](docs/github-cloudflare-cd.md)。

```bash
pnpm deploy   # scripts/cf-deploy.sh：临时移开 .env.local，避免烤进产物
```

业务密钥只放 Cloudflare Worker Secrets（`--name bazurin`），不要 commit `.env.local`。

## 技术栈

Next.js 16 · React 19 · TypeScript · OpenNext Cloudflare · Auth.js · Stripe Checkout · KV
