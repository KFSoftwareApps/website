import { Metadata } from "next";
import AppsClient from "./AppsClient";

export const metadata: Metadata = {
  title: "Tüm Uygulamalar | KF Software Türkiye",
  description:
    "Şantiye yönetiminden kişisel finansa, işletmeniz ve hayatınız için geliştirdiğimiz tüm yazılım çözümlerini keşfedin.",
  alternates: {
    canonical: "https://kfsoftware.app/apps/",
  },
};

export default function AppsPage() {
  return <AppsClient />;
}
