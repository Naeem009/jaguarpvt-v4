import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

function localDevOrigins() {
  const hosts = new Set<string>(["127.0.0.1"]);
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === "IPv4" && !address.internal) {
        hosts.add(address.address);
      }
    }
  }
  return [...hosts];
}

const aboutSubPaths = ["at-a-glance", "strategy", "mission", "company-policy"] as const;
const productSubPaths = [
  "casual-wear",
  "streetwear",
  "activewear",
  "denim",
  "kidswear",
  "boutique",
] as const;

const impactSubPaths = ["environment", "people", "governance"] as const;

const nextConfig: NextConfig = {
  allowedDevOrigins: localDevOrigins(),
  async redirects() {
    return [
      ...aboutSubPaths.flatMap((slug) => [
        { source: `/about/${slug}`, destination: "/about", permanent: true },
        { source: `/:locale(ar|zh|es|fr|de)/about/${slug}`, destination: "/:locale/about", permanent: true },
      ]),
      ...productSubPaths.flatMap((slug) => [
        { source: `/products/${slug}`, destination: "/products", permanent: true },
        { source: `/:locale(ar|zh|es|fr|de)/products/${slug}`, destination: "/:locale/products", permanent: true },
      ]),
      ...impactSubPaths.flatMap((slug) => [
        { source: `/our-impact/${slug}`, destination: "/our-impact", permanent: true },
        { source: `/:locale(ar|zh|es|fr|de)/our-impact/${slug}`, destination: "/:locale/our-impact", permanent: true },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
