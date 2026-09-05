import { routing } from "@/i18n/routing";
import { pageMetadata, type PageMetadataKey } from "./config";

/** Strip locale prefix and resolve a marketing page key from the request pathname. */
export function resolvePageKeyFromPath(pathname: string): PageMetadataKey | null {
  let path = pathname.split("?")[0] ?? "/";
  if (!path.startsWith("/")) path = `/${path}`;

  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    const prefix = `/${locale}`;
    if (path === prefix) {
      path = "/";
      break;
    }
    if (path.startsWith(`${prefix}/`)) {
      path = path.slice(prefix.length) || "/";
      break;
    }
  }

  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  const match = Object.entries(pageMetadata).find(([, entry]) => {
    const entryPath = entry.path || "/";
    return entryPath === path;
  });

  return (match?.[0] as PageMetadataKey | undefined) ?? null;
}

export function getBreadcrumbsForPage(page: PageMetadataKey): Array<{ name: string; path: string }> {
  const trails: Record<PageMetadataKey, Array<{ name: string; path: string }>> = {
    home: [{ name: "Home", path: "/" }],
    about: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    atAGlance: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    aboutStrategy: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    aboutMission: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    aboutCompanyPolicy: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    careers: [
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ],
    contact: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    facility: [
      { name: "Home", path: "/" },
      { name: "Manufacturing", path: "/facility" },
    ],
    ourImpact: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
    ],
    environment: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
      { name: "Environment", path: "/our-impact/environment" },
    ],
    people: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
      { name: "People & Communities", path: "/our-impact/people" },
    ],
    governance: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
      { name: "Governance & Certifications", path: "/our-impact/governance" },
    ],
    products: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    casualWear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Casual Wear", path: "/products/casual-wear" },
    ],
    streetwear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Streetwear", path: "/products/streetwear" },
    ],
    activewear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Activewear", path: "/products/activewear" },
    ],
    denim: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Denim", path: "/products/denim" },
    ],
    kidswear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Kidswear", path: "/products/kidswear" },
    ],
    boutique: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Boutique", path: "/products/boutique" },
    ],
  };

  return trails[page];
}
