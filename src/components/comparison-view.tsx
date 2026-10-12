"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, Eye } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { ValueDisplay } from "@/components/value-display";
import { buildComparisonXls } from "@/lib/nfhs/comparison-xls";
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
  const [selectedIndicatorIds, setSelectedIndicatorIds] = useState(
    indicators[0] ? [indicators[0].id] : [],
  );
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const valueByKey = useMemo(
    () =>
      new Map(
        values.map((item) => [
          `${item.districtId}|${item.indicatorId}`,
          item,
        ]),
      ),
    [values],
  );

  const selectedIndicators = indicators.filter((item) =>
    selectedIndicatorIds.includes(item.id),
  );

  const comparisonDistricts = useMemo(() => {
    const primaryId = indicators.find((item) =>
      selectedIndicatorIds.includes(item.id),
    )?.id;
    const sortValue = (districtId: string) =>
      primaryId
        ? (valueByKey.get(`${districtId}|${primaryId}`)?.nfhs6 ?? null)
        : null;

    return districts
      .filter((item) => selected.includes(item.id))
      .toSorted((a, b) => {
        const aValue = sortValue(a.id);
        const bValue = sortValue(b.id);

        if (aValue === bValue) {
          return a.name.localeCompare(b.name, "en-IN");
        }
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      });
  }, [districts, indicators, selectedIndicatorIds, selected, sortOrder, valueByKey]);

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

  function toggleIndicator(id: string) {
    setSelectedIndicatorIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      return [...current, id];
    });
  }

  function selectAllIndicators() {
    setSelectedIndicatorIds(indicators.map((indicator) => indicator.id));
  }

  function clearIndicators() {
    setSelectedIndicatorIds([]);
  }

  function valueFor(districtId: string, indicatorId: string) {
    return valueByKey.get(`${districtId}|${indicatorId}`);
  }

  function downloadXls() {
    if (!selectedIndicators.length || !comparisonDistricts.length) return;

    const xml = buildComparisonXls(
      selectedIndicators.map((indicator) => indicator.label),
      comparisonDistricts.map((district) => ({
        name: district.name,
        observations: selectedIndicators.map((indicator) => {
          const value = valueFor(district.id, indicator.id);
          return {
            nfhs6: {
              value: value?.nfhs6 ?? null,
              status: value?.nfhs6Status ?? "missing",
              unit: indicator.unit,
            },
            nfhs5: {
              value: value?.nfhs5 ?? null,
              status: value?.nfhs5Status ?? "missing",
              unit: indicator.unit,
            },
          };
        }),
      })),
    );
    const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "district-comparison.xls";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!indicators.length) {
    return <p>No comparison indicators are available.</p>;
  }

  const districtOptions = districts.map((district) => {
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
  });

  const indicatorOptions = indicators.map((indicator) => {
    const active = selectedIndicatorIds.includes(indicator.id);
    return (
      <label
        key={indicator.id}
        className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
      >
        <input
          type="checkbox"
          checked={active}
          onChange={() => toggleIndicator(indicator.id)}
          className="mt-0.5 size-4 shrink-0 rounded border-border accent-primary"
        />
        <span>{indicator.label.trim()}</span>
      </label>
    );
  });

  const columnCount = 2 + selectedIndicators.length * 2;
  const hasResults = comparisonDistricts.length > 0 && selectedIndicators.length > 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <details className="rounded-xl border bg-card xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
          <span className="font-semibold">Select District</span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            {selected.length} selected
            <ChevronDown className="size-4" aria-hidden="true" />
          </span>
        </summary>
        <div className="border-t">
          <div className="flex gap-2 p-4 pb-2">
            <Button type="button" size="sm" variant="outline" onClick={selectAll}>
              Select all
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={clearAll}>
              Clear
            </Button>
          </div>
          <div className="max-h-80 space-y-1 overflow-y-auto p-4 pt-2">
            {districtOptions}
          </div>
        </div>
      </details>

      <Card className="hidden self-start xl:sticky xl:top-24 xl:block">
        <CardHeader>
          <CardTitle>One or more districts can be selected</CardTitle>
          <p className="text-sm text-muted-foreground">
            {selected.length} selected.
          </p>
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
          {districtOptions}
        </CardContent>
      </Card>

      <div className="min-w-0 space-y-5">
        <details className="rounded-xl border bg-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
            <span className="font-semibold">Select Indicators</span>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              {selectedIndicators.length} of {indicators.length} selected
              <ChevronDown className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="border-t">
            <div className="flex gap-2 p-4 pb-2">
              <Button type="button" size="sm" variant="outline" onClick={selectAllIndicators}>
                Select all
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={clearIndicators}>
                Clear
              </Button>
            </div>
            <div className="grid max-h-80 gap-1 overflow-y-auto p-4 pt-2 sm:grid-cols-2">
              {indicatorOptions}
            </div>
          </div>
        </details>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={sortOrder === "desc" ? "default" : "outline"}
              onClick={() => setSortOrder("desc")}
            >
              High to Low
            </Button>
            <Button
              type="button"
              size="sm"
              variant={sortOrder === "asc" ? "default" : "outline"}
              onClick={() => setSortOrder("asc")}
            >
              Low to High
            </Button>
            {selectedIndicators[0] ? (
              <span className="text-xs text-muted-foreground">
                Sorted by NFHS-6 {selectedIndicators[0].label.trim()}
              </span>
            ) : null}
          </div>
          <Button
            type="button"
            onClick={downloadXls}
            disabled={!hasResults}
          >
            <Download className="size-4" aria-hidden="true" />
            Download XLS
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <Table className="w-auto min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead
                  rowSpan={2}
                  className="sticky left-0 z-20 min-w-44 bg-primary"
                >
                  District
                </TableHead>
                {selectedIndicators.map((indicator) => (
                  <TableHead
                    key={indicator.id}
                    colSpan={2}
                    className="w-64 border-l whitespace-normal"
                  >
                    {indicator.label.trim()}
                  </TableHead>
                ))}
                <TableHead rowSpan={2} className="text-right">
                  Actions
                </TableHead>
              </TableRow>
              <TableRow>
                {selectedIndicators.map((indicator) => (
                  <Fragment key={indicator.id}>
                    <TableHead className="w-24 border-l text-right">
                      NFHS-6
                    </TableHead>
                    <TableHead className="w-24 text-right">NFHS-5</TableHead>
                  </Fragment>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasResults ? (
                comparisonDistricts.map((district) => (
                  <TableRow key={district.id}>
                    <TableCell className="sticky left-0 z-10 min-w-44 bg-card">
                      <Link
                        href={`/districts/${district.slug}`}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {district.name}
                      </Link>
                    </TableCell>
                    {selectedIndicators.map((indicator) => {
                      const value = valueFor(district.id, indicator.id);
                      return (
                        <Fragment key={indicator.id}>
                          <TableCell className="border-l text-right">
                            <ValueDisplay
                              value={value?.nfhs6 ?? null}
                              status={value?.nfhs6Status ?? "missing"}
                              unit={indicator.unit}
                              showStatus={false}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <ValueDisplay
                              value={value?.nfhs5 ?? null}
                              status={value?.nfhs5Status ?? "missing"}
                              unit={indicator.unit}
                              showStatus={false}
                            />
                          </TableCell>
                        </Fragment>
                      );
                    })}
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
                  <TableCell colSpan={columnCount} className="h-28 text-center">
                    {selectedIndicators.length
                      ? "Select at least one district to compare."
                      : "Select at least one indicator to compare."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
