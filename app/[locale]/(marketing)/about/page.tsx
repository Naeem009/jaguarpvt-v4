import { getTranslations, setRequestLocale } from "next-intl/server";
import { prepareLocale } from "@/lib/i18n/prepare-locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CTASection, Hero, StatBar, TimelineSection } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutHubHeroImage } from "@/lib/about/content";
import { jaguarJourneySteps } from "@/lib/about/timeline";
import { heroVideoMedia } from "@/lib/media/hero-media";
import { evenCardGridClass, sectionPaddingCompactClass } from "@/lib/layout/section";
import { buildCompanyStats } from "@/lib/stats/company-stats";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  await prepareLocale(params);
  return createPageMetadata("about");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHub = await getTranslations("about.hub");
  const tGlance = await getTranslations("about.atAGlance");
  const tStrategy = await getTranslations("about.strategy");
  const tMission = await getTranslations("about.mission");
  const tPolicy = await getTranslations("about.companyPolicy");
  const tStats = await getTranslations("about.stats");
  const tCommon = await getTranslations("common");

  const pillars = tStrategy.raw("pillars") as Array<{ title: string; description: string }>;
  const values = tMission.raw("values") as Array<{ title: string; description: string }>;
  const policies = tPolicy.raw("policies") as Array<{ title: string; description: string }>;

  const companyStats = buildCompanyStats({
    facilities: tStats("facilities"),
    countries: tStats("countries"),
    employees: tStats("employees"),
    yearsInOperation: tStats("yearsInOperation"),
  });

  const jumpLinks = [
    { href: "#at-a-glance", label: tGlance("headline") },
    { href: "#mission", label: tMission("headline") },
    { href: "#strategy", label: tStrategy("pillarsSection.eyebrow") },
    { href: "#company-policy", label: tPolicy("policiesSection.eyebrow") },
    { href: "#history", label: tGlance("history.eyebrow") },
  ];

  return (
    <main>
      <Hero
        variant="inner"
        headline={tHub("hero.headline")}
        subhead={tHub("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        secondaryCTA={{ label: tHub("hero.exploreSections"), href: "#company" }}
        media={heroVideoMedia(aboutHubHeroImage, tHub("hero.alt"), "manufacturing")}
      />

      <StatBar stats={companyStats} />

      <section id="company" className={cn("bg-paper", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading
            align="center"
            eyebrow={tHub("grid.eyebrow")}
            title={tHub("grid.title")}
            subhead={tHub("grid.subhead")}
            className="mb-10"
          />
          <nav
            aria-label={tHub("grid.eyebrow")}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-ink/8 py-4"
          >
            {jumpLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.16em] text-graphite transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </SectionContainer>
      </section>

      <section id="at-a-glance" className={cn("scroll-mt-24 bg-paper-muted", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading title={tGlance("headline")} subhead={tGlance("subhead")} className="mb-6" />
          <p className="max-w-3xl text-base leading-relaxed text-graphite md:text-lg">{tHub("overview.body")}</p>
        </SectionContainer>
      </section>

      <section id="mission" className={cn("scroll-mt-24 bg-paper", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading title={tMission("headline")} subhead={tMission("subhead")} className="mb-8" />
          <p className="mb-10 max-w-3xl text-base leading-relaxed text-graphite md:mb-12 md:text-lg">
            {tMission("vision")}
          </p>
          <div className={cn("grid gap-6", evenCardGridClass(values.length))}>
            {values.map((value) => (
              <Card key={value.title}>
                <h3 className="font-display text-xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{value.description}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="strategy" className={cn("scroll-mt-24 bg-paper-muted", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading title={tStrategy("headline")} subhead={tStrategy("subhead")} className="mb-10 md:mb-12" />
          <div className={cn("grid gap-6", evenCardGridClass(pillars.length))}>
            {pillars.map((pillar) => (
              <Card key={pillar.title}>
                <h3 className="font-display text-xl font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="company-policy" className={cn("scroll-mt-24 bg-paper", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading title={tPolicy("headline")} subhead={tPolicy("subhead")} className="mb-10 md:mb-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy) => (
              <Card key={policy.title}>
                <h3 className="font-display text-lg font-semibold text-ink">{policy.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{policy.description}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      <TimelineSection
        id="history"
        eyebrow={tGlance("history.eyebrow")}
        title={tGlance("history.title")}
        subhead={tGlance("history.subhead")}
        variant="compact"
        steps={[...jaguarJourneySteps]}
        className="bg-paper-muted"
      />

      <CTASection
        title={tHub("cta.title")}
        subhead={tHub("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
