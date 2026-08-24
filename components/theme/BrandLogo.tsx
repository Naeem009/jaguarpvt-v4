import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_DARK_SRC = "/logos/logo-dark.svg";
const LOGO_LIGHT_SRC = "/logos/logo-light.svg";

export function BrandLogo({
  inverted = false,
  className,
  sizes,
  priority = false,
}: {
  inverted?: boolean;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const imageClass = cn("object-contain object-start", className);

  if (inverted) {
    return (
      <Image
        src={LOGO_LIGHT_SRC}
        alt="Jaguar (Pvt) Ltd."
        fill
        sizes={sizes}
        className={imageClass}
        priority={priority}
      />
    );
  }

  return (
    <>
      <Image
        src={LOGO_DARK_SRC}
        alt="Jaguar (Pvt) Ltd."
        fill
        sizes={sizes}
        className={cn(imageClass, "dark:hidden")}
        priority={priority}
      />
      <Image
        src={LOGO_LIGHT_SRC}
        alt="Jaguar (Pvt) Ltd."
        fill
        sizes={sizes}
        className={cn(imageClass, "hidden dark:block")}
        priority={priority}
      />
    </>
  );
}
