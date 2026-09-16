"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Eye } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValueDisplay, ValuePill } from "@/components/value-display";
import type { IndicatorUnit, ObservationStatus } from "@/lib/nfhs/types";
import { cn } from "@/lib/utils";

type ComparisonDistrict = {
  id: string;
  slug: string;
  name: string;
};

type ComparisonIndicator = {
  id: string;
  label: string;
  unit: IndicatorUnit;
};

type ComparisonValue = {
  districtId: string;
  indicatorId: string;
  nfhs6: number | null;
  nfhs5: number | null;
  nfhs6Status: ObservationStatus;
  nfhs5Status: ObservationStatus;
};

export function ComparisonView({
  districts,
  indicators,
  values,
}: {
  districts: ComparisonDistrict[];
  indicators: ComparisonIndicator[];
  values: ComparisonValue[];
}) {
  const [selected, setSelected] = useState(
    districts.slice(0, Math.min(4, districts.length)).map((item) => item.id),
  );
  const [indicatorId, setIndicatorId] = useState(indicators[0]?.id ?? "");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const indicator =
    indicators.find((item) => item.id === indicatorId) ?? indicators[0];

  const selectedDistricts = districts.filter((item) =>
    selected.includes(item.id),
  );
  const comparisonRows = useMemo(() => {
    const rows = selectedDistricts.map((district) => ({
      district,
      value: values.find(
        (item) =>
          item.districtId === district.id &&
          item.indicatorId === indicator?.id,
      ),
    }));

    return rows.toSorted((a, b) => {
      const aValue = a.value?.nfhs6;
      const bValue = b.value?.nfhs6;

      if (aValue === null || aValue === undefined) {
        return 1;
      }
      if (bValue === null || bValue === undefined) {
        return -1;
      }

      if (aValue === bValue) {
        return a.district.name.localeCompare(b.district.name, "en-IN");
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });
  }, [indicator?.id, selectedDistricts, sortOrder, values]);

  function toggleDistrict(id: string) {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      return [...current, id];
    });
  }

  function selectAll() {
    setSelected(districts.map((district) => district.id));
  }

  function clearAll() {
    setSelected([]);
  }

  function downloadCsv() {
    if (!indicator) return;
    const header = ["District", "Indicator", "NFHS-6", "NFHS-5"];
    const rows = comparisonRows.map(({ district, value }) => [
      district.name,
      indicator.label,
      value?.nfhs6 === null || value?.nfhs6 === undefined
        ? ""
        : String(value.nfhs6),
      value?.nfhs5 === null || value?.nfhs5 === undefined
        ? ""
        : String(value.nfhs5),
    ]);
    const csv = [header, ...rows]
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
    link.download = `district-comparison-${indicator.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!indicator) {
    return <p>No comparison indicators are available.</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <Card className="self-start xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>Select districts</CardTitle>
          <CardDescription>
            Select any number of districts. {selected.length} selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 pb-2">
          <Button type="button" size="sm" variant="outline" onClick={selectAll}>
            Select all
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={clearAll}>
            Clear
          </Button>
        </CardContent>
        <CardContent className="max-h-[32rem] space-y-1 overflow-y-auto">
          {districts.map((district) => {
            const active = selected.includes(district.id);
            return (
              <label
                key={district.id}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <span className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleDistrict(district.id)}
                    className="size-4 rounded border-border accent-primary"
                  />
                  <span>{district.name}</span>
                </span>
              </label>
            );
          })}
        </CardContent>
      </Card>

      <div className="min-w-0 space-y-5">
        <div className="grid gap-2">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="comparison-indicator"
              className="grid flex-1 gap-1 text-sm font-medium"
            >
              Choose Indicator
              <select
                id="comparison-indicator"
                value={indicator.id}
                onChange={(event) => setIndicatorId(event.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {indicators.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={sortOrder === "desc" ? "default" : "outline"}
                  onClick={() => setSortOrder("desc")}
                >
                  Top to low
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={sortOrder === "asc" ? "default" : "outline"}
                  onClick={() => setSortOrder("asc")}
                >
                  Low to top
                </Button>
              </div>
              <Button type="button" onClick={downloadCsv}>
                <Download className="size-4" aria-hidden="true" />
                Download CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>District</TableHead>
                  <TableHead className="text-right">NFHS-6</TableHead>
                  <TableHead className="text-right">NFHS-5</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.length ? (
                  comparisonRows.map(({ district, value }) => (
                    <TableRow key={district.id}>
                      <TableCell>
                        <Link
                          href={`/districts/${district.slug}`}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {district.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <ValueDisplay
                          value={value?.nfhs6 ?? null}
                          status={value?.nfhs6Status ?? "missing"}
                          unit={indicator.unit}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <ValuePill
                          label="NFHS-5"
                          value={value?.nfhs5 ?? null}
                          status={value?.nfhs5Status ?? "missing"}
                          unit={indicator.unit}
                        />
                      </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/districts/${district.slug}`}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "inline-flex",
                            )}
                          >
                            <Eye className="size-4" aria-hidden="true" />
                            View factsheet
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                  <TableRow>
                      <TableCell colSpan={4} className="h-28 text-center">
                        Select at least one district to compare.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
