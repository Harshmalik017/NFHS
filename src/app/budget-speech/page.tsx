import type { Metadata } from "next";
import {
  Baby,
  Download,
  HeartPulse,
  Landmark,
  LineChart,
  ReceiptText,
  School,
  ShieldCheck,
  Target,
  UserRoundCheck,
} from "lucide-react";

import { BudgetSpeechPagePreview } from "@/components/budget-speech-page-preview";
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
    sourcePage: 1,
  },
  {
    title: "Capital expenditure",
    value: "19.5%",
    note: "Share of total budget",
    gradient: "from-indigo-500/20 to-violet-500/20",
    sourcePage: 1,
  },
  {
    title: "New schemes",
    value: "₹43,565.33 crore",
    note: "Allocated to new initiatives",
    gradient: "from-emerald-500/20 to-teal-500/20",
    sourcePage: 1,
  },
  {
    title: "Fiscal deficit",
    value: "₹1,18,480.59 crore",
    note: "2.98% of estimated GSDP, within the 3% limit set by the 16th Finance Commission",
    gradient: "from-amber-500/20 to-orange-500/20",
    sourcePage: 2,
  },
  {
    title: "Debt-to-GSDP ratio target",
    value: "23.1%",
    note: "From 27% in 2024-25, long-term goal under 20%",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    sourcePage: 2,
  },
];

const receiptsExpenditure = [
  {
    label: "Total receipts",
    value: "₹8,48,233.18 crore",
    breakdown:
      "Revenue receipts ₹7,28,928.12 crore + capital receipts ₹1,19,305.06 crore",
    sourcePage: 1,
  },
  {
    label: "Total expenditure",
    value: "₹9,12,696.35 crore",
    breakdown:
      "Revenue account ₹6,64,470.55 crore + capital account ₹2,48,225.81 crore",
    sourcePage: 1,
  },
  {
    label: "Revenue surplus",
    value: "₹64,457.57 crore",
    breakdown: "Positive surplus position",
    sourcePage: 2,
  },
];

const economicHighlights = [
  {
    text: "UP's GSDP (2024-25 quick estimate): ₹30.25 lakh crore, up 13.4% year-on-year",
    sourcePage: 1,
  },
  {
    text: "Per capita income: ₹1,09,844 (estimated ₹1,20,000 for 2025-26), more than double the 2016-17 figure",
    sourcePage: 1,
  },
  { text: "Unemployment rate down to 2.24%", sourcePage: 1 },
  {
    text: "UP climbed from 29th to 18th in the SDG India Index (2018-19 to 2023-24)",
    sourcePage: 1,
  },
  {
    text: "~₹50 lakh crore in MoUs signed via Global Investors Summit (Feb 2024), with ~₹15 lakh crore worth of projects already ground-broken",
    sourcePage: 1,
  },
];

const sectorAllocations = [
  { sector: "Basic Education", allocation: "₹77,622 crore", change: "—", sourcePage: 1 },
  {
    sector: "Medical, Health & Family Welfare",
    allocation: "₹37,956 crore",
    change: "+15%",
    sourcePage: 1,
  },
  { sector: "Secondary Education", allocation: "₹22,167 crore", change: "+15%", sourcePage: 1 },
  { sector: "Energy", allocation: "₹65,926 crore", change: "+8%", sourcePage: 1 },
  { sector: "Irrigation & Flood Control", allocation: "₹18,290 crore", change: "+30%", sourcePage: 1 },
  { sector: "Roads & Bridges", allocation: "₹34,468 crore", change: "—", sourcePage: 1 },
  {
    sector: "Namami Gange & Rural Water Supply",
    allocation: "₹22,676 crore",
    change: "—",
    sourcePage: 1,
  },
  { sector: "Panchayati Raj", allocation: "₹32,090 crore", change: "+67%", sourcePage: 1 },
  { sector: "Rural Development", allocation: "₹25,500 crore", change: "—", sourcePage: 1 },
  { sector: "Urban Development", allocation: "₹26,514 crore", change: "—", sourcePage: 1 },
  { sector: "Agriculture", allocation: "₹10,888 crore", change: "+20%", sourcePage: 1 },
  { sector: "Medical Education", allocation: "₹14,997 crore", change: "—", sourcePage: 1 },
  {
    sector: "Infrastructure & Industrial Development",
    allocation: "₹27,103 crore",
    change: "+13%",
    sourcePage: 1,
  },
  { sector: "IT & Electronics", allocation: "₹2,059 crore", change: "+76%", sourcePage: 1 },
  { sector: "Social Welfare", allocation: "₹14,953 crore", change: "+8%", sourcePage: 1 },
  { sector: "Women & Child Development", allocation: "₹18,620 crore", change: "+11%", sourcePage: 1 },
  { sector: "Judiciary", allocation: "₹9,845 crore", change: "+9%", sourcePage: 1 },
  {
    sector: "Vocational Education & Skill Development",
    allocation: "₹3,349 crore",
    change: "+88%",
    sourcePage: 1,
  },
  { sector: "Handloom & Textiles", allocation: "₹5,041 crore", change: "5x increase", sourcePage: 1 },
  { sector: "Food & Civil Supplies", allocation: "₹20,124 crore", change: "—", sourcePage: 1 },
];

const revenueTargets = [
  { source: "State GST + VAT", target: "₹1,49,956 crore", sourcePage: 2 },
  { source: "Excise duty", target: "₹71,278 crore", sourcePage: 2 },
  { source: "Stamps & Registration", target: "₹43,802 crore", sourcePage: 2 },
  { source: "Vehicle tax", target: "₹15,808 crore", sourcePage: 2 },
];

const categorisationCards = [
  {
    title: "Early childhood (0-5 years)",
    indicatorPoints: [
      "Birth registration",
      "Institutional birth",
      "Full immunization",
      "Stunting, wasting and underweight",
      "Pre-school attendance (2-5 years)",
    ],
    lifeCycleFocus: "Survival, nutrition, identity, early stimulation, and care burden",
    vulnerabilityPoints: [
      "Malnutrition",
      "Infections",
      "Lack of early learning",
      "Caregiver burden",
    ],
    selectedSchemes: ["JSY/JSSK/NHM", "ICDS/POSHAN", "CM Kanya Sumangala"],
    budgetLines: ["Health & Family Welfare: ₹37,956 crore", "Women & Child Development: ₹18,620 crore", "Kanya Sumangala: ₹400 crore"],
    Icon: Baby,
    className: "from-amber-500/10 to-orange-500/10",
    sourcePage: 1,
  },
  {
    title: "School-age children (6-14 years)",
    indicatorPoints: [
      "School attendance",
      "Female population 6+ ever attended school",
      "Sanitation and drinking water access",
      "Household health insurance",
    ],
    lifeCycleFocus:
      "Learning continuity, nutrition, safe WASH, and protection from poverty shocks",
    vulnerabilityPoints: ["School dropout", "Poor nutrition", "Unsafe WASH", "Health risks"],
    selectedSchemes: [
      "Samagra Shiksha",
      "PM POSHAN",
      "Swachh Bharat Mission-Gramin",
      "Jal Jeevan Mission",
    ],
    budgetLines: ["Basic Education: ₹77,622 crore", "Secondary Education: ₹22,167 crore", "Namami Gange & Rural Water: ₹22,676 crore"],
    Icon: School,
    className: "from-cyan-500/10 to-blue-500/10",
    sourcePage: 1,
  },
  {
    title: "Adolescents and youth (10-19 years)",
    indicatorPoints: [
      "Women 15-19 already mothers/pregnant",
      "Women 15-49 with schooling",
      "Internet/mobile access",
      "Menstrual hygiene availability",
    ],
    lifeCycleFocus:
      "Delay early marriage/pregnancy, continue education, and improve digital access",
    vulnerabilityPoints: [
      "Early pregnancy/marriage",
      "School dropout",
      "Poor reproductive health",
      "Digital exclusion",
    ],
    selectedSchemes: ["Kanya Sumangala", "Scholarships", "Mission Shakti", "Skill and employment missions"],
    budgetLines: ["Kanya Sumangala: ₹400 crore", "Scholarships: ₹3,060.5 crore", "Social welfare schemes: ₹14,953 crore", "Employment missions: ₹200 crore"],
    Icon: UserRoundCheck,
    className: "from-violet-500/10 to-fuchsia-500/10",
    sourcePage: 2,
  },
  {
    title: "Women of reproductive age (15-49 years)",
    indicatorPoints: [
      "ANC and institutional delivery",
      "Family planning/TFR",
      "Women own bank/mobile",
      "Decision-making and violence indicators",
      "Health insurance coverage",
    ],
    lifeCycleFocus: "Maternal health, family planning agency, income security, and reduced violence",
    vulnerabilityPoints: ["Maternal risk", "Unpaid care work", "Low agency/decision-making", "Income insecurity"],
    selectedSchemes: ["PMMVY", "JSY/JSSK/NHM", "Ayushman Bharat/health insurance", "NRLM/BC Sakhi"],
    budgetLines: ["Health & Family Welfare: ₹37,956 crore", "Women & Child Development: ₹18,620 crore", "Working women hostels: ₹100 crore"],
    Icon: ShieldCheck,
    className: "from-emerald-500/10 to-teal-500/10",
    sourcePage: 2,
  },
  {
    title: "Adults and elderly (50+ years)",
    indicatorPoints: [
      "Hypertension",
      "Diabetes/high blood sugar",
      "Obesity",
      "Tobacco/alcohol use",
      "Health insurance coverage",
    ],
    lifeCycleFocus: "Managing NCDs, disability and old-age security to reduce poverty and isolation",
    vulnerabilityPoints: ["NCD burden", "Disability", "Old-age poverty", "Widowhood/vulnerability"],
    selectedSchemes: ["Old-age/farmer pension", "Nirashrit Mahila Pension", "Divyang Pension", "NCD screening/health centres"],
    budgetLines: ["Old age/farmer pension: ₹8,950 crore", "Nirashrit Mahila Pension: ₹3,500 crore", "Divyang pension: ₹1,470 crore"],
    Icon: HeartPulse,
    className: "from-rose-500/10 to-pink-500/10",
    sourcePage: 2,
  },
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
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="overall-budget-size" className="section-heading flex items-center gap-2">
                <Landmark className="size-5 text-primary" aria-hidden="true" />
                Headline fiscal indicators
              </h2>
              <BudgetSpeechPagePreview page={1} title="Overall budget size references" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {overallBudgetSize.map((item) => (
              <Card key={item.title} className={cn("border-primary/20 bg-gradient-to-br", item.gradient)}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center justify-between gap-2 text-foreground/80">
                    <span>{item.title}</span>
                    <BudgetSpeechPagePreview page={item.sourcePage} title={item.title} />
                  </CardDescription>
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
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="receipts-expenditure" className="section-heading flex items-center gap-2">
                <ReceiptText className="size-5 text-primary" aria-hidden="true" />
                Fiscal flow snapshot
              </h2>
              <BudgetSpeechPagePreview page={1} title="Receipts and expenditure references" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {receiptsExpenditure.map((item) => (
              <Card key={item.label} className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between gap-2 text-lg">
                    <span>{item.label}</span>
                    <BudgetSpeechPagePreview page={item.sourcePage} title={item.label} />
                  </CardTitle>
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
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="economic-highlights" className="section-heading flex items-center gap-2">
                <LineChart className="size-5 text-primary" aria-hidden="true" />
                Growth and development signals
              </h2>
              <BudgetSpeechPagePreview page={1} title="Economic highlights references" />
            </div>
          </div>
          <Card className="border-primary/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {economicHighlights.map((item) => (
                  <li key={item.text} className="list-inside list-disc">
                    <span>{item.text}</span>{" "}
                    <span className="ml-1 inline-flex align-middle">
                      <BudgetSpeechPagePreview page={item.sourcePage} title={item.text} />
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="sector-allocations" className="space-y-4">
          <div>
            <p className="eyebrow">Sector-wise allocations</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="sector-allocations" className="section-heading">
                Major allocations and year-on-year change
              </h2>
              <BudgetSpeechPagePreview page={1} title="Sector-wise allocations references" />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="max-h-[34rem] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-80">Sector</TableHead>
                    <TableHead className="text-right">Allocation</TableHead>
                    <TableHead className="text-right">Change vs 2025-26</TableHead>
                    <TableHead className="text-right">Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectorAllocations.map((row) => (
                    <TableRow key={row.sector}>
                      <TableCell className="font-medium">{row.sector}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.allocation}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.change}</TableCell>
                      <TableCell className="text-right">
                        <BudgetSpeechPagePreview page={row.sourcePage} title={row.sector} />
                      </TableCell>
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
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="revenue-targets" className="section-heading flex items-center gap-2">
                <Target className="size-5 text-primary" aria-hidden="true" />
                Key own-tax and non-tax targets
              </h2>
              <BudgetSpeechPagePreview page={2} title="Revenue targets references" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {revenueTargets.map((item) => (
              <Card key={item.source} className="border-primary/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center justify-between gap-2">
                    <span>{item.source}</span>
                    <BudgetSpeechPagePreview page={item.sourcePage} title={item.source} />
                  </CardDescription>
                  <CardTitle className="text-xl">{item.target}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="budget-categorisation" className="space-y-4">
          <div>
            <p className="eyebrow">Categorisation cards</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="budget-categorisation" className="section-heading">
                Life-cycle categorisation for NFHS-linked planning
              </h2>
              <BudgetSpeechPagePreview page={2} title="Life-cycle categorisation references" />
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              From data to action: linking district indicators with schemes and budget heads.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categorisationCards.map((card) => (
              <Card
                key={card.title}
                className={cn("border-primary/20 bg-gradient-to-br", card.className)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start justify-between gap-3 text-base">
                    <span>{card.title}</span>
                    <span className="inline-flex items-center gap-2">
                      <card.Icon className="size-4 text-primary" aria-hidden="true" />
                      <BudgetSpeechPagePreview page={card.sourcePage} title={card.title} />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                      NFHS indicator focus
                    </p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {card.indicatorPoints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Life-cycle stage focus
                    </p>
                    <p className="text-sm text-muted-foreground">{card.lifeCycleFocus}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Key vulnerabilities
                    </p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {card.vulnerabilityPoints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Selected schemes
                    </p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {card.selectedSchemes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                      Budget linkage (2026-27)
                    </p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {card.budgetLines.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
