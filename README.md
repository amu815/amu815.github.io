# amu815.github.io

Personal site for [@amu815](https://github.com/amu815). Bilingual (EN / JA), built with Next.js 16 App Router + Tailwind CSS v4, exported as a static site and deployed to GitHub Pages.

- Live: https://amu815.github.io/
- JA: https://amu815.github.io/ja/

## Develop

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # emits ./out
```

## Deploy

Pushed commits to `main` trigger `.github/workflows/deploy.yml`, which builds with Bun and publishes `out/` via `actions/deploy-pages`. Enable **Settings → Pages → Source = "GitHub Actions"** once on a fresh repo.

## Structure

- `app/page.tsx` — English root (`/`)
- `app/ja/page.tsx` — Japanese (`/ja/`)
- `components/` — shared sections (Hero, Stats, Publications, Skills, …)
- `content/dict.ts` — bilingual string dictionary
- `public/.nojekyll` — required so Pages serves `_next/*`
