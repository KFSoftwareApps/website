import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BlogPostUI from "./BlogPostUI";
import { Metadata } from "next";
import { calculateReadingTime } from "@/lib/utils";

// Force static generation
export const dynamic = 'force-static';
// Revalidate every hour if needed, though for pure static export this is ignored (build time only)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Generate Static Params (Build Time)
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("is_published", true)
    .lte("published_at", new Date(Date.now() + 60000).toISOString()); // Allow 1 min buffer for safety

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, image_url, language")
    .eq("slug", slug)
    .single();

  if (!post) {
    return {
      title: "Yazı Bulunamadı | KF Software",
    };
  }

  const isEn = post.language === "en";
  const suffix = isEn ? "Blog" : "Blog"; // Adjust if needed

  return {
    title: `${post.title} | KF Software ${suffix}`,
    description: post.excerpt || (isEn ? "KF Software Blog post." : "KF Software Blog yazısı."),
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      images: post.image_url ? [post.image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

// 3. Serve the Page Content
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .lte("published_at", new Date(Date.now() + 60000).toISOString()) // Allow 1 min buffer for safety
    .single();

  if (!post) {
    notFound();
  }

  // Fetch related posts (same category, different slug, limit 3)
  const { data: relatedPostsData } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .neq("slug", slug)
    .eq("category", post.category) // Try same category first
    .limit(3);

  let finalRelatedPosts = relatedPostsData || [];

  // If not enough related posts, fill with recent posts
  if (finalRelatedPosts.length < 3) {
    const { data: recentPosts } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .lte("published_at", new Date().toISOString())
      .neq("slug", slug)
      .not("id", "in", `(${finalRelatedPosts.map((p) => p.id).join(",")})`) // Exclude already found
      .limit(3 - finalRelatedPosts.length);

    if (recentPosts) {
      finalRelatedPosts = [...finalRelatedPosts, ...recentPosts];
    }
  }

  // Format related posts
  const formattedRelatedPosts = finalRelatedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    date: new Date(p.published_at || p.created_at).toLocaleDateString(p.language === "en" ? "en-US" : "tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    category: p.category,
    author: p.author || "KF Software Team",
    image: p.image_url || "/apps/puantajx/logo.png",
  }));

  // Format the main post data for the UI component
  const formattedPost = {
    title: post.title,
    content: post.content,
    date: new Date(post.published_at || post.created_at).toLocaleDateString(post.language === "en" ? "en-US" : "tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    category: post.category,
    author: post.author,
    image: post.image_url || "/apps/puantajx/logo.png",
    tags: post.tags || [],
    rawDate: post.created_at,
    shortCode: post.short_code,
    readingTime: calculateReadingTime(post.content || ""),
  };

  return <BlogPostUI post={formattedPost} relatedPosts={formattedRelatedPosts} />;
}
