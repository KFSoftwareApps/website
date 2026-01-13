"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { calculateReadingTime } from "@/lib/utils";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  published_at: string;
  created_at: string;
  author: string;
  content: string;
  readingTime?: number;
}

export default function BlogShowcase() {
  const { t, locale } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .eq("language", locale)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(3);

      if (data) {
        const mappedPosts = data.map(post => ({
          ...post,
          readingTime: calculateReadingTime(post.content || "")
        }));
        setPosts(mappedPosts);
      }
    }
    fetchPosts();
  }, [locale]);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl mb-4">
              {t("blog.showcaseTitle")}
            </h2>
            <p className="text-lg text-gray-600">{t("blog.showcaseSubtitle")}</p>
          </div>
          <Link href="/blog">
            <button className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
              {t("blog.viewAll")}{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}/`} className="group">
              <article className="flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image_url || "/apps/puantajx/logo.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-full text-gray-900 border border-gray-200">
                      {t(`blog.categories.${post.category}`, {
                        defaultValue: post.category || "General",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.created_at).toLocaleDateString(
                        locale === "tr" ? "tr-TR" : "en-US"
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author || (locale === "tr" ? "KF Ekibi" : "KF Team")}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime} {t("blog.minRead", { defaultValue: "dk" })}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
