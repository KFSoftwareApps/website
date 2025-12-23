"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage after mount
    const consent = localStorage.getItem("cookie_consent");
    // If no consent found (null), show banner
    if (consent === null) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 ring-1 ring-gray-900/5">
            <div className="flex-shrink-0 bg-blue-50 p-3 rounded-2xl">
              <Cookie className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Çerez Tercihleri</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Deneyiminizi iyileştirmek ve site trafiğini analiz etmek için çerezleri
                kullanıyoruz. Detaylı bilgi için{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Gizlilik Politikamızı
                </Link>{" "}
                inceleyebilirsiniz.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <Button
                variant="ghost"
                onClick={handleDecline}
                className="flex-1 md:flex-none text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                Reddet
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-gray-900 text-white hover:bg-black px-8 py-3 rounded-xl font-bold shadow-lg"
              >
                Kabul Et
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
