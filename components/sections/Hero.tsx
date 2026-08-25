import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";
import { cn } from "@/lib/utils";

export type HeroMedia =
  | { type: "image"; src: string; alt: string }
  | {
      type: "video";
      src: string;
      clips?: readonly string[];
      poster?: string;
      alt: string;
    };

export type HeroCTA = {
  label: string;
  href: string;
};

export type HeroProps = {
  headline: string;
  subhead: string;
  primaryCTA: HeroCTA;
  secondaryCTA?: HeroCTA;
  media: HeroMedia;
  variant?: "home" | "inner";
};

export function Hero({
  headline,
  subhead,
  primaryCTA,
  secondaryCTA,
  media,
  variant = "home",
}: HeroProps) {
  const isHome = variant === "home";
  const videoClips =
    media.type === "video" ? (media.clips && media.clips.length > 0 ? media.clips : [media.src]) : [];

  return (
    <section
      id={isHome ? "home-hero" : undefined}
      className={cn(
        "hero-cinematic relative isolate flex items-end overflow-hidden bg-charcoal text-ink dark:text-white",
        isHome ? "min-h-dvh" : "min-h-[60vh]",
      )}
    >
      <div className="absolute inset-0">
        {media.type === "video" ? (
          <HeroBackdrop clips={videoClips} poster={media.poster} alt={media.alt} />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="hero-video-grade object-cover"
          />
        )}
        <div
          className={cn(
            "absolute inset-0",
            isHome
              ? "bg-gradient-to-t from-paper via-knit/55 to-knit/20 dark:from-charcoal dark:via-charcoal/55 dark:to-charcoal/25"
              : "bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/50",
          )}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
        <div className="max-w-3xl space-y-5">
          <h1
            className={cn(
              "font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl",
              !isHome && "text-white",
            )}
          >
            {headline}
          </h1>
          <p
            className={cn(
              "font-display max-w-2xl text-lg md:text-xl",
              isHome ? "text-graphite dark:text-white/80" : "text-white/80",
            )}
          >
            {subhead}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              href={primaryCTA.href}
              size="lg"
              className={
                isHome
                  ? "bg-ink text-paper hover:bg-ink/90 dark:bg-white dark:text-charcoal dark:hover:bg-white/90"
                  : "bg-white text-charcoal hover:bg-white/90"
              }
            >
              {primaryCTA.label}
            </Button>
            {secondaryCTA ? (
              <Button
                href={secondaryCTA.href}
                variant="secondary"
                size="lg"
                className={
                  isHome
                    ? "border-ink/20 text-ink hover:border-ink hover:text-ink dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:text-white"
                    : "border-white/20 text-white hover:border-white hover:text-white"
                }
              >
                {secondaryCTA.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
