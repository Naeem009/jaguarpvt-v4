"use client";

import { useTranslations } from "next-intl";
import { FacilityCard } from "./FacilityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Facility } from "@/lib/facilities/types";
import { cn } from "@/lib/utils";

export type FacilityListProps = {
  facilities: Facility[];
  visibleIds?: string[] | null;
  selectedId?: string | null;
  onSelect?: (facilityId: string) => void;
  className?: string;
};

export function FacilityList({
  facilities,
  visibleIds,
  selectedId,
  onSelect,
  className,
}: FacilityListProps) {
  const t = useTranslations("facilityMap.list");
  const filteredFacilities =
    visibleIds == null
      ? facilities
      : facilities.filter((facility) => visibleIds.includes(facility.id));

  return (
    <section className={cn("bg-paper py-16 md:py-24", className)} aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subhead={t("subhead")}
          className="mb-10 md:mb-12"
        />

        {filteredFacilities.length === 0 ? (
          <p className="rounded-[var(--radius-card-lg)] border border-ink/8 bg-paper p-8 text-sm text-graphite">
            {t("empty")}
          </p>
        ) : (
          <ul className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredFacilities.map((facility) => (
              <li key={facility.id}>
                <FacilityCard
                  facility={facility}
                  variant="list"
                  selected={selectedId === facility.id}
                  onSelect={() => onSelect?.(facility.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
