import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export type TimelineStep = {
  title: string;
  description: string;
  image?: string;
};

export type TimelineSectionProps = {
  eyebrow?: string;
  title?: string;
  subhead?: string;
  steps: TimelineStep[];
  variant?: "feature" | "compact";
  className?: string;
};

export async function TimelineSection({
  eyebrow,
  title,
  subhead,
  steps,
  variant = "feature",
  className,
}: TimelineSectionProps) {
  const t = await getTranslations("sections.timeline");

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={eyebrow ?? t("eyebrow")}
          title={title ?? t("defaultTitle")}
          subhead={subhead ?? t("defaultSubhead")}
          align={variant === "compact" ? "center" : "start"}
          className="mb-12 md:mb-16"
        />

        {variant === "compact" ? (
          <ol className="relative mx-auto max-w-4xl">
            <span
              aria-hidden
              className="absolute inset-y-1 start-1/2 w-px -translate-x-px bg-ink/15"
            />
            {steps.map((step, index) => {
              const onRight = index % 2 === 0;
              return (
                <li key={step.title} className="relative grid grid-cols-2 gap-6 pb-10 last:pb-0 md:gap-16">
                  <span
                    aria-hidden
                    className="absolute start-1/2 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-ink"
                  />
                  <div
                    className={cn(
                      onRight ? "col-start-2 text-start" : "col-start-1 text-end",
                    )}
                  >
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-graphite md:text-base">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
        <ol className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "grid items-center gap-8 md:grid-cols-2 md:gap-12",
                index % 2 === 1 && "md:[&>*:first-child]:order-2",
              )}
            >
              {step.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper shadow-[var(--shadow-card)]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-graphite">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        )}
      </div>
    </section>
  );
}
