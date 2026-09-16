import type { FeatureCollection, Geometry, Position } from "geojson";

const geometryAliases: Record<string, string> = {
  Faizabad: "Ayodhya",
  Mahrajganj: "Maharajganj",
};

function ringToPath(
  ring: Position[],
  project: (point: [number, number]) => [number, number] | null,
) {
  const points = ring
    .map(([lon, lat]) => project([lon, lat]))
    .filter((point): point is [number, number] => point !== null);
  if (points.length < 2) return "";
  const [first, ...rest] = points;
  const segments = rest.map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`);
  return `M${first[0].toFixed(2)},${first[1].toFixed(2)}${segments.join("")}Z`;
}

export function geometryToPath(
  geometry: Geometry,
  project: (point: [number, number]) => [number, number] | null,
) {
  if (geometry.type === "Polygon") {
    return geometry.coordinates
      .map((ring) => ringToPath(ring, project))
      .join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map((ring) => ringToPath(ring, project)))
      .join(" ");
  }
  return "";
}

function geometryPoints(geometry: Geometry): Position[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.flat(2);
  }
  return [];
}

export function createDistrictProjector(
  geometry: FeatureCollection,
  extent: { width: number; height: number; padding: number },
) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  for (const feature of geometry.features) {
    for (const [lon, lat] of geometryPoints(feature.geometry)) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }

  const contentWidth = Math.max(1, extent.width - extent.padding * 2);
  const contentHeight = Math.max(1, extent.height - extent.padding * 2);
  const lonRange = Math.max(maxLon - minLon, 0.0001);
  const latRange = Math.max(maxLat - minLat, 0.0001);
  const scale = Math.min(contentWidth / lonRange, contentHeight / latRange);
  const drawnWidth = lonRange * scale;
  const drawnHeight = latRange * scale;
  const offsetX = extent.padding + (contentWidth - drawnWidth) / 2;
  const offsetY = extent.padding + (contentHeight - drawnHeight) / 2;

  return ([lon, lat]: [number, number]): [number, number] => {
    const x = offsetX + (lon - minLon) * scale;
    const y = offsetY + (maxLat - lat) * scale;
    return [x, y];
  };
}

export function normalizeDistrictGeometryName(name: string) {
  return geometryAliases[name] ?? name;
}
