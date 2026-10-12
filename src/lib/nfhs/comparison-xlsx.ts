import ExcelJS from "exceljs";

import { formatValue } from "@/lib/nfhs/format";
import type { IndicatorUnit, ObservationStatus } from "@/lib/nfhs/types";

export type ComparisonXlsxValue = {
  value: number | null;
  status: ObservationStatus;
  unit: IndicatorUnit;
};

export type ComparisonXlsxRow = {
  name: string;
  observations: Array<{
    nfhs6: ComparisonXlsxValue;
    nfhs5: ComparisonXlsxValue;
  }>;
};

function valueCell({ value, status, unit }: ComparisonXlsxValue): number | string {
  if (status === "reported" && value !== null) {
    return value;
  }
  return formatValue(value, status, unit);
}

export async function buildComparisonXlsx(
  indicatorLabels: string[],
  rows: ComparisonXlsxRow[],
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("District comparison", {
    views: [{ state: "frozen", xSplit: 1, ySplit: 2 }],
  });

  const headerTop: string[] = ["District"];
  const headerBottom: string[] = [""];
  for (const label of indicatorLabels) {
    headerTop.push(label.trim(), "");
    headerBottom.push("NFHS-6", "NFHS-5");
  }

  sheet.columns = [
    { width: 28 },
    ...indicatorLabels.flatMap(() => [{ width: 12 }, { width: 12 }]),
  ];
  sheet.addRow(headerTop);
  sheet.addRow(headerBottom);
  sheet.mergeCells(1, 1, 2, 1);
  indicatorLabels.forEach((_, index) => {
    const column = 2 + index * 2;
    sheet.mergeCells(1, column, 1, column + 1);
  });

  for (const row of rows) {
    sheet.addRow([
      row.name,
      ...row.observations.flatMap((pair) => [
        valueCell(pair.nfhs6),
        valueCell(pair.nfhs5),
      ]),
    ]);
  }

  for (const rowNumber of [1, 2]) {
    const headerRow = sheet.getRow(rowNumber);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9E1F2" },
    };
  }
  sheet.getRow(1).height = 48;

  return workbook.xlsx.writeBuffer();
}
