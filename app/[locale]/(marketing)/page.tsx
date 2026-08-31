import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeHighlights } from "@/components/sections/HomeHighlights";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Customers } from "@/components/sections/Customers";
import { Partners } from "@/components/sections/Partners";
import { heroVideoMedia } from "@/lib/media/hero-media";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main>
      <HomeHero
        tagline={t("hero.tagline")}
        established={t("hero.established")}
        headline={t("hero.headline")}
        subhead={t("hero.subhead")}
        ctaLabel={t("hero.cta")}
        ctaHref="/facility"
        media={heroVideoMedia("/images/home/hero.jpg", t("hero.heroAlt"), "home")}
      />

      <HomeHighlights
        items={[
          { icon: "years", value: t("highlights.years.value"), label: t("highlights.years.label") },
          { icon: "output", value: t("highlights.output.value"), label: t("highlights.output.label") },
          { icon: "facility", value: t("highlights.facility.value"), label: t("highlights.facility.label") },
          { icon: "global", value: t("highlights.global.value"), label: t("highlights.global.label") },
        ]}
      />

      <WhoWeAre
        headline={t("whoWeAre.headline")}
        body={t("whoWeAre.body")}
        ctaLabel={t("whoWeAre.cta")}
        ctaHref="/about"
        image="/images/home/who-we-are.jpg"
        imageAlt={t("whoWeAre.imageAlt")}
      />

      <Customers title={t("customers.title")} />
      <Partners title={t("partners.title")} />
    </main>
  );
}
