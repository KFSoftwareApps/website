"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { blogPosts as staticPosts } from "@/lib/blog";
import BlogCard from "@/components/ui/BlogCard";
import { Loader2, Search, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogClient() {
  const { t, locale } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  // Start with loading true only if we are fetching data
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("is_published", true)
          .lte("published_at", new Date().toISOString())
          .order("published_at", { ascending: false });

        if (data && data.length > 0) {
          const mappedPosts = data.map((post: any) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || "",
            date: new Date(post.published_at || post.created_at).toLocaleDateString(
              locale === "tr" ? "tr-TR" : "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            category: post.category || "General",
            author: post.author || (locale === "tr" ? "KF Software Ekibi" : "KF Software Team"),
            image: post.image_url || "/apps/puantajx/logo.png",
            content: post.content || "",
          }));
          setPosts(mappedPosts);
        } else {
          // Localize static posts date if needed
          setPosts(staticPosts);
        }
      } catch (e) {
        console.error("Error fetching posts:", e);
        setPosts(staticPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [locale]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map((p) => p.category));
    // Ensure core categories are always present
    uniqueCategories.add("Rehber");
    uniqueCategories.add("Güncelleme");
    uniqueCategories.add("Teknoloji");
    uniqueCategories.add("Duyuru");

    return ["All", ...Array.from(uniqueCategories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32 min-h-screen font-body">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl"
          >
            {t("blog.title").split("&")[0]} &{" "}
            <span className="text-blue-600">
              {t("blog.title").split("&")[1] || t("blog.updates")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            {t("blog.subtitle")}
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-gray-900 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {cat === "All"
                  ? t("blog.allCategories")
                  : t(`blog.categories.${cat}`, { defaultValue: cat })}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            layout
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100"
          >
            <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("blog.noResults")}</h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-blue-600 font-bold hover:underline"
            >
              {locale === "tr" ? "Filtreleri Temizle" : "Clear Filters"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
