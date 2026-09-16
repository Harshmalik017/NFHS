export type NfhsValueStatus = "reported" | "caution" | "suppressed" | "missing";

export interface NfhsValue {
  raw: string | null;
  value: number | null;
  status: NfhsValueStatus;
}

export interface NfhsSourcePage {
  pdf: number;
  printed: number;
}

export interface NfhsIndicatorCatalogEntry {
  id: number;
  label: string;
  footnoteRefs: string[];
}

export interface NfhsSampleSize {
  households: number;
  women: number;
  men: number;
}

export interface NfhsDistrictIndicator {
  id: number;
  sourcePage: NfhsSourcePage;
  nfhs6: NfhsValue;
  nfhs5: NfhsValue;
}

export interface NfhsStateIndicator {
  id: number;
  sourcePage: NfhsSourcePage;
  nfhs6: {
    urban: NfhsValue;
    rural: NfhsValue;
    total: NfhsValue;
  };
  nfhs5: { total: NfhsValue };
}

export interface NfhsFootnotePage {
  sourcePage?: NfhsSourcePage;
  representativeSourcePage?: NfhsSourcePage;
  pageOffset?: number;
  notes: string[];
}

export interface NfhsDataset {
  schemaVersion: 1;
  source: {
    title: string;
    publisher: string;
    publicationYear: number;
    file: string;
    sha256: string;
    pdfPages: number;
    note: string;
  };
  valueStatuses: NfhsValueStatus[];
  districtIndicatorCatalog: NfhsIndicatorCatalogEntry[];
  stateIndicatorCatalog: NfhsIndicatorCatalogEntry[];
  footnotePages: {
    state: NfhsFootnotePage[];
    district: {
      repeatsForEachDistrict: true;
      pages: NfhsFootnotePage[];
    };
  };
  state: {
    name: string;
    sampleSize: NfhsSampleSize;
    sampleSizeSourcePage: NfhsSourcePage;
    indicators: NfhsStateIndicator[];
  };
  districts: Array<{
    id: string;
    name: string;
    sampleSize: NfhsSampleSize;
    sampleSizeSourcePage: NfhsSourcePage;
    indicators: NfhsDistrictIndicator[];
  }>;
}
