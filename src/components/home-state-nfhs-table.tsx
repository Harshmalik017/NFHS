"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValueDisplay } from "@/components/value-display";
import type { ObservationStatus } from "@/lib/nfhs/types";
import { cn } from "@/lib/utils";

type ResidenceFilter = "overall" | "urban" | "rural";

type StateNfhsRow = {
  id: number;
  label: string;
  nfhs6: Record<ResidenceFilter, number | null>;
  nfhs5: Record<ResidenceFilter, number | null>;
  nfhs6Status: Record<ResidenceFilter, ObservationStatus>;
  nfhs5Status: Record<ResidenceFilter, ObservationStatus>;
};

export function HomeStateNfhsTable({ rows }: { rows: StateNfhsRow[] }) {
  const [residence, setResidence] = useState<ResidenceFilter>("overall");
  const residenceLabel =
    residence[0].toUpperCase() + residence.slice(1);

  return (
    <section aria-labelledby="state-nfhs-table" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">State-level Progress</p>
          <h2 id="state-nfhs-table" className="section-heading mt-2">
            Uttar Pradesh NFHS-6 vs NFHS-5
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={residence === "overall" ? "default" : "outline"}
              onClick={() => setResidence("overall")}
            >
              Overall
            </Button>
            <Button
              type="button"
              size="sm"
              variant={residence === "urban" ? "default" : "outline"}
              onClick={() => setResidence("urban")}
            >
              Urban
            </Button>
            <Button
              type="button"
              size="sm"
              variant={residence === "rural" ? "default" : "outline"}
              onClick={() => setResidence("rural")}
            >
              Rural
            </Button>
          </div>
        </div>
        <a
          href="/api/up-state-nfhs-5-6-excel"
          className={cn(buttonVariants())}
          download
        >
          <Download className="size-4" aria-hidden="true" />
          Download Excel
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">No.</TableHead>
              <TableHead className="min-w-96">Indicator</TableHead>
              <TableHead className="text-right">
                NFHS-6 ({residenceLabel})
              </TableHead>
              <TableHead className="text-right">
                NFHS-5 ({residenceLabel})
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-semibold tabular-nums">{row.id}</TableCell>
                <TableCell>{row.label}</TableCell>
                <TableCell className="text-right">
                  <ValueDisplay
                    value={row.nfhs6[residence] ?? row.nfhs6.overall}
                    status={row.nfhs6Status[residence] ?? row.nfhs6Status.overall}
                    unit="percent"
                  />
                </TableCell>
                <TableCell className="text-right">
                  {residence !== "overall" &&
                  row.nfhs5Status[residence] === "missing" ? (
                    <span className="font-semibold tabular-nums">-</span>
                  ) : (
                    <ValueDisplay
                      value={row.nfhs5[residence] ?? row.nfhs5.overall}
                      status={row.nfhs5Status[residence] ?? row.nfhs5Status.overall}
                      unit="percent"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
