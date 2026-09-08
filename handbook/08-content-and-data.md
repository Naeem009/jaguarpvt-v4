# 08 — Content and data

Copy lives in i18n ([06-i18n.md](./06-i18n.md)). Structured data and media live here.

## JSON in `data/`

| File | Used for |
|---|---|
| `facilities.json` | Map + facility cards (`lib/facilities`) |
| `departments.json` | Process & Capabilities (`lib/departments`) |
| `job-openings.json` | Public careers + HR CMS |
| `job-departments.json` | HR department labels |
| `knowledge-base.json` | Assistant retrieval (`lib/ai/knowledge-base.ts`) |

Facility kinds include manufacturing sites and `design-house` (Spain / Germany / UK). Faisalabad units are listed **inside** the Jaguar (Pvt) Ltd card, not as separate map cards.

## Jobs

- Public list: `lib/careers/query.ts` (`getActiveOpenings`)
- Persistence: `lib/careers/store.ts` — local file in dev; GitHub Contents API on Vercel when `HR_CMS_GITHUB_TOKEN` is set
- Deadline helpers: `lib/careers/deadline.ts`
- Do not commit `.env` passwords. Job JSON **is** committed so the marketing site can SSG listings

## Media (`public/`)

| Path | Role |
|---|---|
| `logos/jaguar-mark.png` | Brand mark |
| `logos/customers/` | Customer marquee (see README there) |
| `images/...` | Page photography (many placeholders are SVG) |
| `videos/home/in-motion.mp4` | Home in-motion clip (large) |
| `reports/esg-report.pdf` | ESG download (`ESG_REPORT_URL`) |
| `catalogues/` | Reserved in original spec; not required for current `/products` hub |
| `certifications/` | Certification artwork |
| `llms.txt` | Machine-readable site summary |

Hero videos: `lib/media/hero-videos.ts`, `hero-media.ts`, `page-videos.ts`. Prefer existing `heroVideoMedia(...)` helpers.

## Product categories

Slugs (source of truth: `lib/products/categories.ts`):

`casual-wear` `streetwear` `activewear` `denim` `kidswear` `boutique`

Copy: `lib/i18n/content/{locale}/productCategories.ts` + hub `productsHub.ts`. Images under `public/images/products/{slug}/`.

## Partners and customers

- `lib/partners/content.ts`
- `lib/customers/logos.ts` + `public/logos/customers/`

## Stats

`lib/stats/company-stats.ts`, `impact-hub-stats.ts` — labels from i18n, values from helpers. Replace placeholders before launch.

## Knowledge base

`data/knowledge-base.json` feeds the chat assistant. When you change facilities, categories, or policies, **update this file** so answers do not contradict the site. Also update `lib/ai/site-search.ts` entries (titles, href hashes, keywords).
