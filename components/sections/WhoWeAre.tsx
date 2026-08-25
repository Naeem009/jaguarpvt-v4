import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function WhoWeAre({
  headline,
  body,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  className,
}: {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-paper py-16 md:py-24", className)}>
      <div className="mx-auto grid max-w-7xl items-stretch overflow-hidden px-4 md:grid-cols-2 md:px-6">
        <div className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card-lg)] md:min-h-[480px] md:rounded-none">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-6 py-10 md:px-12 md:py-16 lg:px-16">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            {headline}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-graphite md:text-lg">{body}</p>
          <div>
            <Button
              href={ctaHref}
              variant="secondary"
              className="border-ink/30 tracking-[0.12em] uppercase hover:border-ink hover:bg-ink hover:text-paper"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
