# GitHub → Cloudflare 持续部署（バズリン）

推荐 **GitHub Actions**（`.github/workflows/` 已配好）；也可在 Dashboard 接 **Workers Builds**，两者只开一个，避免重复部署。

## A. GitHub Actions

1. push / merge 到 `main`
2. `.github/workflows/deploy.yml`：`pnpm install` → `opennextjs-cloudflare build` → `deploy --keep-vars`
3. Worker 名：`bazurin`（见 `wrangler.jsonc`）

PR / 非 main 分支跑 `.github/workflows/ci.yml`（只 build，不部署）。

### 仓库 Secrets（Settings → Secrets and variables → Actions）

| Secret | 说明 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | 权限至少含 Workers Scripts Edit（模板「Edit Cloudflare Workers」） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID |

业务密钥（`VIDEO_PROVIDER`、`KIE_*`、`ARK_*`、`FAL_*`、`STRIPE_*`、`AUTH_*`、`APP_URL` 等）只放 Cloudflare Worker Secrets；`--keep-vars` 不会覆盖它们。

构建时注入的公开变量：`NEXT_PUBLIC_APP_URL=https://bazurin.com`（workflow 与 `.env.production`）。

### 本机紧急热修

```bash
pnpm deploy   # scripts/cf-deploy.sh，会临时移开 .env.local
```

## B. Workers Builds（可选）

Dashboard → Worker `bazurin` → Settings → Builds：

1. Connect GitHub，选本仓库，Production branch `main`
2. Build command：`pnpm install && pnpm exec opennextjs-cloudflare build`
3. Deploy command：`pnpm exec opennextjs-cloudflare deploy -- --keep-vars`
4. Build 环境变量：`NEXT_PUBLIC_APP_URL=https://bazurin.com`

## 验收

1. push `main` 后 Actions `Deploy Cloudflare` 变绿
2. `curl -s https://bazurin.com/api/wallet` 返回 `store=kv`
3. `https://bazurin.com/sitemap/main.xml`、`/robots.txt` 可访问
