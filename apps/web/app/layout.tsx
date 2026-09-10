import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nabilla Zachra — Product & Experience Designer",
    template: "%s — Nabilla Zachra",
  },
  description:
    "Nabilla Zachra is a Product & Experience Designer working across research, product thinking, and interface craft.",
  openGraph: {
    title: "Nabilla Zachra — Product & Experience Designer",
    description:
      "Research, product thinking, and interface craft—grounded in technical understanding.",
    type: "website",
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f1eee5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
