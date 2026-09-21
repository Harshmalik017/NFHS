import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  headerExtra,
  alignHeaderTop = false,
  fullWidthHeader = false,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  headerExtra?: ReactNode;
  alignHeaderTop?: boolean;
  fullWidthHeader?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="page-shell page-container py-10 sm:py-14">
      <header
        className={`page-shell-header flex flex-col gap-6 pb-8 ${
          fullWidthHeader
            ? "lg:items-stretch"
            : `lg:flex-row lg:justify-between ${
                alignHeaderTop ? "lg:items-start" : "lg:items-end"
              }`
        }`}
      >
        <div
          className={`page-shell-heading space-y-3 ${
            fullWidthHeader ? "max-w-none" : "max-w-3xl"
          }`}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p
              className={`text-base leading-7 text-muted-foreground sm:text-lg ${
                fullWidthHeader ? "max-w-none" : "max-w-2xl"
              }`}
            >
              {description}
            </p>
          ) : null}
          {headerExtra}
        </div>
        {actions ? (
          <div className={`page-shell-actions shrink-0 ${fullWidthHeader ? "w-full" : ""}`}>
            {actions}
          </div>
        ) : null}
      </header>
      <div className="page-shell-content py-8">{children}</div>
    </div>
  );
}
