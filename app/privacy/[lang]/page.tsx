import { Metadata } from "next";
import PrivacyClient from "../PrivacyClient";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

import { locales } from "@/lib/constants";

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === "en";
    return {
        title: isEn ? "Privacy Policy | KF Software" : "Gizlilik Politikası | KF Software Türkiye",
        description: isEn
            ? "Privacy policy and data protection for our PuantajX and FişMatik applications."
            : "PuantajX ve FişMatik uygulamalarımızın gizlilik politikası ve veri güvenliği bilgilendirmesi.",
        alternates: {
            canonical: `https://kfsoftware.app/privacy/${lang}/`,
        },
    };
}

export default async function PrivacyLanguagePage({ params }: Props) {
    const { lang } = await params;

    if (lang !== "tr" && lang !== "en") {
        notFound();
    }

    return <PrivacyClient initialLang={lang as "tr" | "en"} />;
}
