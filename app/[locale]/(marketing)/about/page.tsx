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
import { evenCardGridClass, sectionPaddingClass } from "@/lib/layout/section";
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

  const leaders = tGlance.raw("leadership.members") as Array<{ name: string; role: string }>;
  const pillars = tStrategy.raw("pillars") as Array<{ title: string; description: string }>;
  const values = tMission.raw("values") as Array<{ title: string; description: string }>;
  const policies = tPolicy.raw("policies") as Array<{ title: string; description: string }>;

  const companyStats = buildCompanyStats({
    facilities: tStats("facilities"),
    countries: tStats("countries"),
    employees: tStats("employees"),
    yearsInOperation: tStats("yearsInOperation"),
  });

  return (
    <main>
      <Hero
        variant="inner"
        headline={tHub("hero.headline")}
        subhead={tHub("hero.subhead")}
        primaryCTA={{ label: tCommon("contactUs"), href: "/contact" }}
        media={heroVideoMedia(aboutHubHeroImage, tHub("hero.alt"), "manufacturing")}
      />

      <StatBar stats={companyStats} />

      <section id="at-a-glance" className={cn("scroll-mt-24 bg-paper", sectionPaddingClass)}>
        <SectionContainer width="narrow">
          <SectionHeading title={tHub("overview.title")} className="mb-6" />
          <p className="text-lg leading-relaxed text-graphite">{tHub("overview.body")}</p>
        </SectionContainer>
      </section>

      <TimelineSection
        eyebrow={tGlance("history.eyebrow")}
        title={tGlance("history.title")}
        subhead={tGlance("history.subhead")}
        variant="compact"
        steps={[...jaguarJourneySteps]}
        className="pt-0"
      />

      <section className={cn("bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            eyebrow={tGlance("leadership.eyebrow")}
            title={tGlance("leadership.title")}
            className="mb-10 md:mb-12"
          />
          <div className={cn("grid gap-6", evenCardGridClass(leaders.length))}>
            {leaders.map((leader) => (
              <Card key={leader.name}>
                <h3 className="font-display text-xl font-semibold text-ink">{leader.name}</h3>
                <p className="mt-2 text-sm text-graphite">{leader.role}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="strategy" className={cn("scroll-mt-24 bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            title={tStrategy("headline")}
            subhead={tStrategy("subhead")}
            className="mb-10 md:mb-12"
          />
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

      <section id="mission" className={cn("scroll-mt-24 bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            title={tMission("headline")}
            subhead={tMission("subhead")}
            className="mb-8"
          />
          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-graphite md:mb-12">
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

      <section id="company-policy" className={cn("scroll-mt-24 bg-paper", sectionPaddingClass)}>
        <SectionContainer>
          <SectionHeading
            title={tPolicy("headline")}
            subhead={tPolicy("subhead")}
            className="mb-10 md:mb-12"
          />
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

      <CTASection
        title={tHub("cta.title")}
        subhead={tHub("cta.subhead")}
        cta={{ label: tCommon("contactUs"), href: "/contact" }}
      />
    </main>
  );
}
