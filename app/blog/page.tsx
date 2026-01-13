import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { supabase } from "@/lib/supabase";
import { calculateReadingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | KF Software Türkiye",
  description:
    "Yazılım dünyasından güncel haberler, teknoloji incelemeleri, rehberler ve KF Software ürün güncellemeleri.",
  alternates: {
    canonical: "https://kfsoftware.app/blog/",
  },
};

export default async function BlogPage() {
  // 1. Fetch posts on the server for SEO (Pre-rendering)
  let initialPosts: any[] = [];
  try {
    const { data } = await supabase
      .from("posts")
      .select("slug, title, excerpt, image_url, published_at, created_at, category, author, language, content, display_order")
      .eq("is_published", true)
      .lte("published_at", new Date().toISOString())
      .order("display_order", { ascending: true })
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      initialPosts = data.map((post: any) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        date: new Date(post.published_at || post.created_at).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        category: post.category || "General",
        author: post.author || "KF Software Ekibi",
        image: post.image_url || "/apps/puantajx/logo.png",
        content: post.content || "",
        language: post.language,
        rawDate: post.published_at || post.created_at,
        display_order: post.display_order || 0,
        readingTime: calculateReadingTime(post.content || ""),
      }));
    }
  } catch (error) {
    console.error("Server-side blog fetch error:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | KF Software Türkiye",
    description:
      "Yazılım dünyasından güncel haberler, teknoloji incelemeleri, rehberler ve KF Software ürün güncellemeleri.",
    url: "https://kfsoftware.app/blog/",
    publisher: {
      "@type": "Organization",
      name: "KF Software Türkiye",
      logo: {
        "@type": "ImageObject",
        url: "https://kfsoftware.app/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient initialPosts={initialPosts} />
    </>
  );
}
