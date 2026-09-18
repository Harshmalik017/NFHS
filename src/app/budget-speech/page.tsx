import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  Download,
  FileText,
  HeartPulse,
  IndianRupee,
  Layers3,
  Leaf,
  MapPinned,
  School,
  ShieldCheck,
  Sprout,
  Stethoscope,
  TrendingUp,
  UserRoundCheck,
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
  focusIndicators: string[];
  vulnerabilities: string[];
  mappedSchemes: string[];
  budgetHeads: string[];
  cardClassName: string;
  Icon: typeof Baby;
};

type BudgetHead = {
  head: string;
  amount: string;
  category: string;
};

type BudgetSpeechFocus = {
  title: string;
  value: string;
  description: string;
  className: string;
  Icon: typeof TrendingUp;
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
    focusIndicators: [
      "Birth registration",
      "Institutional birth",
      "Full immunization",
      "Stunting/wasting/underweight",
    ],
    vulnerabilities: [
      "Malnutrition burden",
      "Infection risk",
      "Early childhood care gaps",
    ],
    mappedSchemes: ["JSY", "JSSK", "ICDS", "POSHAN", "PMMVY"],
    budgetHeads: ["Health & Family Welfare ₹37,956 cr", "WCD ₹18,620 cr"],
    cardClassName:
      "border-amber-300/50 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30",
    Icon: Baby,
  },
  {
    stage: "School-age children",
    ageGroup: "6-14 years",
    focusIndicators: [
      "School attendance",
      "Basic sanitation",
      "Drinking water safety",
      "Household insurance access",
    ],
    vulnerabilities: ["Dropout risk", "Unsafe WASH", "Poverty-linked learning loss"],
    mappedSchemes: [
      "Samagra Shiksha",
      "PM POSHAN",
      "Swachh Bharat Mission-Gramin",
    ],
    budgetHeads: [
      "Samagra Shiksha ₹7,738 cr",
      "SBM-Gramin ₹2,823 cr",
      "Scholarships ₹3,060.5 cr",
    ],
    cardClassName:
      "border-sky-300/50 bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 dark:from-cyan-950/30 dark:via-sky-950/20 dark:to-blue-950/30",
    Icon: School,
  },
  {
    stage: "Adolescents & youth",
    ageGroup: "10-19 years",
    focusIndicators: [
      "Teen pregnancy/marriage",
      "Schooling continuity",
      "Digital access",
      "Menstrual hygiene support",
    ],
    vulnerabilities: [
      "Early marriage risk",
      "Education discontinuity",
      "Digital exclusion",
    ],
    mappedSchemes: [
      "Kanya Sumangala",
      "Mission Shakti",
      "Scholarship pathways",
      "Skill and employment missions",
    ],
    budgetHeads: [
      "Kanya Sumangala ₹400 cr",
      "Social welfare ₹14,953 cr",
      "Employment missions ₹200 cr",
    ],
    cardClassName:
      "border-violet-300/50 bg-gradient-to-br from-fuchsia-100 via-violet-50 to-purple-100 dark:from-fuchsia-950/30 dark:via-violet-950/20 dark:to-purple-950/30",
    Icon: UserRoundCheck,
  },
  {
    stage: "Women of reproductive age",
    ageGroup: "15-49 years",
    focusIndicators: [
      "ANC and institutional delivery",
      "Family planning access",
      "Women decision-making agency",
      "Health insurance coverage",
    ],
    vulnerabilities: ["Maternal risk", "Low agency", "Income insecurity"],
    mappedSchemes: ["PMMVY", "JSY/JSSK/NHM", "Ayushman Bharat", "NRLM/BC Sakhi"],
    budgetHeads: ["Health & Family Welfare ₹37,956 cr", "Working women hostels ₹100 cr"],
    cardClassName:
      "border-emerald-300/50 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-green-950/30",
    Icon: ShieldCheck,
  },
  {
    stage: "Adults and elderly",
    ageGroup: "50+ years",
    focusIndicators: [
      "Hypertension",
      "Diabetes/high blood sugar",
      "Obesity and lifestyle risk",
      "Insurance support coverage",
    ],
    vulnerabilities: ["NCD burden", "Disability risk", "Old-age poverty and isolation"],
    mappedSchemes: [
      "NCD screening",
      "Old-age pension",
      "Nirashrit Mahila Pension",
      "Divyang Pension",
    ],
    budgetHeads: [
      "Old-age/Farmer pension ₹8,950 cr",
      "Nirashrit Mahila Pension ₹3,500 cr",
      "Divyang Pension ₹1,470 cr",
    ],
    cardClassName:
      "border-rose-300/50 bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-red-950/30",
    Icon: HeartPulse,
  },
];

const budgetSpeechFocusAreas: BudgetSpeechFocus[] = [
  {
    title: "Agriculture support",
    value: "₹3,04,321 crore+",
    description:
      "Sugarcane payment claim and procurement-linked rural income support emphasis.",
    className:
      "border-lime-300/60 bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-950/30 dark:to-green-950/30",
    Icon: Sprout,
  },
  {
    title: "Public health momentum",
    value: "₹37,956 crore",
    description:
      "Health and Family Welfare allocation for service delivery and maternal-child outcomes.",
    className:
      "border-emerald-300/60 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30",
    Icon: Stethoscope,
  },
  {
    title: "School and nutrition",
    value: "₹7,738 crore",
    description:
      "Samagra Shiksha with nutrition and sanitation convergence to reduce child vulnerability.",
    className:
      "border-cyan-300/60 bg-gradient-to-br from-cyan-100 to-sky-100 dark:from-cyan-950/30 dark:to-sky-950/30",
    Icon: School,
  },
  {
    title: "Women and child welfare",
    value: "₹18,620 crore",
    description:
      "Women and Child Development head aligned with life-cycle social protection goals.",
    className:
      "border-pink-300/60 bg-gradient-to-br from-pink-100 to-fuchsia-100 dark:from-pink-950/30 dark:to-fuchsia-950/30",
    Icon: Users,
  },
  {
    title: "Green and energy transition",
    value: "2,815 MW",
    description:
      "Installed solar capacity highlighted with broader clean-energy direction in budget speech.",
    className:
      "border-amber-300/60 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-950/30",
    Icon: Leaf,
  },
  {
    title: "Inclusion and social protection",
    value: "₹14,953 crore",
    description:
      "Social welfare envelope supporting vulnerable households, elderly, and at-risk groups.",
    className:
      "border-violet-300/60 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/30 dark:to-purple-950/30",
    Icon: AlertTriangle,
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

        <section aria-labelledby="budget-focus-cards" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Budget speech focus areas</p>
            <h2 id="budget-focus-cards" className="section-heading">
              Core insights from Budget Speech 2026-2027
            </h2>
            <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
              These themes are extracted from the speech and aligned to NFHS-6
              planning relevance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {budgetSpeechFocusAreas.map((focus) => (
              <Card key={focus.title} className={focus.className}>
                <CardHeader className="gap-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                    <focus.Icon className="size-4" aria-hidden="true" />
                    {focus.title}
                  </CardTitle>
                  <p className="text-2xl font-semibold tracking-tight">{focus.value}</p>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-foreground/80">
                  {focus.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="life-cycle-cards" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">Life-cycle design</p>
            <h2 id="life-cycle-cards" className="section-heading">
              NFHS-6 life-stage vulnerability and budget action cards
            </h2>
            <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
              Colorful cards replace the reference image and present implementable
              program pathways directly from the speech-aligned planning model.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {lifeCycleMappings.map((mapping) => (
              <Card key={mapping.stage} className={mapping.cardClassName}>
                <CardHeader className="gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <mapping.Icon className="size-4 text-primary" aria-hidden="true" />
                    {mapping.stage}
                  </CardTitle>
                  <p className="text-sm font-medium text-foreground/80">{mapping.ageGroup}</p>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-foreground/85">
                  <div>
                    <p className="font-semibold">NFHS focus indicators</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4">
                      {mapping.focusIndicators.map((indicator) => (
                        <li key={indicator}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Key vulnerabilities</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4">
                      {mapping.vulnerabilities.map((vulnerability) => (
                        <li key={vulnerability}>{vulnerability}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Scheme linkage</p>
                    <p className="mt-1">{mapping.mappedSchemes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Budget signals</p>
                    <p className="mt-1">{mapping.budgetHeads.join(" · ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <TableCell>{mapping.focusIndicators.join(", ")}</TableCell>
                    <TableCell>{mapping.mappedSchemes.join(", ")}</TableCell>
                    <TableCell>{mapping.budgetHeads.join(", ")}</TableCell>
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
