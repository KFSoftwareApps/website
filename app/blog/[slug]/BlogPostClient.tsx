"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { blogPosts as staticPosts } from "@/lib/blog";
import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Share2, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 1. Check dynamic posts
        const { data: postData } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (postData) {
          setPost({
            title: postData.title,
            content: postData.content,
            date: new Date(postData.created_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            category: postData.category,
            author: postData.author,
            image: postData.image_url || "/apps/puantajx/logo.png",
            tags: postData.tags || [],
          });
        } else {
          // 2. Check static posts
          const staticPost = staticPosts.find((p) => p.slug === slug);
          if (staticPost) {
            setPost(staticPost);
          }
        }
      } catch (e) {
        console.error("Error fetching post:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!post)
    return <div className="min-h-screen flex items-center justify-center">Yazı bulunamadı.</div>;

  return (
    <div className="bg-white min-h-screen pb-24 font-body">
      {/* Post Header */}
      <div className="relative h-[400px] lg:h-[600px] w-full overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized // Supabase images might be external
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto max-w-4xl w-full px-6 pb-12 lg:pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
              >
                <ChevronLeft className="h-4 w-4" /> Blog'a Dön
              </Link>
              {post.category && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/40">
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  {post.author || "Admin"}
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  {post.date}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mx-auto max-w-4xl px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg lg:prose-xl prose-zinc max-w-none text-black prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:font-black prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:font-bold prose-p:text-black prose-p:leading-relaxed prose-strong:text-black prose-li:text-black prose-img:rounded-[2rem] prose-img:shadow-2xl prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-a:text-blue-600 hover:prose-a:text-blue-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Actions */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black hover:bg-blue-100 transition-all">
              <Share2 className="h-5 w-5" /> Paylaş
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black hover:bg-gray-100 transition-all">
              <MessageCircle className="h-5 w-5" /> Yorum Yap
            </button>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Etiketler:
              </span>
              <div className="flex gap-2">
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold ring-1 ring-inset ring-gray-100"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
