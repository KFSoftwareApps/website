import { Metadata } from "next";
import BrandingClient from "./BrandingClient";

export const metadata: Metadata = {
  title: "Basın Kiti & Marka Varlıkları | KF Software Türkiye",
  description:
    "KF Software markasına ait resmi logolar, renk paleti ve kullanım kılavuzuna buradan ulaşabilirsiniz. Basın kiti ve görsel materyaller.",
  alternates: {
    canonical: "https://kfsoftware.app/branding/",
  },
};

export default function BrandingPage() {
  return <BrandingClient />;
}
