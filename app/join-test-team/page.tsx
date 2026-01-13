import { Metadata } from "next";
import JoinTestTeamClient from "./JoinTestTeamClient";

export const metadata: Metadata = {
  title: "Test Ekibine Katılın | KF Software Türkiye",
  description:
    "Uygulamalarımızın en yeni özelliklerini herkesten önce deneyimleyin. Geri bildirimlerinizle geliştirmemize yardımcı olmak için test ekibine katılın.",
  alternates: {
    canonical: "https://kfsoftware.app/join-test-team/",
  },
};

export default function JoinTestTeamPage() {
  return <JoinTestTeamClient />;
}
