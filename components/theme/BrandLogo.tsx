import { cn } from "@/lib/utils";

const MARK = {
  src: "/logos/jaguar-mark.png",
  width: 998,
  height: 1475,
} as const;

export function BrandLogo({
  inverted = false,
  className,
  sizes: _sizes,
  priority = false,
  variant = "lockup",
}: {
  inverted?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "lockup" | "stacked" | "mark";
}) {
  const wordmark = inverted ? "text-white" : "text-black dark:text-white";
  const markFilter = inverted ? "invert" : "dark:invert";

  const mark = (
    // Native img keeps the original silhouette sharp (no optimizer resampling).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={MARK.src}
      alt=""
      width={MARK.width}
      height={MARK.height}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("h-full w-auto object-contain object-center", markFilter)}
    />
  );

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex h-10", className)}>
        {mark}
        <span className="sr-only">Jaguar (Pvt) Ltd.</span>
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center", wordmark, className)}>
        <span className="inline-flex h-[5.5rem] sm:h-28 md:h-36 lg:h-44">{mark}</span>
        <span className="mt-5 font-display text-2xl font-semibold tracking-[0.42em] sm:text-3xl md:text-4xl lg:text-5xl">
          JAGUAR
        </span>
        <span className="sr-only">(Pvt) Ltd.</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", wordmark, className)}>
      <span className="inline-flex h-10 sm:h-11">{mark}</span>
      <span className="font-display text-sm font-semibold tracking-[0.38em] sm:text-base">JAGUAR</span>
      <span className="sr-only">(Pvt) Ltd.</span>
    </span>
  );
}
