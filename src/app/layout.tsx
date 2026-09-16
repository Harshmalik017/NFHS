import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

// The variable name must match the `--font-sans` custom property consumed by
// globals.css; otherwise Tailwind's font-sans utility resolves to nothing and
// browsers silently fall back to a serif typeface.
const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NFHS Uttar Pradesh Dashboard",
    template: "%s | NFHS Uttar Pradesh",
  },
  description:
    "Explore provisional NFHS-6 health and family welfare indicators for Uttar Pradesh and its 75 districts.",
  applicationName: "NFHS Uttar Pradesh Dashboard",
  keywords: [
    "NFHS-6",
    "Uttar Pradesh",
    "district health data",
    "public health",
    "data dashboard",
  ],
  openGraph: {
    title: "NFHS Uttar Pradesh Dashboard",
    description:
      "An independent analytical dashboard for provisional NFHS-6 district indicators.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <a
              href="#main-content"
              className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:translate-y-0"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
