import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "src", "data", "nfhs", "nfhs-up.json");
const data = JSON.parse(await readFile(dataFile, "utf8"));
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function checkIds(entries, count, label) {
  check(entries.length === count, `${label}: expected ${count}, got ${entries.length}`);
  const ids = entries.map((entry) => entry.id);
  const expected = Array.from({ length: count }, (_, index) => index + 1);
  check(ids.join(",") === expected.join(","), `${label}: IDs must be exactly 1-${count}`);
}

function checkValue(value, location) {
  check(value && typeof value === "object", `${location}: value object is missing`);
  if (!value || typeof value !== "object") return;
  check(
    ["reported", "caution", "suppressed", "missing"].includes(value.status),
    `${location}: invalid status ${value.status}`,
  );
  if (value.status === "reported") {
    check(
      typeof value.value === "number" && Number(value.raw) === value.value,
      `${location}: invalid reported value`,
    );
  } else if (value.status === "caution") {
    check(
      typeof value.value === "number" &&
        typeof value.raw === "string" &&
        value.raw.startsWith("(") &&
        value.raw.endsWith(")") &&
        Number(value.raw.slice(1, -1)) === value.value,
      `${location}: invalid caution value`,
    );
  } else if (value.status === "suppressed") {
    check(value.raw === "*" && value.value === null, `${location}: invalid suppressed value`);
  } else {
    check(value.value === null, `${location}: missing value must be null`);
  }
}

check(data.schemaVersion === 1, "schemaVersion must be 1");
check(data.source?.pdfPages === 318, "source PDF must have 318 pages");
checkIds(data.districtIndicatorCatalog ?? [], 93, "district catalog");
checkIds(data.stateIndicatorCatalog ?? [], 101, "state catalog");
for (const entry of [
  ...(data.districtIndicatorCatalog ?? []),
  ...(data.stateIndicatorCatalog ?? []),
]) {
  check(typeof entry.label === "string" && entry.label.length > 0, `catalog #${entry.id}: empty label`);
  check(Array.isArray(entry.footnoteRefs), `catalog #${entry.id}: footnoteRefs must be an array`);
}
check((data.districts ?? []).length === 75, `expected 75 districts, got ${data.districts?.length}`);
check(new Set(data.districts.map((district) => district.id)).size === 75, "district IDs not unique");
check(new Set(data.districts.map((district) => district.name)).size === 75, "district names not unique");

for (const district of data.districts ?? []) {
  checkIds(district.indicators ?? [], 93, district.name);
  for (const indicator of district.indicators ?? []) {
    checkValue(indicator.nfhs6, `${district.name} #${indicator.id} NFHS-6`);
    checkValue(indicator.nfhs5, `${district.name} #${indicator.id} NFHS-5`);
    check(
      Number.isInteger(indicator.sourcePage?.pdf) &&
        Number.isInteger(indicator.sourcePage?.printed),
      `${district.name} #${indicator.id}: source page missing`,
    );
  }
  for (const field of ["households", "women", "men"]) {
    check(
      Number.isInteger(district.sampleSize?.[field]) && district.sampleSize[field] > 0,
      `${district.name}: invalid ${field} sample`,
    );
  }
  check(
    Number.isInteger(district.sampleSizeSourcePage?.pdf) &&
      Number.isInteger(district.sampleSizeSourcePage?.printed),
    `${district.name}: sample-size source page missing`,
  );
}

checkIds(data.state?.indicators ?? [], 101, "state indicators");
for (const indicator of data.state?.indicators ?? []) {
  for (const [survey, geography, value] of [
    ["NFHS-6", "urban", indicator.nfhs6?.urban],
    ["NFHS-6", "rural", indicator.nfhs6?.rural],
    ["NFHS-6", "total", indicator.nfhs6?.total],
    ["NFHS-5", "total", indicator.nfhs5?.total],
  ]) {
    checkValue(value, `State #${indicator.id} ${survey} ${geography}`);
  }
}
for (const field of ["households", "women", "men"]) {
  check(
    Number.isInteger(data.state?.sampleSize?.[field]) && data.state.sampleSize[field] > 0,
    `state: invalid ${field} sample`,
  );
}
check(
  data.state?.sampleSizeSourcePage?.pdf === 316 &&
    data.state?.sampleSizeSourcePage?.printed === 310,
  "state sample-size source page must be PDF 316 / printed 310",
);

const statusCounts = { reported: 0, caution: 0, suppressed: 0, missing: 0 };
function countValue(value) {
  if (value && value.status in statusCounts) statusCounts[value.status] += 1;
}
for (const district of data.districts ?? []) {
  for (const indicator of district.indicators ?? []) {
    countValue(indicator.nfhs6);
    countValue(indicator.nfhs5);
  }
}
for (const indicator of data.state?.indicators ?? []) {
  countValue(indicator.nfhs6?.urban);
  countValue(indicator.nfhs6?.rural);
  countValue(indicator.nfhs6?.total);
  countValue(indicator.nfhs5?.total);
}

const expectedStatusCounts = {
  reported: 13446,
  caution: 577,
  suppressed: 331,
  missing: 0,
};
for (const status of Object.keys(expectedStatusCounts)) {
  check(
    statusCounts[status] === expectedStatusCounts[status],
    `status ${status}: expected ${expectedStatusCounts[status]}, got ${statusCounts[status]}`,
  );
}

const districtSampleTotals = data.districts.reduce(
  (totals, district) => {
    for (const field of ["households", "women", "men"]) {
      totals[field] += district.sampleSize[field];
    }
    return totals;
  },
  { households: 0, women: 0, men: 0 },
);
for (const field of ["households", "women", "men"]) {
  check(
    districtSampleTotals[field] === data.state.sampleSize[field],
    `district ${field} sample total does not equal state total`,
  );
}
check(
  JSON.stringify(data.state.sampleSize) ===
    JSON.stringify({ households: 74705, women: 94159, men: 12318 }),
  "state sample sizes do not match the source appendix",
);

const semanticData = {
  districtIndicatorCatalog: data.districtIndicatorCatalog,
  stateIndicatorCatalog: data.stateIndicatorCatalog,
  footnotePages: data.footnotePages,
  state: data.state,
  districts: data.districts,
};
const semanticDigest = createHash("sha256")
  .update(JSON.stringify(semanticData))
  .digest("hex");
check(
  semanticDigest === "d7ec8b97be2e18e0f78cf5c62d0ced9e6d5b6ed62c5e38c52b2ec6aa585ca260",
  `semantic data digest mismatch: ${semanticDigest}`,
);

if (errors.length) {
  console.error(`NFHS validation failed with ${errors.length} error(s):`);
  for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
  if (errors.length > 50) console.error(`- ...and ${errors.length - 50} more`);
  process.exit(1);
}
console.log(
  `NFHS data valid: 75 districts × 93 indicators; 101 state indicators; statuses ` +
    Object.entries(statusCounts)
      .map(([status, count]) => `${status}=${count}`)
      .join(", "),
);
