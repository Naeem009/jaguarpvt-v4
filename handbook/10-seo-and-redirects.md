# 10 — SEO and redirects

## Metadata

`createPageMetadata(key)` in `lib/seo/metadata.ts` uses `lib/seo/config.ts` (`pageMetadata`) plus locale `metadata` content.

`siteUrl` = `NEXT_PUBLIC_SITE_URL` or `https://jaguarpvt.com`. `siteName` = `Jaguar (Pvt) Ltd.`

Hreflang: `buildAlternateLanguages(path)` for every marketing URL. English is canonical without `/en`.

When a hub absorbs old sub-pages, keep metadata keys if they still describe the hash section, but **stop advertising removed UI** (e.g. leadership) in descriptions.

## Sitemap and robots

- `app/sitemap.ts` — marketing routes + **active** career openings; locale alternates
- `app/robots.ts` — allow public; HR should stay out of the marketing route list
- `public/llms.txt` — short machine summary; update if positioning changes

## JSON-LD

`components/seo/SiteJsonLd.tsx`, `DynamicPageJsonLd.tsx`, `JobPostingJsonLd.tsx` via `lib/seo/json-ld.ts`. Job detail pages emit JobPosting when the role is still open.

## Redirects (`next.config.ts`)

Permanent:

| From | To |
|---|---|
| `/about/at-a-glance`, `/about/strategy`, `/about/mission`, `/about/company-policy` | `/about` |
| `/products/casual-wear` … `/products/boutique` | `/products` |
| `/our-impact/environment`, `/people`, `/governance` | `/our-impact` |

Prefixed locales included. Deep-link with hashes after redirect (`/about#strategy`).

If you add a new hub section that used to be a route, add a redirect **and** a hash, then update this table.

## Open Graph / titles

Root layout sets a default title template. Page `generateMetadata` should call `prepareLocale` then `createPageMetadata`. Career openings build title from the job name.

## Performance notes

- Home in-motion video can be large; keep `object-contain` / 16:9 boxes so on-video type is not cropped (`hero-video-grade` in CSS)
- Facility map is client-side; `FacilityMapLazy` is the page entry
- Prefer `sectionPaddingCompactClass` on long hub pages
