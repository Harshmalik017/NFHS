import type { FeatureCollection } from "geojson";

import districtGeometry from "@/data/nfhs/district-geometry.json";
import {
  createDistrictProjector,
  geometryToPath,
  normalizeDistrictGeometryName,
} from "@/lib/nfhs/map-geometry";

export function DistrictMiniMap({ districtName }: { districtName: string }) {
  const geometry = districtGeometry as FeatureCollection;
  const projection = createDistrictProjector(geometry, {
    width: 260,
    height: 220,
    padding: 8,
  });

  return (
    <div className="district-factsheet-map rounded-xl border bg-card p-2 print:w-full">
      <svg
        viewBox="0 0 260 220"
        role="img"
        aria-label={`${districtName} location in Uttar Pradesh`}
        className="h-auto w-full"
      >
        {geometry.features.map((feature, index) => {
          const sourceName = String(feature.properties?.dtname ?? "");
          const name = normalizeDistrictGeometryName(sourceName);
          const selected = name === districtName;
          return (
            <path
              key={`${sourceName}-${index}`}
              d={geometryToPath(feature.geometry, projection)}
              fill={selected ? "#4a2f9e" : "#d7d7dc"}
              stroke="#ffffff"
              strokeWidth={selected ? 1.4 : 1}
            />
          );
        })}
      </svg>
    </div>
  );
}
