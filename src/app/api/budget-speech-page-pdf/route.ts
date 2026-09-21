import { readFile } from "node:fs/promises";
import path from "node:path";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import {
  budgetSpeechPdfDataSchema,
  createBudgetSpeechDocument,
  lifeCycleImagePaths,
} from "@/lib/budget-speech-pdf";

export const runtime = "nodejs";

const MAX_DATA_LENGTH = 100_000;

const lifeCycleImagePathSet = new Set<string>(lifeCycleImagePaths);

function createPdfBuffer(
  documentDefinition: ReturnType<typeof createBudgetSpeechDocument>,
) {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      pdfMake
        .createPdf(documentDefinition, undefined, undefined, pdfFonts)
        .getBuffer(resolve);
    } catch (error) {
      reject(error);
    }
  });
}

async function loadLifeCycleImages(imagePaths: readonly string[]) {
  const uniqueImagePaths = [...new Set(imagePaths)];
  const images = await Promise.all(
    uniqueImagePaths.map(async (imagePath) => {
      if (!lifeCycleImagePathSet.has(imagePath)) {
        throw new Error(`Unsupported life-cycle image path: ${imagePath}`);
      }

      const relativePath = imagePath.replace(/^\/+/, "");
      const absolutePath = path.join(process.cwd(), "public", relativePath);
      const image = await readFile(absolutePath);

      return [imagePath, `data:image/png;base64,${image.toString("base64")}`] as const;
    }),
  );

  return new Map(images);
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch (error) {
    console.warn("Unable to parse the Budget Speech PDF request.", error);

    return Response.json(
      { error: "Budget Speech PDF form data is invalid." },
      { status: 400 },
    );
  }

  const rawData = formData.get("budgetSpeechData");

  if (typeof rawData !== "string") {
    return Response.json(
      { error: "Budget Speech PDF data is required." },
      { status: 400 },
    );
  }

  if (rawData.length > MAX_DATA_LENGTH) {
    return Response.json(
      { error: "Budget Speech PDF data is too large." },
      { status: 413 },
    );
  }

  const parsedJson: unknown = (() => {
    try {
      return JSON.parse(rawData);
    } catch {
      return null;
    }
  })();
  const validationResult = budgetSpeechPdfDataSchema.safeParse(parsedJson);

  if (!validationResult.success) {
    return Response.json(
      { error: "Budget Speech PDF data is invalid." },
      { status: 400 },
    );
  }

  try {
    const lifeCycleImages = await loadLifeCycleImages(
      validationResult.data.categorisationCards.map(
        (category) => category.imagePath,
      ),
    );
    const documentDefinition = createBudgetSpeechDocument(
      validationResult.data,
      lifeCycleImages,
    );
    const buffer = await createPdfBuffer(documentDefinition);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition":
          'attachment; filename="UP_Budget_Speech_2026_2027_NFHS_Context.pdf"',
        "Content-Length": String(buffer.byteLength),
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Unable to generate the Budget Speech page PDF.", error);

    return Response.json(
      { error: "The Budget Speech page PDF could not be generated." },
      { status: 500 },
    );
  }
}
