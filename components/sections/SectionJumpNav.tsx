import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionPaddingCompactClass } from "@/lib/layout/section";
import { cn } from "@/lib/utils";

export type SectionJumpLink = {
  href: string;
  label: string;
};

export type SectionJumpNavProps = {
  id: string;
  eyebrow: string;
  title: string;
  subhead: string;
  links: SectionJumpLink[];
  className?: string;
};

export function SectionJumpNav({
  id,
  eyebrow,
  title,
  subhead,
  links,
  className,
}: SectionJumpNavProps) {
  return (
    <section id={id} className={cn("bg-paper", sectionPaddingCompactClass, className)}>
      <SectionContainer>
        <SectionHeading
          align="center"
          eyebrow={eyebrow}
          title={title}
          subhead={subhead}
          className="mb-10"
        />
        <nav
          aria-label={eyebrow}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-ink/8 py-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.16em] text-graphite transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SectionContainer>
    </section>
  );
}
