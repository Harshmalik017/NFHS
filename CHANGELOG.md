# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The project does not yet have a tagged release or an adopted semantic-versioning
policy.

## [Unreleased]

### Added

- Added a reports-page table layout with responsive action controls (text
  download button on tablet/desktop and downward-arrow action on mobile).
- Added a home-page Uttar Pradesh state NFHS-6 vs NFHS-5 table below the map,
  with an Excel download endpoint.
- Added a responsive homepage hero image carousel that displays 4 cards on
  desktop, 3 on tablet, and 1 on mobile with continuous mobile autoplay.
- Added NFHS data quality assurance PDF to the reports page download list.
- Added Budget Speech 2026-2027 PDF to the reports page download list.
- Added a new Budget Speech × NFHS-6 page and linked it in the main navigation.
- Updated the Budget Speech page to use colorful, insight-driven cards from the
  speech instead of a reference image.
- Expanded the Budget Speech page with all major speech categories, including
  Kisan, Mahila, Yuva, education, health, industry, infrastructure, rural and
  urban development, social welfare, environment, tourism, and revenue.
- Verified Budget Speech source links against the 32-page PDF, replaced visible
  page-number labels with consistent source-preview actions, and distinguished
  speech-verified facts from analytical NFHS life-cycle mappings.
- Simplified the Budget Speech page by consolidating the revenue-surplus metric,
  showing allocation changes without amount/source columns, removing inline
  source-preview actions, and adding official-speech and complete-page PDF
  download options.
- Displayed all five NFHS life-cycle cards in one desktop row and set the
  Budget Speech page PDF layout to A4 landscape.
- Replaced the browser print-dialog workflow with a validated server-generated
  PDF download containing every Budget Speech page section.
- Added the five supplied life-cycle reference images to their matching web
  cards and embedded the same images in the generated landscape PDF.
- Added four NFHS-4/NFHS-5 Uttar Pradesh PDF reports to the reports page
  download list.
- Added NFHS-1 India and NFHS-2/NFHS-3 Uttar Pradesh PDF reports to the
  reports page download list.
- Added the NFHS-6 Uttar Pradesh compendium as the primary project data source.
- Added a new Budget Speech page that maps Uttar Pradesh Budget 2026-27
  priorities to NFHS-6 outcomes with colorful insight cards and sector tables.
- Initialized the Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui
  application foundation.
- Added the responsive application shell, theme support, methodology page,
  shared value formatting, and accessibility foundations.
- Added a deterministic PDF extraction pipeline and validated static dataset
  containing 75 districts, 93 district indicators, 101 state indicators,
  source pages, footnotes, value statuses, and sample sizes.
- Added data and district-geometry validation commands.
- Added a memory-bank index and source-data rules.
- Added the product requirements for the Uttar Pradesh dashboard.
- Added the application module and static-data architecture specification.
- Added the visual design and accessibility specification.
- Added the planned technology stack and architecture decisions.
- Added an MIT-licensed GeoJSON containing all 75 Uttar Pradesh district
  boundaries and documented its attribution.
- Added repository guidance for coding agents and contributors.
- Added the public project README with NFHS attribution, disclaimer, repository,
  and Vercel deployment intent.

### Documentation

- Recorded the planned coverage of all 75 Uttar Pradesh districts and all 93
  district fact-sheet indicators.
- Recorded the requirement to preserve provisional, parenthesized,
  source-suppressed, and missing values.
- Recorded the use of Next.js, TypeScript, Tailwind CSS, shadcn/ui, local static
  data, and a licensed local district choropleth.
- Added the analytical-demonstration disclaimer and developer attribution.

[Unreleased]: https://github.com/Harshmalik017/NFHS
