# Product Requirements Document

## 1. Product summary

### Product name

NFHS Uttar Pradesh Dashboard

### Vision

Provide a fast, accessible, and transparent way to explore provisional NFHS-6
health, nutrition, household, and demographic indicators for Uttar Pradesh and
all 75 districts, while preserving the meaning and limitations of the official
source material.

### Product status

Planning and documentation. The application and generated static dataset have
not yet been initialized.

### Public repository

<https://github.com/Harshmalik017/NFHS>

## 2. Disclaimer and attribution

This portal is an analytical demonstration environment — **not** an official
Government of Uttar Pradesh website. Original information is drawn from
[NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php) data for
representation and visualization. For authoritative records and official
transactions, refer to [NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php)
and your department's designated channels.

Primary source:

> International Institute for Population Sciences (IIPS). 2026. *National
> Family Health Survey (NFHS-6), 2023-24: State and District Fact Sheets,
> Uttar Pradesh*. Mumbai: IIPS.

The NFHS-6 values in the compendium are provisional. The dashboard must display
that qualification wherever users could otherwise interpret the data as final
or official.

© 2026
[Developer Details (Data Consultant)](https://www.linkedin.com/in/harshmalik017).
All Rights Reserved.

## 3. Goals

1. Make all 93 district indicators discoverable for every Uttar Pradesh
   district.
2. Enable reliable comparison between NFHS-6 (2023-24) and NFHS-5 (2019-21).
3. Enable comparison of up to four districts at a time.
4. Present indicator rankings and geographic patterns without hiding data
   quality cautions.
5. Provide state benchmarks, including urban/rural splits only where the source
   publishes them.
6. Make definitions, sample sizes, footnotes, provenance, and limitations easy
   to find.
7. Ship as a static-first Next.js application that can be deployed to Vercel
   without a runtime database, secret, or external map API.

## 4. Non-goals for the first release

- Government services, official transactions, or claims of government
  affiliation
- Authentication, user accounts, or personalized saved dashboards
- Editing data through the application
- A runtime database or content-management system
- Live ingestion from NFHS or another third-party API
- Forecasting, causal inference, or policy recommendations
- Block, tehsil, village, ward, or facility-level estimates
- District-level urban/rural estimates, which are not provided by the source
- Download formats beyond the local static assets unless added after launch
- User tracking or behavioral analytics

## 5. Intended users

### Policy and programme analysts

Need quick access to district variation, state benchmarks, historical change,
and statistically cautious interpretation.

### Public-health researchers and students

Need indicator definitions, survey context, source references, and reusable
comparisons.

### Journalists and civil-society users

Need clear, linkable views that explain what a number means and where it came
from.

### General public

Need plain-language navigation, readable charts, and transparent disclaimers.

## 6. Core user journeys

1. A user opens the overview and sees selected state metrics and a district map.
2. A user changes the selected indicator and the map, legend, state benchmark,
   and summary update together.
3. A user searches for a district and opens a complete district profile.
4. A user compares a district's NFHS-6 value with NFHS-5 and the current state
   total.
5. A user selects up to four districts and compares chosen indicators.
6. A user ranks all available districts for an indicator and sees cautioned or
   suppressed observations handled explicitly.
7. A user opens methodology to understand definitions, survey limitations,
   sample sizes, source attribution, and provisional status.
8. A user shares a URL that preserves relevant filters or selections.

## 7. Functional requirements

### 7.1 Global application shell

- Responsive header, navigation, footer, and mobile navigation
- Light and dark themes
- Persistent analytical-demonstration disclaimer in the footer
- Visible source attribution and methodology link
- Page-level metadata and social sharing metadata
- Skip link, keyboard-visible focus, and semantic landmarks

### 7.2 Overview

- Display a curated set of headline Uttar Pradesh indicators.
- Show NFHS-6 total values, NFHS-5 total values, and change.
- Show urban/rural NFHS-6 state values only where present in the source.
- Provide category and indicator selection.
- Render a district choropleth for the selected district indicator.
- Show a legend, state benchmark, district range, and accessible text/table
  alternative.
- Link each highlighted district and indicator to deeper views.

### 7.3 District explorer

- List exactly 75 districts.
- Support text search, category/indicator selection, sorting, and clear filters.
- Show selected NFHS-6 and NFHS-5 values and sample-size context.
- Preserve filters in the URL where practical.
- Link every district to a statically generated profile route.

### 7.4 District profile

- Generate one route per district using a stable slug.
- Display all 93 district indicators grouped by source category.
- Show NFHS-6, NFHS-5, numeric change when valid, and the comparable state
  benchmark.
- Show values as reported, including parentheses and suppression markers.
- Display statistical caution badges and definitions.
- Show household, women, and men sample sizes.
- Provide category navigation and accessible tables alongside visualizations.

### 7.5 District comparison

- Allow selection of one to four unique districts.
- Prevent a fifth selection with an explanatory, accessible message.
- Support category and indicator selection.
- Compare NFHS-6, NFHS-5, change, and state benchmark where applicable.
- Provide chart and table views.
- Encode selected districts and indicators in query parameters.
- Handle removed, duplicate, and invalid district query values predictably.

### 7.6 Indicator rankings

- Allow selection of any district indicator.
- Rank districts by NFHS-6 value and optionally NFHS-5 or change.
- Define interpretation per indicator as `higher-is-better`,
  `lower-is-better`, or `neutral`.
- Never imply that rank equals overall district performance.
- Exclude suppressed and missing values from numeric rank.
- Keep parenthesized small-sample values visible with a caution marker.
- Provide state benchmark, distribution context, and sortable accessible table.

### 7.7 Methodology and source

- Explain NFHS-6 and the Uttar Pradesh fieldwork context from the compendium.
- State that results are provisional.
- Explain that district estimates are total-only.
- Document regular, parenthesized, suppressed, and missing value states.
- List indicator definitions, units, categories, and footnotes.
- Explain sample sizes and cautions against overinterpretation.
- Cite and link the checked-in source PDF and NFHS Official website.
- Attribute the district boundary dataset and its license.
- Display the analytical-demonstration disclaimer and developer copyright.

## 8. Data requirements

### 8.1 Coverage

- 75 unique Uttar Pradesh districts
- 93 indicators for each district
- NFHS-6 and NFHS-5 district totals
- Uttar Pradesh state indicators with available NFHS-6 urban, rural, and total
  values plus NFHS-5 total values
- District and state sample sizes for households, women, and men
- Indicator categories, labels, units, definitions, footnotes, and source pages
- District boundary geometry covering all 75 data records exactly once

### 8.2 Value semantics

Each observation must distinguish:

- `reported`: ordinary numeric value;
- `caution`: numeric value shown in parentheses because it is based on 25-49
  unweighted cases;
- `suppressed`: source displays `*` because it is based on fewer than 25
  unweighted cases;
- `missing`: source does not report a comparable observation.

Suppressed or missing observations must use `null` for normalized numeric data,
not zero. Source display text must be retained or reproducible.

### 8.3 Provenance

Generated data must record:

- source title and suggested citation;
- NFHS rounds and survey years;
- publication date;
- provisional status;
- source file and relevant page;
- generation script version or content hash;
- geometry source, license, and attribution.

### 8.4 Validation

Generation or build must fail when:

- district count is not 75;
- district slugs or IDs are duplicated;
- a district does not have the expected 93 indicators;
- an observation has an invalid status/value combination;
- an ordinary percentage is outside 0-100;
- sample sizes are missing or invalid;
- a district does not join exactly once to map geometry;
- an unknown indicator, category, survey round, or geography is referenced.

Selected state and district values must be spot-checked against the PDF.

## 9. Information architecture

| Route | Purpose |
| --- | --- |
| `/` | State overview and selected-indicator district map |
| `/districts` | Searchable district explorer |
| `/districts/[slug]` | Complete district profile |
| `/compare` | Comparison of up to four districts |
| `/rankings` | Indicator-specific district rankings |
| `/methodology` | Survey notes, definitions, source, and attribution |

## 10. Design requirements

- Use shadcn/ui primitives and accessible composition patterns.
- Prefer calm, data-focused visual hierarchy over decorative effects.
- Use a consistent category palette while ensuring meaning is not communicated
  by color alone.
- Keep units and survey rounds visible near values.
- Label positive/negative numeric change without assuming that an increase is
  beneficial.
- Use tooltips as supplementary content, never as the only way to access data.
- Support mobile widths without removing indicators or source cautions.
- Provide skeletons only where client interaction genuinely needs them; static
  content should render immediately.

## 11. Accessibility requirements

- Target WCAG 2.2 AA.
- All workflows must be keyboard operable.
- Charts and maps require nearby text summaries or semantic data tables.
- Focus order and focus indicators must remain clear.
- Color contrast must meet AA requirements.
- Caution, suppression, ranking direction, and change must have textual cues.
- Respect reduced-motion preferences.
- Use meaningful titles, headings, labels, and link text.

## 12. Technical and operational requirements

- Current stable Next.js App Router and React versions
- TypeScript with strict type checking
- Tailwind CSS and shadcn/ui
- Static local JSON/TypeScript data with typed selectors
- Static generation for district pages
- Local map geometry; no runtime map API or key
- No runtime database or server dependency
- Deterministic data generation from the checked-in source
- Lint, type-check/build, and data-validation commands
- Vercel-compatible defaults and no required environment variables
- Public GitHub repository at <https://github.com/Harshmalik017/NFHS>

## 13. Performance and SEO

- Render meaningful page content on the server.
- Limit client components to interactive controls, charts, and the map.
- Avoid loading all geometry or observation data on routes that do not use it.
- Generate district metadata, canonical URLs, and descriptive titles.
- Provide sitemap and robots metadata for public analytical routes.
- Avoid layout shifts from charts, maps, or fonts.

## 14. Privacy and security

- Collect no personal information.
- Add no analytics or trackers in the first release.
- Store no user selections beyond URL state and optional local theme
  preference.
- Treat all source data as aggregate statistics.
- Do not add secrets to the repository.
- Keep dependencies minimal and supported.

## 15. Acceptance criteria

The first release is complete when:

1. All documented routes build and render successfully.
2. Exactly 75 district profile routes are generated.
3. Every district exposes all 93 district indicators with both survey rounds or
   an explicit suppressed/missing state.
4. The map joins all 75 districts with no unmatched data or geometry.
5. Users can compare up to four districts and share that selection by URL.
6. Rankings correctly handle interpretation, missing values, and cautioned
   estimates.
7. State urban/rural values are never presented as district urban/rural values.
8. Source, provisional status, disclaimer, statistical cautions, and geometry
   attribution are visible and accurate.
9. Automated data validation, lint, and production build pass.
10. Core pages and interactions are usable at mobile and desktop widths and
    have keyboard-accessible alternatives.
11. The project can deploy to Vercel from the public GitHub repository without
    a runtime database or required secret.

## 16. Future considerations

- CSV or JSON downloads
- Indicator permalinks
- Saved comparison presets
- Additional states or future NFHS rounds
- Hindi localization
- Print-friendly district briefs
- Automated upstream data refresh after an official machine-readable release

These are not first-release commitments and must not weaken source validation or
accessibility.
