import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { FacilityMapLazy, Hero, ProcessCapabilitiesSection, SectionJumpNav } from "@/components/sections";
import { FACILITY_HERO_IMAGE, getFacilities } from "@/lib/facilities";
import { getDepartmentCategories, getDepartments } from "@/lib/departments";
import { heroVideoMedia } from "@/lib/media/hero-media";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("facility");
}

export default async function FacilityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("facility");
  const tMap = await getTranslations("facilityMap");
  const tCommon = await getTranslations("common");
  const facilities = await getFacilities();
  const departments = getDepartments();
  const departmentCategories = getDepartmentCategories();

  return (
    <main>
      <Hero
        variant="inner"
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.exploreSections"), href: "#manufacturing" }}
        media={heroVideoMedia(FACILITY_HERO_IMAGE, t("hero.alt"), "manufacturing")}
      />

      <SectionJumpNav
        id="manufacturing"
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        subhead={t("overview.subhead")}
        links={[
          { href: "#footprint", label: tMap("heading.eyebrow") },
          { href: "#design", label: tMap("design.eyebrow") },
          { href: "#facilities", label: tMap("list.eyebrow") },
          { href: "#capabilities", label: t("processCapabilities.eyebrow") },
        ]}
      />

      <FacilityMapLazy facilities={facilities} filterEnabled />

      <ProcessCapabilitiesSection
        departments={departments}
        categories={departmentCategories}
      />
    </main>
  );
}
