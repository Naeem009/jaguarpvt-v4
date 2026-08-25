import { getCustomerLogos } from "@/lib/customers/logos";
import { CustomerLogoMarquee } from "@/components/sections/CustomerLogoMarquee";
import { cn } from "@/lib/utils";

const FALLBACK_PARTNERS = [
  "Inditex",
  "Zara",
  "Pull&Bear",
  "Stradivarius",
  "Mango",
  "ASOS",
  "PrettyLittleThing",
  "Boohoo",
  "Dunnes",
  "George",
];

export function Partners({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const logos = getCustomerLogos();

  return (
    <section className={cn("border-t border-ink/8 bg-paper-muted py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="mb-10 text-center font-display text-sm font-semibold uppercase tracking-[0.28em] text-ink md:mb-12">
          {title}
        </h2>
        {logos.length > 0 ? (
          <CustomerLogoMarquee logos={logos} />
        ) : (
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {FALLBACK_PARTNERS.map((name) => (
              <li
                key={name}
                className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-graphite/80"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
