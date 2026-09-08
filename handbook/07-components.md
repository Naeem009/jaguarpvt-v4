# 07 — Components

## UI primitives (`components/ui/`)

`Badge`, `Button`, `Card`, `Checkbox`, `Input`, `Select`, `Textarea`, `SectionContainer`, `SectionHeading`, `StatNumber`.

- `Button` accepts `href` for locale-aware links or `type` for forms
- `SectionHeading` supports `align="center" | "start"`, optional `eyebrow` / `subhead`
- `SectionContainer` width: `default` | `narrow` | `content`

Reuse these before adding new primitives.

## Shell (`components/sections/`)

| Component | Role |
|---|---|
| `Navbar` | Primary nav; overlay on home until scroll |
| `Footer` | Six columns of section hashes |
| `LanguageSwitcher` | Nav + footer |
| `Hero` | Inner-page heroes (`variant="inner"`) + CTAs |
| `HomeHero` | Full-viewport home hero + video |
| `CTASection` | Closing contact band |
| `StatBar` | Numeric proof row |
| `SectionJumpNav` | Hub in-page TOC (Products / Impact / About / Manufacturing / Careers) |
| `CommandSearch` | ⌘K overlay → `lib/ai/site-search.ts` + `/api/ai/search` |
| `AIChatWidget` / `AIChatWidgetLazy` | Assistant → `/api/ai/assistant` |

## Domain sections

| Area | Components |
|---|---|
| Products | `ProductCategoriesOverview`, `ProductPageTemplate`, `ProductSpecsTable`, `ProductGrid` |
| Impact | `ImpactPillarsOverview`, `ImpactPillarGrid`, `CertificationGrid`, `SustainabilityEstimator` |
| Manufacturing | `FacilityMap`, `FacilityMapLazy`, `FacilityList`, `FacilityCard`, `ProcessCapabilitiesSection`, `DepartmentGrid`, `DepartmentCategoryTabs` |
| Careers | `CurrentOpenings`, `JobApplyForm` |
| Contact | `ContactPageHero`, `ContactForm`, `ContactExpectations`, `AlternativeContact` |
| Home | `HomeHighlights`, `WhoWeAre`, `Customers`, `Partners` |
| Shared | `TimelineSection`, `PageVideoSection` / `DynamicPageVideoSection` |

Re-export barrel: `components/sections/index.ts`. Prefer importing from `@/components/sections` when adding a page.

## Jump nav (required on hubs)

```tsx
<SectionJumpNav
  id="manufacturing"
  eyebrow={...}
  title={...}
  subhead={...}
  links={[{ href: "#footprint", label: "..." }]}
/>
```

Hero `secondaryCTA.href` must match that `id`. Targets need `id` + `scroll-mt-24`.

## Forms

- Contact: `react-hook-form` + Zod (`lib/contact/schema.ts`) → `POST /api/contact-form`
- Careers apply: `JobApplyForm` → `POST /api/careers/apply`
- HR login / job editors: HR API routes under `/api/hr/*`

## Theme

`components/theme/BrandLogo.tsx`, `ThemeProvider.tsx`. Logo rules in [04-design-system.md](./04-design-system.md).
