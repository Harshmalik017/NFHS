# Repository Agent Guide

## Mission

Build and maintain a public, accessible Next.js dashboard for the NFHS-6 Uttar
Pradesh fact sheets without weakening source fidelity, statistical cautions, or
the analytical-demonstration disclaimer.

Read these documents before making substantive changes:

1. [`memory-bank/INDEX.md`](./memory-bank/INDEX.md)
2. [`memory-bank/PRD.md`](./memory-bank/PRD.md)
3. [`memory-bank/MODULES.md`](./memory-bank/MODULES.md)
4. [`memory-bank/DESIGN.md`](./memory-bank/DESIGN.md)
5. [`memory-bank/TECH_STACK.md`](./memory-bank/TECH_STACK.md)
6. [`CHANGELOG.md`](./CHANGELOG.md)
7. The relevant pages of the checked-in NFHS compendium

## Current state

The Next.js and shadcn/ui foundation is initialized. The static data pipeline
and dashboard modules are under active implementation. Use only commands
present in `package.json`, and update public documentation when that command
surface changes.

## Source-of-truth order

1. The checked-in NFHS-6 Uttar Pradesh compendium for values, definitions,
   footnotes, survey context, and sample sizes
2. Validated generated data for application behavior
3. `memory-bank/PRD.md` for agreed product behavior
4. `memory-bank/MODULES.md` for architecture and data contracts

If generated data conflicts with the PDF, treat it as a generation or
validation defect. Do not edit a value merely to make a screen look plausible.

## Required technical direction

- Next.js App Router
- TypeScript with strict type safety
- Tailwind CSS
- shadcn/ui components and chart patterns
- Static local JSON/TypeScript data
- Local, clearly licensed district GeoJSON
- Static generation where practical
- Deployment to Vercel from
  <https://github.com/Harshmalik017/NFHS>

Do not introduce a runtime database, authentication system, external map API,
analytics service, or required secret without explicit approval and a PRD
update.

## Data integrity rules

- Cover exactly 75 Uttar Pradesh districts.
- Preserve all 93 district indicators and both survey rounds.
- Keep state and district indicator catalogs separate where source numbering or
  coverage differs.
- Never interpret district figures as urban/rural estimates.
- Never coerce `*`, missing, or unparsable values to zero.
- Preserve parenthesized estimates as numeric values with a caution status.
- Preserve source page references and footnotes.
- Fail loudly on ambiguous source tokens, incomplete district data, invalid
  ranges, duplicate IDs, or unmatched geometry.
- Use stable semantic IDs and reviewed aliases for district/geometry joins.
- Add source spot checks whenever parsing logic changes.

## UI and accessibility rules

- Prefer server components; use client components only for interaction.
- Reuse shadcn/ui primitives before creating an overlapping primitive.
- Every chart and map needs a readable text summary or table.
- Do not rely on color alone for survey round, change, rank, or data status.
- Treat indicator direction explicitly: higher, lower, or neutral.
- Do not imply that an indicator rank is an overall district ranking.
- Keep units, survey rounds, provisional status, and cautions close to values.
- Support keyboard operation, visible focus, reduced motion, and WCAG 2.2 AA
  contrast.
- Keep all data available on mobile, even when tables require horizontal
  scrolling.

## Change discipline

- Make focused changes and follow existing project conventions.
- Use `main` as the working and publication branch. When the user asks to
  commit completed work, push the verified commit to `origin/main` unless they
  explicitly direct otherwise.
- Search for existing helpers and components before adding new ones.
- Keep generated files generated; change the source pipeline rather than
  hand-editing generated values.
- Update memory-bank documents when product behavior, routes, data contracts,
  or major constraints change.
- Update `memory-bank/DESIGN.md` when visual tokens, responsive behavior,
  visualization rules, or accessibility patterns change.
- Update `memory-bank/TECH_STACK.md` when dependencies, versions, commands,
  hosting, or architecture decisions change.
- Update `CHANGELOG.md` for notable user-facing, data, architecture,
  documentation, or deployment changes.
- Update the README when setup, scripts, status, deployment, or public
  attribution changes.
- Do not commit secrets, local environment files, build output, or temporary
  extraction artifacts.
- Do not remove or rename the source PDF without updating provenance and all
  documentation links.

## Validation expectations

After application setup, use the smallest existing commands that cover the
change. A feature is not complete until applicable data validation, tests,
lint, type checking, and production build pass.

For data changes, verify at minimum:

- district and indicator counts;
- status/value invariants;
- sample sizes;
- one-to-one geometry joins;
- affected PDF spot checks.

For UI changes, verify:

- desktop and mobile layout;
- keyboard interaction;
- accessible chart/table or map/table equivalence;
- invalid, missing, suppressed, and cautioned states;
- shareable URL behavior when relevant.

## Public disclaimer

This portal is an analytical demonstration environment — **not** an official
Government of Uttar Pradesh website. Original information is drawn from
[NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php) data for
representation and visualization. For authoritative records and official
transactions, refer to [NFHS Official](https://www.nfhsiips.in/nfhsuser/index.php)
and your department's designated channels.

© 2026
[Developer Details (Data Consultant)](https://www.linkedin.com/in/harshmalik017).
All Rights Reserved.
