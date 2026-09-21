"use client";

import { Download, FileDown } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BudgetSpeechDownloads() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row print:hidden">
      <a
        href="/Budget_Speech_2026_2027.pdf"
        className={cn(buttonVariants(), "whitespace-nowrap")}
        download="UP_Budget_Speech_2026_2027.pdf"
      >
        <Download className="size-4" aria-hidden="true" />
        Download UP Budget Speech 2026-27
      </a>
      <Button
        type="button"
        variant="outline"
        className="whitespace-nowrap"
        onClick={() => window.print()}
      >
        <FileDown className="size-4" aria-hidden="true" />
        Download Complete Budget Speech Page PDF
      </Button>
    </div>
  );
}
