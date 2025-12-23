"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    content:
      "PuantajX sayesinde şantiyedeki tüm hesap kitap işleri bitti. Artık ay sonunda hakedişleri hesaplamak dakikalar sürüyor.",
    author: "Ahmet Y.",
    role: "Şantiye Şefi",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    app: "PuantajX",
  },
  {
    content:
      "FişMatik ile harcamalarımı görmek beni gereksiz masraflardan kurtardı. OCR özelliği gerçekten hayat kurtarıcı.",
    author: "Zeynep K.",
    role: "Öğretmen",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    app: "FişMatik",
  },
  {
    content:
      "Ekibimdeki 20 kişinin günlük takibini yapmak kabustu. Şimdi mobilden girip hallediyorum. Teşekkürler!",
    author: "Mustafa D.",
    role: "Taşeron Firma Sahibi",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    app: "PuantajX",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Binlerce mutlu kullanıcı işini ve bütçesini bizimle yönetiyor.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
            >
              <div>
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-blue-100 mb-4" />
                <p className="text-gray-700 leading-relaxed font-medium mb-8">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-x-4 border-t border-gray-50 pt-6">
                <Image
                  className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} •{" "}
                    <span className="text-blue-600 font-semibold">{testimonial.app}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
