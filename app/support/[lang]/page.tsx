import { locales } from "@/lib/constants";
import SupportClient from "../SupportClient";
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
        title: isEn ? "Support & Help | KF Software" : "Destek ve Yardım | KF Software Türkiye",
        description: isEn
            ? "Submit your support requests or suggestions about PuantajX and FişMatik. We are happy to help you."
            : "PuantajX ve FişMatik uygulamalarımızla ilgili sorunlarınızı ve önerilerinizi bize iletin. Size yardımcı olmaktan mutluluk duyarız.",
        alternates: {
            canonical: `https://kfsoftware.app/support/${lang}/`,
        },
    };
}

export default async function SupportLanguagePage({ params }: Props) {
    const { lang } = await params;
    return <SupportClient initialLang={lang} />;
}
