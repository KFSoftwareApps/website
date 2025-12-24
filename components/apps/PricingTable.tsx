"use client";

import { Check, X, Shield, Zap, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

interface PlanFeature {
    name: { tr: string; en: string };
    values: (string | boolean)[];
}

const features: PlanFeature[] = [
    {
        name: { tr: "🛍️ Alışveriş Listesi (YENİ)", en: "🛍️ Shopping List (NEW)" },
        values: ["❌ (Gizli)", "❌ (Gizli)", "✅ (Kişisel)", "✅ (Ortak Liste)"],
    },
    {
        name: { tr: "🧠 Akıllı Ürün Önerisi (YENİ)", en: "🧠 Smart Product Recommendation (NEW)" },
        values: [false, false, true, true],
    },
    {
        name: { tr: "📲 Otomatik SMS Takibi (YENİ)", en: "📲 Automatic SMS Tracking (NEW)" },
        values: ["✅ (Android)", "✅ (Android)", "✅ (Android)", "✅ (Android)"],
    },
    {
        name: { tr: "Günlük Fiş Tarama", en: "Daily Receipt Scanning" },
        values: ["1 fiş/gün", "10 fiş/gün", "25 fiş/gün", "35 fiş/gün"],
    },
    {
        name: { tr: "Aylık Manuel Giriş", en: "Monthly Manual Entry" },
        values: ["20 giriş/ay", "50 giriş/ay", "100 giriş/ay", "200 giriş/ay"],
    },
    {
        name: { tr: "Sınırsız Abonelik Takibi", en: "Unlimited Subscription Tracking" },
        values: [true, true, true, true],
    },
    {
        name: { tr: "Reklamsız Deneyim", en: "Ad-Free Experience" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "Kategori Yönetimi", en: "Category Management" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "AI Finans Koçu", en: "AI Finance Coach" },
        values: [false, false, true, true],
    },
    {
        name: { tr: "Akıllı Bütçe Tahmini", en: "Smart Budget Prediction" },
        values: [false, false, true, true],
    },
    {
        name: { tr: "Akıllı Hatalı Çekim İadesi", en: "Smart Wrong Charge Return" },
        values: [false, false, true, true],
    },
    {
        name: { tr: "Excel/PDF Raporu İndirme", en: "Download Excel/PDF Reports" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "Vergi Raporu", en: "Tax Report" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "Ürün Fiyat Geçmişi", en: "Product Price History" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "En Ucuz Market Önerisi", en: "Cheapest Market Suggestion" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "Fiyat Düşüş Bildirimleri", en: "Price Drop Notifications" },
        values: [false, true, true, true],
    },
    {
        name: { tr: "Aile Paylaşımı (5 kişi)", en: "Family Sharing (5 people)" },
        values: [false, false, false, true],
    },
    {
        name: { tr: "Ortak Harcama Ekranı", en: "Common Spending Screen" },
        values: [false, false, false, true],
    },
];

const plans = [
    {
        name: { tr: "Ücretsiz", en: "Free" },
        price: "0 TL",
        icon: Shield,
        color: "bg-gray-100 text-gray-600",
        buttonText: { tr: "Mevcut Üyeliğiniz", en: "Current Plan" },
        active: true,
    },
    {
        name: { tr: "Standart", en: "Standard" },
        price: "49.99 TL",
        period: { tr: "/ Ay", en: "/ Mo" },
        icon: Zap,
        color: "bg-blue-100 text-blue-600",
        buttonText: { tr: "Abone Ol", en: "Subscribe" },
    },
    {
        name: { tr: "Premium", en: "Premium" },
        price: "79.99 TL",
        period: { tr: "/ Ay", en: "/ Mo" },
        icon: Star,
        color: "bg-purple-100 text-purple-600",
        popular: true,
        buttonText: { tr: "Abone Ol", en: "Subscribe" },
    },
    {
        name: { tr: "Aile Ekonomisi", en: "Family Economy" },
        price: "99.99 TL",
        period: { tr: "/ Ay", en: "/ Mo" },
        icon: Users,
        color: "bg-orange-100 text-orange-600",
        buttonText: { tr: "Abone Ol", en: "Subscribe" },
    },
];

export default function PricingTable() {
    const { locale, t } = useTranslation();

    return (
        <div className="py-24 sm:py-32 bg-gray-50/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h2 className="text-base font-black leading-7 text-purple-600 uppercase tracking-widest">
                        {t("product.pricing") || "Fiyatlandırma"}
                    </h2>
                    <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                        {locale === "tr" ? "Size En Uygun Planı Seçin" : "Choose the Plan That Fits You Best"}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {locale === "tr"
                            ? "İster bireysel harcamalarını takip et, ister aileni bütçe yönetimine dahil et."
                            : "Whether you track individual expenses or involve your family in budget management."}
                    </p>
                </div>

                <div className="mt-16 overflow-x-auto pt-8 pb-4">
                    <div className="min-w-[800px] border-separate border-spacing-0">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 bg-white rounded-t-[2.5rem] border-x border-t border-gray-100 shadow-sm relative overflow-visible">
                            <div className="p-8 flex items-end rounded-tl-[2.5rem]">
                                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                                    {locale === "tr" ? "ÖZELLİKLER" : "FEATURES"}
                                </span>
                            </div>
                            {plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`p-8 text-center flex flex-col items-center border-l border-gray-50 relative ${plan.popular ? "bg-purple-50/30" : ""} ${idx === plans.length - 1 ? "rounded-tr-[2.5rem]" : ""}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                                            {locale === "tr" ? "EN POPÜLER" : "MOST POPULAR"}
                                        </div>
                                    )}
                                    <div className={`p-3 rounded-2xl ${plan.color} mb-4`}>
                                        <plan.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-1">{plan.name[locale]}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-gray-900">{plan.price}</span>
                                        {plan.period && <span className="text-gray-400 text-xs font-bold">{plan.period[locale]}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Table Body */}
                        <div className="bg-white border-x border-b border-gray-100 shadow-sm rounded-b-[2.5rem] overflow-hidden">
                            {features.map((feature, fIdx) => (
                                <div
                                    key={fIdx}
                                    className={`grid grid-cols-5 border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${fIdx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                                >
                                    <div className="p-6 text-sm font-bold text-gray-700 flex items-center">
                                        {feature.name[locale]}
                                    </div>
                                    {feature.values.map((val, vIdx) => (
                                        <div key={vIdx} className="p-6 text-center flex items-center justify-center border-l border-gray-50">
                                            {typeof val === "boolean" ? (
                                                val ? (
                                                    <div className="bg-green-100 p-1 rounded-full">
                                                        <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="bg-red-50 p-1 rounded-full">
                                                        <X className="h-4 w-4 text-red-300" strokeWidth={3} />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-sm font-bold text-gray-600">{val}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-400 font-medium">
                    * {locale === "tr" ? "Fiyatlara KDV dahildir. Abonelikler uygulama mağazaları üzerinden yönetilir." : "Prices include VAT. Subscriptions are managed through app stores."}
                </p>
            </div>
        </div>
    );
}
