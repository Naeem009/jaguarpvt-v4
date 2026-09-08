# 04 — Design system

Source of truth: `app/globals.css` (`:root` and `html.dark`). Original brief in `docs/01-BRAND-DESIGN-SYSTEM.md` is **not** current (it assumed a green accent).

## Surfaces and type colors

| Token | Light (approx.) | Role |
|---|---|---|
| `--color-paper` | `#f7f4ef` | Page background |
| `--color-paper-muted` | `#fbfaf7` | Alternate bands |
| `--color-mist` | `#e8d8c8` | Soft section band |
| `--color-ink` | `#161513` | Primary text |
| `--color-graphite` | `#7a756c` | Secondary text |
| `--color-accent` | `#a9825e` | Camel accent (buttons, links) |
| `--color-knit` / `--color-heather` | `#dbc6b2` / `#c7b4a2` | Knitwear wash |
| `--color-error` | `#c0392b` | Errors |

Dark mode inverts paper/ink; accent stays camel. Use Tailwind names wired to these tokens (`bg-paper`, `text-ink`, `text-graphite`, `text-accent`, `bg-paper-muted`, `bg-mist`).

## Typography

Loaded in `app/[locale]/layout.tsx`:

| CSS var | Font | Use |
|---|---|---|
| `--font-display` | Montserrat | Headlines (`font-display`) |
| `--font-body` | Inter | Body |
| `--font-mono` | IBM Plex Mono | Technical |
| `--font-brand` | Martel Sans | Wordmark (`.font-brand`) |

## Logo

- File: `public/logos/jaguar-mark.png` (transparent PNG from `j logo new.pdf` via `scripts/export-j-mark.py`)
- Component: `components/theme/BrandLogo.tsx`
- Native `<img>` (not `next/image`) so the silhouette stays sharp
- Do **not** CSS-invert the mark — it is grayscale metal with its own highlights
- Wordmark is still CSS (`font-brand`), black in light mode / white in dark
- Variants: `lockup` (default), `stacked` (home hero), `mark`
- Favicons: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`

## Theme

`lib/theme.ts` injects `themeInitScript` **beforeInteractive**. It:

- Removes any saved `jaguar-theme` override
- Applies `html.dark` / `html.light` from `prefers-color-scheme`

There is **no** user theme toggle. Do not add one unless product asks.

## Layout rhythm

`lib/layout/section.ts`:

- `sectionContainerClass` — `max-w-7xl px-4 md:px-6`
- `sectionPaddingClass` — `py-16 md:py-24`
- `sectionPaddingCompactClass` — `py-12 md:py-16` (jump-nav pages)
- `evenCardGridClass(n)` — card grids by count

Jump targets: `scroll-mt-24` so sticky/fixed nav does not cover headings.

## Motion

`--ease-out-expo` in CSS. Framer Motion is a dependency; prefer existing section motion over new page-wide animation.

## Radius and elevation

Cards use `rounded-[var(--radius-card-lg)]`, `border-ink/8`, `shadow-[var(--shadow-card)]` / hover shadow. Match existing `Card` rather than inventing new chrome.
