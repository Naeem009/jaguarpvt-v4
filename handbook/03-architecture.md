# 03 — Architecture

## Runtime

- **Next.js 16.2** App Router, React 19, TypeScript strict
- **`next-intl` v4** — `localePrefix: "as-needed"` (`i18n/routing.ts`)
- **Tailwind v4** — tokens in `app/globals.css` (`@import "tailwindcss"`)
- Plugin: `createNextIntlPlugin("./i18n/request.ts")` in `next.config.ts`

## Request path

1. `middleware.ts` — HR session gate for `/hr` (except login), then `next-intl` middleware, sets `x-pathname`
2. `app/[locale]/layout.tsx` — fonts, theme init script, `NextIntlClientProvider`, `ThemeProvider`
3. Route group:
   - `(marketing)` — public pages + Navbar/Footer/search/chat
   - `(hr)` — HR login + portal (no marketing chrome)

English URLs have **no** `/en` prefix. Other locales: `/{locale}/...`.

## Folder map

```
app/
  [locale]/
    layout.tsx                 # html/body, messages, fonts
    (marketing)/
      layout.tsx               # Navbar, Footer, CommandSearch, AIChatWidget
      page.tsx                 # Home
      about/ page.tsx
      facility/ page.tsx       # Manufacturing
      products/ page.tsx
      our-impact/ page.tsx
      careers/ page.tsx
      careers/[slug]/ page.tsx
      contact/ page.tsx
    (hr)/hr/
      login/ page.tsx
      (portal)/                # protected
        page.tsx
        jobs/new/ page.tsx
        jobs/[slug]/ page.tsx
  api/                         # not locale-prefixed
    ai/ assistant|search|matcher|estimator
    contact-form/
    careers/apply/
    hr/ login|logout|jobs|departments
  sitemap.ts
  robots.ts
components/
  ui/                          # primitives
  sections/                    # page sections + shell
  theme/                       # BrandLogo, ThemeProvider
  seo/
lib/                           # domain modules (i18n, seo, ai, careers, facilities…)
messages/{en,ar,zh,es,fr,de}.json   # UI chrome
i18n/ routing.ts, request.ts, navigation.ts
data/                          # JSON sources
public/                        # images, logos, videos, reports
```

## Messages merge

`i18n/request.ts` loads UI JSON then **spreads content modules on top**:

```ts
messages: { ...uiMessages, ...contentMessages }
```

Content namespaces (`about`, `facility`, `careers`, …) must not use the same top-level key as UI (`footer`, `nav`, `common`) or they would replace the whole UI object.

## Navigation helpers

Use `Link`, `usePathname`, `redirect` from `@/i18n/navigation` so locale prefixes stay correct. Hash links: `{ pathname: "/facility", hash: "capabilities" }`.

## Layout vs page

- Marketing layout is a **server** component; Navbar/Footer/search/chat are client islands.
- Pass `x-pathname` from middleware into video/JSON-LD helpers via `headers()`.
- HR portal layout is separate; middleware returns `cache-control: private, no-store` on `/hr`.

## Redirects

Permanent redirects in `next.config.ts` collapse old sub-routes onto hubs:

- `/about/{at-a-glance|strategy|mission|company-policy}` → `/about`
- `/products/{casual-wear|streetwear|activewear|denim|kidswear|boutique}` → `/products`
- `/our-impact/{environment|people|governance}` → `/our-impact`

Same for prefixed locales. In-page hashes (`/about#mission`) are the live deep links.
