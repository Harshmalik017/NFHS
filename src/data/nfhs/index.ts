import rawData from "./nfhs-up.json";
import nfhs5StateUrbanRuralByLabel from "./nfhs5-state-urban-rural-by-label.json";
import type { NfhsDataset } from "./types";

type StateResidenceByLabelRow = {
  indicator: string;
  urban: number | null;
  rural: number | null;
  total?: number | null;
};

function formatRaw(value: number | null): string | null {
  if (value === null || Number.isNaN(value)) return null;
  return String(value);
}

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function mergeStateUrbanRural(data: NfhsDataset): NfhsDataset {
  const rows = nfhs5StateUrbanRuralByLabel as StateResidenceByLabelRow[];
  const byLabel = new Map(
    rows.map((row) => [normalizeLabel(row.indicator), row]),
  );
  const labelById = new Map(
    data.stateIndicatorCatalog.map((indicator) => [indicator.id, indicator.label]),
  );

  return {
    ...data,
    state: {
      ...data.state,
      indicators: data.state.indicators.map((indicator) => {
        const label = labelById.get(indicator.id) ?? "";
        const row = byLabel.get(normalizeLabel(label));

        const urbanValue = row?.urban ?? null;
        const ruralValue = row?.rural ?? null;

        return {
          ...indicator,
          nfhs5: {
            urban: {
              raw: formatRaw(urbanValue),
              value: urbanValue,
              status: urbanValue === null ? "missing" : "reported",
            },
            rural: {
              raw: formatRaw(ruralValue),
              value: ruralValue,
              status: ruralValue === null ? "missing" : "reported",
            },
            total: {
              raw: indicator.nfhs5.total.raw,
              value: indicator.nfhs5.total.value,
              status: indicator.nfhs5.total.status,
            },
          },
        };
      }),
    },
  };
}

export const nfhsData = mergeStateUrbanRural(rawData as NfhsDataset);
export type * from "./types";
