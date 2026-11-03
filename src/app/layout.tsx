
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ToastProvider from "@/app/components/ToastProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BookNook | Borrow, Share & Discover Books",
  description:
    "BookNook is a community library where readers add, borrow and return books.",
};

const themeScript = `
  try {
    var t = localStorage.getItem("booknook-theme");

    if (!t) {
      t = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "booknook-dark"
        : "booknook";
    }

    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="booknook"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`flex min-h-screen flex-col antialiased ${fraunces.variable} ${inter.variable}`}
      >
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        <Suspense
          fallback={
            <header
              className="sticky top-0 z-50 h-16 border-b border-base-300 bg-base-100/90"
              aria-hidden="true"
            />
          }
        >
          <Navbar />
        </Suspense>

        <main className="flex-1">{children}</main>

        <Footer />

        <ToastProvider />
      </body>
    </html>
  );
}
