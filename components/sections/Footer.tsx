"use client";

import { BrandLogo } from "@/components/theme/BrandLogo";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ESG_REPORT_URL } from "@/lib/our-impact/content";
import { PRODUCT_CATEGORY_SLUGS } from "@/lib/products/content";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tProducts = useTranslations("productCategories");
  const tGlance = useTranslations("about.atAGlance");
  const tMap = useTranslations("facilityMap");
  const tFacility = useTranslations("facility");
  const tCareers = useTranslations("careers");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("company"),
      links: [
        { label: t("atAGlance"), href: { pathname: "/about" as const, hash: "at-a-glance" } },
        { label: t("mission"), href: { pathname: "/about" as const, hash: "mission" } },
        { label: t("strategy"), href: { pathname: "/about" as const, hash: "strategy" } },
        { label: t("companyPolicy"), href: { pathname: "/about" as const, hash: "company-policy" } },
        { label: tGlance("history.eyebrow"), href: { pathname: "/about" as const, hash: "history" } },
      ],
    },
    {
      title: tNav("facility"),
      links: [
        { label: tMap("heading.eyebrow"), href: { pathname: "/facility" as const, hash: "footprint" } },
        { label: tMap("design.eyebrow"), href: { pathname: "/facility" as const, hash: "design" } },
        { label: tMap("list.eyebrow"), href: { pathname: "/facility" as const, hash: "facilities" } },
        { label: tFacility("processCapabilities.eyebrow"), href: { pathname: "/facility" as const, hash: "capabilities" } },
      ],
    },
    {
      title: tNav("careers"),
      links: [
        { label: tCareers("culture.eyebrow"), href: { pathname: "/careers" as const, hash: "culture" } },
        { label: tCareers("internships.eyebrow"), href: { pathname: "/careers" as const, hash: "internships" } },
        { label: tCareers("benefits.eyebrow"), href: { pathname: "/careers" as const, hash: "benefits" } },
        { label: tCareers("openRoles.title"), href: { pathname: "/careers" as const, hash: "open-roles" } },
      ],
    },
    {
      title: t("products"),
      links: PRODUCT_CATEGORY_SLUGS.map((slug) => ({
        label: tProducts(`${slug}.name`),
        href: { pathname: "/products" as const, hash: slug },
      })),
    },
    {
      title: t("ourImpact"),
      links: [
        { label: t("environment"), href: { pathname: "/our-impact" as const, hash: "environment" } },
        { label: t("people"), href: { pathname: "/our-impact" as const, hash: "people" } },
        { label: t("governance"), href: { pathname: "/our-impact" as const, hash: "governance" } },
        { label: t("esgReports"), href: ESG_REPORT_URL, external: true },
      ],
    },
    {
      title: t("connect"),
      links: [
        { label: tCommon("contact"), href: "/contact" as const },
        {
          label: t("linkedin"),
          href: "https://www.linkedin.com/company/jaguar-pvt-ltd/",
          external: true,
        },
      ],
    },
  ];

  const legalLinks = [
    { label: t("privacy"), href: "#privacy" },
    { label: t("terms"), href: "#terms" },
    { label: t("cookies"), href: "#cookies" },
    { label: t("modernSlavery"), href: "#modern-slavery" },
  ];

  return (
    <footer className={cn("border-t border-ink/8 bg-paper-muted text-ink", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <BrandLogo />
          <div className="flex items-center gap-4 text-sm text-graphite">
            <a
              href="https://www.linkedin.com/company/jaguar-pvt-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {t("linkedin")}
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-mdx-bold font-bold uppercase tracking-[0.06em] text-graphite">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2 text-mdx-regular">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-graphite transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-graphite transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-ink/8 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-graphite transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher variant="chips" />
          </div>

          <div className="mt-4 flex flex-col gap-1.5 text-xs text-graphite md:flex-row md:items-center md:justify-between">
            <p>{t("copyright", { year })}</p>
            <p>{t("footprint")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
