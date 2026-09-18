import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  HeartPulse,
  IndianRupee,
  Layers3,
  MapPinned,
  TrendingUp,
  Users,
} from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type InsightMetric = {
  label: string;
  value: string;
  description: string;
  Icon: typeof TrendingUp;
};

type LifeCycleMapping = {
  stage: string;
  ageGroup: string;
  focusIndicators: string;
  mappedSchemes: string;
  budgetHeads: string;
};

type BudgetHead = {
  head: string;
  amount: string;
  category: string;
};

const insightMetrics: InsightMetric[] = [
  {
    label: "GSDP (2024-25 RE)",
    value: "₹30.25 lakh crore",
    description: "Estimated state economy size highlighted in the speech.",
    Icon: IndianRupee,
  },
  {
    label: "Growth (YoY)",
    value: "13.4%",
    description: "Approximate annual growth over previous year estimate.",
    Icon: TrendingUp,
  },
  {
    label: "Per-capita income",
    value: "₹1,09,844",
    description: "With projection to ₹1,20,000 for 2025-26.",
    Icon: Users,
  },
  {
    label: "Unemployment rate",
    value: "2.24%",
    description: "State-level unemployment figure cited in the speech.",
    Icon: HeartPulse,
  },
  {
    label: "SDG rank progress",
    value: "29 → 18",
    description: "Improvement in SDG India ranking noted by the state.",
    Icon: MapPinned,
  },
  {
    label: "MoUs signed",
    value: "₹50 lakh crore",
    description: "Investment intent and execution pipeline focus.",
    Icon: Layers3,
  },
];

const lifeCycleMappings: LifeCycleMapping[] = [
  {
    stage: "Early childhood",
    ageGroup: "0-5 years",
    focusIndicators: "Birth registration, immunization, stunting/wasting",
    mappedSchemes: "JSY, JSSK, ICDS, POSHAN, PMMVY",
    budgetHeads: "Health & Family Welfare, Women & Child Development",
  },
  {
    stage: "School-age children",
    ageGroup: "6-14 years",
    focusIndicators: "School attendance, sanitation access, household protection",
    mappedSchemes: "Samagra Shiksha, PM POSHAN, Swachh Bharat Mission-Gramin",
    budgetHeads: "Samagra Shiksha, SBM-Gramin, Scholarships",
  },
  {
    stage: "Adolescents & youth",
    ageGroup: "10-19 years",
    focusIndicators: "Early pregnancy/marriage risk, schooling continuity",
    mappedSchemes: "Kanya Sumangala, Mission Shakti, scholarship programs",
    budgetHeads: "Kanya Sumangala, social welfare schemes, employment missions",
  },
  {
    stage: "Women of reproductive age",
    ageGroup: "15-49 years",
    focusIndicators: "ANC, institutional delivery, agency, health coverage",
    mappedSchemes: "PMMVY, JSY/JSSK/NHM, Ayushman Bharat",
    budgetHeads: "Health & Family Welfare, working women hostels",
  },
  {
    stage: "Adults and elderly",
    ageGroup: "50+ years",
    focusIndicators: "Hypertension, diabetes, obesity, risk behavior",
    mappedSchemes: "NCD screening, old-age/farmer pension, Nirashrit support",
    budgetHeads: "Pension heads, NCD screening and wellness centers",
  },
];

const mappedBudgetHeads: BudgetHead[] = [
  {
    head: "Health & Family Welfare",
    amount: "₹37,956 crore",
    category: "Health systems, RMNCH+A, public health delivery",
  },
  {
    head: "Women & Child Development",
    amount: "₹18,620 crore",
    category: "Nutrition, child development, women support services",
  },
  {
    head: "Samagra Shiksha",
    amount: "₹7,738 crore",
    category: "School continuity and education infrastructure",
  },
  {
    head: "SBM-Gramin",
    amount: "₹2,823 crore",
    category: "Sanitation and WASH-linked vulnerability reduction",
  },
  {
    head: "Scholarships",
    amount: "₹3,060.5 crore",
    category: "Schooling retention and equity support",
  },
  {
    head: "Social welfare schemes",
    amount: "₹14,953 crore",
    category: "Protection for vulnerable households and life-cycle needs",
  },
];

export const metadata: Metadata = {
  title: "Budget Speech × NFHS-6",
  description:
    "Explore how Uttar Pradesh Budget Speech 2026-2027 priorities can be mapped to NFHS-6 district vulnerabilities across life stages.",
};

export default function BudgetSpeechPage() {
  return (
    <PageShell
      eyebrow="Policy intelligence"
      title="UP Budget Speech 2026-2027 × NFHS-6"
      description="A planning view that links life-cycle vulnerabilities from NFHS-6 district fact sheets to budget heads and social protection schemes in Uttar Pradesh."
      actions={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <a
            href="/Budget_Speech_2026_2027.pdf"
            className={cn(buttonVariants({ variant: "outline" }))}
            download
          >
            <Download className="size-4" aria-hidden="true" />
            Download Budget Speech
          </a>
          <Link href="/reports" className={cn(buttonVariants())}>
            Explore reports
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      }
    >
      <div className="space-y-10">
        <section aria-label="Page context" className="flex flex-wrap gap-2">
          <Badge variant="secondary">Uttar Pradesh</Badge>
          <Badge variant="secondary">Budget 2026-2027</Badge>
          <Badge variant="secondary">NFHS-6 district fact sheets</Badge>
          <Badge variant="secondary">Life-cycle social protection</Badge>
        </section>

        <section
          aria-label="Macroeconomic and planning highlights"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {insightMetrics.map((metric) => (
            <Card key={metric.label} className="border-primary/20 bg-primary/5">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <metric.Icon className="size-4 text-primary" aria-hidden="true" />
                  {metric.label}
                </CardTitle>
                <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {metric.description}
              </CardContent>
            </Card>
          ))}
        </section>

        <section aria-labelledby="life-cycle-infographic" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Visual framework</p>
            <h2 id="life-cycle-infographic" className="section-heading">
              NFHS-6 life-cycle mapping for social protection planning
            </h2>
            <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
              This framework maps district vulnerability signals to scheme and budget
              pathways, supporting data-backed district planning.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <Image
              src="/images/mock-infacts.jpeg"
              alt="Life-cycle mapping of NFHS-6 indicators to social protection schemes and budget heads"
              width={1920}
              height={1080}
              className="h-auto w-full"
              sizes="100vw"
              priority
            />
          </div>
        </section>

        <section aria-labelledby="stage-budget-table" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Design table</p>
            <h2 id="stage-budget-table" className="section-heading">
              Life-stage to budget mapping table
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-48">Life stage</TableHead>
                  <TableHead className="min-w-32">Age group</TableHead>
                  <TableHead className="min-w-72">NFHS focus indicators</TableHead>
                  <TableHead className="min-w-72">Mapped schemes</TableHead>
                  <TableHead className="min-w-72">Budget heads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifeCycleMappings.map((mapping) => (
                  <TableRow key={mapping.stage}>
                    <TableCell className="font-semibold">{mapping.stage}</TableCell>
                    <TableCell>{mapping.ageGroup}</TableCell>
                    <TableCell>{mapping.focusIndicators}</TableCell>
                    <TableCell>{mapping.mappedSchemes}</TableCell>
                    <TableCell>{mapping.budgetHeads}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section aria-labelledby="mapped-budget-heads" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Priority budget heads</p>
            <h2 id="mapped-budget-heads" className="section-heading">
              Budget heads relevant to NFHS-6 outcomes
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Budget head</TableHead>
                  <TableHead className="text-right">Allocation</TableHead>
                  <TableHead className="hidden md:table-cell">Policy relevance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mappedBudgetHeads.map((head) => (
                  <TableRow key={head.head}>
                    <TableCell className="font-medium">{head.head}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {head.amount}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {head.category}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section
          aria-labelledby="next-actions"
          className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6"
        >
          <h2 id="next-actions" className="section-heading text-xl">
            How this page should be used
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>
              1. Select district risk indicators in the NFHS dashboard and identify
              top life-cycle vulnerabilities.
            </li>
            <li>
              2. Use the stage mapping table to align vulnerabilities with relevant
              scheme pathways.
            </li>
            <li>
              3. Track whether priority budget heads and allocations are aligned to
              observed district deprivation.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/Budget_Speech_2026_2027.pdf"
              className={cn(buttonVariants({ variant: "outline" }))}
              download
            >
              <FileText className="size-4" aria-hidden="true" />
              Open source PDF
            </a>
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
