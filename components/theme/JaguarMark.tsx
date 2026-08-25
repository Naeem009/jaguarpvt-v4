import { cn } from "@/lib/utils";

/** Five concentric J strokes: three stemmed bars + two inner arc segments. */
export const JAGUAR_MARK_PATHS = [
  "M569.76 623.66 A 158 158 0 0 1 460 668",
  "M623.94 679.76 A 236 236 0 0 1 460 746",
  "M774 72 L 774 510 A 314 314 0 0 1 460 824",
  "M852 72 L 852 510 A 392 392 0 0 1 460 902",
  "M930 72 L 930 510 A 470 470 0 0 1 460 980",
] as const;

export const JAGUAR_MARK_VIEWBOX = "400 40 580 990";
export const JAGUAR_MARK_STROKE = 26;

export function JaguarMark({
  className,
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox={JAGUAR_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
      shapeRendering="geometricPrecision"
      aria-hidden
    >
      {JAGUAR_MARK_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          stroke={stroke}
          strokeWidth={JAGUAR_MARK_STROKE}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={1}
        />
      ))}
    </svg>
  );
}
