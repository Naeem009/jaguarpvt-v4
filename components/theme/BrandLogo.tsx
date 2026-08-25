import { cn } from "@/lib/utils";
import { JaguarMark } from "@/components/theme/JaguarMark";

export function BrandLogo({
  inverted = false,
  className,
  sizes: _sizes,
  priority: _priority = false,
  variant = "lockup",
}: {
  inverted?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "lockup" | "stacked" | "mark";
}) {
  const wordmark = inverted ? "text-white" : "text-black dark:text-white";

  const mark = <JaguarMark className="h-full w-auto" stroke="currentColor" />;

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex h-10 text-black dark:text-white", className)}>
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
