"use client";

import { Eye, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BudgetSpeechPagePreview({
  page,
  title,
}: {
  page: number;
  title: string;
}) {
  const previewHref = `/Budget_Speech_2026_2027.pdf#page=${page}&zoom=page-fit`;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button" size="sm" variant="outline" className="h-7 gap-1.5 px-2.5" />
        }
      >
        <Eye className="size-3.5" aria-hidden="true" />
        Page {page}
      </DialogTrigger>
      <DialogContent className="max-w-[min(95vw,72rem)] p-4 sm:max-w-[min(95vw,72rem)]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Budget Speech reference page {page}
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary underline underline-offset-3"
            >
              Open full page
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
          <DialogClose
            render={
              <Button
                type="button"
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              />
            }
          >
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
