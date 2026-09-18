# NFHS Uttar Pradesh Dashboard Memory Bank

## Purpose

This memory bank is the source of project context for the NFHS Uttar Pradesh
dashboard. It records the product requirements, planned modules, source-data
rules, and implementation constraints that should remain consistent as the
application evolves.

## Documents

| Document | Purpose |
| --- | --- |
| [Product Requirements](./PRD.md) | Product vision, scope, users, requirements, constraints, and acceptance criteria |
| [Modules](./MODULES.md) | Route map, module responsibilities, data contracts, component boundaries, and validation approach |
| [Design](./DESIGN.md) | Visual direction, layouts, responsive behavior, components, visualization rules, and accessibility |
| [Technology Stack](./TECH_STACK.md) | Framework, dependencies, data pipeline, tests, hosting, and architecture decisions |
| [NFHS-6 Uttar Pradesh Compendium](./NFHS-6_StateFact_Uttar%20Pradesh__Uttar%20Pradesh%20Compendium.pdf) | Primary source for Uttar Pradesh and district NFHS-6/NFHS-5 values |
| [Project README](../README.md) | Public project overview, status, source attribution, and future setup instructions |
| [Agent Guide](../AGENT.md) | Repository-specific guidance for coding agents and contributors |
| [Changelog](../CHANGELOG.md) | Notable project changes before and after release |
| [Third-Party Notices](../THIRD_PARTY_NOTICES.md) | License and attribution for committed external assets |

## Project snapshot

- **Product:** Public analytical dashboard for NFHS indicators in Uttar Pradesh
- **Framework:** Next.js App Router with TypeScript
- **UI:** Tailwind CSS and shadcn/ui
- **Charts:** Recharts through shadcn chart patterns
- **Map:** Local, clearly licensed Uttar Pradesh district GeoJSON rendered as an
  accessible SVG choropleth
- **Data model:** Build-time generated local JSON/TypeScript assets
- **Coverage:** Uttar Pradesh state summary and all 75 districts
- **District indicators:** All 93 indicators reported in each district fact
  sheet, with NFHS-6 and NFHS-5 values
- **Comparison limit:** Up to four districts
- **Home data export:** State-level NFHS-6 versus NFHS-5 table with Excel
  download below the district map
- **Reports:** Responsive download table for NFHS reports, fact sheets, the
  data-quality document, and the Uttar Pradesh Budget Speech 2026-27
- **Budget Speech:** `/budget-speech` presents verified fiscal figures,
  beneficiary/sector categories, and clearly labelled analytical NFHS
  life-cycle mappings
- **Budget source previews:** Eye actions labelled `Budget Speech 2026-27` open
  the exact internally mapped PDF page in a dialog; page numbers are not shown
  in the trigger text
- **Deployment:** GitHub public repository and Vercel
- **Repository:** <https://github.com/Harshmalik017/NFHS>

## Source facts

The primary source is the *National Family Health Survey (NFHS-6), 2023-24:
State and District Fact Sheets, Uttar Pradesh*, published by the International
Institute for Population Sciences in August 2026.

The compendium contains:

- Uttar Pradesh state values with NFHS-6 urban, rural, and total estimates and
  NFHS-5 total estimates;
- 75 district fact sheets with NFHS-6 and NFHS-5 total estimates;
- 93 indicators on each district fact sheet;
- state and district sample sizes for households, women, and men;
- indicator definitions, notes, and statistical cautions.

The source labels NFHS-6 results as provisional. District fact sheets do not
provide urban/rural estimates. The application must retain both limitations.

## Documentation rules

1. Treat the checked-in PDF as the primary source for values and definitions.
2. Do not replace suppressed values with zero.
3. Preserve parentheses that identify estimates based on 25-49 unweighted
   cases and `*` values suppressed because they are based on fewer than 25
   unweighted cases.
4. Use semantic indicator IDs; state and district indicator numbers are not
   interchangeable.
5. Cite the source and show the analytical-demonstration disclaimer in the
   application and public documentation.
6. Keep this index current whenever a module, route, dataset, or governing
   document is added or renamed.
7. Budget Speech figures must be mapped to the matching page in the checked-in
   32-page PDF. Do not use generic page 1/page 2 references.
8. Treat life-cycle stages, vulnerability groupings, and NFHS-to-scheme
   linkages as an analytical planning framework, not verbatim Budget Speech
   claims.

## Disclaimer

This portal is an analytical demonstration environment — **not** an official
Government of Uttar Pradesh website. Original information is drawn from
[NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php) data for
representation and visualization. For authoritative records and official
transactions, refer to [NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php)
and your department's designated channels.

© 2026
[Developer Details (Data Consultant)](https://www.linkedin.com/in/harshmalik017).
All Rights Reserved.
