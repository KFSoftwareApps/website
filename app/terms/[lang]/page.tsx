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
    const isEn = params.lang === "en";
    return {
        title: isEn ? "Terms of Service | KF Software" : "Kullanım Şartları | KF Software Türkiye",
        description: isEn
            ? "Terms of service and service agreement for our PuantajX and FişMatik applications."
            : "PuantajX ve FişMatik uygulamalarımızın kullanım koşulları ve hizmet sözleşmesi.",
        alternates: {
            canonical: `https://kfsoftware.app/terms/${params.lang}`,
        },
    };
}

export default function TermsLanguagePage({ params }: Props) {
    if (params.lang !== "tr" && params.lang !== "en") {
        notFound();
    }

    return <TermsClient initialLang={params.lang as "tr" | "en"} />;
}
