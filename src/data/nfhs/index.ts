import rawData from "./nfhs-up.json";
import type { NfhsDataset } from "./types";

export const nfhsData = rawData as NfhsDataset;
export type * from "./types";
