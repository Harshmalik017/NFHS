import type { NfhsDataset } from "@/data/nfhs";

function quoteCsvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function buildStateIndicatorsCsv(data: NfhsDataset): string {
  const header = ["Indicator No.", "Indicator", "NFHS-6 Total", "NFHS-5 Total"];
  const labelById = new Map(
    data.stateIndicatorCatalog.map((indicator) => [indicator.id, indicator.label]),
  );

  const rows = data.state.indicators.map((indicator) => [
    String(indicator.id),
    labelById.get(indicator.id) ?? `Indicator ${indicator.id}`,
    indicator.nfhs6.total.raw ?? "—",
    indicator.nfhs5.total.raw ?? "—",
  ]);

  return [header, ...rows]
    .map((row) => row.map((cell) => quoteCsvCell(cell)).join(","))
    .join("\n");
}
