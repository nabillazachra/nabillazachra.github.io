import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionObserver } from "@/components/motion-observer";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nabilla Zachra — Technical Consultant & Product Designer",
    template: "%s — Nabilla Zachra",
  },
  description:
    "Nabilla Zachra is a Technical Consultant and Product Designer working across business requirements, system analysis, user experience, and interface design.",
  openGraph: {
    title: "Nabilla Zachra — Product & Experience Designer",
    description:
      "Business requirements, system analysis, product thinking, and user experience—connected through technical understanding.",
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
        <MotionObserver />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
