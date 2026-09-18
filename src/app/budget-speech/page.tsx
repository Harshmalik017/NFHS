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
    value: "₹77,622 crore",
    description:
      "Basic education outlay with scholarship and school quality priorities.",
    className:
      "border-sky-300/60 bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-950/30 dark:to-cyan-950/30",
    Icon: School,
  },
  {
    title: "Women and child development",
    value: "₹18,620 crore",
    description:
      "Direct focus on women, adolescent girls, and child-centered social support.",
    className:
      "border-fuchsia-300/60 bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-950/30 dark:to-pink-950/30",
    Icon: UserRoundCheck,
  },
];

const budgetHeads: BudgetHead[] = [
  {
    head: "Basic Education",
    amount: "₹77,622 crore",
    category: "Human development",
  },
  {
    head: "Medical, Health & Family Welfare",
    amount: "₹37,956 crore",
    category: "Health systems",
  },
  {
    head: "Women & Child Development",
    amount: "₹18,620 crore",
    category: "Social protection",
  },
  {
    head: "Irrigation & Flood Control",
    amount: "₹18,290 crore",
    category: "Resilience",
  },
  {
    head: "Rural Development",
    amount: "₹25,500 crore",
    category: "Livelihoods",
  },
  {
    head: "Namami Gange & Rural Water Supply",
    amount: "₹22,676 crore",
    category: "WASH",
  },
  {
    head: "Panchayati Raj",
    amount: "₹32,090 crore",
    category: "Local governance",
  },
  {
    head: "Agriculture",
    amount: "₹10,888 crore",
    category: "Food systems",
  },
];

export const metadata: Metadata = {
  title: "Budget Speech × NFHS-6",
  description:
    "Uttar Pradesh Budget 2026-27 priorities mapped to NFHS-6 indicators.",
};

export default function BudgetSpeechPage() {
  return (
    <PageShell
      eyebrow="Uttar Pradesh Budget 2026-27"
      title="Budget Speech priorities aligned with NFHS-6 outcomes"
      description="A colorful policy-to-outcome view that links major budget signals to life-cycle vulnerabilities and NFHS-6 indicator tracking."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/Budget_Speech_2026_2027.pdf"
            className={cn(buttonVariants({ variant: "outline" }))}
            download
          >
            <Download className="size-4" aria-hidden="true" />
            Download speech PDF
          </a>
          <Link href="/reports" className={cn(buttonVariants())}>
            <FileText className="size-4" aria-hidden="true" />
            Open reports
          </Link>
        </div>
      }
      headerExtra={
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">NFHS-6</Badge>
          <Badge variant="secondary">Budget 2026-27</Badge>
          <Badge variant="secondary">UP state priorities</Badge>
        </div>
      }
    >
      <div className="space-y-10">
        <section aria-labelledby="macro-insights" className="space-y-4">
          <div>
            <p className="eyebrow">Macro context</p>
            <h2 id="macro-insights" className="section-heading mt-2">
              Key signals from the budget speech
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {insightMetrics.map((metric) => (
              <Card
                key={metric.label}
                className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start justify-between gap-3 text-base">
                    <span>{metric.label}</span>
                    <metric.Icon className="size-4 text-primary" aria-hidden="true" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="focus-cards" className="space-y-4">
          <div>
            <p className="eyebrow">Budget pulse</p>
            <h2 id="focus-cards" className="section-heading mt-2">
              Priority areas that shape NFHS-linked outcomes
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {budgetSpeechFocusAreas.map((item) => (
              <Card key={item.title} className={item.className}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between gap-3 text-base">
                    <span>{item.title}</span>
                    <item.Icon className="size-5 text-primary" aria-hidden="true" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="life-cycle-map" className="space-y-4">
          <div>
            <p className="eyebrow">Life-cycle policy map</p>
            <h2 id="life-cycle-map" className="section-heading mt-2">
              Mapping budget instruments to vulnerable population groups
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The cards below provide a practical way to connect budget announcements
              with NFHS indicators by age/life stage.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {lifeCycleMappings.map((mapping) => (
              <Card key={mapping.stage} className={mapping.cardClassName}>
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <mapping.Icon className="size-5 text-primary" aria-hidden="true" />
                    {mapping.stage}
                  </CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">
                    Age focus: {mapping.ageGroup}
                  </p>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-6">
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">NFHS focus indicators</h3>
                    <ul className="list-inside list-disc text-muted-foreground">
                      {mapping.focusIndicators.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Key vulnerabilities</h3>
                    <ul className="list-inside list-disc text-muted-foreground">
                      {mapping.vulnerabilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Mapped schemes</h3>
                    <div className="flex flex-wrap gap-2">
                      {mapping.mappedSchemes.map((scheme) => (
                        <Badge key={scheme} variant="secondary">
                          {scheme}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Budget signals</h3>
                    <ul className="list-inside list-disc text-muted-foreground">
                      {mapping.budgetHeads.map((head) => (
                        <li key={head}>{head}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="allocation-table" className="space-y-4">
          <div>
            <p className="eyebrow">Major heads</p>
            <h2 id="allocation-table" className="section-heading mt-2">
              Budget heads relevant for NFHS-linked planning
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-72">Budget head</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetHeads.map((item) => (
                  <TableRow key={item.head}>
                    <TableCell className="font-medium">{item.head}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section
          aria-labelledby="how-to-use"
          className="rounded-xl border border-amber-300/50 bg-gradient-to-br from-amber-100 to-yellow-50 p-5 dark:from-amber-950/25 dark:to-yellow-950/10"
        >
          <h2
            id="how-to-use"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <AlertTriangle className="size-5 text-amber-600" aria-hidden="true" />
            How to use this page for action
          </h2>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
            <p className="rounded-lg bg-background/80 p-3">
              <ArrowRight className="mr-1 inline size-4 text-primary" aria-hidden="true" />
              Use this as a bridge between fiscal announcements and district-level
              NFHS indicators.
            </p>
            <p className="rounded-lg bg-background/80 p-3">
              <ArrowRight className="mr-1 inline size-4 text-primary" aria-hidden="true" />
              Prioritize interventions where high vulnerability and large budget
              opportunity overlap.
            </p>
            <p className="rounded-lg bg-background/80 p-3">
              <ArrowRight className="mr-1 inline size-4 text-primary" aria-hidden="true" />
              Track annual movement in high-priority indicators for each life stage.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <Leaf className="size-4 text-green-600" aria-hidden="true" />
            <span className="text-muted-foreground">
              Source: Uttar Pradesh Budget Speech 2026-27 and NFHS-6 static dataset.
            </span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
