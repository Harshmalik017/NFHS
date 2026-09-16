"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValueDisplay } from "@/components/value-display";
import type {
  IndicatorInterpretation,
  IndicatorUnit,
  ObservationStatus,
} from "@/lib/nfhs/types";

export type RankingIndicator = {
  id: string;
  label: string;
  unit: IndicatorUnit;
  interpretation: IndicatorInterpretation;
};

export type RankingObservation = {
  districtSlug: string;
  districtName: string;
  indicatorId: string;
  value: number | null;
  status: ObservationStatus;
};

export function RankingsView({
  indicators,
  observations,
}: {
  indicators: RankingIndicator[];
  observations: RankingObservation[];
}) {
  const [indicatorId, setIndicatorId] = useState(indicators[0]?.id ?? "");
  const indicator =
    indicators.find((item) => item.id === indicatorId) ?? indicators[0];

  const rows = useMemo(() => {
    if (!indicator) {
      return [];
    }

    const numeric = observations
      .filter(
        (item) => item.indicatorId === indicator.id && item.value !== null,
      )
      .toSorted((a, b) => {
        const difference = (b.value ?? 0) - (a.value ?? 0);
        return (
          difference || a.districtName.localeCompare(b.districtName, "en-IN")
        );
      });

    let previousValue: number | null = null;
    let previousRank = 0;
    return numeric.map((item, index) => {
      const rank =
        previousValue === item.value ? previousRank : index + 1;
      previousValue = item.value;
      previousRank = rank;
      return { ...item, rank };
    });
  }, [indicator, observations]);

  if (!indicator) {
    return <p>No ranking indicators are available.</p>;
  }

  function downloadCsv() {
    const header = ["Rank", "District", "Indicator", "NFHS-6 value", "Status"];
    const rowsForExport = rows.map((row) => [
      String(row.rank),
      row.districtName,
      indicator.label,
      row.value === null ? "" : String(row.value),
      row.status,
    ]);
    const csv = [header, ...rowsForExport]
      .map((row) =>
        row
          .map((cell) => `"${cell.replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `district-rankings-${indicator.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <label htmlFor="ranking-indicator" className="grid flex-1 gap-1 text-sm font-medium">
          Choose Indicator
          <select
            id="ranking-indicator"
            value={indicator.id}
            onChange={(event) => setIndicatorId(event.target.value)}
            className="h-10 w-full max-w-3xl rounded-lg border bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {indicators.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <Button type="button" onClick={downloadCsv}>
          <Download className="size-4" aria-hidden="true" />
          Download CSV
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>District</TableHead>
                <TableHead className="text-right">NFHS-6 value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.districtSlug}>
                  <TableCell className="font-semibold tabular-nums">
                    {row.rank}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/districts/${row.districtSlug}`}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {row.districtName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <ValueDisplay
                      value={row.value}
                      status={row.status}
                      unit={indicator.unit}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
