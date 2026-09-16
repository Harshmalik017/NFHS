"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DistrictIndicatorRow } from "@/lib/nfhs/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function DistrictProfileDownloads({
  districtName,
  rows,
}: {
  districtName: string;
  rows: DistrictIndicatorRow[];
}) {
  function downloadCsv() {
    const header = [
      "Indicator Number",
      "Category",
      "Indicator",
      "NFHS-6",
      "NFHS-5",
      "NFHS-6 Status",
      "NFHS-5 Status",
      "Source Page",
    ];

    const csvRows = rows.map((row) => [
      String(row.indicator.sourceNumber),
      row.indicator.category,
      row.indicator.label,
      row.nfhs6Display,
      row.nfhs5Display,
      row.nfhs6Status,
      row.nfhs5Status,
      String(row.sourcePage),
    ]);

    const csv = [header, ...csvRows]
      .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(districtName)}-district-factsheet.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadPdf() {
    window.print();
  }

  return (
    <div className="flex flex-nowrap gap-2 print:hidden">
      <Button type="button" size="sm" className="whitespace-nowrap" onClick={downloadCsv}>
        <Download className="size-4" aria-hidden="true" />
        Download CSV
      </Button>
      <Button type="button" size="sm" className="whitespace-nowrap" onClick={downloadPdf}>
        <Download className="size-4" aria-hidden="true" />
        Download PDF
      </Button>
    </div>
  );
}
