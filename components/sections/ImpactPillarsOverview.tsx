import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionPaddingCompactClass } from "@/lib/layout/section";
import {
  environmentContent,
  governanceContent,
  peopleContent,
} from "@/lib/our-impact/content";
import { cn } from "@/lib/utils";

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export async function ImpactPillarsOverview() {
  const tHub = await getTranslations("impact.hub.pillars");
  const tEnv = await getTranslations("impact.environment");
  const tPeople = await getTranslations("impact.people");
  const tGov = await getTranslations("impact.governance");

  const environmentBlocks = tEnv.raw("blocks") as Array<{ title: string; body: string }>;
  const peopleBlocks = tPeople.raw("blocks") as Array<{ title: string; body: string }>;
  const certifications = tGov.raw("certifications.items") as Array<{
    name: string;
    description: string;
    issuer: string;
  }>;

  const pillars = [
    {
      id: "environment",
      title: tEnv("headline"),
      subhead: tEnv("subhead"),
      image: environmentContent.heroImage,
      imageAlt: tEnv("heroAlt"),
      highlights: environmentBlocks,
    },
    {
      id: "people",
      title: tPeople("headline"),
      subhead: tPeople("subhead"),
      image: peopleContent.heroImage,
      imageAlt: tPeople("heroAlt"),
      highlights: peopleBlocks,
    },
    {
      id: "governance",
      title: tGov("headline"),
      subhead: tGov("subhead"),
      image: governanceContent.heroImage,
      imageAlt: tGov("heroAlt"),
      highlights: [] as Array<{ title: string; body: string }>,
    },
  ];

  return (
    <div id="pillars">
      <section className={cn("bg-paper", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading
            align="center"
            eyebrow={tHub("eyebrow")}
            title={tHub("title")}
            subhead={tHub("subhead")}
            className="mb-10"
          />
          <nav
            aria-label={tHub("eyebrow")}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-ink/8 py-4"
          >
            {pillars.map((pillar) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="text-xs font-medium uppercase tracking-[0.16em] text-graphite transition-colors hover:text-ink"
              >
                {pillar.title}
              </a>
            ))}
          </nav>
        </SectionContainer>
      </section>

      {pillars.map((pillar, index) => {
        const imageStart = index % 2 === 0;

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className={cn(
              "scroll-mt-24",
              sectionPaddingCompactClass,
              index % 2 === 0 ? "bg-paper-muted" : "bg-paper",
            )}
          >
            <SectionContainer>
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={cn("lg:col-span-5", !imageStart && "lg:order-2")}>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-ink/5">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={cn("lg:col-span-7", !imageStart && "lg:order-1")}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-graphite">
                    {padIndex(index)} / 03
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
                    {pillar.subhead}
                  </p>

                  {pillar.highlights.length > 0 ? (
                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      {pillar.highlights.map((item) => (
                        <div key={item.title} className="border-t border-ink/8 pt-3">
                          <dt className="text-sm font-semibold text-ink">{item.title}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-graphite line-clamp-4">
                            {item.body}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {pillar.id === "governance" ? (
                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      {certifications.map((cert) => (
                        <div key={cert.name} className="border-t border-ink/8 pt-3">
                          <dt className="text-sm font-semibold text-ink">{cert.name}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-graphite">{cert.description}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              </div>
            </SectionContainer>
          </section>
        );
      })}
    </div>
  );
}
