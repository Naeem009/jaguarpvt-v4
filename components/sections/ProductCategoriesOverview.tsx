import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionPaddingCompactClass } from "@/lib/layout/section";
import type { ProductCategoryContent } from "@/lib/products/content";
import { cn } from "@/lib/utils";

function highlightSpecs(specs: ProductCategoryContent["specs"]) {
  return specs.filter((spec) => !spec.value.includes("[")).slice(0, 3);
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export async function ProductCategoriesOverview({
  categories,
}: {
  categories: ProductCategoryContent[];
}) {
  const t = await getTranslations("productsHub");
  const tCategories = await getTranslations("productCategories");

  return (
    <div id="categories">
      <section className={cn("bg-paper", sectionPaddingCompactClass)}>
        <SectionContainer>
          <SectionHeading
            align="center"
            eyebrow={t("overview.eyebrow")}
            title={t("overview.title")}
            subhead={t("overview.subhead")}
            className="mb-10"
          />
          <nav
            aria-label={t("overview.eyebrow")}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-ink/8 py-4"
          >
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="text-xs font-medium uppercase tracking-[0.16em] text-graphite transition-colors hover:text-ink"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </SectionContainer>
      </section>

      {categories.map((category, index) => {
        const imageStart = index % 2 === 0;
        const specs = highlightSpecs(category.specs);

        return (
          <section
            key={category.slug}
            id={category.slug}
            className={cn(
              "scroll-mt-24",
              sectionPaddingCompactClass,
              index % 2 === 0 ? "bg-paper-muted" : "bg-paper",
            )}
          >
            <SectionContainer>
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={cn("lg:col-span-5", !imageStart && "lg:order-2")}>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-ink/5">
                    <Image
                      src={category.heroImage}
                      alt={tCategories("heroAlt", { category: category.name })}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={cn("lg:col-span-7", !imageStart && "lg:order-1")}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-graphite">
                    {padIndex(index)} / 06
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
                    {category.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
                    {category.subhead}
                  </p>

                  {specs.length > 0 ? (
                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      {specs.map((spec) => (
                        <div key={spec.label} className="border-t border-ink/8 pt-3">
                          <dt className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
                            {spec.label}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-graphite">
                    {category.sustainability.body}
                  </p>

                  <Link
                    href={`/contact?category=${category.slug}`}
                    className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {t("overview.discuss")}
                  </Link>
                </div>
              </div>
            </SectionContainer>
          </section>
        );
      })}
    </div>
  );
}
