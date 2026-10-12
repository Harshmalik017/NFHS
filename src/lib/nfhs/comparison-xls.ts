import { formatValue } from "@/lib/nfhs/format";
import type { IndicatorUnit, ObservationStatus } from "@/lib/nfhs/types";

export type ComparisonXlsValue = {
  value: number | null;
  status: ObservationStatus;
  unit: IndicatorUnit;
};

export type ComparisonXlsRow = {
  name: string;
  observations: Array<{
    nfhs6: ComparisonXlsValue;
    nfhs5: ComparisonXlsValue;
  }>;
};

type Cell = {
  data?: string | number | null;
  style?: "header";
  mergeAcross?: number;
  mergeDown?: number;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cellXml({ data, style, mergeAcross, mergeDown }: Cell): string {
  const attributes = [
    style ? `ss:StyleID="${style}"` : "",
    mergeAcross ? `ss:MergeAcross="${mergeAcross}"` : "",
    mergeDown ? `ss:MergeDown="${mergeDown}"` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const open = attributes ? `<Cell ${attributes}` : "<Cell";

  if (data === null || data === undefined || data === "") {
    return `${open}/>`;
  }
  if (typeof data === "number") {
    return `${open}><Data ss:Type="Number">${data}</Data></Cell>`;
  }
  return `${open}><Data ss:Type="String">${escapeXml(data)}</Data></Cell>`;
}

function rowXml(cells: Cell[], height?: number): string {
  const heightAttribute = height ? ` ss:Height="${height}"` : "";
  return `<Row${heightAttribute}>${cells.map(cellXml).join("")}</Row>`;
}

function valueCell({ value, status, unit }: ComparisonXlsValue): Cell {
  if (status === "reported" && value !== null) {
    return { data: value };
  }
  return { data: formatValue(value, status, unit) };
}

export function buildComparisonXls(
  indicatorLabels: string[],
  rows: ComparisonXlsRow[],
): string {
  const headerTop: Cell[] = [{ data: "District", style: "header", mergeDown: 1 }];
  const headerBottom: Cell[] = [{ style: "header" }];

  for (const label of indicatorLabels) {
    headerTop.push(
      { data: label.trim(), style: "header", mergeAcross: 1 },
      { style: "header" },
    );
    headerBottom.push(
      { data: "NFHS-6", style: "header" },
      { data: "NFHS-5", style: "header" },
    );
  }

  const columns = [
    '<Column ss:Width="180"/>',
    ...indicatorLabels.flatMap(() => [
      '<Column ss:Width="80"/>',
      '<Column ss:Width="80"/>',
    ]),
  ].join("");

  const bodyRows = rows.map((row) =>
    rowXml([
      { data: row.name },
      ...row.observations.flatMap((pair) => [
        valueCell(pair.nfhs6),
        valueCell(pair.nfhs5),
      ]),
    ]),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles>
<Style ss:ID="header"><Font ss:Bold="1"/><Interior ss:Color="#D9E1F2" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/></Style>
</Styles>
<Worksheet ss:Name="District comparison"><Table>${columns}${rowXml(headerTop, 64)}${rowXml(headerBottom)}${bodyRows.join("")}</Table>
<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>2</SplitHorizontal><TopRowBottomPane>2</TopRowBottomPane><SplitVertical>1</SplitVertical><LeftColumnRightPane>1</LeftColumnRightPane><ActivePane>0</ActivePane></WorksheetOptions>
</Worksheet>
</Workbook>`;
}
