import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  headerExtra,
  alignHeaderTop = false,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  headerExtra?: ReactNode;
  alignHeaderTop?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="page-shell page-container py-10 sm:py-14">
      <header
        className={`page-shell-header flex flex-col gap-6 pb-8 lg:flex-row lg:justify-between ${alignHeaderTop ? "lg:items-start" : "lg:items-end"}`}
      >
        <div className="page-shell-heading max-w-3xl space-y-3">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
          {headerExtra}
        </div>
        {actions ? <div className="page-shell-actions shrink-0">{actions}</div> : null}
      </header>
      <div className="page-shell-content py-8">{children}</div>
    </div>
  );
}
