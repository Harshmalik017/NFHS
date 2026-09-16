import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground print:hidden">
      <div className="page-container grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm leading-6 text-primary-foreground/90">
            This portal is an analytical demonstration environment —{" "}
            <strong className="font-semibold text-primary-foreground">
              not an official Government of Uttar Pradesh website
            </strong>
            . Original information is drawn from{" "}
            <a
              href="https://www.nfhsiips.in/nfhsuser/index.php"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary-foreground underline underline-offset-4"
            >
              NFHS Official
              <ExternalLink className="ml-1 inline size-3" aria-hidden="true" />
            </a>{" "}
            data for representation and visualization. For authoritative
            records and official transactions, refer to NFHS Official and your
            department&apos;s designated channels.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap content-start justify-start gap-x-5 gap-y-3 text-sm lg:justify-end lg:text-right"
        >
          <Link
            href="/districts"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Sample Size Explorer
            <ArrowRight aria-hidden="true" />
          </Link>
          <a
            href="https://github.com/Harshmalik017/NFHS/blob/main/memory-bank/NFHS-6_StateFact_Uttar%20Pradesh__Uttar%20Pradesh%20Compendium.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-primary-foreground underline-offset-4 hover:underline"
          >
            Source PDF
          </a>
          <a
            href="https://github.com/Harshmalik017/NFHS"
            target="_blank"
            rel="noreferrer"
            className="text-primary-foreground underline-offset-4 hover:underline"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="bg-white py-3 text-center text-sm text-black">
        © 2026{" "}
        <a
          href="https://www.linkedin.com/in/harshmalik017"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline-offset-4 hover:underline"
        >
          Developer Details (Data Consultant)
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
}
