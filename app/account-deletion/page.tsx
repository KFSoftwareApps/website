import { Metadata } from "next";
import AccountDeletionClient from "./AccountDeletionClient";

export const metadata: Metadata = {
  title: "Hesap Silme Talebi | KF Software Türkiye",
  description:
    "PuantajX veya FişMatik hesabınızı ve verilerinizi silmek için bu formu kullanabilirsiniz. Talebiniz en kısa sürede işleme alınacaktır.",
  alternates: {
    canonical: "https://kfsoftware.app/account-deletion/",
  },
};

export default function AccountDeletionPage() {
  return <AccountDeletionClient />;
}
