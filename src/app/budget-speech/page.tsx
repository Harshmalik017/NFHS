import type { Metadata } from "next";
import {
  Baby,
  Building2,
  BusFront,
  Download,
  Droplets,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  LineChart,
  MapPinned,
  ReceiptText,
  Route,
  Scale,
  School,
  ShieldCheck,
  Sprout,
  Target,
  Trophy,
  UserRoundCheck,
  Users,
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
    sourcePage: 31,
  },
  {
    title: "Capital expenditure",
    value: "19.5%",
    note: "Share of total budget",
    gradient: "from-indigo-500/20 to-violet-500/20",
    sourcePage: 7,
  },
  {
    title: "New schemes",
    value: "₹43,565.33 crore",
    note: "Allocated to new initiatives",
    gradient: "from-emerald-500/20 to-teal-500/20",
    sourcePage: 31,
  },
  {
    title: "Fiscal deficit",
    value: "₹1,18,480.59 crore",
    note: "2.98% of estimated GSDP, within the 3% limit set by the 16th Finance Commission",
    gradient: "from-amber-500/20 to-orange-500/20",
    sourcePage: 32,
  },
  {
    title: "Debt-to-GSDP ratio target",
    value: "23.1%",
    note: "From 27% in 2024-25, long-term goal under 20%",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    sourcePage: 8,
  },
];

const receiptsExpenditure = [
  {
    label: "Total receipts",
    value: "₹8,48,233.18 crore",
    breakdown:
      "Revenue receipts ₹7,28,928.12 crore + capital receipts ₹1,19,305.06 crore",
    sourcePage: 31,
  },
  {
    label: "Total expenditure",
    value: "₹9,12,696.35 crore",
    breakdown:
      "Revenue account ₹6,64,470.55 crore + capital account ₹2,48,225.81 crore",
    sourcePage: 31,
  },
  {
    label: "Revenue surplus",
    value: "₹64,457.57 crore",
    breakdown: "Positive surplus position",
    sourcePage: 32,
  },
];

const economicHighlights = [
  {
    text: "UP's GSDP (2024-25 quick estimate): ₹30.25 lakh crore, up 13.4% year-on-year",
    sourcePage: 2,
  },
  {
    text: "Per capita income: ₹1,09,844 (estimated ₹1,20,000 for 2025-26), more than double the 2016-17 figure",
    sourcePage: 2,
  },
  { text: "Unemployment rate down to 2.24%", sourcePage: 2 },
  {
    text: "UP climbed from 29th to 18th in the SDG India Index (2018-19 to 2023-24)",
    sourcePage: 2,
  },
  {
    text: "~₹50 lakh crore in MoUs signed via Global Investors Summit (Feb 2024), with ~₹15 lakh crore worth of projects already ground-broken",
    sourcePage: 2,
  },
];

const sectorAllocations = [
  { sector: "Basic Education", allocation: "₹77,622 crore", change: "—", sourcePage: 23 },
  {
    sector: "Medical, Health & Family Welfare",
    allocation: "₹37,956 crore",
    change: "+15%",
    sourcePage: 9,
  },
  { sector: "Secondary Education", allocation: "₹22,167 crore", change: "+15%", sourcePage: 24 },
  { sector: "Energy", allocation: "₹65,926 crore", change: "+8%", sourcePage: 14 },
  { sector: "Irrigation & Flood Control", allocation: "₹18,290 crore", change: "+30%", sourcePage: 13 },
  { sector: "Roads & Bridges", allocation: "₹34,468 crore", change: "—", sourcePage: 13 },
  {
    sector: "Namami Gange & Rural Water Supply",
    allocation: "₹22,676 crore",
    change: "—",
    sourcePage: 14,
  },
  { sector: "Panchayati Raj", allocation: "₹32,090 crore", change: "+67%", sourcePage: 19 },
  { sector: "Rural Development", allocation: "₹25,500 crore", change: "—", sourcePage: 18 },
  { sector: "Urban Development", allocation: "₹26,514 crore", change: "—", sourcePage: 16 },
  { sector: "Agriculture", allocation: "₹10,888 crore", change: "+20%", sourcePage: 19 },
  { sector: "Medical Education", allocation: "₹14,997 crore", change: "—", sourcePage: 9 },
  {
    sector: "Infrastructure & Industrial Development",
    allocation: "₹27,103 crore",
    change: "+13%",
    sourcePage: 10,
  },
  { sector: "IT & Electronics", allocation: "₹2,059 crore", change: "+76%", sourcePage: 12 },
  { sector: "Social Welfare", allocation: "₹14,953 crore", change: "+8%", sourcePage: 28 },
  { sector: "Women & Child Development", allocation: "₹18,620 crore", change: "+11%", sourcePage: 27 },
  { sector: "Judiciary", allocation: "₹9,845 crore", change: "+9%", sourcePage: 29 },
  {
    sector: "Vocational Education & Skill Development",
    allocation: "₹3,349 crore",
    change: "+88%",
    sourcePage: 25,
  },
  { sector: "Handloom & Textiles", allocation: "₹5,041 crore", change: "5x increase", sourcePage: 11 },
  { sector: "Food & Civil Supplies", allocation: "₹20,124 crore", change: "—", sourcePage: 23 },
];

const revenueTargets = [
  { source: "State GST + VAT", target: "₹1,49,956 crore", sourcePage: 30 },
  { source: "Excise duty", target: "₹71,278 crore", sourcePage: 30 },
  { source: "Stamps & Registration", target: "₹43,802 crore", sourcePage: 30 },
  { source: "Vehicle tax", target: "₹15,808 crore", sourcePage: 30 },
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
    sourcePage: 27,
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
    sourcePage: 23,
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
    sourcePage: 27,
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
    sourcePage: 27,
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
    sourcePage: 28,
  },
];

const speechPriorityCategories = [
  {
    title: "Kisan, Krishi & Allied Sectors",
    subtitle: "Farm income, production, irrigation and allied livelihoods",
    highlights: [
      "₹3,04,321 crore+ cumulative sugarcane payments and a ₹30/quintal price increase",
      "₹94,668 crore transferred to 3.12 crore farmers under PM-KISAN up to December 2025",
      "₹5,110 crore in crop-insurance claims paid to about 62 lakh farmers during 2017-2025",
    ],
    sourcePage: 4,
    Icon: Sprout,
    className: "from-lime-500/10 to-green-500/10",
  },
  {
    title: "Mahila & Bal Vikas",
    subtitle: "Women’s security, agency, hostels, pensions and child support",
    highlights: [
      "₹18,620 crore for Women & Child Development, 11% above 2025-26",
      "₹400 crore for Mukhyamantri Kanya Sumangala Yojana",
      "₹100 crore for working women’s hostels and ₹35 crore for Shramjeevi Mahila hostels",
    ],
    sourcePage: 27,
    Icon: UserRoundCheck,
    className: "from-pink-500/10 to-rose-500/10",
  },
  {
    title: "Yuva, Khel & Rojgar",
    subtitle: "Skills, employment, sports infrastructure and youth empowerment",
    highlights: [
      "₹3,349 crore for Vocational Education & Skill Development, an 88% increase",
      "Skill Development Mission training and artisan training receive major support",
      "Sports facilities, youth coaching and tablet/smartphone programmes continue",
    ],
    sourcePage: 25,
    Icon: Trophy,
    className: "from-violet-500/10 to-indigo-500/10",
  },
  {
    title: "Shiksha & Kaushal",
    subtitle: "Basic, secondary, higher, technical and vocational education",
    highlights: [
      "₹77,622 crore for Basic Education",
      "₹22,167 crore for Secondary Education, 15% above 2025-26",
      "Model schools, girls’ residential schools, smart schools and skill modernisation",
    ],
    sourcePage: 23,
    Icon: GraduationCap,
    className: "from-sky-500/10 to-blue-500/10",
  },
  {
    title: "Swasthya & Medical",
    subtitle: "Public health, family welfare, medical education and AYUSH",
    highlights: [
      "₹37,956 crore for Medical, Health & Family Welfare, a 15% increase",
      "₹14,997 crore for Medical Education",
      "NHM, Ayushman Bharat, medical colleges and Cancer Institute support",
    ],
    sourcePage: 9,
    Icon: HeartPulse,
    className: "from-red-500/10 to-rose-500/10",
  },
  {
    title: "Samaj Kalyan & Inclusion",
    subtitle: "Pensions, scholarships, marriage support and disability inclusion",
    highlights: [
      "₹14,953 crore for Social Welfare, 8% above 2025-26",
      "₹8,950 crore for old-age/farmer pensions",
      "Support for SC, OBC, minority, tribal and Divyangjan beneficiaries",
    ],
    sourcePage: 28,
    Icon: Users,
    className: "from-purple-500/10 to-fuchsia-500/10",
  },
  {
    title: "Industry, MSME & Investment",
    subtitle: "Industrial areas, enterprise creation and investment pipelines",
    highlights: [
      "₹27,103 crore for Infrastructure & Industrial Development, a 13% increase",
      "₹5,000 crore for industrial-area expansion and new industrial areas",
      "MSME employment zones, youth enterprise loans and defence-corridor investment",
    ],
    sourcePage: 10,
    Icon: Factory,
    className: "from-slate-500/10 to-zinc-500/10",
  },
  {
    title: "IT, Electronics & Emerging Technology",
    subtitle: "AI, cybersecurity, data centres and digital capability",
    highlights: [
      "₹2,059 crore for IT & Electronics, a 76% increase",
      "UP AI Mission, State Data Authority and Cyber Security Operations Centre",
      "Eight data-centre parks with a 900 MW capacity target",
    ],
    sourcePage: 12,
    Icon: Building2,
    className: "from-cyan-500/10 to-violet-500/10",
  },
  {
    title: "Sadak, Setu & Connectivity",
    subtitle: "Roads, bridges, corridors, aviation and logistics links",
    highlights: [
      "₹34,468 crore for Roads & Bridges",
      "₹4,808 crore for bridges and ₹1,700 crore for rail over/under bridges",
      "North-South Corridor, ring roads, bypasses and industrial-connectivity roads",
    ],
    sourcePage: 13,
    Icon: Route,
    className: "from-orange-500/10 to-amber-500/10",
  },
  {
    title: "Sinchai, Jal & Urja",
    subtitle: "Irrigation, flood control, rural water and reliable energy",
    highlights: [
      "₹18,290 crore for Irrigation & Flood Control, a 30% increase",
      "₹22,676 crore for Namami Gange & Rural Water Supply",
      "₹65,926 crore for Energy and ₹1,500 crore for PM Kusum Suryaghar",
    ],
    sourcePage: 14,
    Icon: Droplets,
    className: "from-blue-500/10 to-teal-500/10",
  },
  {
    title: "Gramin Vikas & Panchayati Raj",
    subtitle: "Village livelihoods, local government and rural infrastructure",
    highlights: [
      "₹25,500 crore for Rural Development",
      "₹32,090 crore for Panchayati Raj, 67% above 2025-26",
      "Rural employment, village infrastructure and local service delivery",
    ],
    sourcePage: 18,
    Icon: MapPinned,
    className: "from-emerald-500/10 to-lime-500/10",
  },
  {
    title: "Shahri Vikas & Awas",
    subtitle: "Urban services, housing, city expansion and smart-city infrastructure",
    highlights: [
      "₹26,514 crore for Urban Development",
      "₹3,500 crore for the Urban Expansion/New City Promotion Scheme",
      "Urban sanitation, women-friendly public facilities and city infrastructure",
    ],
    sourcePage: 16,
    Icon: Building2,
    className: "from-indigo-500/10 to-sky-500/10",
  },
  {
    title: "Kanoon, Police & Nyay",
    subtitle: "Public safety, police infrastructure, fire services and courts",
    highlights: [
      "Police residential and non-residential infrastructure receives major funding",
      "Women beat officers and Mission Shakti safety measures continue",
      "₹9,845 crore for Justice, including court complexes and fast-track courts",
    ],
    sourcePage: 8,
    Icon: Scale,
    className: "from-stone-500/10 to-slate-500/10",
  },
  {
    title: "Sanskriti, Paryatan & Dharmarth Karya",
    subtitle: "Cultural heritage, religious sites and tourism infrastructure",
    highlights: [
      "Heritage and religious-site restoration across Ayodhya, Kashi and Vindhya",
      "Tourist-site development support for major pilgrimage destinations",
      "Cultural centres and museums highlighting regional and tribal heritage",
    ],
    sourcePage: 18,
    Icon: Landmark,
    className: "from-yellow-500/10 to-orange-500/10",
  },
  {
    title: "Van, Paryavaran & Clean Air",
    subtitle: "Afforestation, clean air, nurseries and conservation",
    highlights: [
      "Social forestry, nursery management and compensatory afforestation funding",
      "Night Safari Park support in the Kukrail forest area",
      "World Bank-assisted UP Clean Air Management Project",
    ],
    sourcePage: 26,
    Icon: Leaf,
    className: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Rajaswa, Parivahan & Fiscal Management",
    subtitle: "Revenue mobilisation, public transport and fiscal discipline",
    highlights: [
      "GST/VAT, excise, stamp-registration and vehicle-tax collection targets",
      "EV buses, bus terminals, charging stations and road-safety programmes",
      "Fiscal deficit maintained within the 3% ceiling for 2026-27",
    ],
    sourcePage: 30,
    Icon: BusFront,
    className: "from-teal-500/10 to-cyan-500/10",
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
              <BudgetSpeechPagePreview page={31} title="Overall budget size references" />
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
              <BudgetSpeechPagePreview page={31} title="Receipts and expenditure references" />
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
              <BudgetSpeechPagePreview page={2} title="Economic highlights references" />
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
              <BudgetSpeechPagePreview page={7} title="Sector-wise allocations overview" />
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
              <BudgetSpeechPagePreview page={30} title="Revenue targets references" />
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

        <section aria-labelledby="speech-priority-categories" className="space-y-4">
          <div>
            <p className="eyebrow">Budget speech categories</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="speech-priority-categories" className="section-heading">
                Priorities for Kisan, Mahila, Yuva and every major sector
              </h2>
              <BudgetSpeechPagePreview
                page={4}
                title="Budget speech beneficiary and sector priorities"
              />
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
              These cards follow the speech and the supporting analysis category by
              category, retaining the principal beneficiary groups, departmental
              allocations, schemes and implementation priorities.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {speechPriorityCategories.map((category) => (
              <Card
                key={category.title}
                className={cn(
                  "border-primary/20 bg-gradient-to-br",
                  category.className,
                )}
              >
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="flex items-start justify-between gap-3 text-base">
                    <span>{category.title}</span>
                    <category.Icon
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  </CardTitle>
                  <CardDescription>{category.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-muted-foreground">
                    {category.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <BudgetSpeechPagePreview
                    page={category.sourcePage}
                    title={category.title}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="source-verification"
          className="space-y-4 rounded-xl border border-amber-300/60 bg-amber-50/70 p-5 dark:border-amber-700/60 dark:bg-amber-950/20"
        >
          <div>
            <p className="eyebrow">Source verification</p>
            <h2 id="source-verification" className="section-heading mt-2">
              What is speech-verified and what is analytical
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-300/60 bg-background/80 p-4">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
                Verified in the Budget Speech PDF
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Macro-fiscal figures, revenue targets, departmental allocations,
                beneficiary announcements and named schemes shown in the budget
                category cards are matched to the official 32-page speech.
              </p>
            </div>
            <div className="rounded-lg border border-amber-300/60 bg-background/80 p-4">
              <h3 className="font-semibold text-amber-700 dark:text-amber-300">
                Analytical planning framework
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The NFHS life-cycle stages, vulnerability groupings and
                indicator-to-scheme linkages below are derived from the supplied
                infographic and NFHS interpretation. They are not quoted verbatim
                from the Budget Speech.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="budget-categorisation" className="space-y-4">
          <div>
            <p className="eyebrow">Categorisation cards</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 id="budget-categorisation" className="section-heading">
                Life-cycle categorisation for NFHS-linked planning
              </h2>
              <BudgetSpeechPagePreview page={27} title="Life-cycle budget references" />
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
