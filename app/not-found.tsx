"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Home, MessageSquare, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-9xl font-black text-gray-100 select-none"
            >
              404
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 bg-blue-600/10 rounded-full flex items-center justify-center blur-xl backdrop-blur-sm"></div>
              <Search className="h-16 w-16 text-blue-600 relative z-10" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Aradığınız sayfa kaybolmuş olabilir... 🧭
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            Görünüşe göre ulaşılamayan bir URL'ye tıkladınız veya sayfa taşınmış. Endişelenmeyin,
            sizi tekrar yola sokabiliriz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2 group"
              >
                <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Ana Sayfaya Dön
              </Button>
            </Link>
            <Link href="/support/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <MessageSquare className="h-5 w-5" />
                Destek Al
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-gray-400 text-sm"
        >
          Hata Kodu: <span className="font-mono">ERR_PAGE_NOT_FOUND</span>
        </motion.div>
      </div>
    </div>
  );
}
