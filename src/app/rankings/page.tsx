import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  RankingsView,
  type RankingObservation,
} from "@/components/rankings-view";
import {
  districtIndicators,
  districts,
  getDistrictRows,
} from "@/lib/nfhs/data";

export const metadata: Metadata = {
  title: "District rankings",
  description:
    "Rank all 75 Uttar Pradesh districts by any of 93 provisional NFHS-6 district indicators.",
};

const rankingIndicators = districtIndicators.map(
  ({ id, label, unit, interpretation }) => ({
    id,
    label,
    unit,
    interpretation,
  }),
);

const rankingObservations: RankingObservation[] = districts.flatMap(
  (district) =>
    getDistrictRows(district.slug).map((row) => ({
      districtSlug: district.slug,
      districtName: district.name,
      indicatorId: row.indicatorId,
      value: row.nfhs6,
      status: row.nfhs6Status,
    })),
);

export default function RankingsPage() {
  return (
    <PageShell
      eyebrow="District rankings"
      title="See the distribution behind each indicator"
      description="Rank all 75 Uttar Pradesh districts by any of the 93 district indicators reported for NFHS-6."
    >
      <div className="space-y-8">
        <section aria-labelledby="ranking-guidance" className="space-y-2">
          <h2 id="ranking-guidance" className="section-heading">
            Rankings are not an overall score
          </h2>
          <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
            Rank 1 is the highest reported NFHS-6 value for the selected
            indicator, with equal values sharing a rank. A higher value is not
            always a better outcome, so use the interpretation shown with each
            indicator. Districts without a numeric estimate are excluded.
          </p>
        </section>

        <RankingsView
          indicators={rankingIndicators}
          observations={rankingObservations}
        />
      </div>
    </PageShell>
  );
}
