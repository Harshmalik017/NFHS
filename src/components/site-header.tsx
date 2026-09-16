"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "All Districts" },
  { href: "/reports", label: "Reports" },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return navigation.map((item) => {
    const active =
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`);

    const link = (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          mobile && "w-full py-3 text-base",
          mobile
            ? active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
            : active
              ? "bg-white/20 text-white"
              : "text-primary-foreground/85 hover:bg-white/12 hover:text-white",
        )}
      >
        {item.label}
      </Link>
    );

    return mobile ? (
      <SheetClose key={item.href} nativeButton={false} render={link} />
    ) : (
      link
    );
  });
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-primary text-primary-foreground backdrop-blur-xl print:hidden">
      <div className="page-container flex h-16 items-center gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-primary-foreground"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
            <BarChart3 className="size-5" aria-hidden="true" />
          </span>
          <span className="truncate">
            NFHS Uttar Pradesh
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          <NavigationLinks />
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/12 hover:text-white lg:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="border-b">
                <SheetTitle>NFHS Uttar Pradesh</SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4"
              >
                <NavigationLinks mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
