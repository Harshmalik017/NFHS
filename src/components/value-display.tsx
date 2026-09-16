import { AlertTriangle, CircleSlash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatValue } from "@/lib/nfhs/format";
import type { IndicatorUnit, ObservationStatus } from "@/lib/nfhs/types";
import { cn } from "@/lib/utils";

export function ValueDisplay({
  value,
  status,
  unit,
  className,
  showStatus = true,
}: {
  value: number | null;
  status: ObservationStatus;
  unit: IndicatorUnit;
  className?: string;
  showStatus?: boolean;
}) {
  const label =
    status === "caution"
      ? "Small sample"
      : status === "suppressed"
        ? "Suppressed"
        : status === "missing"
          ? "Not available"
          : null;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <span className="font-semibold tabular-nums">
        {formatValue(value, status, unit)}
      </span>
      {showStatus && label ? (
        <Badge
          variant="outline"
          className={cn(
            "gap-1 font-normal",
            status === "caution" &&
              "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200",
          )}
        >
          {status === "caution" ? (
            <AlertTriangle className="size-3" aria-hidden="true" />
          ) : (
            <CircleSlash2 className="size-3" aria-hidden="true" />
          )}
          {label}
        </Badge>
      ) : null}
    </span>
  );
}

/**
 * Renders a survey-round value as a labeled pill, used where a secondary
 * comparison value (such as NFHS-5) should read as distinct from a primary
 * value rather than compete with it in the same text style.
 */
export function ValuePill({
  label,
  value,
  status,
  unit,
  tone = "neutral",
  className,
}: {
  label: string;
  value: number | null;
  status: ObservationStatus;
  unit: IndicatorUnit;
  tone?: "neutral" | "primary";
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-medium tabular-nums",
        tone === "primary"
          ? "border-primary/30 bg-primary/10 text-primary"
          : undefined,
        className,
      )}
      style={
        tone === "neutral"
          ? {
              borderColor:
                "color-mix(in oklch, var(--data-nfhs-5) 45%, var(--border))",
              backgroundColor:
                "color-mix(in oklch, var(--data-nfhs-5) 12%, transparent)",
              color: "color-mix(in oklch, var(--data-nfhs-5) 70%, var(--foreground))",
            }
          : undefined
      }
    >
      <span className="text-[0.65rem] font-semibold tracking-wide uppercase opacity-70">
        {label}
      </span>
      {formatValue(value, status, unit)}
    </Badge>
  );
}
