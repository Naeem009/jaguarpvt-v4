import { cn } from "@/lib/utils";

type Highlight = {
  value: string;
  label: string;
  icon: "years" | "output" | "facility" | "global";
};

function HighlightIcon({ name }: { name: Highlight["icon"] }) {
  const common = "size-10 stroke-ink dark:stroke-white";
  if (name === "years") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden>
        <circle cx="20" cy="20" r="13" strokeWidth="1.4" />
        <path d="M20 12v8l5 3" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "output") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden>
        <path d="M10 28 20 8l10 20" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M13 22h14" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "facility") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden>
        <path d="M8 30V16l8-6 8 6v14H8Z" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M24 30V18h8v12" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden>
      <circle cx="20" cy="20" r="12" strokeWidth="1.4" />
      <path d="M8 20h24M20 8c3.5 4 5.5 8 5.5 12S23.5 28 20 32c-3.5-4-5.5-8-5.5-12S16.5 12 20 8Z" strokeWidth="1.4" />
    </svg>
  );
}

export function HomeHighlights({
  items,
  className,
}: {
  items: Highlight[];
  className?: string;
}) {
  return (
    <section className={cn("border-y border-ink/8 bg-paper py-14 md:py-16", className)}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center">
            <HighlightIcon name={item.icon} />
            {item.value ? (
              <p className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                {item.value}
              </p>
            ) : (
              <div className="mt-4" />
            )}
            <p className="mt-1 max-w-[12rem] text-xs font-medium uppercase tracking-[0.16em] text-graphite">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
