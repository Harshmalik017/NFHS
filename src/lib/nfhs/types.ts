export type ObservationStatus =
  | "reported"
  | "caution"
  | "suppressed"
  | "missing";

export type IndicatorInterpretation =
  | "higher-is-better"
  | "lower-is-better"
  | "neutral";

export type IndicatorUnit = "percent" | "children-per-woman" | "count";

export type District = {
  id: string;
  slug: string;
  name: string;
  sourcePageStart: number;
  sampleSize: {
    households: number;
    women: number;
    men: number;
  };
};

export type Indicator = {
  id: string;
  sourceNumber: number;
  categoryId: string;
  category: string;
  label: string;
  shortLabel: string;
  unit: IndicatorUnit;
  interpretation: IndicatorInterpretation;
  footnoteIds: string[];
};

export type Observation = {
  geographyId: string;
  indicatorId: string;
  nfhs6: number | null;
  nfhs5: number | null;
  nfhs6Status: ObservationStatus;
  nfhs5Status: ObservationStatus;
  nfhs6Display: string;
  nfhs5Display: string;
  sourcePage: number;
};

export type DistrictIndicatorRow = Observation & {
  indicator: Indicator;
};
