import { groupPartners } from "@/lib/partners/content";
import { cn } from "@/lib/utils";

export function Partners({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-ink/8 bg-paper py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="mb-10 text-center font-display text-sm font-semibold uppercase tracking-[0.28em] text-ink md:mb-12">
          {title}
        </h2>
        <ul className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12">
          {groupPartners.map((partner) => {
            const label = partner.location ? `${partner.name}, ${partner.location}` : partner.name;
            return (
              <li key={partner.id}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center justify-center gap-6 rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper-muted px-8 py-10 transition-colors hover:border-ink/20"
                >
                  <span className="flex h-24 w-full items-center justify-center md:h-28">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={partner.logo.src}
                      alt=""
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={cn(
                        "max-h-20 w-auto max-w-full object-contain md:max-h-24",
                        partner.invertInDark && "dark:invert",
                      )}
                    />
                  </span>
                  <span className="text-center font-display text-xs font-semibold uppercase tracking-[0.22em] text-ink">
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
