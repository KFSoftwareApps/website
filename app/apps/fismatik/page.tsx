import ProductLayout from "@/components/apps/ProductLayout";
import { appsContent } from "@/lib/content";
import { Metadata } from "next";

const content = appsContent.fismatik;

export const metadata: Metadata = {
  title: content ? `${content.name} - Akıllı Bütçe ve Gider Takibi` : "FişMatik",
  description: content?.description.tr || "FişMatik ile bütçenizi yönetin.",
  openGraph: {
    title: content ? `${content.name} - Harcamalarınızı Kontrol Altına Alın` : "FişMatik",
    description: content?.description.tr || "FişMatik ile bütçenizi yönetin.",
    images: [`/apps/fismatik/screenshots/1.png`],
  },
  icons: {
    icon: "/apps/fismatik/logo.png",
    apple: "/apps/fismatik/logo.png",
  },
  alternates: {
    canonical: "/apps/fismatik",
  },
};

export default function FisMatikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "FişMatik",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "TRY",
            },
            description: "Fiş okuma ve bütçe takip asistanınız.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "85",
            },
          }),
        }}
      />
      <ProductLayout content={appsContent.fismatik} />
    </>
  );
}
