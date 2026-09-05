"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  FACILITY_PLACEHOLDER_IMAGE,
  getFacilityThumbnailCandidates,
  type Facility,
} from "@/lib/facilities/types";
import type { ProductCategorySlug } from "@/lib/products/content";
import { cn } from "@/lib/utils";

export type FacilityCardProps = {
  facility: Facility;
  variant?: "popover" | "list";
  selected?: boolean;
  className?: string;
  onSelect?: () => void;
  onFocusMarker?: () => void;
};

export function FacilityCard({
  facility,
  variant = "list",
  selected = false,
  className,
  onSelect,
  onFocusMarker,
}: FacilityCardProps) {
  const t = useTranslations("facilityMap");
  const tCategories = useTranslations("facilityMap.categories");
  const candidates = useMemo(
    () => getFacilityThumbnailCandidates(facility.slug),
    [facility.slug],
  );
  const [candidateIndex, setCandidateIndex] = useState(() =>
    Math.max(0, candidates.indexOf(facility.thumbnail)),
  );
  const [expanded, setExpanded] = useState(false);
  const imageSrc = candidates[candidateIndex] ?? FACILITY_PLACEHOLDER_IMAGE;
  const hasDetails =
    Boolean(facility.units?.length) ||
    Boolean(facility.capabilities?.length) ||
    facility.categories.length > 0 ||
    facility.certifications.length > 0 ||
    Boolean(facility.website) ||
    facility.description.length > 140;

  function handleImageError() {
    setCandidateIndex((current) => {
      const next = current + 1;
      return next < candidates.length ? next : current;
    });
  }

  function handleCardClick() {
    onSelect?.();
  }

  useEffect(() => {
    setExpanded(false);
  }, [facility.id]);

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onSelect) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  }

  return (
    <Card
      variant={variant === "list" ? "interactive" : "default"}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "overflow-hidden p-0",
        variant === "list" && "flex w-full flex-col",
        variant === "popover" && "w-full max-w-md shadow-[var(--shadow-card-hover)]",
        selected && "ring-2 ring-accent ring-offset-2",
        onSelect && "cursor-pointer text-start",
        className,
      )}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onMouseEnter={onFocusMarker}
      onFocus={onFocusMarker}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink/5">
        <Image
          src={imageSrc}
          alt={t("card.facilityAlt", { name: facility.name })}
          fill
          sizes={variant === "popover" ? "320px" : "(max-width: 768px) 100vw, 400px"}
          className="object-cover object-center"
          onError={handleImageError}
        />
      </div>

      <div
        className={cn(
          "space-y-4 p-6",
          variant === "list" && "flex flex-1 flex-col",
        )}
      >
        <div className="space-y-2">
          <h3 className="font-display text-xl font-semibold text-ink">{facility.name}</h3>
          <p className="text-sm text-graphite">
            {facility.city}, {facility.country}
          </p>
        </div>

        <p
          className={cn(
            "text-sm leading-relaxed text-graphite",
            !expanded && "line-clamp-2",
          )}
        >
          {facility.description}
        </p>

        {facility.employees != null || facility.monthlyCapacity || facility.establishedYear != null ? (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {facility.employees != null ? (
              <div>
                <dt className="font-medium text-graphite">{t("card.employees")}</dt>
                <dd className="text-ink">{facility.employees.toLocaleString()}+</dd>
              </div>
            ) : null}
            {facility.monthlyCapacity ? (
              <div>
                <dt className="font-medium text-graphite">{t("card.monthlyCapacity")}</dt>
                <dd className="text-ink">{facility.monthlyCapacity}</dd>
              </div>
            ) : null}
            {facility.establishedYear != null ? (
              <div>
                <dt className="font-medium text-graphite">{t("card.established")}</dt>
                <dd className="text-ink">{facility.establishedYear}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {expanded ? (
          <div className="space-y-4">
            {facility.units && facility.units.length > 0 ? (
              <div>
                <p className="mb-2 text-sm font-medium text-graphite">{t("card.facilities")}</p>
                <ul className="space-y-2">
                  {facility.units.map((unit) => (
                    <li key={unit.id}>
                      <p className="text-sm font-semibold text-ink">{unit.name}</p>
                      <p className="text-sm leading-relaxed text-graphite">{unit.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : facility.capabilities && facility.capabilities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {facility.capabilities.map((capability) => (
                  <Badge key={capability} tone="accent">
                    {capability}
                  </Badge>
                ))}
              </div>
            ) : null}

            {facility.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {facility.categories.map((category) => (
                  <Badge key={category} tone="neutral">
                    {tCategories(category as ProductCategorySlug)}
                  </Badge>
                ))}
              </div>
            ) : null}

            {facility.certifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {facility.certifications.map((certification) => (
                  <Badge key={certification} tone="accent">
                    {certification}
                  </Badge>
                ))}
              </div>
            ) : null}

            {facility.website && variant === "list" ? (
              <p className="text-sm text-graphite">{new URL(facility.website).hostname.replace(/^www\./, "")}</p>
            ) : null}
            {facility.website && variant === "popover" ? (
              <a
                href={facility.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
                onClick={(event) => event.stopPropagation()}
              >
                {t("card.website")}
              </a>
            ) : null}
          </div>
        ) : null}

        {hasDetails ? (
          <button
            type="button"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            aria-expanded={expanded}
            onClick={(event) => {
              event.stopPropagation();
              setExpanded((current) => !current);
            }}
          >
            {expanded ? t("card.readLess") : t("card.readMore")}
          </button>
        ) : null}
      </div>
    </Card>
  );
}
