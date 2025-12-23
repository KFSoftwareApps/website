import { appsContent } from "@/lib/content";
import ProductLayout from "@/components/apps/ProductLayout";
import { Metadata } from "next";

const content = appsContent.puantajx;

export const metadata: Metadata = {
  title: content ? `${content.name} - Şantiye ve Personel Takip Sistemi` : "PuantajX",
  description: content?.description.tr || "PuantajX ile şantiyenizi yönetin.",
  openGraph: {
    title: content ? `${content.name} - Şantiye Yönetimi Cebinizde` : "PuantajX",
    description: content?.description.tr || "PuantajX ile şantiyenizi yönetin.",
    images: [`/apps/puantajx/screenshots/1.png`],
  },
  icons: {
    icon: "/apps/puantajx/logo.png",
    apple: "/apps/puantajx/logo.png",
  },
  alternates: {
    canonical: "/apps/puantajx",
  },
};

export default function PuantajXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PuantajX",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "TRY",
            },
            description: "Şantiye ve personel yönetimini kolaylaştıran mobil uygulama.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "120",
            },
          }),
        }}
      />
      <ProductLayout content={appsContent.puantajx} />
    </>
  );
}
