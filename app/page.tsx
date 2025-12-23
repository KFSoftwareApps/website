import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "KF Software Türkiye | Şantiye & Bütçe Yönetim Yazılımları",
  description:
    "PuantajX ve FişMatik ile iş süreçlerinizi dijitalleştirin. Şantiye yönetimi, personel takibi ve kişisel bütçe kontrolü için yerli çözümler.",
  alternates: {
    canonical: "https://kfsoftware.app/",
  },
};

export default function Home() {
  return <HomeClient />;
}
