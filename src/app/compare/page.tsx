import type { Metadata } from "next";

import { ComparisonView } from "@/components/comparison-view";
import { PageShell } from "@/components/page-shell";
import {
  districtIndicators,
  districts,
  getDistrictRows,
} from "@/lib/nfhs/data";

export const metadata: Metadata = {
  title: "Compare districts",
  description:
    "Compare NFHS-6 and NFHS-5 estimates across all 75 Uttar Pradesh districts and 93 district indicators.",
};

const comparisonDistricts = districts.map(({ id, slug, name }) => ({
  id,
  slug,
  name,
}));

const comparisonIndicators = districtIndicators.map(
  ({ id, label, unit }) => ({
    id,
    label,
    unit,
  }),
);

const comparisonValues = districts.flatMap((district) =>
  getDistrictRows(district.slug).map((row) => ({
    districtId: district.id,
    indicatorId: row.indicatorId,
    nfhs6: row.nfhs6,
    nfhs5: row.nfhs5,
    nfhs6Status: row.nfhs6Status,
    nfhs5Status: row.nfhs5Status,
  })),
);

export default function ComparePage() {
  return (
    <PageShell
      eyebrow="District Performance"
    >
      <ComparisonView
        districts={comparisonDistricts}
        indicators={comparisonIndicators}
        values={comparisonValues}
      />
    </PageShell>
  );
}
