"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  const t = useTranslations("nav");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? (isDark ? t("switchToLight") : t("switchToDark")) : t("theme")}
      title={mounted ? (isDark ? t("switchToLight") : t("switchToDark")) : t("theme")}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border transition-colors",
        inverted
          ? "border-white/20 text-white hover:border-white"
          : "border-ink/10 text-ink hover:border-accent",
        className,
      )}
    >
      {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <span className="size-4" aria-hidden />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M18.01 5.99l1.06-1.06" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.75]">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z" />
    </svg>
  );
}
