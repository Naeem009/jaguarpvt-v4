# 02 — Getting started

## Prerequisites

- Node.js 20+ (match whatever CI uses)
- npm
- Work inside **`jaguarpvt/`**, not the parent `jaguarpvt-v4` folder (that parent may be a separate git root)

## Install and run

```bash
cd jaguarpvt
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). English has no locale prefix. Other locales: `/ar`, `/zh`, `/es`, `/fr`, `/de`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment

Copy values from `.env.example` into **`.env.local`** (never commit secrets).

| Variable | Required for | Notes |
|---|---|---|
| `RESEND_API_KEY` | Contact + career apply emails | Form errors if missing |
| `CONTACT_FORM_TO` | Contact inbox | Defaults to `usama@jaguarpvt.com` |
| `CONTACT_FORM_FROM` | From address | Must be a verified Resend sender |
| `CRM_WEBHOOK_URL` | Optional CRM forward | After email send |
| `CAREERS_APPLY_TO` | Career applications | Defaults to `CONTACT_FORM_TO` |
| `HR_CMS_PASSWORD` | `/hr` login | Put real values only in `.env.local` / Vercel |
| `HR_CMS_SECRET` | Session signing | |
| `HR_CMS_GITHUB_TOKEN` | Persist jobs on Vercel | Repo write token |
| `HR_CMS_GITHUB_REPO` | Job store remote | e.g. `Naeem009/jaguarpvt` |
| `HR_CMS_GITHUB_BRANCH` | Job store branch | e.g. `master` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs / sitemap | Defaults to `https://jaguarpvt.com` |

## Path alias

TypeScript path `@/*` maps to the app root (`jaguarpvt/`). Import `@/components/...`, `@/lib/...`.

## First files to read

- `i18n/routing.ts` — locales
- `app/[locale]/(marketing)/layout.tsx` — shell (nav, footer, search, chat)
- `handbook/05-pages-and-ia.md` — live sitemap
- `handbook/06-i18n.md` — where copy lives
