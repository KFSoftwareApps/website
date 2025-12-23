import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | KF Software Türkiye",
  description:
    "Yazılım dünyasından güncel haberler, teknoloji incelemeleri, rehberler ve KF Software ürün güncellemeleri.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | KF Software Türkiye",
    description:
      "Yazılım dünyasından güncel haberler, teknoloji incelemeleri, rehberler ve KF Software ürün güncellemeleri.",
    url: "https://kfsoftware.app/blog",
    publisher: {
      "@type": "Organization",
      name: "KF Software Türkiye",
      logo: {
        "@type": "ImageObject",
        url: "https://kfsoftware.app/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
