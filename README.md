# NFHS Uttar Pradesh Dashboard

A planned public dashboard for exploring provisional National Family Health
Survey (NFHS-6) indicators for Uttar Pradesh and all 75 districts.

The dashboard will provide state summaries, district profiles, comparisons,
indicator rankings, and an interactive district choropleth using a static,
validated representation of the checked-in NFHS compendium.

## Status

Active implementation. The Next.js and shadcn/ui foundation is initialized,
and the static NFHS data pipeline and dashboard modules are being built.

## Planned features

- Uttar Pradesh overview with NFHS-6/NFHS-5 comparisons
- Searchable explorer for all 75 districts
- Reports page for downloading sample-size CSV and NFHS fact-sheet PDFs
- District profiles containing all 93 district indicators
- Comparison of up to four districts
- Indicator-specific district rankings within the All Districts comparison page
- Interactive Uttar Pradesh district choropleth
- State benchmark and sample-size context
- Explicit handling of provisional, small-sample, suppressed, and missing data
- Methodology, definitions, footnotes, source citation, and map attribution
- Responsive, keyboard-accessible, WCAG-conscious interface

## Planned technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts through shadcn chart patterns
- Local JSON/TypeScript data generated at build time
- Local, clearly licensed Uttar Pradesh district GeoJSON
- Vercel deployment without a runtime database or required secrets

## Documentation

- [Memory Bank Index](./memory-bank/INDEX.md)
- [Product Requirements](./memory-bank/PRD.md)
- [Application Modules](./memory-bank/MODULES.md)
- [Design System and Experience](./memory-bank/DESIGN.md)
- [Technology Stack](./memory-bank/TECH_STACK.md)
- [Repository Agent Guide](./AGENT.md)
- [Changelog](./CHANGELOG.md)
- [Third-Party Notices](./THIRD_PARTY_NOTICES.md)
- [NFHS-6 Uttar Pradesh Compendium](./memory-bank/NFHS-6_StateFact_Uttar%20Pradesh__Uttar%20Pradesh%20Compendium.pdf)

## Data coverage

The source compendium includes:

- NFHS-6 (2023-24) and NFHS-5 (2019-21);
- Uttar Pradesh state indicators;
- all 75 Uttar Pradesh district fact sheets;
- 93 indicators on each district fact sheet;
- state and district sample sizes for households, women, and men.

The application will preserve source annotations:

- values in parentheses are based on 25-49 unweighted cases and require a
  caution marker;
- `*` means the percentage is not shown because it is based on fewer than 25
  unweighted cases;
- missing and suppressed observations are not zero;
- district estimates are total-only and must not be presented as district
  urban/rural estimates.

## Source

Primary source:

> International Institute for Population Sciences (IIPS). 2026. *National
> Family Health Survey (NFHS-6), 2023-24: State and District Fact Sheets,
> Uttar Pradesh*. Mumbai: IIPS.

The compendium is dated August 2026 and identifies NFHS-6 results as
provisional.

District boundary geometry is sourced from
[datta07/INDIAN-SHAPEFILES](https://github.com/datta07/INDIAN-SHAPEFILES)
under the MIT License. Its source describes the data vintage as primarily 2019.
See [Third-Party Notices](./THIRD_PARTY_NOTICES.md).

## Disclaimer

This portal is an analytical demonstration environment — **not** an official
Government of Uttar Pradesh website. Original information is drawn from
[NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php) data for
representation and visualization. For authoritative records and official
transactions, refer to [NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php)
and your department's designated channels.

## Development

Requirements:

- Node.js 20 or later
- npm

Install dependencies and start the local application:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Current validation commands:

```bash
npm run data:validate
npm run lint
npm run typecheck
npm run build
```

To regenerate the static NFHS dataset from the checked-in PDF:

```bash
npm run data:generate
```

## Deployment

The project is intended for the public GitHub repository:

<https://github.com/Harshmalik017/NFHS>

The completed application will be deployable by importing that repository into
Vercel with standard Next.js settings and no runtime environment variables.

## Copyright

© 2026
[Developer Details (Data Consultant)](https://www.linkedin.com/in/harshmalik017).
All Rights Reserved.
