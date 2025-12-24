import { appsContent } from "@/lib/content";
import ProductLayout from "@/components/apps/ProductLayout";
import { Metadata } from "next";

const content = appsContent.puantajx;

export const metadata: Metadata = {
  title: "PuantajX | Şantiye Puantaj ve Personel Takip Programı",
  description:
    "Şantiye puantaj takibi artık cebinizde. İnşaat personel yönetimi, günlük raporlama ve hakediş hesabı için en iyi puantaj uygulaması.",
  keywords: [
    "puantaj",
    "şantiye takip",
    "inşaat personel",
    "hakediş programı",
    "günlük rapor",
    "mobil puantaj",
    "işçi takibi",
    "inşaat yazılımı",
  ],
  openGraph: {
    title: "PuantajX | Şantiye Puantaj ve Personel Takip Programı",
    description:
      "Şantiye puantaj takibi artık cebinizde. İnşaat personel yönetimi, günlük raporlama ve hakediş hesabı için en iyi puantaj uygulaması.",
    images: [`/apps/puantajx/screenshots/1-v5.png`],
    type: "website",
    locale: "tr_TR",
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
            description:
              "Şantiye ve personel yönetimini kolaylaştıran, hakediş hesaplayan mobil puantaj uygulaması.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "120",
            },
            featureList: [
              "Online Puantaj",
              "Günlük Şantiye Raporu",
              "İnşaat Hakediş Hesaplama",
              "Ekip Yönetimi",
              "PDF/Excel Dışa Aktarım",
            ],
            screenshot: "https://kfsoftware.app/apps/puantajx/screenshots/1-v5.png",
          }),
        }}
      />
      <ProductLayout content={appsContent.puantajx} />
    </>
  );
}
