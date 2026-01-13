import { locales } from "@/lib/constants";
import AboutClient from "../AboutClient";
import { Metadata } from "next";

interface Props {
    params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
    return locales.map((lang) => ({
        lang,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === "en";

    return {
        title: isEn ? "About Us | KF Software" : "Hakkımızda | KF Software Türkiye",
        description: isEn
            ? "KF Software creates software solutions that simplify complexity. Meet our approach focused on speed, reliability, and user experience."
            : "KF Software, karmaşıklığı sadeleştiren yazılım çözümleri üretir. Hız, güvenilirlik ve kullanıcı deneyimi odaklı yaklaşımımızla tanışın.",
        alternates: {
            canonical: `https://kfsoftware.app/about/${lang}/`,
        },
    };
}

export default async function AboutLanguagePage({ params }: Props) {
    const { lang } = await params;
    return <AboutClient initialLang={lang} />;
}
