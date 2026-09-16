import type {
  IndicatorInterpretation,
  IndicatorUnit,
  ObservationStatus,
} from "@/lib/nfhs/types";

export function formatValue(
  value: number | null,
  status: ObservationStatus,
  unit: IndicatorUnit,
): string {
  if (status === "suppressed") {
    return "*";
  }

  if (status === "missing" || value === null) {
    return "—";
  }

  const formatted =
    unit === "count"
      ? new Intl.NumberFormat("en-IN").format(value)
      : value.toFixed(1);
  const withUnit = unit === "percent" ? `${formatted}%` : formatted;

  return status === "caution" ? `(${withUnit})` : withUnit;
}

export function formatChange(
  current: number | null,
  previous: number | null,
  unit: IndicatorUnit,
): string {
  if (current === null || previous === null) {
    return "Not comparable";
  }

  const change = current - previous;
  const sign = change > 0 ? "+" : "";
  const suffix = unit === "percent" ? " pp" : "";

  return `${sign}${change.toFixed(1)}${suffix}`;
}

export function interpretChange(
  current: number | null,
  previous: number | null,
  interpretation: IndicatorInterpretation,
): "positive" | "negative" | "neutral" {
  if (
    current === null ||
    previous === null ||
    current === previous ||
    interpretation === "neutral"
  ) {
    return "neutral";
  }

  const increased = current > previous;
  const positive =
    interpretation === "higher-is-better" ? increased : !increased;

  return positive ? "positive" : "negative";
}
