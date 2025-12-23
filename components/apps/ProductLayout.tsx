"use client";

import Image from "next/image";
import Link from "next/link";
import { AppContent } from "@/lib/content";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Check,
  Download,
  Smartphone,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileText,
  Monitor,
  X,
  ZoomIn,
  HelpCircle,
  Lock,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { useTranslation } from "@/lib/i18n";
import PricingTable from "./PricingTable";

interface ProductLayoutProps {
  content: AppContent;
}

export default function ProductLayout({ content }: ProductLayoutProps) {
  const { locale, t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollScreenshots = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  const brandColor = content.colors.accent;
  const brandBg = content.colors.primary;
  const softBg = content.colors.secondary || "bg-gray-50";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b ${content.id === "puantajx" ? "from-blue-50/80 to-transparent" : "from-purple-50/80 to-transparent"} -z-10`}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 mb-8 ring-1 ring-gray-900/5 overflow-hidden w-24 h-24 sm:w-28 sm:h-28"
          >
            <Image
              src={`/apps/${content.id}/logo.png`}
              alt={`${content.name[locale]} Icon`}
              fill
              className={`object-cover ${content.logoScale || ""}`}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-gray-900 sm:text-7xl mb-4"
          >
            {content.name[locale]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold text-gray-800 max-w-2xl mx-auto leading-tight"
          >
            {content.tagline[locale]}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto"
          >
            {content.description[locale]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-10 text-sm text-gray-500 border-y border-gray-100/50 py-6 w-full max-w-4xl"
          >
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                <Smartphone className={`h-5 w-5 ${brandColor}`} />
              </div>
              <span className="font-semibold">{content.quickStats.platforms.join(" • ")}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                <CreditCard className={`h-5 w-5 ${brandColor}`} />
              </div>
              <span className="font-semibold">{content.quickStats.price[locale]}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className={`h-5 w-5 ${brandColor}`} />
              </div>
              <span className="font-semibold">
                {t("product.update")}: {content.quickStats.lastUpdate[locale]}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            {content.storeLinks?.web && (
              content.id === "puantajx" ? (
                <div
                  className="relative w-full sm:w-auto group cursor-not-allowed"
                  onClick={() => alert(`${content.name[locale]} Web sürümü şu an güncelleniyor. Çok yakında yeni arayüzüyle yayında olacak! 🚀`)}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold border-gray-200 shadow-sm gap-2 opacity-60 grayscale cursor-not-allowed pointer-events-none"
                  >
                    <Monitor className="h-5 w-5" /> {t("common.webApp")}
                  </Button>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/10 rounded-2xl">
                    <div className="bg-black/80 p-2 rounded-full text-white shadow-sm border border-white/10 backdrop-blur-md">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  href={content.storeLinks.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold border-gray-200 hover:bg-gray-50 shadow-sm gap-2"
                  >
                    <Monitor className="h-5 w-5" /> {t("common.webApp")}
                  </Button>
                </a>
              )
            )}

            <div className="relative w-full sm:w-auto group cursor-pointer" onClick={() => alert("Mobil uygulamalarımız çok yakında App Store ve Google Play'de! 🚀")}>
              <Button
                size="lg"
                className={`${brandBg} text-white hover:opacity-90 shadow-2xl shadow-blue-500/20 w-full sm:w-auto px-10 h-14 rounded-2xl font-black text-lg gap-3 opacity-75 grayscale cursor-pointer pointer-events-none`}
              >
                <Download className="h-6 w-6" />
                {t("product.downloadBeta")}
              </Button>
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl group-hover:bg-black/5 transition-colors">
                <div className="bg-black/20 p-2 rounded-full text-white/90 shadow-sm border border-white/20 backdrop-blur-md relative top-0 group-hover:scale-110 transition-transform">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Screenshots Gallery */}
      <div className={`py-20 sm:py-32 ${softBg} border-y border-gray-100 overflow-hidden`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                {t("product.userExperience")}
              </h2>
              <p className="text-gray-500 mt-2">{t("product.userExperienceDesc")}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollScreenshots("left")}
                className="h-12 w-12 p-0 rounded-2xl bg-white border-gray-200 hover:border-gray-900 shadow-sm transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollScreenshots("right")}
                className="h-12 w-12 p-0 rounded-2xl bg-white border-gray-200 hover:border-gray-900 shadow-sm transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar group/carousel"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {content.screenshots?.map((src, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="snap-center shrink-0 w-[280px] sm:w-[320px] flex flex-col cursor-zoom-in"
                onClick={() => setSelectedImage(src)}
              >
                <div className="relative w-full aspect-[9/19.5] group/img transition-transform duration-500 hover:scale-[1.02]">
                  <DeviceFrame
                    src={src}
                    alt={`${content.name[locale]} Screenshot ${index + 1}`}
                    className="w-full h-full"
                  />
                  {/* Overlay for Zoom Icon */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full text-white transform scale-90 group-hover/img:scale-100 transition-transform">
                      <ZoomIn className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors z-30"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-7 w-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-[450px] aspect-[9/19.5] mx-auto rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Screenshot"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Modal - Updated with Locales */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>

              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl ${brandBg} mb-4`}>
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {t("product.downloadApp")}
                </h3>
                <p className="text-gray-600">
                  {t("product.downloadDesc").replace("{name}", content.name[locale])}
                </p>
              </div>

              <div className="space-y-3">
                {content.storeLinks?.ios && (
                  <a
                    href={content.storeLinks.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-black text-white rounded-2xl p-4 hover:bg-gray-800 transition-colors group"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-75">{t("product.downloadBeta")}</div>
                      <div className="font-bold">App Store</div>
                    </div>
                  </a>
                )}

                {content.storeLinks?.android && (
                  <a
                    href={content.storeLinks.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-black text-white rounded-2xl p-4 hover:bg-gray-800 transition-colors group"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-75">{t("product.downloadBeta")}</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gray-50 border border-gray-100 mb-6 ${brandColor}`}
              >
                {t("product.highlights")}
              </span>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-8">
                {t("product.whyApp").replace("{name}", content.name[locale])}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                {content.description[locale]}
              </p>
              <dl className="space-y-6">
                {content.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-12 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:border-gray-200 transition-all shadow-sm"
                  >
                    <dt className="font-bold text-gray-900">
                      <div
                        className={`absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center ${brandBg} text-white`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      {highlight[locale]}
                    </dt>
                  </motion.div>
                ))}
              </dl>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-8 sm:p-12 border border-gray-100 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[120px] opacity-20 transition-opacity group-hover:opacity-40" />
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <span className="h-2 w-8 bg-blue-500 rounded-full" />
                {t("product.allFeatures")}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {content.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm group/feature hover:bg-white/10 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-white/5 text-2xl border border-white/10 shadow-inner group-hover/feature:scale-110 transition-transform">
                      {feature.emoji}
                    </div>
                    <div>
                      <span className="text-base font-bold text-white block">
                        {feature.title[locale].split(":")[0]}
                      </span>
                      <span className="text-sm text-gray-400 font-medium">
                        {feature.title[locale].split(":")[1] || ""}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Table Section - FişMatik Specific */}
      {content.id === "fismatik" && <PricingTable />}

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
        <div className={`py-24 sm:py-32 ${softBg} border-y border-gray-100`}>
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl mb-4 flex items-center justify-center gap-3">
                <HelpCircle className={`h-8 w-8 ${brandColor}`} />
                {t("product.faqs")}
              </h2>
              <p className="text-gray-600">
                {t("product.faqsDesc").replace("{name}", content.name[locale])}
              </p>
            </div>
            <FAQAccordion
              items={content.faqs.map((f) => ({
                question: f.question[locale],
                answer: f.answer[locale],
              }))}
            />
          </div>
        </div>
      )}

      {/* Support CTA */}
      <div className="pb-24 sm:pb-32 px-6">
        <div className="mx-auto max-w-5xl bg-gradient-to-r from-sky-400 to-blue-500 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl shadow-sky-500/20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              {t("product.anyQuestions")}
            </h2>
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              {t("product.anyQuestionsDesc")}
            </p>
            <Link href={`/support?app=${content.id}`}>
              <Button
                size="lg"
                className="bg-white text-sky-600 hover:bg-sky-50 px-12 h-14 rounded-2xl font-black text-lg shadow-xl uppercase tracking-wider"
              >
                {t("product.createSupportTicket")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
