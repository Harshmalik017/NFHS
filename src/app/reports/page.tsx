import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ReportsDownloads } from "@/components/reports-downloads";

export const metadata: Metadata = {
  title: "Reports",
  description: "Download NFHS reports and district sample-size datasets.",
};

export default function ReportsPage() {
  return (
    <PageShell
      eyebrow="Reports"
      title="Download reports"
    >
      <ReportsDownloads />
    </PageShell>
  );
}
