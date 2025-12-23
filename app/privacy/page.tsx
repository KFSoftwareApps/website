import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | KF Software Türkiye",
  description:
    "Kişisel verilerinizin güvenliği bizim için önemli. KF Software olarak şeffaf ve güvenilir bir veri politikası izliyoruz.",
  alternates: {
    canonical: "https://kfsoftware.app/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
