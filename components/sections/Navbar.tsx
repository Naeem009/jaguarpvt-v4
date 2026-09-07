"use client";

import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/theme/BrandLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

function navLinkClass(isOverlayNav: boolean) {
  return cn(
    "text-xs font-medium uppercase tracking-[0.16em] transition-colors",
    isOverlayNav
      ? "text-ink hover:text-ink/70 dark:text-white dark:hover:text-white/80"
      : "text-ink hover:text-accent",
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/" || pathname === "";
  const isOverlayNav = isHome && !scrolled;

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    let raf = 0;

    function updateNavState() {
      const navHeight = headerRef.current?.offsetHeight ?? 72;
      const hero = document.getElementById("home-hero");

      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        // Solid once the hero moves up (navbar no longer over hero media) or user has scrolled meaningfully.
        setScrolled(heroRect.top < -16 || scrollTop > 96 || heroRect.bottom <= navHeight);
        return;
      }

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(scrollTop > navHeight);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateNavState);
    }

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const hero = document.getElementById("home-hero");
    const resizeObserver = hero ? new ResizeObserver(scheduleUpdate) : null;
    if (hero && resizeObserver) {
      resizeObserver.observe(hero);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setMobileOpen(false);
  }, [pathname]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  const mobileMenu =
    mobileOpen && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden" role="dialog" aria-modal="true" aria-label={t("menu")}>
            <button
              type="button"
              className="absolute inset-0 bg-charcoal/50"
              aria-label={t("closeMenuOverlay")}
              onClick={closeMobileMenu}
            />
            <div className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-paper shadow-[var(--shadow-card-hover)]">
              <div className="flex items-center justify-between border-b border-ink/8 px-4 py-4">
                <p className="font-medium text-ink">{t("menu")}</p>
                <button type="button" onClick={closeMobileMenu} aria-label={t("closeMenu")}>
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <Link href="/" className="mb-6 inline-flex" onClick={closeMobileMenu}>
                  <BrandLogo />
                </Link>

                <div className="space-y-4">
                  <Link href="/about" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("about")}
                  </Link>
                  <Link href="/products" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("products")}
                  </Link>
                  <Link href="/our-impact" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("sustainability")}
                  </Link>

                  <Link href="/facility" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("capabilities")}
                  </Link>
                  <Link href="/careers" className="block text-base font-medium text-ink" onClick={closeMobileMenu}>
                    {t("careers")}
                  </Link>

                  <div className="pt-2">
                    <p className="mb-3 text-sm font-medium text-graphite">{t("language")}</p>
                    <LanguageSwitcher variant="chips" />
                  </div>
                </div>
              </div>

              <div className="border-t border-ink/8 p-4">
                <Button href="/contact" className="w-full">
                  {tCommon("contact")}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
          isHome ? "fixed" : "sticky",
          isOverlayNav
            ? "border-b border-transparent bg-transparent"
            : "border-b border-ink/8 bg-paper/95 backdrop-blur-md supports-[backdrop-filter]:bg-paper/90",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="shrink-0">
            <BrandLogo priority />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            <Link href="/about" className={navLinkClass(isOverlayNav)}>
              {t("about")}
            </Link>
            <Link href="/facility" className={navLinkClass(isOverlayNav)}>
              {t("capabilities")}
            </Link>
            <Link href="/products" className={navLinkClass(isOverlayNav)}>
              {t("products")}
            </Link>
            <Link href="/our-impact" className={navLinkClass(isOverlayNav)}>
              {t("sustainability")}
            </Link>
            <Link href="/careers" className={navLinkClass(isOverlayNav)}>
              {t("careers")}
            </Link>
            <Link href="/contact" className={navLinkClass(isOverlayNav)}>
              {t("contact")}
            </Link>
            <LanguageSwitcher inverted={isOverlayNav} />
          </nav>

          <button
            type="button"
            className={cn(
              "inline-flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-full border lg:hidden",
              isOverlayNav
                ? "border-ink/20 bg-paper/40 text-ink dark:border-white/20 dark:bg-white/10 dark:text-white"
                : "border-ink/10 bg-paper text-ink",
            )}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            onPointerUp={(event) => {
              event.preventDefault();
              setMobileOpen((value) => !value);
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
