import type {
  Content,
  ContentTable,
  TableCell,
  TableLayout,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { z } from "zod";

const shortText = z.string().trim().min(1).max(500);
const textList = z.array(shortText).min(1).max(20);
export const lifeCycleImagePaths = [
  "/images/Early childhood (0-5 years).png",
  "/images/School-age children (6-14 years).png",
  "/images/Adolescents and youth (10-19 years).png",
  "/images/Women of reproductive age (15-49 years).png",
  "/images/Adults and elderly (50+ years).png",
] as const;

export const budgetSpeechPdfDataSchema = z
  .object({
    overallBudgetSize: z
      .array(
        z.object({
          title: shortText,
          value: shortText,
          note: shortText,
        }),
      )
      .min(1)
      .max(12),
    economicHighlights: textList,
    sectorAllocations: z
      .array(
        z.object({
          sector: shortText,
          change: shortText,
        }),
      )
      .min(1)
      .max(50),
    revenueTargets: z
      .array(
        z.object({
          source: shortText,
          target: shortText,
        }),
      )
      .min(1)
      .max(12),
    speechPriorityCategories: z
      .array(
        z.object({
          title: shortText,
          subtitle: shortText,
          highlights: textList,
        }),
      )
      .min(1)
      .max(30),
    categorisationCards: z
      .array(
        z.object({
          title: shortText,
          imagePath: z.enum(lifeCycleImagePaths),
          indicatorPoints: textList,
          lifeCycleFocus: shortText,
          vulnerabilityPoints: textList,
          selectedSchemes: textList,
          budgetLines: textList,
        }),
      )
      .min(1)
      .max(10),
  })
  .strict();

export type BudgetSpeechPdfData = z.infer<typeof budgetSpeechPdfDataSchema>;

const cardLayout: TableLayout = {
  hLineColor: () => "#cbd5e1",
  vLineColor: () => "#cbd5e1",
  hLineWidth: () => 0.6,
  vLineWidth: () => 0.6,
  paddingLeft: () => 7,
  paddingRight: () => 7,
  paddingTop: () => 7,
  paddingBottom: () => 7,
};

function chunkItems<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

function createCardGrid<T>(
  items: T[],
  columns: number,
  createCell: (item: T) => TableCell,
): ContentTable {
  const body = chunkItems(items, columns).map((row) => {
    const cells = row.map(createCell);

    while (cells.length < columns) {
      cells.push({ text: "", border: [false, false, false, false] });
    }

    return cells;
  });

  return {
    table: {
      widths: Array.from({ length: columns }, () => "*"),
      body,
    },
    layout: cardLayout,
    margin: [0, 0, 0, 14],
  };
}

function createSectionTitle(title: string, pageBreak?: "before"): Content {
  return {
    text: title,
    style: "sectionTitle",
    margin: [0, pageBreak ? 0 : 6, 0, 7],
    pageBreak,
  };
}

function createLifeCycleSection(label: string, content: Content): Content[] {
  return [
    {
      text: label,
      color: "#3730a3",
      bold: true,
      fontSize: 6.8,
      margin: [0, 5, 0, 2],
    },
    content,
  ];
}

export function createBudgetSpeechDocument(
  data: BudgetSpeechPdfData,
  lifeCycleImages: ReadonlyMap<string, string>,
): TDocumentDefinitions {
  const content: Content[] = [
    {
      text: "UTTAR PRADESH BUDGET SPEECH 2026-27",
      style: "eyebrow",
    },
    {
      text: "Budget highlights with NFHS-6 policy context",
      style: "title",
    },
    {
      text: "Summary - budget size, economic highlights, sector wise allocation and changes, revenue targets and NFHS linked planning context",
      style: "description",
    },
    {
      text: "Budget 2026-27  |  UP macro-fiscal snapshot  |  Planning reference",
      style: "metadata",
    },
    createSectionTitle("Overall budget size"),
    createCardGrid(data.overallBudgetSize, 3, (item) => ({
      stack: [
        { text: item.title, color: "#475569", fontSize: 8 },
        {
          text: item.value,
          bold: true,
          fontSize: 15,
          color: "#111827",
          margin: [0, 3, 0, 3],
        },
        { text: item.note, color: "#64748b", fontSize: 7.5 },
      ],
      fillColor: "#f8fafc",
    })),
    createSectionTitle("Economic highlights"),
    {
      ul: data.economicHighlights,
      fontSize: 8.5,
      color: "#475569",
      margin: [8, 0, 0, 12],
    },
    createSectionTitle(
      "Sector-wise allocations: year-on-year allocation change",
    ),
    {
      table: {
        headerRows: 1,
        widths: ["*", 125],
        body: [
          [
            {
              text: "Sector",
              bold: true,
              color: "#ffffff",
              fillColor: "#4338ca",
            },
            {
              text: "Allocation change vs 2025-26",
              bold: true,
              color: "#ffffff",
              fillColor: "#4338ca",
              alignment: "right",
            },
          ],
          ...data.sectorAllocations.map((row) => [
            { text: row.sector },
            { text: row.change, alignment: "right" as const },
          ]),
        ],
      },
      layout: "lightHorizontalLines",
      fontSize: 8,
      margin: [0, 0, 0, 12],
    },
    createSectionTitle("Revenue targets: key own-tax targets"),
    createCardGrid(data.revenueTargets, 4, (item) => ({
      stack: [
        { text: item.source, color: "#475569", fontSize: 8 },
        {
          text: item.target,
          bold: true,
          fontSize: 12,
          color: "#065f46",
          margin: [0, 4, 0, 0],
        },
      ],
      fillColor: "#ecfdf5",
    })),
    createSectionTitle("Budget speech categories"),
    {
      text: "Priorities for Kisan, Mahila, Yuva and other major sectors",
      bold: true,
      fontSize: 12,
      color: "#111827",
      margin: [0, 0, 0, 6],
    },
    createCardGrid(data.speechPriorityCategories, 3, (category) => ({
      stack: [
        {
          text: category.title,
          bold: true,
          fontSize: 9,
          color: "#111827",
        },
        {
          text: category.subtitle,
          italics: true,
          fontSize: 7.5,
          color: "#64748b",
          margin: [0, 2, 0, 4],
        },
        {
          ul: category.highlights,
          fontSize: 7.2,
          color: "#475569",
        },
      ],
      fillColor: "#f8fafc",
    })),
    createSectionTitle("Source verification"),
    createCardGrid(
      [
        {
          title: "Verified in the Budget Speech PDF",
          text: "Macro-fiscal figures, revenue targets, departmental allocations, beneficiary announcements and named schemes shown in the budget category cards are matched to the official 32-page speech.",
          fillColor: "#ecfdf5",
        },
        {
          title: "Analytical planning framework",
          text: "The NFHS life-cycle stages, vulnerability groupings and indicator-to-scheme linkages are derived from the supplied infographic and NFHS interpretation. They are not quoted verbatim from the Budget Speech.",
          fillColor: "#fffbeb",
        },
      ],
      2,
      (item) => ({
        stack: [
          {
            text: item.title,
            bold: true,
            fontSize: 9,
            color: "#111827",
          },
          {
            text: item.text,
            fontSize: 7.5,
            color: "#475569",
            margin: [0, 4, 0, 0],
          },
        ],
        fillColor: item.fillColor,
      }),
    ),
    createSectionTitle(
      "Life-cycle categorisation for NFHS-linked planning",
      "before",
    ),
    {
      text: "From data to action: linking district indicators with schemes and budget heads.",
      fontSize: 8,
      color: "#64748b",
      margin: [0, 0, 0, 8],
    },
    createCardGrid(data.categorisationCards, 5, (category) => {
      const image = lifeCycleImages.get(category.imagePath);

      if (!image) {
        throw new Error(
          `Missing PDF image for life-cycle category: ${category.title}`,
        );
      }

      return {
        stack: [
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    image,
                    fit: [127, 74],
                    alignment: "center",
                    margin: [2, 2, 2, 2],
                    fillColor: "#ffffff",
                  },
                ],
              ],
            },
            layout: {
              hLineColor: () => "#a5b4fc",
              vLineColor: () => "#a5b4fc",
              hLineWidth: () => 0.8,
              vLineWidth: () => 0.8,
              paddingLeft: () => 2,
              paddingRight: () => 2,
              paddingTop: () => 2,
              paddingBottom: () => 2,
            },
            margin: [0, 0, 0, 5],
          },
        {
          text: category.title,
          bold: true,
          fontSize: 8.5,
          color: "#111827",
          margin: [0, 0, 0, 3],
        },
        ...createLifeCycleSection("NFHS INDICATOR FOCUS", {
          ul: category.indicatorPoints,
          fontSize: 6.5,
          color: "#475569",
        }),
        ...createLifeCycleSection("LIFE-CYCLE STAGE FOCUS", {
          text: category.lifeCycleFocus,
          fontSize: 6.5,
          color: "#475569",
        }),
        ...createLifeCycleSection("KEY VULNERABILITIES", {
          ul: category.vulnerabilityPoints,
          fontSize: 6.5,
          color: "#475569",
        }),
        ...createLifeCycleSection("KEY SCHEMES", {
          ul: category.selectedSchemes,
          fontSize: 6.5,
          color: "#475569",
        }),
        ...createLifeCycleSection("BUDGET LINKAGE (2026-27)", {
          ul: category.budgetLines,
          fontSize: 6.5,
          color: "#475569",
        }),
        ],
        fillColor: "#f8fafc",
      };
    }),
  ];

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [26, 28, 26, 30],
    info: {
      title: "UP Budget Speech 2026-27 - NFHS-6 Policy Context",
      subject:
        "Uttar Pradesh Budget Speech 2026-27 highlights and NFHS-linked planning context",
      author: "NFHS Uttar Pradesh Dashboard",
    },
    content,
    defaultStyle: {
      font: "Roboto",
      fontSize: 8,
      color: "#374151",
      lineHeight: 1.15,
    },
    styles: {
      eyebrow: {
        fontSize: 8,
        bold: true,
        color: "#4338ca",
        characterSpacing: 1.2,
        margin: [0, 0, 0, 5],
      },
      title: {
        fontSize: 23,
        bold: true,
        color: "#111827",
        margin: [0, 0, 0, 6],
      },
      description: {
        fontSize: 9.5,
        color: "#475569",
        margin: [0, 0, 0, 7],
      },
      metadata: {
        fontSize: 7.5,
        color: "#4338ca",
        margin: [0, 0, 0, 8],
      },
      sectionTitle: {
        fontSize: 13,
        bold: true,
        color: "#111827",
      },
    },
    footer: (currentPage, pageCount) => ({
      text: `NFHS Uttar Pradesh | Budget Speech 2026-27 | Page ${currentPage} of ${pageCount}`,
      alignment: "right",
      color: "#64748b",
      fontSize: 7,
      margin: [0, 0, 26, 0],
    }),
  };
}
