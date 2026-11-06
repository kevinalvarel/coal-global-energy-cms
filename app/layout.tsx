// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarLanding } from "@/components/layouts/NavbarLanding";
import { Footer } from "@/components/layouts/Footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PT Coal Global Energy",
  description:
    "PT. Coal Global Energy menyediakan layanan penyimpanan sementara (stockpile) berkapasitas besar di jalur distribusi pelabuhan Bojonegara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        <NavbarLanding />
        {children}
        <Footer />
      </body>
    </html>
  );
}
