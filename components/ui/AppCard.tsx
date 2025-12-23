"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { useTranslation } from "@/lib/i18n";

interface AppCardProps {
  name: string;
  tagline: { tr: string; en: string };
  href: string;
  iconPath: string;
  chips: { tr: string; en: string }[];
  targetAudience: { tr: string; en: string }[];
  webUrl?: string;
  storeLinks?: {
    ios?: string;
    android?: string;
  };
}

export function AppCard({
  name,
  tagline,
  href,
  iconPath,
  chips,
  targetAudience,
  webUrl,
  storeLinks,
}: AppCardProps) {
  const { locale, t } = useTranslation();

  return (
    <motion.article
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative flex flex-col justify-between rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-sm hover:shadow-2xl transition-shadow duration-300 sm:p-8 group h-full"
    >
      <div className="flex-1">
        {/* Header: Icon + Name + Mini Chips */}
        <div className="flex items-start gap-x-4 mb-4">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="relative h-20 w-20 flex-none rounded-3xl bg-gray-50 shadow-sm border border-gray-100 overflow-hidden"
          >
            <Image
              src={iconPath}
              alt={`${name} icon`}
              className="h-full w-full object-cover scale-110"
              width={80}
              height={80}
            />
          </motion.div>
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-black text-2xl text-gray-900 leading-7 mb-1 group-hover:text-blue-600 transition-colors">
              <Link href={href}>
                <span className="absolute inset-0" />
                {name}
              </Link>
            </h3>
            {/* Mini Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2 relative z-10">
              {chips &&
                chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider"
                  >
                    {chip[locale]}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-semibold text-gray-900 mb-3 leading-snug">{tagline[locale]}</p>

        {/* Target Audience */}
        {targetAudience && targetAudience.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="p-0.5 bg-gray-50 rounded-md">
              <Users className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <p className="text-[10px] text-gray-500 font-medium italic">
              {targetAudience
                .slice(0, 3)
                .map((a) => a[locale])
                .join(" • ")}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 w-full relative z-10">
        {/* Store Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert("Mobil uygulamalarımız çok yakında App Store'da!")}
            className="relative flex justify-center transition-all hover:scale-[0.98] group/store cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/10 group-hover/store:bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-[1px] z-20 transition-all border border-black/5">
              <div className="bg-white/90 p-1.5 rounded-full shadow-sm">
                <Lock className="w-3.5 h-3.5 text-gray-500" />
              </div>
            </div>
            <img
              src={locale === "tr" ? "/badges/app-store-tr.png" : "/badges/app-store-en.png"}
              alt="App Store"
              className="h-[40px] w-auto object-contain opacity-80 grayscale-[0.5]"
            />
          </button>
          <button
            onClick={() => alert("Mobil uygulamalarımız çok yakında Google Play'de!")}
            className="relative flex justify-center transition-all hover:scale-[0.98] group/store cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/10 group-hover/store:bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-[1px] z-20 transition-all border border-black/5">
              <div className="bg-white/90 p-1.5 rounded-full shadow-sm">
                <Lock className="w-3.5 h-3.5 text-gray-500" />
              </div>
            </div>
            <img
              src={locale === "tr" ? "/badges/google-play-tr.png" : "/badges/google-play-en.png"}
              alt="Google Play"
              className="h-[40px] w-auto object-contain opacity-80 grayscale-[0.5]"
            />
          </button>
        </div>

        {/* Web App Button */}
        {webUrl && (
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 h-11 rounded-2xl uppercase tracking-tighter"
            >
              💻 Web Version
            </Button>
          </motion.a>
        )}

        {/* Review Button */}
        <Link href={href} className="w-full flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-gray-400 hover:text-primary-600 h-10 group/btn uppercase tracking-tighter"
          >
            {t("home.ctaViewApps")}{" "}
            <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="w-full text-center relative z-10 mt-4 flex flex-col items-center gap-4 border-t border-gray-50 pt-6">
        <div className="flex items-center gap-2 group/power">
          <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]">
            Powered by
          </span>
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="overflow-hidden rounded"
          >
            <Image
              src="/logo.png"
              alt="KF Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-cover scale-125"
            />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
