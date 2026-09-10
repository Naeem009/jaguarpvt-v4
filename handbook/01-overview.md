# 01 — Overview

## What this site is

Jaguar (Pvt) Ltd. is a **B2B corporate site** for a vertically integrated knitwear manufacturer. It does not sell to consumers.

It must:

1. Prove **scale and capability** to sourcing teams (categories, facilities, in-house process).
2. Prove **trust** (policies, ESG pillars, certifications, published capacity).
3. Convert qualified interest through **Contact** (RFI/RFQ) and **Careers**.

## Audiences

- Brand / sourcing directors evaluating a manufacturing partner
- Auditors and compliance teams checking policies and certifications
- Candidates applying to open roles
- Internal HR posting jobs via `/hr`

## Explicit non-goals

- No cart, checkout, SKU prices, or “buy now”
- No consumer retail tone
- Do not restore e-commerce patterns from generic Next.js templates
- Do not treat `docs/00`–`09` as the live sitemap

## Product shape (as built)

- **Marketing site** under `app/[locale]/(marketing)/`
- **HR careers CMS** under `app/[locale]/(hr)/hr/` (password session, not public)
- **AI widgets** (assistant, command search, matcher, estimator, facility filter) use **local knowledge / heuristics**, not a live LLM API, unless you add one later
- **Email** for contact and career applications via Resend

## Brand in product

- Wordmark: Martel Sans (`.font-brand`)
- Mark: five-stroke J at `public/logos/jaguar-mark.png` (from `public/j1.png`, black on transparent; `dark:invert`)
- Surfaces: warm paper / ink; accent is camel/heather knitwear, not the original-brief green
- Color scheme: **system `prefers-color-scheme` only** (no in-app theme toggle)

See [04-design-system.md](./04-design-system.md).
