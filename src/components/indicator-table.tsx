import { formatChange } from "@/lib/nfhs/format";
import type { DistrictIndicatorRow } from "@/lib/nfhs/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValueDisplay } from "@/components/value-display";

export function IndicatorTable({ rows }: { rows: DistrictIndicatorRow[] }) {
  return (
    <div className="district-indicator-table overflow-hidden rounded-xl border bg-card">
      <Table className="min-w-[620px] sm:min-w-[700px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[55%] min-w-72 whitespace-normal">Indicator</TableHead>
            <TableHead className="w-[15%] text-right">NFHS-6</TableHead>
            <TableHead className="w-[15%] text-right">NFHS-5</TableHead>
            <TableHead className="w-[15%] text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.indicatorId}>
              <TableCell className="whitespace-normal">
                <div className="space-y-1">
                  <p className="font-medium leading-5">
                    {row.indicator.sourceNumber}. {row.indicator.label}
                  </p>
                  {row.indicator.footnoteIds.length ? (
                    <p className="text-xs text-muted-foreground">
                      Notes: {row.indicator.footnoteIds.join(", ")}
                    </p>
                  ) : null}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <ValueDisplay
                  value={row.nfhs6}
                  status={row.nfhs6Status}
                  unit={row.indicator.unit}
                />
              </TableCell>
              <TableCell className="text-right">
                <ValueDisplay
                  value={row.nfhs5}
                  status={row.nfhs5Status}
                  unit={row.indicator.unit}
                />
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatChange(
                  row.nfhs6,
                  row.nfhs5,
                  row.indicator.unit,
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
