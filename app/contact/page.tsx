import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "İletişim | KF Software Türkiye",
  description:
    "Bizimle iletişime geçin. Projeleriniz, destek talepleriniz veya iş birlikleri için buradayız.",
  alternates: {
    canonical: "https://kfsoftware.app/contact/",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
