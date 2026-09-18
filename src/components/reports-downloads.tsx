"use client";

import { ArrowDown, FileBarChart2, FileText } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { districts } from "@/lib/nfhs/data";
import { buildSampleSizeCsv } from "@/lib/nfhs/sample-size-csv";
import { cn } from "@/lib/utils";

const reports = [
  {
    label: "Uttar Pradesh all district report (PDF)",
    fileName: "NFHS-6_StateFact_Uttar_Pradesh.pdf",
    href: "/NFHS-6_StateFact_Uttar_Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-6 India factsheet (PDF)",
    fileName: "National Family Health Survey (NFHS-6) 2023-2024 Fact Sheets.pdf",
    href: "/National%20Family%20Health%20Survey%20(NFHS-6)%202023-2024%20Fact%20Sheets.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS data quality assurance (PDF)",
    fileName: "NFHS data quality assurance.pdf",
    href: "/NFHS%20data%20quality%20assurance.pdf",
    Icon: FileText,
  },
  {
    label: "Budget speech 2026-2027 (PDF)",
    fileName: "Budget_Speech_2026_2027.pdf",
    href: "/Budget_Speech_2026_2027.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-4 Uttar Pradesh state factsheet (PDF)",
    fileName: "NFHS-4_StateFactSheet_Uttar Pradesh.pdf",
    href: "/NFHS-4_StateFactSheet_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-5 Uttar Pradesh state report (PDF)",
    fileName: "NFHS-5_StateReport_Uttar Pradesh.pdf",
    href: "/NFHS-5_StateReport_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-5 Uttar Pradesh state and districts factsheet (PDF)",
    fileName: "NFHS-5_State_and_Districts_FactSheet_Uttar Pradesh.pdf",
    href: "/NFHS-5_State_and_Districts_FactSheet_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-4 Uttar Pradesh state report (PDF)",
    fileName: "NFHS-4_StateReport_Uttar Pradesh.pdf",
    href: "/NFHS-4_StateReport_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-1 India report (PDF)",
    fileName: "NFHS-1_INDIA_Report.pdf",
    href: "/NFHS-1_INDIA_Report.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-3 Uttar Pradesh state report (PDF)",
    fileName: "NFHS-3_StateReport_Uttar Pradesh.pdf",
    href: "/NFHS-3_StateReport_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
  {
    label: "NFHS-2 Uttar Pradesh state report (PDF)",
    fileName: "NFHS-2_StateReport_Uttar Pradesh.pdf",
    href: "/NFHS-2_StateReport_Uttar%20Pradesh.pdf",
    Icon: FileText,
  },
];

export function ReportsDownloads() {
  function downloadSampleSizeCsv() {
    const csv = buildSampleSizeCsv(
      districts.map(({ name, sampleSize }) => ({
        name,
        ...sampleSize,
      })),
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "up-district-sample-sizes.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-72">Report</TableHead>
            <TableHead className="hidden sm:table-cell">File</TableHead>
            <TableHead className="w-28 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2 font-medium">
                <FileBarChart2 className="size-4 text-primary" aria-hidden="true" />
                Sample size report (CSV)
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">
              up-district-sample-sizes.csv
            </TableCell>
            <TableCell className="text-right">
              <Button type="button" onClick={downloadSampleSizeCsv} size="sm">
                <span className="hidden sm:inline">Download</span>
                <ArrowDown className="size-4 sm:hidden" aria-hidden="true" />
              </Button>
            </TableCell>
          </TableRow>

          {reports.map((report) => (
            <TableRow key={report.fileName}>
              <TableCell>
                <div className="flex items-center gap-2 font-medium">
                  <report.Icon className="size-4 text-primary" aria-hidden="true" />
                  {report.label}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {report.fileName}
              </TableCell>
              <TableCell className="text-right">
                <a
                  href={report.href}
                  download={report.fileName}
                  className={cn(buttonVariants({ size: "sm" }))}
                  aria-label={`Download ${report.label}`}
                >
                  <span className="hidden sm:inline">Download</span>
                  <ArrowDown className="size-4 sm:hidden" aria-hidden="true" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
