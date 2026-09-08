# 09 — AI and APIs

API routes live under `app/api/` (no locale prefix). Marketing AI features are **deterministic / retrieval**, not a hosted LLM, unless you wire one later.

## AI

| Route | Client | Behavior |
|---|---|---|
| `POST /api/ai/assistant` | `AIChatWidget` | Retrieves `data/knowledge-base.json`, builds an answer (`lib/ai/assistant.ts`) |
| `POST /api/ai/search` | `CommandSearch`, facility filter | Site index (`lib/ai/site-search.ts`) and/or facility filter (`lib/ai/facility-search.ts`) |
| `POST /api/ai/matcher` | Capability matcher | Heuristic match (`lib/ai/matcher.ts`) |
| `POST /api/ai/estimator` | Sustainability estimator | Numeric estimate (`lib/our-impact/estimator.ts`) + narrative |

Locale is passed in the JSON body where relevant. Keep `lib/ai/site-search.ts` hashes aligned with [05-pages-and-ia.md](./05-pages-and-ia.md).

Facility map natural-language filter posts `{ query, scope: "facilities" }` to `/api/ai/search`.

## Contact

`POST /api/contact-form`

- Zod: `lib/contact/schema.ts`
- Email: Resend (`lib/contact/send-submission-email.ts`)
- Optional `CRM_WEBHOOK_URL` after a successful send
- Missing `RESEND_API_KEY` → error (does not silently succeed)

## Careers apply

`POST /api/careers/apply` → `lib/careers/send-application-email.ts` (`CAREERS_APPLY_TO` or contact inbox).

## HR CMS

| Route | Purpose |
|---|---|
| `POST /api/hr/login` | Sets `hr_session` cookie |
| `POST /api/hr/logout` | Clears session |
| `GET/POST /api/hr/jobs` | List / create openings |
| `GET/PATCH/DELETE /api/hr/jobs/[slug]` | Mutate one job |
| `GET /api/hr/departments` | Department options |

Middleware redirects unauthenticated users from `/hr` (except `/hr/login`) to login. Session: `lib/hr/session.ts` (`HR_CMS_PASSWORD`, `HR_CMS_SECRET`).

On Vercel, job writes need GitHub token/repo/branch so `data/job-openings.json` persists.

## Other

- `app/json/version/route.ts` — version JSON (ops)
- Do not put secrets in client components. `NEXT_PUBLIC_*` is the only browser-visible prefix.

## Adding an API

1. `app/api/<name>/route.ts`
2. Validate body (Zod or explicit type guards)
3. Return JSON errors with status codes
4. Document the route in this file and [CHANGELOG.md](./CHANGELOG.md)
