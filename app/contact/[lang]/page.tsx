import { locales } from "@/lib/constants";
import ContactClient from "../ContactClient";
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
        title: isEn ? "Contact Us | KF Software" : "İletişim | KF Software Türkiye",
        description: isEn
            ? "Contact us. We are here for your projects, support requests, or collaborations."
            : "Bizimle iletişime geçin. Projeleriniz, destek talepleriniz veya iş birlikleri için buradayız.",
        alternates: {
            canonical: `https://kfsoftware.app/contact/${lang}/`,
        },
    };
}

export default async function ContactLanguagePage({ params }: Props) {
    const { lang } = await params;
    return <ContactClient initialLang={lang} />;
}
