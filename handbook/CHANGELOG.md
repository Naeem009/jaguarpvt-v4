# Handbook changelog

As-built notes for developers. Newest first. This is not the git log.

## 2026-09-08

- Theme init no longer uses `next/script` `beforeInteractive` (React 19 / Next 16 overlay). Inline `<head>` script instead.
- Replaced the brand mark with the metallic 3D J from `j logo new.pdf`, cropped to the emblem only, transparent background (`public/logos/jaguar-mark.png`). Favicons regenerated. CSS invert removed so shading stays intact. Re-export with `python scripts/export-j-mark.py`.

## 2026-09-07

- Added this as-built `handbook/` and Cursor rule `.cursor/rules/handbook.mdc`. Original `docs/00`–`09` kept as historical brief only.
- About Us: leadership removed. Section order Glance → Mission → Strategy → Policy → History (timeline last). Jump nav matches Products / Sustainability.
- Manufacturing and Careers: same `SectionJumpNav` pattern; footer lists About, Manufacturing, Careers, Products, and Impact section hashes.
- Footer labels for new columns read from existing content namespaces (`facilityMap`, `facility`, `careers`, `about.atAGlance`) to avoid `MISSING_MESSAGE` on `footer.*` keys that were not loaded.
- Products and Sustainability remain single hub pages with in-page category / pillar hashes; old sub-routes redirect in `next.config.ts`.
- Theme follows `prefers-color-scheme` only. Logo is `public/logos/jaguar-mark.png` with `dark:invert`.
