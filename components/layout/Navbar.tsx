"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Layout,
  LifeBuoy,
  Info,
  UserPlus,
  Newspaper,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useTranslation();

  const menuItems = [
    { name: t("common.apps"), href: "/apps", icon: <Layout className="w-5 h-5" /> },
    { name: t("common.support"), href: "/support", icon: <LifeBuoy className="w-5 h-5" /> },
    { name: t("common.blog"), href: "/blog", icon: <Newspaper className="w-5 h-5" /> },
    { name: t("common.about"), href: "/about", icon: <Info className="w-5 h-5" /> },
    {
      name: "Test Ekibi",
      href: "/join-test-team",
      icon: <UserPlus className="w-5 h-5" />,
      highlight: true,
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 fixed w-full top-0 shadow-sm z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <div className="relative h-20 w-[240px] flex items-center overflow-hidden">
                  <img
                    src="/logo-horizontal.png"
                    alt="KF Software Logo"
                    className="h-full w-full object-contain object-left"
                    style={{ transform: "scale(1.4)", transformOrigin: "left center" }}
                  />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex sm:space-x-8 items-center">
              <Link
                href="/apps"
                className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {t("common.apps")}
              </Link>
              <Link
                href="/support"
                className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {t("common.support")}
              </Link>
              <Link
                href="/blog"
                className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {t("common.blog")}
              </Link>
              <Link
                href="/about"
                className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {t("common.about")}
              </Link>

              <Link
                href="/join-test-team"
                className="flex items-center text-xs font-black text-white bg-gray-900 px-12 py-2.5 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-100 uppercase tracking-widest ml-6"
              >
                Test Ekibi
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center bg-gray-50 p-1 rounded-xl gap-1 ml-4 border border-gray-100">
                <button
                  onClick={() => setLocale("tr")}
                  className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all ${locale === "tr" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  TR
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all ${locale === "en" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden gap-4">
              {/* Mobile Language Switcher */}
              <button
                onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl text-xs font-black text-gray-600 border border-gray-100"
              >
                <Globe className="w-4 h-4 text-gray-400" />
                {locale.toUpperCase()}
              </button>

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Menüyü aç"
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col lg:hidden"
          >
            <div className="px-6 py-6 flex justify-between items-center border-b border-gray-50">
              <div className="relative h-12 w-48">
                <Image
                  src="/logo-horizontal.png"
                  alt="KF Software Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12">
              <div className="space-y-4">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={`flex items-center justify-between p-5 rounded-3xl group ${item.highlight ? "bg-gray-900 text-white shadow-xl shadow-gray-200" : "bg-gray-50 text-gray-900 hover:bg-gray-100"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2.5 rounded-2xl ${item.highlight ? "bg-white/10" : "bg-white shadow-sm"}`}
                        >
                          {item.icon}
                        </div>
                        <span className="text-xl font-black tracking-tight uppercase">
                          {item.name}
                        </span>
                      </div>
                      <ArrowRight
                        className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${item.highlight ? "text-white/50" : "text-gray-300"}`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="px-8 pb-12 pt-6 border-t border-gray-50 text-center">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                KFSOFTWARE © 2024
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/privacy"
                  onClick={toggleMenu}
                  className="text-xs font-semibold text-gray-500"
                >
                  {t("common.privacy")}
                </Link>
                <span className="text-gray-200">•</span>
                <Link
                  href="/terms"
                  onClick={toggleMenu}
                  className="text-xs font-semibold text-gray-500"
                >
                  {t("common.terms")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
