import type { Metadata } from "next";
import { Download, Landmark, LineChart, ReceiptText, Target } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Budget Speech × NFHS-6",
  description:
    "Uttar Pradesh Budget 2026-27 highlights aligned with NFHS-6 context.",
};

const overallBudgetSize = [
  {
    title: "Total budget",
    value: "₹9,12,696.35 crore",
    note: "Up ~12.9% over 2025-26",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Capital expenditure",
    value: "19.5%",
    note: "Share of total budget",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "New schemes",
    value: "₹43,565.33 crore",
    note: "Allocated to new initiatives",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Fiscal deficit",
    value: "₹1,18,480.59 crore",
    note: "2.98% of estimated GSDP, within the 3% limit set by the 16th Finance Commission",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Debt-to-GSDP ratio target",
    value: "23.1%",
    note: "From 27% in 2024-25, long-term goal under 20%",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
];

const receiptsExpenditure = [
  {
    label: "Total receipts",
    value: "₹8,48,233.18 crore",
    breakdown:
      "Revenue receipts ₹7,28,928.12 crore + capital receipts ₹1,19,305.06 crore",
  },
  {
    label: "Total expenditure",
    value: "₹9,12,696.35 crore",
    breakdown:
      "Revenue account ₹6,64,470.55 crore + capital account ₹2,48,225.81 crore",
  },
  {
    label: "Revenue surplus",
    value: "₹64,457.57 crore",
    breakdown: "Positive surplus position",
  },
];

const economicHighlights = [
  "UP's GSDP (2024-25 quick estimate): ₹30.25 lakh crore, up 13.4% year-on-year",
  "Per capita income: ₹1,09,844 (estimated ₹1,20,000 for 2025-26), more than double the 2016-17 figure",
  "Unemployment rate down to 2.24%",
  "UP climbed from 29th to 18th in the SDG India Index (2018-19 to 2023-24)",
  "~₹50 lakh crore in MoUs signed via Global Investors Summit (Feb 2024), with ~₹15 lakh crore worth of projects already ground-broken",
];

const sectorAllocations = [
  { sector: "Basic Education", allocation: "₹77,622 crore", change: "—" },
  {
    sector: "Medical, Health & Family Welfare",
    allocation: "₹37,956 crore",
    change: "+15%",
  },
  { sector: "Secondary Education", allocation: "₹22,167 crore", change: "+15%" },
  { sector: "Energy", allocation: "₹65,926 crore", change: "+8%" },
  { sector: "Irrigation & Flood Control", allocation: "₹18,290 crore", change: "+30%" },
  { sector: "Roads & Bridges", allocation: "₹34,468 crore", change: "—" },
  {
    sector: "Namami Gange & Rural Water Supply",
    allocation: "₹22,676 crore",
    change: "—",
  },
  { sector: "Panchayati Raj", allocation: "₹32,090 crore", change: "+67%" },
  { sector: "Rural Development", allocation: "₹25,500 crore", change: "—" },
  { sector: "Urban Development", allocation: "₹26,514 crore", change: "—" },
  { sector: "Agriculture", allocation: "₹10,888 crore", change: "+20%" },
  { sector: "Medical Education", allocation: "₹14,997 crore", change: "—" },
  {
    sector: "Infrastructure & Industrial Development",
    allocation: "₹27,103 crore",
    change: "+13%",
  },
  { sector: "IT & Electronics", allocation: "₹2,059 crore", change: "+76%" },
  { sector: "Social Welfare", allocation: "₹14,953 crore", change: "+8%" },
  { sector: "Women & Child Development", allocation: "₹18,620 crore", change: "+11%" },
  { sector: "Judiciary", allocation: "₹9,845 crore", change: "+9%" },
  {
    sector: "Vocational Education & Skill Development",
    allocation: "₹3,349 crore",
    change: "+88%",
  },
  { sector: "Handloom & Textiles", allocation: "₹5,041 crore", change: "5x increase" },
  { sector: "Food & Civil Supplies", allocation: "₹20,124 crore", change: "—" },
];

const revenueTargets = [
  { source: "State GST + VAT", target: "₹1,49,956 crore" },
  { source: "Excise duty", target: "₹71,278 crore" },
  { source: "Stamps & Registration", target: "₹43,802 crore" },
  { source: "Vehicle tax", target: "₹15,808 crore" },
];

export default function BudgetSpeechPage() {
  return (
    <PageShell
      eyebrow="Uttar Pradesh Budget Speech 2026-27"
      title="Budget highlights with NFHS-6 policy context"
      description="A complete structured summary of all requested budget blocks: overall budget size, receipts and expenditure, economic highlights, sector-wise allocations, and revenue targets."
      actions={
        <a
          href="/Budget_Speech_2026_2027.pdf"
          className={cn(buttonVariants())}
          download="Budget_Speech_2026_2027.pdf"
        >
          <Download className="size-4" aria-hidden="true" />
          Download Budget PDF
        </a>
      }
      headerExtra={
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Budget 2026-27</Badge>
          <Badge variant="secondary">UP macro-fiscal snapshot</Badge>
          <Badge variant="secondary">Planning reference</Badge>
        </div>
      }
    >
      <div className="space-y-10">
        <section aria-labelledby="overall-budget-size" className="space-y-4">
          <div>
            <p className="eyebrow">Overall budget size</p>
            <h2 id="overall-budget-size" className="section-heading mt-2 flex items-center gap-2">
              <Landmark className="size-5 text-primary" aria-hidden="true" />
              Headline fiscal indicators
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {overallBudgetSize.map((item) => (
              <Card key={item.title} className={cn("border-primary/20 bg-gradient-to-br", item.gradient)}>
                <CardHeader className="pb-2">
                  <CardDescription className="text-foreground/80">{item.title}</CardDescription>
                  <CardTitle className="text-2xl">{item.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="receipts-expenditure" className="space-y-4">
          <div>
            <p className="eyebrow">Receipts & expenditure</p>
            <h2 id="receipts-expenditure" className="section-heading mt-2 flex items-center gap-2">
              <ReceiptText className="size-5 text-primary" aria-hidden="true" />
              Fiscal flow snapshot
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {receiptsExpenditure.map((item) => (
              <Card key={item.label} className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.breakdown}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="economic-highlights" className="space-y-4">
          <div>
            <p className="eyebrow">Economic highlights</p>
            <h2 id="economic-highlights" className="section-heading mt-2 flex items-center gap-2">
              <LineChart className="size-5 text-primary" aria-hidden="true" />
              Growth and development signals
            </h2>
          </div>
          <Card className="border-primary/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {economicHighlights.map((item) => (
                  <li key={item} className="list-inside list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="sector-allocations" className="space-y-4">
          <div>
            <p className="eyebrow">Sector-wise allocations</p>
            <h2 id="sector-allocations" className="section-heading mt-2">
              Major allocations and year-on-year change
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="max-h-[34rem] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-80">Sector</TableHead>
                    <TableHead className="text-right">Allocation</TableHead>
                    <TableHead className="text-right">Change vs 2025-26</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectorAllocations.map((row) => (
                    <TableRow key={row.sector}>
                      <TableCell className="font-medium">{row.sector}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.allocation}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.change}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <section aria-labelledby="revenue-targets" className="space-y-4">
          <div>
            <p className="eyebrow">Revenue targets</p>
            <h2 id="revenue-targets" className="section-heading mt-2 flex items-center gap-2">
              <Target className="size-5 text-primary" aria-hidden="true" />
              Key own-tax and non-tax targets
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {revenueTargets.map((item) => (
              <Card key={item.source} className="border-primary/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <CardHeader className="pb-2">
                  <CardDescription>{item.source}</CardDescription>
                  <CardTitle className="text-xl">{item.target}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
