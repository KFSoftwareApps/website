import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import TestTeamWidget from "@/components/ui/TestTeamWidget";
import CodeProtection from "@/components/ui/CodeProtection";
import CookieConsent from "@/components/ui/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kfsoftware.app"),
  verification: {
    google: "-Ttozr7lBKFgypxxuG6jzALYSo8pyd1tVGNT5vlkbww",
  },
  title: {
    default: "KF Software Türkiye | Şantiye & Bütçe Yönetim Yazılımları",
    template: "%s | KF Software Türkiye",
  },
  description:
    "KF Software Türkiye ile şantiyenizi PuantajX ile, bütçenizi FişMatik ile yönetin. Yerli yazılım, mobil çözümler ve dijital dönüşüm ortağınız.",
  keywords: [
    "kfs yazılım",
    "kf software türkiye",
    "şantiye yönetimi",
    "puantajx",
    "fişmatik",
    "bütçe takibi",
    "mobil uygulama",
    "inşaat yazılımı",
  ],
  authors: [{ name: "Talha", url: "https://kfsoftware.app" }],
  creator: "KF Software Türkiye",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://kfsoftware.app",
    siteName: "KF Software Türkiye",
    title: "KF Software Türkiye | PuantajX ve FişMatik",
    description: "Şantiye yönetiminden kişisel bütçeye, Türkiye'nin yerli mobil çözümleri.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KF Software Türkiye Uygulamaları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KF Software Türkiye - Mobil Çözümler",
    description: "PuantajX ve FişMatik ile işinizi dijitalleştirin.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KF Software",
  },
};

export const viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-XYZ1234567" />
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <TestTeamWidget />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <CodeProtection />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
