"use client";

import { useState } from "react";
import { Eye, ExternalLink } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function BudgetSpeechPagePreview({
  page,
  title,
}: {
  page: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const previewHref = `/Budget_Speech_2026_2027.pdf#page=${page}&zoom=page-fit`;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <DialogTrigger
        render={
          <Button type="button" size="sm" variant="outline" className="h-7 gap-1.5 px-2.5" />
        }
      >
        <Eye className="size-3.5" aria-hidden="true" />
        Budget Speech 2026-27
      </DialogTrigger>
      <DialogContent className="max-w-[min(95vw,72rem)] p-4 sm:max-w-[min(95vw,72rem)]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Official Uttar Pradesh Budget Speech 2026-27 reference
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary underline underline-offset-3"
            >
              Open source PDF
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </DialogDescription>
        </DialogHeader>
        <iframe
          src={previewHref}
          title={`${title} - Budget Speech page ${page}`}
          className="h-[72vh] w-full rounded-lg border"
        />
        <DialogFooter className="border-0 bg-transparent p-0 pt-2 sm:justify-end">
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
            )}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
