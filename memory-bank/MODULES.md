# Application Modules

## 1. Architecture overview

The dashboard will use the Next.js App Router and a static-first architecture.
Source data will be transformed at development/build time into validated local
assets. Server components will render page structure and initial data; client
components will be limited to interactive filters, charts, comparisons, and
the choropleth.

```text
Source PDF + licensed GeoJSON
          |
          v
Build-time extraction and validation
          |
          v
Typed static NFHS assets and selectors
          |
          v
App Router pages and interactive visualizations
```

No module should require a runtime database, authentication service, external
map API, or secret.

## 2. Planned source layout

```text
scripts/
  generate-nfhs-data.mjs
src/
  app/
    layout.tsx
    page.tsx
    districts/
      page.tsx
      [slug]/
        page.tsx
    compare/
      page.tsx
    rankings/
      page.tsx
    methodology/
      page.tsx
  components/
    charts/
    dashboard/
    map/
    ui/
  data/
    nfhs/
      districts.json
      indicators.json
      observations.json
      state.json
      provenance.json
      uttar-pradesh-districts.geo.json
  lib/
    nfhs/
      queries.ts
      rankings.ts
      schemas.ts
      types.ts
      urls.ts
```

Generated filenames may be split by district or category if bundle analysis
shows that a single observations file sends unnecessary data to clients.

## 3. Route modules

### 3.1 Root layout

**Route:** all routes

**Responsibilities:**

- global metadata and viewport settings;
- fonts and theme provider;
- responsive header and navigation;
- main-content skip link;
- global footer with source, disclaimer, and developer attribution;
- consistent content width and page landmarks.

**Preferred shadcn/ui building blocks:**

- `NavigationMenu`
- `Sheet`
- `Button`
- `Separator`
- `Tooltip`

### 3.2 Overview

**Route:** `/`

**Responsibilities:**

- introduce the dataset and provisional status;
- show selected Uttar Pradesh headline metrics;
- compare state NFHS-6 totals with NFHS-5 totals;
- show NFHS-6 urban/rural context at state level only;
- host the selected-indicator district choropleth;
- show district distribution and notable values;
- direct users to explorer, comparison, rankings, and methodology.

**Main components:**

- `StateMetricCard`
- `IndicatorCombobox`
- `DistrictChoropleth`
- `MapLegend`
- `DistributionChart`
- `SourceNotice`

### 3.3 District explorer

**Route:** `/districts`

**Responsibilities:**

- expose all 75 districts;
- support search, selected indicator, category filter, and sort;
- show current and previous survey values;
- link to statically generated district profiles;
- synchronize shareable filter state with URL parameters.

**Main components:**

- `DistrictSearch`
- `DistrictFilters`
- `DistrictDataTable`
- `ValueStatusBadge`
- `SampleSizeSummary`

**Preferred shadcn/ui building blocks:**

- `Input`
- `Command`
- `Select`
- `Table`
- `Badge`
- `Card`

### 3.4 District profile

**Route:** `/districts/[slug]`

**Responsibilities:**

- render one page for each validated district slug;
- display sample sizes and source-page context;
- group all 93 district indicators by category;
- compare NFHS-6 with NFHS-5 and the comparable state total;
- preserve source value markers and cautions;
- provide category anchors and readable chart/table views.

**Main components:**

- `DistrictHeader`
- `SampleSizeCards`
- `CategoryNav`
- `IndicatorComparisonTable`
- `SurveyRoundChart`
- `StatisticalCaution`

**Static behavior:**

- use `generateStaticParams` for exactly 75 routes;
- return `notFound()` for unknown district slugs;
- generate district-specific title, description, and canonical metadata.

### 3.5 District comparison

**Route:** `/compare`

**Responsibilities:**

- compare one to four unique districts;
- prevent a fifth selection;
- select indicator categories and individual indicators;
- show NFHS-6, NFHS-5, change, state benchmark, and status;
- preserve selections in query parameters;
- provide chart and semantic table representations.

**Main components:**

- `DistrictMultiSelect`
- `ComparisonToolbar`
- `ComparisonChart`
- `ComparisonTable`
- `ComparisonShareButton`

**URL contract:**

- district slugs are stable and deduplicated;
- invalid slugs are ignored with a visible notice;
- the order of valid slugs controls display order;
- no more than four valid district slugs are accepted.

### 3.6 Rankings

**Route:** `/rankings`

**Responsibilities:**

- rank districts for one indicator and survey basis;
- display indicator interpretation and unit;
- compare against the state total;
- show distribution context;
- exclude suppressed and missing values from numeric rank;
- retain caution markers for parenthesized values;
- avoid converting rank into a broad quality judgment.

**Main components:**

- `RankingControls`
- `RankingTable`
- `RankingDistribution`
- `InterpretationNotice`

### 3.7 Methodology and source

**Route:** `/methodology`

**Responsibilities:**

- explain survey scope, years, and provisional status;
- explain district total-only estimates;
- describe value statuses and sample-size cautions;
- list indicator categories, definitions, units, and footnotes;
- provide source citation and PDF link;
- provide geometry license and attribution;
- repeat the analytical-demonstration disclaimer.

### 3.8 Reports and downloads

**Route:** `/reports`

**Responsibilities:**

- provide a responsive table of downloadable NFHS and budget source documents;
- show text download actions on tablet/desktop and a compact arrow action on
  mobile;
- include district sample-size CSV export;
- keep file names and public asset links aligned.

### 3.9 Budget Speech and NFHS context

**Route:** `/budget-speech`

**Responsibilities:**

- summarize the Uttar Pradesh Budget Speech 2026-27 macro-fiscal position,
  headline fiscal indicators, sector allocation changes, and revenue targets;
- cover the major speech categories, including Kisan, Mahila, Yuva, education,
  health, industry, infrastructure, water/energy, rural/urban development,
  welfare, environment, tourism, law/justice, and transport;
- provide one official speech download and one print-ready complete-page PDF
  action without inline source-preview controls;
- distinguish speech-verified facts from the analytical NFHS life-cycle,
  vulnerability, and scheme-linkage framework.

**Main components:**

- `BudgetSpeechPage`
- `BudgetSpeechDownloads`
- `Card`
- `Table`

## 4. Data modules

### 4.1 District catalog

Each district record should include:

```ts
type District = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  sourcePageStart: number;
  sampleSize: {
    households: number;
    women: number;
    men: number;
  };
  geometryId: string;
};
```

District IDs and slugs are application identifiers, not inferred display text.
Aliases exist only to normalize PDF and geometry naming differences.

### 4.2 Indicator catalogs

State and district catalogs must be modeled separately because source numbering
and coverage differ.

```ts
type Indicator = {
  id: string;
  sourceNumber: number;
  scope: "state" | "district";
  categoryId: string;
  label: string;
  shortLabel: string;
  unit: "percent" | "children-per-woman" | "count";
  interpretation: "higher-is-better" | "lower-is-better" | "neutral";
  definition?: string;
  footnoteIds: string[];
};
```

Interpretation supports ranking context only. It must not be used to infer
causality or overall district performance.

### 4.3 Observations

```ts
type ObservationStatus =
  | "reported"
  | "caution"
  | "suppressed"
  | "missing";

type Observation = {
  geographyId: string;
  geographyLevel: "state" | "district";
  indicatorId: string;
  surveyRound: "NFHS-6" | "NFHS-5";
  population: "urban" | "rural" | "total";
  value: number | null;
  status: ObservationStatus;
  displayValue: string;
  sourcePage: number;
};
```

Rules:

- `reported` and `caution` require a numeric value.
- `suppressed` and `missing` require `null`.
- A district observation must use `total`.
- `displayValue` must preserve or faithfully reproduce parentheses and `*`.
- Numeric change is valid only when both compared observations are numeric.

### 4.4 State data

State values should use the same observation semantics but remain separate from
district data to prevent accidental use of state urban/rural values in a
district context.

### 4.5 Provenance

The provenance module should include:

- source title and citation;
- publisher;
- survey periods;
- publication date;
- provisional flag;
- source filename;
- source and official-site URLs;
- generated-at timestamp and deterministic source hash;
- geometry source, license, URL, and attribution.

The generated timestamp may change, but generated data ordering and values must
remain deterministic for the same inputs.

### 4.6 Geometry

- Store district geometry locally.
- Use a source with terms compatible with a public repository.
- Reduce coordinate precision only through a documented repeatable command.
- Join by explicit `geometryId` and a reviewed alias table.
- Validate exactly 75 unique joined district features.
- Do not silently drop or duplicate geometry.

## 5. Query and derived-data modules

### `queries.ts`

- retrieve districts and indicators by stable ID;
- retrieve a district's observations by category;
- retrieve comparable state totals;
- return explicit result types for unknown IDs;
- avoid repeated filtering logic in pages and components.

### `rankings.ts`

- exclude non-numeric observations;
- retain observation status with each ranked row;
- use deterministic tie ranking;
- expose rank population size;
- apply interpretation only to labels and default sort direction;
- never turn missing or suppressed observations into zero.

### `urls.ts`

- parse and serialize district and indicator query parameters;
- deduplicate district slugs while preserving order;
- enforce the four-district limit;
- return invalid values so the UI can explain corrections rather than silently
  pretending the URL was valid.

## 6. Visualization modules

### Charts

- Use shadcn chart composition with Recharts.
- Always include units, survey round, and accessible text.
- Avoid misleading axes and unexplained truncated scales.
- Distinguish missing/suppressed observations from zero.
- Do not show a positive color merely because a numeric change is positive.

### Choropleth

- Render local GeoJSON as responsive SVG.
- Keep the selected indicator in URL state.
- Use a documented scale that handles outliers and equal values.
- Provide keyboard/focus access or an equivalent adjacent district table.
- Show district name, value, status, unit, and state benchmark in supporting
  content.
- Use a non-data fill and text label for missing/suppressed observations.

## 7. Shared UI modules

- `SourceNotice`: provisional status, source, and official-site link
- `ValueDisplay`: normalized display for value, unit, and source markers
- `ValueStatusBadge`: textual caution/suppression/missing state
- `IndicatorDefinition`: label, definition, footnotes, and interpretation
- `SurveyComparison`: NFHS-6/NFHS-5 values and valid numeric change
- `StateBenchmark`: comparable state total only
- `EmptyState`: explicit reason and recovery action
- `ErrorNotice`: visible, actionable data or URL error

Shared components must use shadcn/ui primitives where they improve consistency
and accessibility, without wrapping every element unnecessarily.

## 8. Data generation

The generator should:

1. read the checked-in PDF;
2. extract pages in stable order;
3. parse state, district, footnote, and sample-size sections;
4. normalize spacing and district aliases without altering labels;
5. convert source values into explicit observation states;
6. join reviewed geometry;
7. validate counts, ranges, relations, and selected source spot checks;
8. sort generated records deterministically;
9. write static assets and provenance;
10. exit non-zero on any unhandled or ambiguous source token.

Ambiguous parsing must produce a visible failure that identifies the district,
indicator, page, and token. It must not fall back to a success-shaped value.

## 9. Validation and testing

### Data validation

- 75 unique districts
- 93 expected indicators per district
- complete district sample sizes
- valid state coverage
- valid statuses and value ranges
- stable and unique IDs/slugs
- one-to-one geometry joins
- selected values matched to source pages

### Unit tests

- observation parsing;
- status/display formatting;
- URL parsing and four-district cap;
- ranking ties and exclusions;
- indicator interpretation;
- district/geometry alias normalization.

### Component tests, if supported by the initialized stack

- district selection and comparison cap;
- visible caution and suppression states;
- table and map alternatives;
- invalid filter recovery.

### Production verification

- lint;
- type check and Next.js production build;
- static generation of all district routes;
- responsive checks at representative mobile and desktop widths;
- keyboard navigation through primary workflows;
- Vercel-compatible output without runtime secrets.

## 10. Documentation ownership

Update:

- `PRD.md` when product scope or acceptance criteria change;
- `MODULES.md` when routes, data contracts, or module boundaries change;
- `DESIGN.md` when visual tokens, responsive layouts, interaction patterns,
  visualization rules, or accessibility requirements change;
- `TECH_STACK.md` when dependencies, versions, commands, hosting, or
  architecture decisions change;
- `INDEX.md` when memory-bank documents or core sources change;
- root `README.md` when setup, commands, deployment, status, or public
  attribution changes;
- root `AGENT.md` when repository-wide contributor instructions change.
- root `CHANGELOG.md` when a notable project change is introduced.
