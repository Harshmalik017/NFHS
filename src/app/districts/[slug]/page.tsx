import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Apple,
  Baby,
  CalendarDays,
  ChartColumnBig,
  Cigarette,
  Droplets,
  Heart,
  Hospital,
  House,
  Shield,
  Stethoscope,
  Syringe,
  User,
  Users,
  Utensils,
  Venus,
  type LucideIcon,
} from "lucide-react";

import { DistrictMiniMap } from "@/components/district-mini-map";
import { DistrictProfileDownloads } from "@/components/district-profile-downloads";
import { DistrictPrintFooter } from "@/components/district-print-footer";
import { IndicatorTable } from "@/components/indicator-table";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  districts,
  getDistrict,
  getDistrictRows,
  indicatorCategories,
} from "@/lib/nfhs/data";

type DistrictPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryIcons: Record<string, LucideIcon> = {
  "population-household": House,
  "adult-characteristics": User,
  "marriage-fertility": Heart,
  "family-planning": CalendarDays,
  "unmet-need": AlertTriangle,
  "antenatal-care": Stethoscope,
  "delivery-care": Hospital,
  "postnatal-care": Baby,
  vaccination: Syringe,
  "childhood-disease": Shield,
  "child-nutrition": Apple,
  "adult-nutrition": Utensils,
  "blood-sugar": Droplets,
  hypertension: Activity,
  "womens-empowerment": Venus,
  "tobacco-alcohol": Cigarette,
};

export function generateStaticParams() {
  return districts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DistrictPageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrict(slug);

  if (!district) {
    return {
      title: "District not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${district.name} district factsheet`,
    description: `Explore sample sizes and all 93 provisional NFHS-6 indicators for ${district.name}, Uttar Pradesh, with NFHS-5 comparisons.`,
  };
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { slug } = await params;
  const district = getDistrict(slug);

  if (!district) {
    notFound();
  }

  const rows = getDistrictRows(slug);
  const groupedIndicators = indicatorCategories.map((category) => ({
    ...category,
    rows: rows.filter(
      (row) => row.indicator.categoryId === category.id,
    ),
  }));

  return (
    <PageShell
      eyebrow="District factsheet"
      title={district.name}
      alignHeaderTop
      headerExtra={
        <section aria-labelledby="sample-size" className="pt-2">
          <h2
            id="sample-size"
            className="flex items-center gap-2 text-3xl font-semibold tracking-tight"
          >
            <Users className="size-6 text-primary" aria-hidden="true" />
            Sample Size (NFHS-6)
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border bg-card px-3 py-2.5">
              <p className="text-xs text-muted-foreground">Households</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">
                {district.sampleSize.households.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg border bg-card px-3 py-2.5">
              <p className="text-xs text-muted-foreground">Women</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">
                {district.sampleSize.women.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg border bg-card px-3 py-2.5">
              <p className="text-xs text-muted-foreground">Men</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">
                {district.sampleSize.men.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </section>
      }
      actions={
        <div className="district-factsheet-actions flex w-full max-w-[360px] flex-col gap-3 print:mt-4 print:max-w-none">
          <DistrictProfileDownloads districtName={district.name} rows={rows} />
          <DistrictMiniMap districtName={district.name} />
        </div>
      }
    >
      <div className="space-y-10">
        <section aria-labelledby="indicator-results" className="space-y-10">
          <div>
            <div>
              <p className="eyebrow">District fact sheet</p>
              <h2
                id="indicator-results"
                className="section-heading mt-2 flex items-center gap-2"
              >
                <ChartColumnBig className="size-5 text-primary" aria-hidden="true" />
                All {rows.length} indicators
              </h2>
            </div>
          </div>

          {groupedIndicators.map((category) => {
            const CategoryIcon = categoryIcons[category.id] ?? ChartColumnBig;

            return (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h3
                    id={`${category.id}-title`}
                    className="flex items-center gap-2 text-xl font-semibold tracking-tight"
                  >
                    <CategoryIcon className="size-5 text-primary" aria-hidden="true" />
                    {category.label}
                  </h3>
                  <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
                    Indicators {category.start}–{category.end}
                  </Badge>
                </div>
                <IndicatorTable rows={category.rows} />
              </section>
            );
          })}
        </section>
      </div>
      <DistrictPrintFooter />
    </PageShell>
  );
}
