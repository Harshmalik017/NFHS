# Design System and Experience Specification

## 1. Design objective

The NFHS Uttar Pradesh Dashboard should make a large, statistically nuanced
dataset feel understandable without making it look simpler or more certain than
it is. The experience should be calm, analytical, responsive, and transparent
about source limitations.

The dashboard is an independent analytical demonstration. Its visual identity
must not imitate an official Government of Uttar Pradesh portal, use government
emblems, or suggest official endorsement.

## 2. Experience principles

### Clarity before decoration

Every visual element should help users locate, compare, or interpret data.
Avoid ornamental gradients, excessive animation, glass effects, and dense
dashboard chrome.

### Context beside every number

Keep the indicator label, unit, survey round, geography, and any caution close
to the value. A number without this context is incomplete.

### Comparisons without judgment

Show change and rank, but do not assume that a positive numeric change is a
positive outcome. Use each indicator's documented `higher-is-better`,
`lower-is-better`, or `neutral` interpretation.

### Statistical honesty

Parenthesized, suppressed, and missing observations must remain visually
distinct. Do not hide uncertainty in tooltips or replace unavailable values
with zero.

### Accessible equivalence

Charts and maps are enhancements. The same essential information must remain
available through text summaries and semantic tables.

### Progressive detail

Lead with state context and selected insights, then let users move into full
district profiles, comparison, ranking, definitions, and source notes.

## 3. Visual direction

### Personality

- trustworthy but not institutional;
- modern but restrained;
- data-dense but readable;
- locally relevant without decorative stereotypes;
- suitable for researchers, analysts, journalists, and the public.

### Composition

- Use generous whitespace around major sections.
- Use cards only when they establish a meaningful group.
- Prefer bordered sections and subtle surface contrast to heavy shadows.
- Keep page titles and active filters visually dominant.
- Use sticky controls only when they improve long tables or comparisons and do
  not reduce mobile viewport usability.

### Shape and depth

- Medium corner radius consistent with shadcn/ui defaults.
- Thin neutral borders.
- One subtle elevation level for overlays and important floating controls.
- Avoid stacked shadows and excessive nested cards.

## 4. Design tokens

Implementation should use semantic CSS variables compatible with shadcn/ui and
Tailwind CSS. Components must consume semantic roles rather than hard-coded
colors.

### Core semantic roles

| Token role | Usage |
| --- | --- |
| `background` | Page canvas |
| `foreground` | Primary text |
| `card` / `card-foreground` | Grouped analytical content |
| `muted` / `muted-foreground` | Secondary context and metadata |
| `primary` / `primary-foreground` | Main actions and active navigation |
| `secondary` / `secondary-foreground` | Low-emphasis controls |
| `accent` / `accent-foreground` | Selected or exploratory state |
| `border` | Dividers, tables, cards, and input boundaries |
| `ring` | Keyboard focus |
| `destructive` | Invalid state or destructive action, not poor indicator performance |

### Data semantic roles

| Token role | Meaning |
| --- | --- |
| `data-nfhs-6` | Current NFHS-6 series |
| `data-nfhs-5` | Previous NFHS-5 series |
| `data-state` | Uttar Pradesh state benchmark |
| `data-caution` | Parenthesized small-sample estimate |
| `data-suppressed` | Source-suppressed observation |
| `data-missing` | Missing or non-comparable observation |
| `data-positive` | Beneficial change only after indicator interpretation |
| `data-negative` | Adverse change only after indicator interpretation |
| `data-neutral` | Change with neutral/unknown interpretation |

The base identity should use a deep indigo primary and a teal accent against
neutral slate surfaces. Amber should identify statistical caution. Red should
be reserved for errors or interpreted adverse change, never automatically for
a low rank.

### Dark theme

- Preserve the semantic hierarchy rather than mechanically inverting colors.
- Keep chart series distinguishable at normal and muted opacity.
- Use lighter boundaries rather than large high-contrast card surfaces.
- Test map scale, focus ring, and caution states independently in dark mode.

## 5. Typography

- Use a highly legible variable sans-serif available through `next/font`.
- Prefer tabular numerals for metrics, tables, ranks, and sample sizes.
- Use no more than three practical text tiers within a card.
- Keep body copy near 16px and avoid sub-12px labels.
- Use sentence case for headings and controls.
- Keep long indicator labels readable; do not truncate definitions in the only
  available representation.

Suggested hierarchy:

| Role | Treatment |
| --- | --- |
| Page title | Strong weight, compact tracking, responsive 30-48px |
| Section title | Semibold, responsive 22-30px |
| Card title | Semibold, 16-18px |
| Primary metric | Semibold tabular numerals, 28-40px |
| Body | Regular, 15-17px |
| Metadata | Regular/medium, 13-14px with sufficient contrast |

## 6. Layout system

### Global shell

- Full-width page canvas with a centered content container.
- Default content maximum around 1440px for data-heavy screens.
- Reading content such as methodology should use a narrower measure.
- Header contains product identity, primary navigation, theme control, and a
  mobile menu.
- Footer contains disclaimer, source link, methodology link, repository link,
  and developer copyright.

### Responsive breakpoints

Use Tailwind's established breakpoints unless testing reveals a content-driven
need. Layout decisions should be based on available space, not device names.

### Desktop

- Overview may use a 12-column grid.
- Primary map/chart may span 7-8 columns with context in 4-5 columns.
- Filters may form a horizontal toolbar.
- District profile category navigation may remain visible beside content when
  there is adequate width.

### Tablet

- Use two-column metric groups where labels remain readable.
- Move secondary controls into wrapped rows.
- Stack map/chart and contextual panels when side-by-side content becomes
  cramped.

### Mobile

- Use a single primary content column.
- Keep filter controls full width.
- Use horizontal scrolling for wide tables with a visible affordance.
- Never remove indicators, source cautions, or methodology to simplify layout.
- Comparison charts should be accompanied by compact tables and legends.

## 7. Navigation and URLs

Primary navigation:

- Overview
- Districts
- Compare
- Rankings
- Methodology

Behavior:

- Show the active route with text and a non-color-only indicator.
- Keep selected indicators, districts, filters, and sort state in the URL where
  practical.
- Use stable district slugs.
- Provide breadcrumbs on district profiles and deeper content.
- On invalid URL state, retain valid selections and explain what was removed.

## 8. Core screen specifications

### Overview

1. Introductory heading, provisional badge, and concise source statement
2. Four to six state metric cards
3. Indicator category and indicator selector
4. District choropleth with state benchmark and legend
5. Distribution or range chart
6. Notable district table with cautions
7. Links to comparison, rankings, and methodology

Avoid automatically rotating metrics or map selections.

### District explorer

1. Title and count
2. Search and filter toolbar
3. Active filter summary and clear action
4. Responsive district table/cards
5. Selected indicator values, survey comparison, and status

Desktop should prioritize a sortable table. Mobile may use structured rows or
cards, but must retain the same data.

### District profile

1. District title, source page, and provisional status
2. Household, women, and men sample sizes
3. Category navigation
4. Category summaries
5. Indicator comparison table with NFHS-6, NFHS-5, change, state total, and
   status
6. Definitions and footnotes near the relevant category

The complete table is canonical. Charts may summarize selected indicators but
must not replace full coverage.

### Comparison

1. District multi-select with a visible `4 maximum` instruction
2. Selected district chips that can be removed by keyboard
3. Category and indicator controls
4. Comparison chart
5. Equivalent table
6. Share/copy-link action with success feedback

District series must remain identifiable by labels or patterns, not color
alone.

### Rankings

1. Indicator and survey-basis selector
2. Interpretation notice
3. State benchmark and available-district count
4. Distribution chart
5. Ranked table
6. Missing/suppressed summary

Use tied ranks for equal numeric values. Keep caution status visible beside the
ranked value.

### Methodology

Use a readable article layout with a table of contents. Separate:

- survey overview;
- provisional status;
- district limitations;
- value-status legend;
- sample sizes;
- indicator definitions and footnotes;
- source citation;
- map source and license;
- project disclaimer and developer attribution.

## 9. Component specifications

### Metric card

- Indicator short label
- Current value and unit
- Survey round
- Previous value and interpreted change
- Status badge when required
- Link to detail

Do not use red/green change styling until indicator interpretation is known.

### Value display

| Source state | Display |
| --- | --- |
| Reported | Numeric value plus unit |
| Caution | Parenthesized value plus visible `Small sample` badge |
| Suppressed | `*` plus `Suppressed` label |
| Missing | Em dash plus `Not available` label |

Screen-reader text must expand symbols and abbreviations.

### Data table

- Sticky header only when it does not obscure focused content.
- Right-align numeric cells and use tabular numerals.
- Keep row headers semantic.
- Provide sort direction in text and `aria-sort`.
- Do not rely on tooltip-only definitions.

### Filter controls

- Use labels outside placeholders.
- Show active selections and a clear/reset action.
- Preserve keyboard behavior supplied by shadcn/ui primitives.
- Announce result-count changes where useful without excessive live-region
  updates.

### Dialogs and sheets

- Use for focused mobile filters or explanatory detail.
- Restore focus to the trigger on close.
- Do not put essential source cautions only inside a closed overlay.

## 10. Data visualization

### Chart rules

- Show units in axes or direct labels.
- Start bar charts at zero.
- Use line charts only when an ordered sequence exists.
- For two survey rounds, prefer grouped bars, slope/dumbbell comparison, or
  direct value pairs rather than implying a continuous trend.
- Include exact values in an adjacent table or accessible list.
- Use concise tooltips as supplementary detail.
- Avoid 3D, gauges, radial progress, and decorative pie charts.

### Choropleth rules

- Use a sequential, perceptually ordered, color-vision-conscious scale.
- Use the same scale domain across a single comparison context.
- Explain whether bins are continuous, quantile, or fixed.
- Render missing and suppressed districts with a neutral pattern/fill.
- Show selected/focused district with a high-contrast outline.
- Support pointer interaction and an equivalent searchable/sortable district
  table.
- Avoid using area size as a proxy for importance.

### Change

Display both absolute percentage-point change and source values for percentage
indicators. Label it `percentage points`, not `percent`, unless a relative
change is intentionally calculated and explicitly named.

## 11. Content design

- Use `NFHS-6 (2023-24)` and `NFHS-5 (2019-21)` on first mention.
- Prefer `Uttar Pradesh total` over an ambiguous `state average`.
- Use `district estimate` rather than `district average` unless mathematically
  accurate.
- Use `Not available` for missing values and `Suppressed` for `*`.
- Explain abbreviations on first use or through nearby definitions.
- Keep the provisional notice concise but visible.
- Avoid superlatives such as `best` and `worst`; use `highest reported value`
  and `lowest reported value`.

## 12. Feedback and states

### Loading

Most content should be statically rendered. Use skeletons only for
client-deferred charts or transitions, and match the final layout dimensions.

### Empty

Explain why no data is shown and offer a specific recovery action, such as
clearing filters or choosing another indicator.

### Invalid URL

Keep valid parameters, discard only invalid values, and display a dismissible
notice describing the correction.

### Data error

Show a clear error with source context. Do not replace malformed data with an
empty chart or plausible default.

### Interaction feedback

Provide visible confirmation for copied links, changed filters, and comparison
limits. Do not depend solely on transient toast messages for critical errors.

## 13. Accessibility checklist

- WCAG 2.2 AA color contrast
- Keyboard access to navigation, filters, tables, charts, and map alternatives
- Visible focus on every interactive control
- Logical heading order and landmarks
- Descriptive page titles and links
- Text equivalents for color, symbols, charts, and map fills
- Touch targets of at least 44 by 44 CSS pixels where practical
- Reduced-motion support
- No content flashing
- Screen-reader expansion for survey abbreviations and source markers
- Zoom and text resizing without loss of content

## 14. Design acceptance criteria

- Core routes follow the defined hierarchy on mobile and desktop.
- shadcn/ui primitives use shared semantic tokens.
- Light and dark themes preserve data and status distinctions.
- All observation states are visually and textually distinct.
- Charts and maps have equivalent accessible content.
- Percentage-point change is labeled correctly.
- The UI never suggests government affiliation.
- Source, provisional status, disclaimer, and copyright are visible.
- No essential data or caution is available only by hover.
