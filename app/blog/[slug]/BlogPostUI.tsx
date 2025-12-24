"use client";

import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Share2, MessageCircle, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SocialShareModal from "@/components/ui/SocialShareModal";
import { useTranslation } from "@/lib/i18n";

import BlogCard from "@/components/ui/BlogCard";

interface BlogPostUIProps {
    post: {
        title: string;
        content: string;
        date: string;
        category?: string;
        author?: string;
        image?: string;
        tags?: string[];
        rawDate?: string;
        shortCode?: string;
    };
    relatedPosts?: any[];
}

export default function BlogPostUI({ post, relatedPosts = [] }: BlogPostUIProps) {
    const { t } = useTranslation();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [sharePlatform, setSharePlatform] = useState<"twitter" | "instagram" | null>(null);

    const openShare = (platform: "twitter" | "instagram") => {
        setSharePlatform(platform);
        setIsShareModalOpen(true);
    };

    // Extract text content from HTML for better excerpt generation if needed
    const cleanExcerpt = post.content.replace(/<[^>]+>/g, '').substring(0, 150);

    return (
        <div className="bg-white min-h-screen pb-24 font-body">
            <SocialShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                platform={sharePlatform}
                post={{
                    title: post.title,
                    excerpt: cleanExcerpt,
                    image: post.image || "",
                    url: post.shortCode
                        ? `https://kfsoftware.app/b/${post.shortCode}`
                        : (typeof window !== "undefined" ? window.location.href : `https://kfsoftware.app/blog`),
                    tags: post.tags || []
                }}
            />
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
                                href="/blog"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                            >
                                <ChevronLeft className="h-4 w-4" /> {t("blog.backToBlog")}
                            </Link>
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
                                {post.category && (
                                    <>
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        <span className="inline-block px-3 py-1 rounded-lg bg-blue-600/20 text-blue-200 text-xs font-black uppercase tracking-widest border border-blue-500/30">
                                            {post.category}
                                        </span>
                                    </>
                                )}

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
                    className="blog-content prose prose-lg lg:prose-xl prose-zinc max-w-none text-black prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:font-black prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:font-bold prose-p:text-black prose-p:leading-relaxed prose-strong:text-black prose-li:text-black prose-img:rounded-[2rem] prose-img:shadow-2xl prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-a:text-blue-600 hover:prose-a:text-blue-700"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.title,
                            image: post.image ? [`https://kfsoftware.app${post.image}`] : [],
                            datePublished: post.rawDate,
                            dateModified: post.rawDate,
                            author: [
                                {
                                    "@type": "Person",
                                    name: post.author || "KF Software Team",
                                    url: "https://kfsoftware.app",
                                },
                            ],
                        }),
                    }}
                />

                {/* Footer Actions */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-start gap-8">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-3 w-full">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest min-w-fit">
                                {t("blog.tags")}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold ring-1 ring-inset ring-gray-100 hover:bg-gray-100 transition-colors cursor-default"
                                    >
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => openShare("twitter")}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-bold hover:opacity-80 transition-all cursor-pointer w-full sm:w-auto"
                        >
                            <Twitter className="h-5 w-5" /> Twitter
                        </button>
                        <button
                            onClick={() => openShare("instagram")}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all cursor-pointer w-full sm:w-auto"
                        >
                            <Instagram className="h-5 w-5" /> Instagram
                        </button>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: post.title,
                                        url: window.location.href,
                                    }).catch(console.error);
                                } else {
                                    alert("Tarayıcınız paylaşımı desteklemiyor.");
                                }
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all cursor-pointer w-full sm:w-auto"
                        >
                            <Share2 className="h-5 w-5" /> Diğer
                        </button>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black hover:bg-gray-100 transition-all cursor-pointer w-full sm:w-auto"
                        >
                            <MessageCircle className="h-5 w-5" /> Yorum Yap
                        </Link>
                    </div>
                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className="bg-gray-50/50 py-24 mt-24 border-t border-gray-100">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                                {t("blog.relatedPosts")}
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                {t("blog.relatedPostsSubtitle")}
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {relatedPosts.map((post, index) => (
                                <BlogCard key={post.slug} post={post} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
