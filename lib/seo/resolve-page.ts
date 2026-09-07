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
    ],
    people: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
    ],
    governance: [
      { name: "Home", path: "/" },
      { name: "Our Impact", path: "/our-impact" },
    ],
    products: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    casualWear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    streetwear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    activewear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    denim: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    kidswear: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
    boutique: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ],
  };

  return trails[page];
}
