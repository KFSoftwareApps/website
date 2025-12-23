import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Kullanım Şartları | KF Software Türkiye",
  description:
    "PuantajX ve FişMatik uygulamalarımızın kullanım koşulları ve hizmet sözleşmesi. Haklarınız ve yükümlülükleriniz hakkında bilgi edinin.",
  alternates: {
    canonical: "https://kfsoftware.app/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
