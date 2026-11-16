import type { Metadata } from "next";
import { Inter, Averia_Serif_Libre } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Averia_Serif_Libre({
  weight: ["300", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "https://coalglobalenergy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    template: "%s | PT Coal Global Energy",
  },
  description:
    "PT Coal Global Energy provides high-capacity strategic coal stockpiling, port logistics, and multi-commodity industrial energy supply services in Bojonegara, Banten, Indonesia.",
  applicationName: "PT Coal Global Energy",
  authors: [{ name: "PT Coal Global Energy", url: siteUrl }],
  creator: "PT Coal Global Energy",
  publisher: "PT Coal Global Energy",
  category: "Energy & Mining Logistics",
  keywords: [
    "coal stockpile",
    "PT Coal Global Energy",
    "coal stockpiling Bojonegara",
    "port logistics Banten",
    "industrial energy supply",
    "coal supplier Indonesia",
    "palm kernel shell",
    "biomass wood chips",
    "split stone aggregate",
    "coal trading and distribution",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: siteUrl,
    siteName: "PT Coal Global Energy",
    title:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    description:
      "Strategic coal stockpiling, port logistics, and multi-commodity industrial energy supply services in Bojonegara, Banten, Indonesia.",
    images: [
      {
        url: "/images/landing/hero.png",
        width: 1200,
        height: 630,
        alt: "PT Coal Global Energy - Industrial Stockpile and Port Distribution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    description:
      "Strategic coal stockpiling, port logistics, and multi-commodity industrial energy supply services in Bojonegara, Banten, Indonesia.",
    images: ["/images/landing/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/company-logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/company-logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
