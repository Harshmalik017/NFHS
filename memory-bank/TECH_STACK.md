# Technology Stack

## 1. Stack goals

The stack should support:

- static-first rendering on Vercel;
- strict, typed handling of nuanced statistical values;
- reproducible extraction from the checked-in PDF;
- accessible charts, tables, controls, and district geometry;
- minimal operational cost and no runtime database;
- a public repository with no required secrets.

The application was initialized with npm. Exact versions are pinned in
`package-lock.json`; `package.json` records the supported direct dependency
ranges.

## 2. Core application

| Technology | Status | Purpose and rationale |
| --- | --- | --- |
| Next.js App Router | Required | Server rendering, static generation, metadata, routing, and Vercel integration |
| React | Required | UI runtime, using the version supported by the selected Next.js release |
| TypeScript | Required | Strict contracts for districts, indicators, observations, rankings, and URL state |
| Node.js LTS | Required | Local development, generation scripts, tests, and builds |

Initial application versions:

- Next.js 16.3.5
- React 19.2.8
- TypeScript 5.x
- Tailwind CSS 4.x

### Next.js conventions

- Use the `src/` directory.
- Prefer server components.
- Use client components only for filters, charts, map interaction, theme state,
  and other browser behavior.
- Generate all district routes with `generateStaticParams`.
- Use built-in metadata, sitemap, robots, font, and image capabilities.
- Avoid route handlers and server actions unless a later requirement needs
  runtime behavior.

### TypeScript conventions

- Enable strict mode.
- Avoid `any` and broad type assertions.
- Represent suppressed and missing data with discriminated unions or equivalent
  status/value invariants.
- Generate or validate typed data at the boundary rather than trusting JSON
  imports implicitly.

## 3. Styling and component system

| Technology | Status | Purpose and rationale |
| --- | --- | --- |
| Tailwind CSS | Required | Responsive layouts and semantic utility composition |
| shadcn/ui | Required | Accessible, repository-owned component primitives |
| Radix UI dependencies | Transitive/selected | Accessible behavior used by selected shadcn/ui components |
| Lucide React | Planned | Consistent, lightweight icons |
| next-themes | Planned | Light/dark/system theme preference |

Only install shadcn/ui components that the application uses. Likely components:

- button;
- badge;
- card;
- table;
- tabs;
- select;
- command;
- popover;
- tooltip;
- sheet;
- dialog;
- dropdown menu;
- separator;
- skeleton;
- alert;
- breadcrumb.

Do not create a second generic component library alongside shadcn/ui.

## 4. Charts and mapping

| Technology | Status | Purpose and rationale |
| --- | --- | --- |
| Recharts | Required | Charts using shadcn chart composition and theme tokens |
| d3-geo | Planned | Convert local GeoJSON features into responsive SVG paths |
| Local district GeoJSON | Required data asset | Static choropleth without an external API or key |

### Chart approach

- Wrap Recharts through shared dashboard components.
- Render accessible headings, summaries, legends, and semantic tables outside
  the SVG.
- Use deterministic colors and formatting from semantic design tokens.
- Do not introduce another charting library for isolated visualizations.

### Map approach

- Load a clearly licensed Uttar Pradesh district GeoJSON from the repository.
- Use `d3-geo` projection and path generation in a focused map component.
- Keep district matching in the data pipeline, not in UI components.
- Validate exactly one geometry feature per district.
- Avoid Google Maps, Mapbox, or another runtime map service.

If GeoJSON size is material, use a documented build-time simplification step
and retain source/license metadata. Do not silently reduce or alter boundaries.

## 5. Static data pipeline

| Technology | Status | Purpose and rationale |
| --- | --- | --- |
| pdfjs-dist | Planned development dependency | Reproducible text extraction from the source PDF |
| Zod | Planned | Runtime validation and typed inference for generated assets |
| Node.js scripts | Required | Extraction, normalization, validation, and deterministic generation |
| JSON | Required | Portable generated data assets |

The generation pipeline will:

1. read the source PDF;
2. extract text page by page;
3. parse state and district fact sheets;
4. normalize values into explicit statuses;
5. attach definitions, footnotes, source pages, and sample sizes;
6. join reviewed geometry identifiers;
7. validate counts, ranges, and relationships;
8. write deterministically ordered JSON and provenance.

Generated data should live under `src/data/nfhs/`. Query and formatting logic
should live under `src/lib/nfhs/`.

The build must not download source data. Inputs required for reproducibility
must already be present locally or be fetched through a separate, explicit,
documented acquisition step.

## 6. Validation and testing

| Technology | Status | Purpose and rationale |
| --- | --- | --- |
| ESLint | Required | Framework and TypeScript linting |
| TypeScript compiler/Next.js build | Required | Type and production integration validation |
| Vitest | Planned | Fast tests for parsing, selectors, ranking, and URL logic |
| Testing Library | Planned | Accessible component behavior |
| Playwright | Planned | Focused browser checks for primary responsive workflows |

Testing tools should be added with the application rather than before code
exists. Prefer targeted checks:

- data parser and schema tests;
- district/indicator count validation;
- geometry join validation;
- status formatting;
- tie-aware ranking;
- comparison URL parsing and four-district limit;
- keyboard interaction for filters and comparison;
- overview, district, comparison, rankings, and methodology smoke checks.

Do not add overlapping test runners.

## 7. Formatting and code quality

- Use the formatter and linting conventions established by the initialized
  Next.js/shadcn project.
- Do not add a second formatter without a demonstrated need.
- Keep imports and generated data deterministic.
- Keep source code comments rare and focused on non-obvious statistical or
  parsing behavior.
- Treat warnings from data generation as failures when they indicate ambiguous
  or incomplete data.

## 8. Package management

Use npm and commit `package-lock.json`. Do not mix package managers or commit
multiple lockfiles. Automated environments should use `npm ci`; local
development may use `npm install` when intentionally changing dependencies.

## 9. Hosting and delivery

| Service | Purpose |
| --- | --- |
| GitHub | Public source repository at `Harshmalik017/NFHS` |
| Vercel | Preview and production deployment |

Deployment constraints:

- default Next.js build pipeline;
- no runtime database;
- no required environment variables;
- no private package registry;
- no external map token;
- local static dataset and geometry;
- build fails on invalid generated data;
- preview deployments for future pull requests where available.

The repository remote is:

```text
https://github.com/Harshmalik017/NFHS.git
```

## 10. Security and privacy

- No user accounts or personal-data collection
- No analytics in the first release
- No secrets in source, generated assets, or client bundles
- Aggregate NFHS statistics only
- Dependency updates reviewed for compatibility and security
- External links use safe attributes when opening a new browsing context
- No HTML injection for indicator labels, definitions, or source notes

## 11. Browser and device support

Target current stable versions of:

- Chrome and Chromium-based browsers;
- Firefox;
- Safari;
- mobile Safari and Chrome.

The dashboard should remain readable without client-side JavaScript where the
page is primarily static. Interactive charts, filters, and the map may require
JavaScript, but their initial data and alternatives should be server rendered
where practical.

## 12. Deliberately excluded technologies

The first release does not need:

- PostgreSQL, SQLite, Supabase, Firebase, or another runtime database;
- Redux or another global state framework;
- GraphQL;
- authentication providers;
- a headless CMS;
- a runtime PDF parser in the browser;
- Google Maps, Mapbox, or another external map SDK;
- a second component or chart library;
- Docker for Vercel deployment.

Add one only when a documented requirement cannot be met cleanly by the
existing stack.

## 13. Planned command surface

Exact names will be finalized in `package.json`, but the project should provide
one clear command for each responsibility:

| Responsibility | Planned command name |
| --- | --- |
| Local development | `dev` |
| Production build | `build` |
| Production start | `start` |
| Lint | `lint` |
| Unit/component tests | `test` |
| Browser tests | `test:e2e` |
| NFHS data generation | `data:generate` |
| NFHS data validation | `data:validate` |

These command names are now implemented in `package.json`.

## 14. Decision record

| Decision | Reason |
| --- | --- |
| Static assets instead of a database | Dataset is versioned, read-only, and suitable for build-time validation |
| App Router and server components | Static rendering, metadata, route generation, and limited client JavaScript |
| shadcn/ui | Accessible primitives with local ownership and Tailwind integration |
| Recharts | Matches shadcn chart patterns and required comparison visualizations |
| Local SVG choropleth | No runtime vendor dependency, token, or map request |
| Zod at data boundaries | Prevent malformed generated data from reaching the UI |
| Semantic observation statuses | Preserves parenthesized, suppressed, and missing source meaning |
| Vercel | Native Next.js deployment and public GitHub integration |
