"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { useTranslation } from "@/lib/i18n";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { t, locale } = useTranslation();

  // Localize category if possible
  const localizedCategory = t(`blog.categories.${post.category}`, { defaultValue: post.category });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 font-bold">
              {locale === "tr" ? "Resim Yok" : "No Image"}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
            {localizedCategory}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} {t("blog.minRead", { defaultValue: "dk" })}
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm group/link hover:gap-3 transition-all"
        >
          {t("blog.readMore")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
