"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const logos = [
    {
        id: "primary",
        name: "Primary Icon (Genel Kullanım)",
        path: "/logo.png",
        description:
            "Markanın ana yüzü. Favicon, sosyal medya profilleri ve uygulama ikonları için birincil tercih.",
        bg: "bg-gray-50",
        usage: "Açık zeminlerde ve kare alanlarda kullanılır.",
    },
    {
        id: "accent",
        name: "Accent Icon (Vurgu)",
        path: "/logo-accent.png",
        description: "Dikkat çekilmesi gereken kampanya, banner ve özel butonlarda kullanılır.",
        bg: "bg-purple-50",
        usage: "Marka rengini (Mor/Indigo) öne çıkarmak için idealdir.",
    },
    {
        id: "horizontal",
        name: "Horizontal Logo (Resmi)",
        path: "/logo-horizontal.png",
        description:
            "İkon ve kelime işaretinin birleşimi. Navbar, döküman başlıkları ve resmi sunumlar için.",
        bg: "bg-white",
        usage: "Geniş yatay alanlarda ve kurumsal başlıklarda kullanılır.",
    },
    {
        id: "monochrome-black",
        name: "Monochrome Black",
        path: "/logo-monochrome.png",
        description: "Siyah-beyaz baskı, kaşe ve damga tarzı teknik işler için yedek versiyon.",
        bg: "bg-white border-dashed",
        usage: "Renk zorunluluğu olmayan veya b&w yazıcı çıktıları için.",
    },
    {
        id: "monochrome-white",
        name: "Monochrome White",
        path: "/logo-white.png",
        description: "Koyu zeminler (siyah, lacivert) ve video üzerine watermark kullanımı için.",
        bg: "bg-gray-900 border-none",
        usage: "Sadece koyu arka planlarda kullanılır, açık zeminde görünmez.",
    },
    {
        id: "pill-badge",
        name: "Pill Badge (UI Element)",
        path: "/logo-pill.png",
        description:
            "Mobil tag'ler, download bar'ları ve e-posta imzaları için tasarlanmış UI bileşeni.",
        bg: "bg-gray-100",
        usage: "Logo olarak değil, bir 'etiket' veya 'buton' hissi veren alanlarda limitli kullanılır.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function BrandingClient() {
    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 sm:pt-32 bg-gray-50 border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center uppercase tracking-tighter">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4">
                            MARKA KİMLİĞİ REHBERİ
                        </span>
                        <h1 className="text-4xl font-black text-gray-900 sm:text-6xl mb-6">
                            Basın Kiti & Logo Paketi
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto normal-case tracking-normal">
                            KF Software görsel kimliği; sadelik, güç ve netlik üzerine kuruludur. Burada
                            markamızın resmi varlıklarını ve doğru kullanım standartlarını bulabilirsiniz.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 mt:sm-24">
                {/* Guidelines Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {logos.map((logo) => (
                        <motion.div
                            key={logo.id}
                            variants={itemVariants}
                            className="flex flex-col rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Logo Display Area */}
                            <div
                                className={`h-48 ${logo.bg} flex items-center justify-center p-8 relative overflow-hidden transition-colors`}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white/20 transition-opacity" />
                                <div className="relative w-full h-full">
                                    <Image src={logo.path} alt={logo.name} fill className="object-contain" />
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{logo.name}</h3>
                                <p className="text-sm text-gray-500 mb-4 flex-1">{logo.description}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 p-2 rounded-lg leading-relaxed">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        <span>{logo.usage}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex gap-3">
                                    <a href={logo.path} download className="flex-1">
                                        <Button variant="outline" className="w-full text-xs h-10 gap-2 border-gray-200">
                                            <Download className="h-4 w-4" /> İndir (PNG)
                                        </Button>
                                    </a>
                                    <Button
                                        variant="ghost"
                                        className="h-10 w-10 p-0 rounded-xl"
                                        title="Kullanım Detayları"
                                    >
                                        <Info className="h-5 w-5 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Brand Colors Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 sm:p-12 rounded-[3rem] bg-gray-900 text-white overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[120px] opacity-20 -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 blur-[120px] opacity-20 -ml-32 -mb-32" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-6">Renk Paleti</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                KF Software'in renk dünyası, kurumsal güveni temsil eden Mavi ve yaratıcı enerjimizi
                                simgeleyen Mor tonları üzerine inşa edilmiştir.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-blue-500/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20" />
                                    <div>
                                        <div className="text-sm font-bold">KF Blue (Primary)</div>
                                        <div className="text-xs text-gray-500 font-mono">
                                            HEX: #2563eb | RGB: 37, 99, 235
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-purple-500/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-[#7c3aed] shadow-lg shadow-purple-500/20" />
                                    <div>
                                        <div className="text-sm font-bold">KF Purple (Accent)</div>
                                        <div className="text-xs text-gray-500 font-mono">
                                            HEX: #7c3aed | RGB: 124, 58, 237
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                            <h4 className="text-amber-400 flex items-center gap-2 font-bold mb-4 uppercase text-xs tracking-widest">
                                <AlertCircle className="h-4 w-4" /> Önemli Not
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                "Logo varlıkları üzerinde izinsiz renk değişikliği, döndürme veya yeniden
                                boyutlandırma yapılmamalıdır. Kurumsal bütünlüğün korunması için sadece sunulan
                                varyasyonları kullanınız."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
