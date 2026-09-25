import { Download } from "lucide-react";

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

type StateNfhsRow = {
  id: number;
  label: string;
  nfhs6: number | null;
  nfhs5: number | null;
  nfhs6Status: ObservationStatus;
  nfhs5Status: ObservationStatus;
};

export function HomeStateNfhsTable({ rows }: { rows: StateNfhsRow[] }) {
  return (
    <section aria-labelledby="state-nfhs-table" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="state-nfhs-table" className="section-heading">
            State-level Progress
          </h2>
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
              <TableHead className="text-right">NFHS-6</TableHead>
              <TableHead className="text-right">NFHS-5</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-semibold tabular-nums">{row.id}</TableCell>
                <TableCell>{row.label}</TableCell>
                <TableCell className="text-right">
                  <ValueDisplay
                    value={row.nfhs6}
                    status={row.nfhs6Status}
                    unit="percent"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <ValueDisplay
                    value={row.nfhs5}
                    status={row.nfhs5Status}
                    unit="percent"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
