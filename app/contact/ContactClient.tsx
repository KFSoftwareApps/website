"use client";

import { useEffect } from "react";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function ContactClient({ initialLang }: { initialLang?: string }) {
    const { t, locale, setLocale } = useTranslation();

    useEffect(() => {
        if (initialLang && (initialLang === "tr" || initialLang === "en")) {
            setLocale(initialLang as "tr" | "en");
        }
    }, [initialLang, setLocale]);

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Language Switcher */}
                <div className="flex justify-center mb-12 gap-2">
                    <Link
                        href="/contact/tr/"
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === "tr" ? "bg-blue-600 text-white" : "bg-white text-gray-400 border border-gray-100"
                            }`}
                    >
                        TR
                    </Link>
                    <Link
                        href="/contact/en/"
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === "en" ? "bg-blue-600 text-white" : "bg-white text-gray-400 border border-gray-100"
                            }`}
                    >
                        EN
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        {t("contact.title", { defaultValue: locale === "tr" ? "İletişim" : "Contact" })}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        {t("contact.subtitle", { defaultValue: locale === "tr" ? "Sorularınız, projeleriniz veya sadece merhaba demek için bize ulaşın." : "Reach out to us for your questions, projects, or just to say hello." })}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-blue-600" />
                                {t("contact.email", { defaultValue: locale === "tr" ? "E-posta" : "Email" })}
                            </h3>
                            <p className="text-slate-600 mb-2">{t("contact.emailDesc", { defaultValue: locale === "tr" ? "Genel sorular ve destek için:" : "For general inquiries and support:" })}</p>
                            <a
                                href="mailto:info@kfsoftware.app"
                                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                info@kfsoftware.app
                            </a>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-600" />
                                {t("contact.location", { defaultValue: locale === "tr" ? "Konum" : "Location" })}
                            </h3>
                            <p className="text-slate-600 text-lg">
                                {locale === "tr" ? "İstanbul, Türkiye" : "Istanbul, Turkey"}
                                <br />
                                <span className="text-sm opacity-75">{t("contact.remoteFirst", { defaultValue: locale === "tr" ? "Remote-First Teknoloji Şirketi" : "Remote-First Technology Company" })}</span>
                            </p>
                        </div>
                    </div>

                    {/* Support Card Links */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">{t("contact.needSupport", { defaultValue: locale === "tr" ? "Destek mi lazım?" : "Need Support?" })}</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                {t("contact.supportDesc", { defaultValue: locale === "tr" ? "Mevcut ürünlerimizle ilgili teknik sorunlar veya yardım talepleri için destek sayfamızı kullanın. Size daha hızlı yardımcı olabiliriz." : "Use our support page for technical issues or help requests regarding our existing products. We can help you faster." })}
                            </p>
                        </div>

                        <Link
                            href="/support/"
                            className="inline-flex items-center justify-center px-6 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-gray-100 transition-all w-full md:w-auto"
                        >
                            {t("contact.createTicket", { defaultValue: locale === "tr" ? "Destek Talebi Oluştur" : "Create Support Ticket" })}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
