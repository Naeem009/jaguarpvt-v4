# Jaguar Pvt Ltd — Developer handbook

This is the **as-built** handbook for the marketing site and HR careers CMS. Read this folder first. Keep it true to the running code.

| | |
|---|---|
| App root | `jaguarpvt/` (this directory) |
| Stack | Next.js 16 App Router, TypeScript, Tailwind CSS v4, `next-intl` |
| Locales | `en` (default, no URL prefix), `ar`, `zh`, `es`, `fr`, `de` |
| Dev | `npm run dev` → [http://localhost:3000](http://localhost:3000) |

## How to use this handbook

1. New to the repo → [02-getting-started.md](./02-getting-started.md)
2. Changing a page or nav → [05-pages-and-ia.md](./05-pages-and-ia.md) then [06-i18n.md](./06-i18n.md)
3. Changing copy → [06-i18n.md](./06-i18n.md) and [08-content-and-data.md](./08-content-and-data.md)
4. After any of those changes → add a dated line in [CHANGELOG.md](./CHANGELOG.md)

## Contents

| File | Covers |
|---|---|
| [01-overview.md](./01-overview.md) | Purpose, audiences, non-goals |
| [02-getting-started.md](./02-getting-started.md) | Install, env, scripts |
| [03-architecture.md](./03-architecture.md) | Folders, routing, layouts, middleware |
| [04-design-system.md](./04-design-system.md) | Tokens, theme, logo, type |
| [05-pages-and-ia.md](./05-pages-and-ia.md) | Sitemap, jump nav, footer hashes |
| [06-i18n.md](./06-i18n.md) | UI JSON vs page copy TS |
| [07-components.md](./07-components.md) | UI primitives and shared sections |
| [08-content-and-data.md](./08-content-and-data.md) | JSON data, media, jobs |
| [09-ai-and-apis.md](./09-ai-and-apis.md) | AI routes, contact, careers, HR |
| [10-seo-and-redirects.md](./10-seo-and-redirects.md) | Metadata, sitemap, old URLs |
| [11-conventions.md](./11-conventions.md) | Do/don't and how to amend this handbook |
| [CHANGELOG.md](./CHANGELOG.md) | Dated as-built notes |

## Original brief (not as-built)

`docs/00`–`docs/09` is the **original planning spec**. It describes older IA (product mega-menus, leadership, Wovens/Knits/Baby Wear sub-routes, Headless CMS, Next.js 14, green accent). Do not follow it for implementation. Use this handbook. Update `docs/` only if you are explicitly editing the historical brief.

## Keep it current

A Cursor rule in `.cursor/rules/handbook.mdc` requires the agent to update this folder in the same turn as route, nav, footer, i18n, token, API, or section-ID changes. Humans should do the same in PRs.

If the handbook and the code disagree, **the code wins** — then fix the handbook immediately.
