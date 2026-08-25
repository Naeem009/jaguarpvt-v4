import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/theme/BrandLogo";
import { HeroBackdrop } from "./HeroBackdrop";
import type { HeroMedia } from "./Hero";

export function HomeHero({
  tagline,
  established,
  headline,
  subhead,
  ctaLabel,
  ctaHref,
  media,
}: {
  tagline: string;
  established: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  media: HeroMedia;
}) {
  const clips = media.type === "video" ? (media.clips && media.clips.length > 0 ? media.clips : [media.src]) : [];

  return (
    <section
      id="home-hero"
      className="hero-cinematic relative isolate flex min-h-dvh items-center overflow-hidden bg-charcoal text-ink dark:text-white"
    >
      <div className="absolute inset-0">
        {media.type === "video" ? (
          <HeroBackdrop clips={clips} poster={media.poster} alt={media.alt} />
        ) : (
          <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="hero-video-grade object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/35 via-paper/50 to-paper/80 dark:from-charcoal/45 dark:via-charcoal/55 dark:to-charcoal/80" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-20 pt-28 text-center md:px-6 md:pb-24 md:pt-32">
        <BrandLogo variant="stacked" className="mb-5" />
        <p className="font-display text-[0.7rem] font-medium uppercase tracking-[0.42em] text-graphite dark:text-white/70 sm:text-xs">
          {tagline}
        </p>
        <p className="mt-2 font-display text-[0.65rem] uppercase tracking-[0.36em] text-graphite dark:text-white/55">
          {established}
        </p>
        <h1 className="mt-10 max-w-3xl font-display text-3xl font-semibold tracking-[-0.02em] text-ink dark:text-white md:text-5xl lg:text-[3.25rem]">
          {headline}
        </h1>
        <p className="mt-5 max-w-2xl font-display text-base text-graphite dark:text-white/75 md:text-lg">
          {subhead}
        </p>
        <Button
          href={ctaHref}
          variant="secondary"
          size="lg"
          className="mt-8 border-ink/35 bg-transparent px-8 tracking-[0.12em] uppercase text-ink hover:border-ink hover:bg-ink hover:text-paper dark:border-white/40 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-charcoal"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
