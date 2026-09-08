# 11 — Conventions

## Do

- Treat this handbook as as-built. If you change behavior, update the matching handbook file **in the same change** and add a [CHANGELOG.md](./CHANGELOG.md) line (date + why).
- Use `@/i18n/navigation` for internal links.
- Add copy to **all six locales** (JSON and/or `lib/i18n/content`).
- Keep jump-nav IDs, footer hashes, and `lib/ai/site-search.ts` aligned.
- Reuse `SectionJumpNav`, `Card`, `SectionHeading`, `sectionPaddingCompactClass`.
- Verify marketing UI in the browser (or curl + HTML IDs if no browser tools). Check desktop and a mobile width when layout changes.
- Keep HR secrets in `.env.local` / Vercel only.

## Do not

- Add e-commerce (cart, prices, buy now).
- Follow `docs/00`–`09` for live IA, stack versions, or product names (Wovens/Knits mega-menus, leadership section, green accent, Next.js 14 CMS).
- Invent a new in-page TOC style on one hub only.
- Put new footer labels only in `messages/en.json`.
- Commit `.env.local`, API keys, or HR passwords.
- Force-push `main`/`master` or skip git hooks unless the human asked.
- Create git commits unless the human asked.

## i18n checklist for a new section

1. `id` + `scroll-mt-24` on the section  
2. Jump link in `SectionJumpNav`  
3. Footer hash in `Footer.tsx`  
4. Copy in content TS (all locales)  
5. `lib/ai/site-search.ts` entry  
6. This handbook §05 + CHANGELOG  

## Code style

- Server Components by default; `"use client"` only for interactivity
- Tailwind token classes (`bg-paper`, `text-ink`) not one-off hex
- Zod (or explicit guards) on API bodies
- No drive-by refactors unrelated to the task

## Original brief vs handbook

| Need | Read |
|---|---|
| How the site works today | `handbook/` |
| Why v1 was specified that way | `docs/00`–`09` (archive) |
| Cursor keep-in-sync | `.cursor/rules/handbook.mdc` |

## Amending this handbook

- Fact change (route, ID, env var, component) → edit the topic file, don’t only changelog
- Changelog = dated bullets of **why**, not a dump of every file
- If you resurrect something the original spec wanted (e.g. CMS), document it here as as-built when it actually ships
