import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Rally Pro — Daily Gut Health System",
    template: "%s | Rally Pro",
  },
  description:
    "A daily gut-health system pairing prebiotic sunroot fiber, multi-strain probiotics, and digestive support — structured for transparency and daily consistency.",
  metadataBase: new URL("https://rallypro.com"),
  openGraph: {
    type: "website",
    siteName: "Rally Pro",
    title: "Rally Pro — Daily Gut Health System",
    description:
      "Prebiotic fiber, multi-strain probiotics, digestive support — built for adults who read the label.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rally Pro — Daily Gut Health System",
    description:
      "A structured daily gut-health supplement system. Third-party tested, subscription-first, transparent by default.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={organizationJsonLd} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
