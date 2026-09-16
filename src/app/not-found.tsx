import Link from "next/link";
import { MapPinOff } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[65vh] items-center justify-center py-16">
      <div className="max-w-lg space-y-5 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MapPinOff className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <p className="eyebrow">Not found</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            This dashboard view does not exist
          </h1>
          <p className="leading-7 text-muted-foreground">
            The district or page may have moved, or the shared URL may contain
            an invalid selection.
          </p>
        </div>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
          Return to overview
        </Link>
      </div>
    </div>
  );
}
