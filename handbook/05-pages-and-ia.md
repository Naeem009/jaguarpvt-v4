# 05 — Pages and information architecture

Nav labels (desktop, in order): **About Us**, **Manufacturing**, **Products**, **Sustainability**, **Careers**, **Contact**, plus language switcher. Logo goes home. **No mega-menus.** Home is not a text nav item.

Primary source: `components/sections/Navbar.tsx`. Footer hashes: `components/sections/Footer.tsx`.

## Sitemap (as built)

```
/                         Home
/about                    About Us          #company jump nav
/facility                 Manufacturing     #manufacturing
/products                 Products          #categories
/our-impact               Sustainability    #pillars
/careers                  Careers           #careers
/careers/[slug]           Job detail + apply
/contact                  Contact form
/hr/login                 HR CMS login
/hr                       HR job list (auth)
/hr/jobs/new              Create job
/hr/jobs/[slug]           Edit job
```

Locales: prefix `/{locale}` except English.

## Jump nav pattern

Shared component: `components/sections/SectionJumpNav.tsx`.

Every multi-section marketing hub should have:

1. Hero **secondary CTA** pointing at the jump-nav `id`
2. Centered `SectionHeading` + uppercase hash links (`text-xs tracking-[0.16em]`)
3. Each target `section` with matching `id` and `scroll-mt-24`
4. Footer column with the **same hashes** (pathname + hash)

Do not invent a different in-page TOC.

## Section IDs (keep in sync with Footer)

### About `/about` — jump id `#company`

| Hash | Section |
|---|---|
| `#at-a-glance` | Jaguar at a Glance |
| `#mission` | Mission |
| `#strategy` | Strategy |
| `#company-policy` | Policy |
| `#history` | Timeline (end of page, before CTA) |

No leadership block.

Hero secondary: `#company`. File: `app/[locale]/(marketing)/about/page.tsx`.

### Manufacturing `/facility` — jump id `#manufacturing`

| Hash | Section |
|---|---|
| `#footprint` | Global map |
| `#design` | Design & Development houses |
| `#facilities` | All manufacturing facilities |
| `#capabilities` | Process & Capabilities |

Hero secondary: `#manufacturing`. Map + lists: `FacilityMap` / `FacilityList`. Process: `ProcessCapabilitiesSection`.

### Products `/products` — jump id `#categories`

Hashes: `#casual-wear` `#streetwear` `#activewear` `#denim` `#kidswear` `#boutique`

Component: `ProductCategoriesOverview`. Old `/products/{slug}` redirects to `/products`.

### Sustainability `/our-impact` — jump id `#pillars`

| Hash | Section |
|---|---|
| `#environment` | Environment |
| `#people` | People & Communities |
| `#governance` | Governance & certifications |

Component: `ImpactPillarsOverview`. ESG download: `ESG_REPORT_URL` (`/reports/esg-report.pdf`).

### Careers `/careers` — jump id `#careers`

| Hash | Section |
|---|---|
| `#culture` | Life at Jaguar |
| `#internships` | Internships |
| `#benefits` | Benefits |
| `#open-roles` | Current openings |

Hero primary: `#open-roles`. Secondary: `#careers`.

### Home `/`

Cinematic hero (`#home-hero`), highlights, Who we are, customers marquee, partners. No `SectionJumpNav` (landing, not a hub).

### Contact `/contact`

Hero + `#contact-form`. Single conversion page.

## Footer columns (as built)

1. Company — About section hashes  
2. Manufacturing — facility hashes  
3. Careers — careers hashes  
4. Products — category hashes  
5. Our Impact — pillar hashes + ESG (external/PDF)  
6. Connect — Contact, LinkedIn  

Grid: `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`.

When you add/rename a section ID, update **page + jump nav + footer + handbook this file + CHANGELOG** in the same change.
