import { nfhsData } from "@/data/nfhs";
import { buildStateIndicatorsCsv } from "@/lib/nfhs/state-indicators-csv";

export function GET() {
  const csv = buildStateIndicatorsCsv(nfhsData);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.ms-excel; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="up-state-nfhs-5-vs-nfhs-6.xls"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
