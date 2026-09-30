import { nfhsData } from "@/data/nfhs";
import { buildStateIndicatorsCsv } from "@/lib/nfhs/state-indicators-csv";

export function GET() {
  const csv = buildStateIndicatorsCsv(nfhsData);
  const csvWithBom = `\uFEFF${csv.replace(/\n/g, "\r\n")}`;

  return new Response(csvWithBom, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="up-state-nfhs-5-vs-nfhs-6.csv"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
