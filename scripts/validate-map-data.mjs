import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [dataset, geometry] = await Promise.all([
  readFile(path.join(root, "src", "data", "nfhs", "nfhs-up.json"), "utf8").then(
    JSON.parse,
  ),
  readFile(
    path.join(root, "src", "data", "nfhs", "district-geometry.json"),
    "utf8",
  ).then(JSON.parse),
]);

const aliases = new Map([
  ["faizabad", "ayodhya"],
  ["mahrajganj", "maharajganj"],
]);
const normalize = (value) =>
  value.toLocaleLowerCase("en-IN").replace(/[^a-z]/g, "");
const normalizeGeometryName = (value) => {
  const normalized = normalize(value);
  return aliases.get(normalized) ?? normalized;
};
const errors = [];

if (geometry.type !== "FeatureCollection") {
  errors.push("Geometry root must be a FeatureCollection.");
}
if (geometry.features?.length !== 75) {
  errors.push(
    `Expected 75 geometry features, got ${geometry.features?.length ?? 0}.`,
  );
}

const districtNames = new Set(
  dataset.districts.map((district) => normalize(district.name)),
);
const geometryNames = geometry.features.map((feature) =>
  normalizeGeometryName(String(feature.properties?.dtname ?? "")),
);

if (new Set(geometryNames).size !== geometryNames.length) {
  errors.push("Geometry contains duplicate normalized district names.");
}

for (const district of districtNames) {
  if (!geometryNames.includes(district)) {
    errors.push(`No geometry feature matches district "${district}".`);
  }
}
for (const district of geometryNames) {
  if (!districtNames.has(district)) {
    errors.push(`Geometry district "${district}" has no NFHS data record.`);
  }
}

if (errors.length) {
  console.error(`Map validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Map data valid: 75 NFHS districts joined to 75 geometry features.");
