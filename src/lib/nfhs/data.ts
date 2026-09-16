import { nfhsData } from "@/data/nfhs";
import type { NfhsValueStatus } from "@/data/nfhs";
import type {
  District,
  DistrictIndicatorRow,
  Indicator,
  IndicatorInterpretation,
  ObservationStatus,
} from "@/lib/nfhs/types";

const categories = [
  { start: 1, end: 11, id: "population-household", label: "Population and household profile" },
  { start: 12, end: 15, id: "adult-characteristics", label: "Characteristics of adults" },
  { start: 16, end: 19, id: "marriage-fertility", label: "Marriage and fertility" },
  { start: 20, end: 24, id: "family-planning", label: "Family planning methods" },
  { start: 25, end: 27, id: "unmet-need", label: "Unmet need for family planning" },
  { start: 28, end: 34, id: "antenatal-care", label: "Antenatal care" },
  { start: 35, end: 40, id: "delivery-care", label: "Delivery care" },
  { start: 41, end: 43, id: "postnatal-care", label: "Postnatal care" },
  { start: 44, end: 56, id: "vaccination", label: "Child vaccinations and vitamin A" },
  { start: 57, end: 59, id: "childhood-disease", label: "Treatment of childhood diseases" },
  { start: 60, end: 72, id: "child-nutrition", label: "Child feeding and nutritional status" },
  { start: 73, end: 74, id: "adult-nutrition", label: "Nutritional status of adults" },
  { start: 75, end: 80, id: "blood-sugar", label: "Blood sugar among adults" },
  { start: 81, end: 86, id: "hypertension", label: "Hypertension among adults" },
  { start: 87, end: 89, id: "womens-empowerment", label: "Women’s empowerment" },
  { start: 90, end: 93, id: "tobacco-alcohol", label: "Tobacco and alcohol use" },
] as const;

const lowerIsBetter = new Set([
  16, 17, 18, 19, 25, 26, 27, 57, 58, 69, 70, 71, 72, 73, 74, 75, 76, 77,
  78, 79, 80, 81, 82, 83, 84, 85, 86, 90, 91, 92, 93,
]);

const neutral = new Set([1, 2, 3, 20, 21, 22, 23, 24, 38, 39, 40]);

function getCategory(id: number) {
  const category = categories.find((item) => id >= item.start && id <= item.end);
  if (!category) {
    throw new Error(`No category configured for district indicator ${id}`);
  }
  return category;
}

function getInterpretation(id: number): IndicatorInterpretation {
  if (lowerIsBetter.has(id)) return "lower-is-better";
  if (neutral.has(id)) return "neutral";
  return "higher-is-better";
}

export const districtIndicators: Indicator[] =
  nfhsData.districtIndicatorCatalog.map((entry) => {
    const category = getCategory(entry.id);
    return {
      id: `district-${entry.id}`,
      sourceNumber: entry.id,
      categoryId: category.id,
      category: category.label,
      label: entry.label,
      shortLabel: entry.label.replace(/\s*\(%\)\s*$/, ""),
      unit: "percent",
      interpretation: getInterpretation(entry.id),
      footnoteIds: entry.footnoteRefs,
    };
  });

export const districts: District[] = nfhsData.districts.map((district) => ({
  id: district.id,
  slug: district.id,
  name: district.name,
  sourcePageStart: district.indicators[0]?.sourcePage.pdf ?? 0,
  sampleSize: district.sampleSize,
}));

export function getDistrict(slug: string) {
  return nfhsData.districts.find((district) => district.id === slug);
}

export function getDistrictRows(slug: string): DistrictIndicatorRow[] {
  const district = getDistrict(slug);
  if (!district) return [];

  return district.indicators.map((observation, index) => {
    const indicator = districtIndicators[index];
    if (!indicator || indicator.sourceNumber !== observation.id) {
      throw new Error(
        `Indicator catalog mismatch for ${district.name} #${observation.id}`,
      );
    }
    return {
      geographyId: district.id,
      indicatorId: indicator.id,
      nfhs6: observation.nfhs6.value,
      nfhs5: observation.nfhs5.value,
      nfhs6Status: observation.nfhs6.status as ObservationStatus,
      nfhs5Status: observation.nfhs5.status as ObservationStatus,
      nfhs6Display: observation.nfhs6.raw ?? "—",
      nfhs5Display: observation.nfhs5.raw ?? "—",
      sourcePage: observation.sourcePage.pdf,
      indicator,
    };
  });
}

export function getDistrictObservation(
  districtId: string,
  indicatorNumber: number,
) {
  return getDistrict(districtId)?.indicators.find(
    (indicator) => indicator.id === indicatorNumber,
  );
}

export function getStateTotal(indicatorNumber: number) {
  return nfhsData.state.indicators.find(
    (indicator) => indicator.id === indicatorNumber,
  );
}

export function toObservationStatus(
  status: NfhsValueStatus,
): ObservationStatus {
  return status;
}

export { categories as indicatorCategories, nfhsData };
