"use client";

import { useMemo, useState } from "react";
import type { Feature, FeatureCollection } from "geojson";

import districtGeometry from "@/data/nfhs/district-geometry.json";
import {
  createDistrictProjector,
  geometryToPath,
  normalizeDistrictGeometryName,
} from "@/lib/nfhs/map-geometry";
import type { ObservationStatus } from "@/lib/nfhs/types";

type MapIndicator = {
  id: number;
  label: string;
};

type MapDistrict = {
  id: string;
  name: string;
  values: Array<{
    value: number | null;
    status: ObservationStatus;
  }>;
};

// A single-hue sequential scale keeps the choropleth readable and avoids the
// "rainbow dashboard" look; unavailable observations use a flat neutral fill.
const scale = ["#ede9f9", "#d3c9ef", "#af95e0", "#7c57c9", "#4a2f9e"];
const missingFill = "#e2e2e6";

function colorFor(value: number | null, min: number, max: number) {
  if (value === null) return missingFill;
  if (max === min) return scale[2];
  const index = Math.min(
    scale.length - 1,
    Math.floor(((value - min) / (max - min)) * scale.length),
  );
  return scale[index];
}

export function DistrictMap({
  indicators,
  districts,
}: {
  indicators: MapIndicator[];
  districts: MapDistrict[];
}) {
  const [indicatorId, setIndicatorId] = useState(indicators[0]?.id ?? 1);
  const [hoverState, setHoverState] = useState<{
    districtId: string | null;
    x: number;
    y: number;
  } | null>(null);
  const indicatorIndex = indicators.findIndex(
    (indicator) => indicator.id === indicatorId,
  );
  const indicator = indicators[indicatorIndex];

  const districtByName = useMemo(
    () => new Map(districts.map((district) => [district.name, district])),
    [districts],
  );
  const numericValues = districts
    .map((district) => district.values[indicatorIndex]?.value ?? null)
    .filter((value): value is number => value !== null);
  const min = numericValues.length ? Math.min(...numericValues) : 0;
  const max = numericValues.length ? Math.max(...numericValues) : 0;
  const geometry = districtGeometry as FeatureCollection;
  const projection = createDistrictProjector(geometry, {
    width: 510,
    height: 490,
    padding: 10,
  });

  const features = geometry.features.map((feature: Feature, index) => {
    const sourceName = String(feature.properties?.dtname ?? "");
    const name = normalizeDistrictGeometryName(sourceName);
    const district = districtByName.get(name);
    const observation = district?.values[indicatorIndex];
    return {
      key: `${sourceName}-${index}`,
      sourceName,
      district,
      value: observation?.value ?? null,
      d: geometryToPath(feature.geometry, projection),
    };
  });

  if (!indicator) return null;

  const hovered = hoverState?.districtId
    ? features.find((feature) => feature.district?.id === hoverState.districtId)
    : null;

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="grid w-full max-w-md gap-1.5 text-sm font-medium">
            Map indicator
            <select
              value={indicatorId}
              onChange={(event) => setIndicatorId(Number(event.target.value))}
              className="h-9 w-full rounded-md border bg-background px-2.5 text-sm shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {indicators.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}. {item.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-sm text-muted-foreground">
            Hover a district to preview value and open its profile.
          </p>
        </div>

        <div className="relative">
          <svg
            viewBox="0 0 510 490"
            role="img"
            aria-label={`${indicator.label} by district. Hover districts to preview values and open profiles.`}
            className="h-auto w-full"
          >
            {features.map((feature) => (
              <a
                key={feature.key}
                href={feature.district ? `/districts/${feature.district.id}` : undefined}
                aria-label={
                  feature.district
                    ? `${feature.district.name}: ${
                        feature.value === null
                          ? "not available"
                          : `${feature.value.toFixed(1)} percent`
                      }`
                    : feature.sourceName
                }
                onMouseEnter={(event) => {
                  const svg = event.currentTarget.closest("svg");
                  const rect = svg?.getBoundingClientRect();
                  if (!rect) return;
                  setHoverState({
                    districtId: feature.district?.id ?? null,
                    x: event.clientX - rect.left + 12,
                    y: event.clientY - rect.top + 12,
                  });
                }}
                onMouseMove={(event) => {
                  const svg = event.currentTarget.closest("svg");
                  const rect = svg?.getBoundingClientRect();
                  if (!rect) return;
                  setHoverState((current) => ({
                    districtId: feature.district?.id ?? current?.districtId ?? null,
                    x: event.clientX - rect.left + 12,
                    y: event.clientY - rect.top + 12,
                  }));
                }}
                onMouseLeave={() => setHoverState(null)}
                onFocus={() =>
                  setHoverState({ districtId: feature.district?.id ?? null, x: 16, y: 16 })
                }
                onBlur={() => setHoverState(null)}
              >
                <path
                  d={feature.d}
                  fill={colorFor(feature.value, min, max)}
                  stroke="var(--card)"
                  strokeWidth={1}
                  className="transition-opacity duration-150 hover:opacity-80 focus:opacity-80 focus:outline-none"
                />
              </a>
            ))}
          </svg>

          {hovered?.district && hoverState ? (
            <div
              className="pointer-events-none absolute z-10 rounded-md border bg-background/95 px-2 py-1 text-xs shadow-sm"
              style={{ left: hoverState.x, top: hoverState.y }}
            >
              <span className="font-medium">{hovered.district.name}</span>:{" "}
              {hovered.value === null ? "Not available" : `${hovered.value.toFixed(1)}%`}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span>{min.toFixed(1)}%</span>
          <span
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: `linear-gradient(to right, ${scale.join(", ")})`,
            }}
            aria-hidden="true"
          />
          <span>{max.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
