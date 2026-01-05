import { Metadata } from "next";
import TermsClient from "../TermsClient";
import { notFound } from "next/navigation";

interface Props {
    params: {
        lang: string;
    };
}

export async function generateStaticParams() {
    return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === "en";
    return {
        title: isEn ? "Terms of Service | KF Software" : "Kullanım Şartları | KF Software Türkiye",
        description: isEn
            ? "Terms of service and service agreement for our PuantajX and FişMatik applications."
            : "PuantajX ve FişMatik uygulamalarımızın kullanım koşulları ve hizmet sözleşmesi.",
        alternates: {
            canonical: `https://kfsoftware.app/terms/${lang}`,
        },
    };
}

export default async function TermsLanguagePage({ params }: Props) {
    const { lang } = await params;

    if (lang !== "tr" && lang !== "en") {
        notFound();
    }

    return <TermsClient initialLang={lang as "tr" | "en"} />;
}
