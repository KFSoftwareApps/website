"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
          >
            <span className="font-semibold text-gray-900 leading-tight">{item.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-gray-400"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
