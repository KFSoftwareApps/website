import { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Destek ve Yardım | KF Software Türkiye",
  description:
    "PuantajX ve FişMatik uygulamalarımızla ilgili sorunlarınızı ve önerilerinizi bize iletin. Size yardımcı olmaktan mutluluk duyarız.",
  alternates: {
    canonical: "https://kfsoftware.app/support",
  },
};

export default function SupportPage() {
  return <SupportClient />;
}
