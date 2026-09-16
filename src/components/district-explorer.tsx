"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Download, Eye, Search } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildSampleSizeCsv, type SampleSizeDistrict } from "@/lib/nfhs/sample-size-csv";
import { cn } from "@/lib/utils";

export type DistrictExplorerItem = SampleSizeDistrict & {
  slug: string;
};

export function DistrictExplorer({
  districts,
}: {
  districts: DistrictExplorerItem[];
}) {
  const [query, setQuery] = useState("");
  const [descending, setDescending] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("en-IN");
    return districts
      .filter((district) =>
        district.name.toLocaleLowerCase("en-IN").includes(normalized),
      )
      .toSorted((a, b) => {
        const order = a.name.localeCompare(b.name, "en-IN");
        return descending ? -order : order;
      });
  }, [descending, districts, query]);

  function downloadCsv() {
    const csv = buildSampleSizeCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "up-district-sample-sizes.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search districts</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 75 districts"
            className="pl-9"
          />
        </label>
        <button
          type="button"
          onClick={() => setDescending((value) => !value)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-background px-3 text-sm font-medium hover:bg-muted"
        >
          <ArrowUpDown className="size-4" aria-hidden="true" />
          Name {descending ? "Z-A" : "A-Z"}
        </button>
        <Button type="button" onClick={downloadCsv}>
          <Download className="size-4" aria-hidden="true" />
          Download CSV
        </Button>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} of {districts.length} districts
      </p>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead className="text-right">Households</TableHead>
                <TableHead className="text-right">Women</TableHead>
                <TableHead className="text-right">Men</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length ? (
                filtered.map((district) => (
                  <TableRow key={district.slug}>
                    <TableCell>
                      <Link
                        href={`/districts/${district.slug}`}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {district.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {district.households.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {district.women.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {district.men.toLocaleString("en-IN")}
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
                  <TableCell colSpan={5} className="h-28 text-center">
                    No district matches “{query}”. Clear the search and try
                    again.
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
