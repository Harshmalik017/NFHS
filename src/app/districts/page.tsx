import type { Metadata } from "next";
import { BarChart3, Home, MapPinned, TableProperties } from "lucide-react";

import {
  DistrictExplorer,
  type DistrictExplorerItem,
} from "@/components/district-explorer";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { districtIndicators, districts } from "@/lib/nfhs/data";

export const metadata: Metadata = {
  title: "Sample size explorer",
  description:
    "Search all 75 Uttar Pradesh districts and inspect sample sizes for households, women, and men.",
};

const explorerDistricts: DistrictExplorerItem[] = districts.map(
  ({ slug, name, sampleSize }) => ({
    slug,
    name,
    ...sampleSize,
  }),
);

const totalHouseholds = districts.reduce(
  (total, district) => total + district.sampleSize.households,
  0,
);

export default function DistrictsPage() {
  return (
    <PageShell
      eyebrow="Sample size explorer"
      title="Survey sample sizes for every Uttar Pradesh district"
      description="Search all 75 districts and review completed interview counts for households, women, and men."
      actions={
        <Badge variant="secondary" className="h-7 px-3">
          NFHS-6 · 2023-24
        </Badge>
      }
    >
      <div className="space-y-10">
        <section
          aria-label="District data coverage"
          className="grid gap-4 sm:grid-cols-3"
        >
          <StatCard
            label="Districts listed"
            value={districts.length.toLocaleString("en-IN")}
            detail="Complete coverage of Uttar Pradesh"
            icon={<MapPinned className="size-5" aria-hidden="true" />}
          />
          <StatCard
            label="Indicators per district"
            value={districtIndicators.length.toLocaleString("en-IN")}
            detail="Available in the district profile pages"
            icon={<BarChart3 className="size-5" aria-hidden="true" />}
          />
          <StatCard
            label="Households interviewed"
            value={totalHouseholds.toLocaleString("en-IN")}
            detail="Combined district fact-sheet sample"
            icon={<Home className="size-5" aria-hidden="true" />}
          />
        </section>

        <section aria-labelledby="district-list" className="space-y-5">
          <div className="max-w-3xl">
            <p className="eyebrow">Sample-size table</p>
            <h2 id="district-list" className="section-heading mt-2 flex items-center gap-2">
              <TableProperties className="size-5 text-primary" aria-hidden="true" />
              Find a district profile by sample size
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Download this table as CSV or open any district for full indicator
              details.
            </p>
          </div>
          <DistrictExplorer districts={explorerDistricts} />
        </section>
      </div>
    </PageShell>
  );
}
