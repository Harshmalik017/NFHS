import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultPdf = path.join(
  root,
  "memory-bank",
  "NFHS-6_StateFact_Uttar Pradesh__Uttar Pradesh Compendium.pdf",
);
const outputFile = path.join(root, "src", "data", "nfhs", "nfhs-up.json");
const pdfFile = path.resolve(process.argv[2] ?? defaultPdf);

const VALUE_PATTERN = /^(?:\*|\(?-?\d+(?:\.\d+)?\)?|(?:NA|N\/A|—|–|-))$/i;
const STATUS_ORDER = ["reported", "caution", "suppressed", "missing"];

function cleanText(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:%)])/g, "$1")
    .replace(/([(])\s+/g, "$1")
    .trim();
}

function horizontalText(items) {
  const sorted = [...items].sort((a, b) => a.x - b.x);
  let result = "";
  let right = null;
  for (const item of sorted) {
    const text = item.str.replace(/\s+/g, " ");
    if (!text.trim()) continue;
    const gap = right === null ? 0 : item.x - right;
    if (
      result &&
      !/\s$/.test(result) &&
      !/^\s/.test(text) &&
      gap > 0.9
    ) {
      result += " ";
    }
    result += text;
    right = item.x + item.width;
  }
  return cleanText(result);
}

function lineGroups(items, tolerance = 1.1) {
  const groups = [];
  for (const item of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
    let group = groups.find((candidate) => Math.abs(candidate.y - item.y) <= tolerance);
    if (!group) {
      group = { y: item.y, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups
    .sort((a, b) => b.y - a.y)
    .map((group) => ({ ...group, text: horizontalText(group.items) }));
}

function parseValue(rawValue) {
  if (rawValue === null) {
    return { raw: null, value: null, status: "missing" };
  }
  const raw = cleanText(rawValue);
  if (raw === "*") return { raw, value: null, status: "suppressed" };
  if (/^(?:NA|N\/A|—|–|-)$/i.test(raw)) {
    return { raw, value: null, status: "missing" };
  }
  const caution = raw.startsWith("(") && raw.endsWith(")");
  const numberText = caution ? raw.slice(1, -1) : raw;
  const value = Number(numberText);
  if (!Number.isFinite(value)) throw new Error(`Invalid fact-sheet value: ${raw}`);
  return { raw, value, status: caution ? "caution" : "reported" };
}

function valueInColumn(items, startY, lowerY, minX, maxX) {
  const candidates = items.filter(
    (item) =>
      item.x >= minX &&
      item.x < maxX &&
      item.y <= startY + 4 &&
      item.y > lowerY,
  );
  for (const row of lineGroups(candidates, 1.2)) {
    const compact = row.items
      .sort((a, b) => a.x - b.x)
      .map((item) => item.str)
      .join("")
      .replace(/\s/g, "");
    if (VALUE_PATTERN.test(compact)) return { raw: compact, y: row.y };
  }
  return { raw: null, y: startY };
}

function findStarts(items, state = false) {
  const starts = [];
  const labelBoundary = state ? 400 : 450;
  for (const row of lineGroups(items.filter((item) => item.x < labelBoundary), 1.2)) {
    const match = row.text.match(/^(\d(?:\s*\d){0,2})\s*\.\s/);
    if (match) {
      starts.push({ id: Number(match[1].replace(/\s/g, "")), y: row.y });
    }
  }
  const unique = new Map(starts.map((start) => [start.id, start]));
  return [...unique.values()].sort((a, b) => b.y - a.y);
}

function extractLabel(items, start, lowerY, valueYs, maxX) {
  const lowestValueY = Math.min(...valueYs);
  const labelBottom = Math.max(lowerY, lowestValueY - 8);
  const candidates = items.filter(
    (item) =>
      item.x < maxX &&
      item.y <= start.y + 5 &&
      item.y > labelBottom &&
      item.str.trim(),
  );

  const tiny = candidates.filter(
    (item) => item.height <= 7.5 && /^[\d,+]+$/.test(item.str.replace(/\s/g, "")),
  );
  const exponents = new Set();
  for (const item of tiny) {
    const previous = candidates
      .filter(
        (candidate) =>
          candidate !== item &&
          candidate.y < item.y &&
          item.y - candidate.y < 5 &&
          candidate.x < item.x,
      )
      .sort((a, b) => b.x - a.x)[0];
    if (previous && /kg\/m\s*$/.test(previous.str)) exponents.add(item);
  }

  const referenceItems = tiny.filter((item) => !exponents.has(item));
  const referenceText = referenceItems
    .sort((a, b) => a.x - b.x)
    .map((item) => item.str)
    .join("")
    .replace(/\s/g, "");
  const footnoteRefs = [
    ...new Set(
      referenceText
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
    ),
  ];

  const labelItems = candidates.filter(
    (item) => !referenceItems.includes(item) && !exponents.has(item),
  );
  const label = cleanText(
    lineGroups(labelItems)
      .map((line) => line.text)
      .join(" ")
      .replace(/^\d(?:\s*\d){0,2}\s*\.\s*/, "")
      .replace(/kg\/m\s*\)/g, "kg/m²)"),
  );
  return { label, footnoteRefs };
}

function parseIndicatorPage(items, sourcePdfPage, state = false) {
  const starts = findStarts(items, state);
  const columns = state
    ? [
        [400, 440],
        [440, 477],
        [477, 515],
        [515, 570],
      ]
    : [
        [450, 515],
        [515, 570],
      ];
  const parsed = [];
  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index];
    const next = starts[index + 1];
    const lowerY = next ? next.y + 4.1 : 24;
    const values = columns.map(([minX, maxX]) =>
      valueInColumn(items, start.y, lowerY, minX, maxX),
    );
    const { label, footnoteRefs } = extractLabel(
      items,
      start,
      lowerY,
      values.map((entry) => entry.y),
      state ? 400 : 450,
    );
    const sourcePage = { pdf: sourcePdfPage, printed: sourcePdfPage - 6 };
    parsed.push({
      id: start.id,
      label,
      footnoteRefs,
      sourcePage,
      values: values.map((entry) => parseValue(entry.raw)),
      bottomY: Math.min(...values.map((entry) => entry.y), start.y),
    });
  }
  return parsed;
}

function extractPageNotes(items, parsedIndicators) {
  if (!parsedIndicators.length) return [];
  const bottom = Math.min(...parsedIndicators.map((indicator) => indicator.bottomY)) - 7;
  return lineGroups(
    items.filter((item) => item.y < bottom && item.y > 25 && item.str.trim()),
  )
    .map((line) => line.text)
    .filter(Boolean);
}

function parseSampleRows(items, pdfPage) {
  const rows = [];
  for (const row of lineGroups(items.filter((item) => item.y > 25), 1.2)) {
    const serialItem = row.items.find(
      (item) => item.x >= 50 && item.x < 90 && /^\d{1,2}$/.test(item.str.trim()),
    );
    const isState = row.items.some(
      (item) => item.x >= 90 && item.x < 360 && /UTTAR PRADESH/i.test(item.str),
    );
    if (!serialItem && !isState) continue;
    const name = horizontalText(
      row.items.filter((item) => item.x >= 90 && item.x < 360),
    );
    const readCount = (minX, maxX) => {
      const raw = row.items
        .filter((item) => item.x >= minX && item.x < maxX)
        .sort((a, b) => a.x - b.x)
        .map((item) => item.str)
        .join("")
        .replace(/[,\s]/g, "");
      const value = Number(raw);
      if (!Number.isInteger(value)) {
        throw new Error(`Invalid sample count "${raw}" for ${name}`);
      }
      return value;
    };
    rows.push({
      serial: serialItem ? Number(serialItem.str.trim()) : null,
      name: cleanText(name),
      sampleSize: {
        households: readCount(360, 430),
        women: readCount(430, 490),
        men: readCount(490, 570),
      },
      sampleSizeSourcePage: { pdf: pdfPage, printed: pdfPage - 6 },
    });
  }
  return rows;
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function publicIndicator(indicator, state) {
  const common = {
    id: indicator.id,
    sourcePage: indicator.sourcePage,
  };
  if (state) {
    return {
      ...common,
      nfhs6: {
        urban: indicator.values[0],
        rural: indicator.values[1],
        total: indicator.values[2],
      },
      nfhs5: { total: indicator.values[3] },
    };
  }
  return {
    ...common,
    nfhs6: indicator.values[0],
    nfhs5: indicator.values[1],
  };
}

function assertSequence(values, expectedLength, label) {
  const expected = Array.from({ length: expectedLength }, (_, index) => index + 1);
  const actual = values.map((entry) => entry.id);
  if (actual.join(",") !== expected.join(",")) {
    throw new Error(`${label} indicator sequence is ${actual.join(",")}`);
  }
}

let pdfjs;
try {
  pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
} catch (error) {
  throw new Error(
    "pdfjs-dist is required to generate NFHS data. Install dependencies before running this script.",
    { cause: error },
  );
}

const pdfBytes = await readFile(pdfFile);
const document = await pdfjs
  .getDocument({ data: new Uint8Array(pdfBytes), verbosity: 0 })
  .promise;
if (document.numPages !== 318) {
  throw new Error(`Expected the 318-page Uttar Pradesh compendium, got ${document.numPages} pages`);
}

const pageCache = new Map();
async function pageItems(pageNumber) {
  if (!pageCache.has(pageNumber)) {
    const content = await (await document.getPage(pageNumber)).getTextContent();
    pageCache.set(
      pageNumber,
      content.items
        .filter((item) => "str" in item)
        .map((item) => ({
          str: item.str,
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          height: item.height,
        })),
    );
  }
  return pageCache.get(pageNumber);
}

const appendixRows = [
  ...parseSampleRows(await pageItems(315), 315),
  ...parseSampleRows(await pageItems(316), 316),
];
const districtSamples = appendixRows.filter((row) => row.serial !== null);
const stateSample = appendixRows.find((row) => row.serial === null);
if (districtSamples.length !== 75 || !stateSample) {
  throw new Error(
    `Appendix extraction failed: ${districtSamples.length} districts, state=${Boolean(stateSample)}`,
  );
}

const statePages = [];
const stateParsed = [];
for (const pdfPage of [10, 11, 12]) {
  const items = await pageItems(pdfPage);
  const indicators = parseIndicatorPage(items, pdfPage, true);
  statePages.push({
    sourcePage: { pdf: pdfPage, printed: pdfPage - 6 },
    notes: extractPageNotes(items, indicators),
  });
  stateParsed.push(...indicators);
}
stateParsed.sort((a, b) => a.id - b.id);
assertSequence(stateParsed, 101, "State");

const districts = [];
let districtCatalog = null;
const districtFootnotePages = [];
for (let districtIndex = 0; districtIndex < districtSamples.length; districtIndex += 1) {
  const sample = districtSamples[districtIndex];
  const firstPdfPage = 15 + districtIndex * 4;
  const parsed = [];
  for (let offset = 0; offset < 3; offset += 1) {
    const pdfPage = firstPdfPage + offset;
    const items = await pageItems(pdfPage);
    const pageIndicators = parseIndicatorPage(items, pdfPage, false);
    if (districtIndex === 0) {
      districtFootnotePages.push({
        pageOffset: offset,
        representativeSourcePage: { pdf: pdfPage, printed: pdfPage - 6 },
        notes: extractPageNotes(items, pageIndicators),
      });
    }
    parsed.push(...pageIndicators);
  }
  parsed.sort((a, b) => a.id - b.id);
  assertSequence(parsed, 93, sample.name);

  const catalog = parsed.map(({ id, label, footnoteRefs }) => ({
    id,
    label,
    footnoteRefs,
  }));
  if (!districtCatalog) {
    districtCatalog = catalog;
  } else {
    for (let index = 0; index < catalog.length; index += 1) {
      if (catalog[index].label !== districtCatalog[index].label) {
        throw new Error(
          `Indicator ${catalog[index].id} label differs in ${sample.name}: ` +
            `"${catalog[index].label}"`,
        );
      }
      if (
        catalog[index].footnoteRefs.join(",") !==
        districtCatalog[index].footnoteRefs.join(",")
      ) {
        throw new Error(
          `Indicator ${catalog[index].id} footnotes differ in ${sample.name}`,
        );
      }
    }
  }
  districts.push({
    id: slugify(sample.name),
    name: sample.name,
    sampleSize: sample.sampleSize,
    sampleSizeSourcePage: sample.sampleSizeSourcePage,
    indicators: parsed.map((indicator) => publicIndicator(indicator, false)),
  });
}

const dataset = {
  schemaVersion: 1,
  source: {
    title:
      "National Family Health Survey (NFHS-6), 2023-24: State and District Fact Sheets, Uttar Pradesh",
    publisher: "International Institute for Population Sciences (IIPS)",
    publicationYear: 2026,
    file: path.relative(root, pdfFile).replaceAll(path.sep, "/"),
    sha256: createHash("sha256").update(pdfBytes).digest("hex"),
    pdfPages: document.numPages,
    note: "Results presented in the NFHS-6 fact sheets are provisional.",
  },
  valueStatuses: STATUS_ORDER,
  districtIndicatorCatalog: districtCatalog,
  stateIndicatorCatalog: stateParsed.map(({ id, label, footnoteRefs }) => ({
    id,
    label,
    footnoteRefs,
  })),
  footnotePages: {
    state: statePages,
    district: {
      repeatsForEachDistrict: true,
      pages: districtFootnotePages,
    },
  },
  state: {
    name: "Uttar Pradesh",
    sampleSize: stateSample.sampleSize,
    sampleSizeSourcePage: stateSample.sampleSizeSourcePage,
    indicators: stateParsed.map((indicator) => publicIndicator(indicator, true)),
  },
  districts,
};

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
console.log(
  `Generated ${path.relative(root, outputFile)}: ${districts.length} districts, ` +
    `${districtCatalog.length} district indicators, ${stateParsed.length} state indicators.`,
);
