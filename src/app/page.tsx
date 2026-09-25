import { BarChart3, History, Map as MapIcon, MapPinned } from "lucide-react";

import { DistrictMap } from "@/components/district-map";
import { HomeImageCarousel } from "@/components/home-image-carousel";
import { HomeStateNfhsTable } from "@/components/home-state-nfhs-table";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import {
  districtIndicators,
  nfhsData,
  toObservationStatus,
} from "@/lib/nfhs/data";

export default function HomePage() {
  const mapIndicators = districtIndicators.map((indicator) => ({
    id: indicator.sourceNumber,
    label: indicator.shortLabel,
  }));
  const mapDistricts = nfhsData.districts.map((district) => ({
    id: district.id,
    name: district.name,
    values: district.indicators.map((indicator) => ({
      value: indicator.nfhs6.value,
      status: toObservationStatus(indicator.nfhs6.status),
    })),
  }));
  const stateIndicatorLabels = new Map(
    nfhsData.stateIndicatorCatalog.map((indicator) => [
      indicator.id,
      indicator.label,
    ]),
  );
  const stateRows = nfhsData.state.indicators.map((indicator) => ({
    id: indicator.id,
    label:
      stateIndicatorLabels.get(indicator.id) ?? `Indicator ${indicator.id}`,
    nfhs6: indicator.nfhs6.total.value,
    nfhs5: indicator.nfhs5.total.value,
    nfhs6Status: toObservationStatus(indicator.nfhs6.total.status),
    nfhs5Status: toObservationStatus(indicator.nfhs5.total.status),
  }));

  return (
    <PageShell
      eyebrow="NFHS-6 · 2023-24"
      title="Uttar Pradesh NFHS-6 Performance"
      description="Explore 93 health, nutrition, household, and demographic indicators across all 75 districts, with NFHS-5 comparisons."
    >
      <div className="space-y-12">
        <HomeImageCarousel />

        <section
          aria-label="Compendium coverage"
          className="grid gap-4 sm:grid-cols-3"
        >
          <StatCard
            label="Districts covered"
            value="75"
            className="border-primary/20 bg-primary/5"
            icon={<MapPinned className="size-5" aria-hidden="true" />}
          />
          <StatCard
            label="Indicators per district"
            value="93"
            className="border-primary/20 bg-primary/5"
            icon={<BarChart3 className="size-5" aria-hidden="true" />}
          />
          <StatCard
            label="Survey rounds NFHS-6 (2023-24) and NFHS-5 (2019-21)"
            value="2"
            className="border-primary/20 bg-primary/5"
            icon={<History className="size-5" aria-hidden="true" />}
          />
        </section>

        <section aria-labelledby="district-map" className="space-y-5">
          <div>
            <p className="eyebrow">District map</p>
            <h2
              id="district-map"
              className="section-heading mt-2 flex items-center gap-2"
            >
              <MapIcon className="size-5 text-primary" aria-hidden="true" />
              Performance across districts
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Select any district indicator to open district profile.
            </p>
          </div>
          <DistrictMap indicators={mapIndicators} districts={mapDistricts} />
        </section>

        <HomeStateNfhsTable rows={stateRows} />
      </div>
    </PageShell>
  );
}
