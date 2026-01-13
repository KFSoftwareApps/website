import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Hakkımızda | KF Software Türkiye",
  description:
    "KF Software, karmaşıklığı sadeleştiren yazılım çözümleri üretir. Hız, güvenilirlik ve kullanıcı deneyimi odaklı yaklaşımımızla tanışın.",
  alternates: {
    canonical: "https://kfsoftware.app/about/",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
