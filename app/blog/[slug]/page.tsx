import { blogPosts as staticPosts } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";
import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  // Generate params only for known static posts + maybe some recent dynamic ones if possible,
  // but for now, even static posts are enough to satisfy the build export requirement.
  // If we want dynamic routes that ALREADY exist to be pre-rendered, we can query Supabase here.

  let slugs = staticPosts.map((post) => ({
    slug: post.slug,
  }));

  try {
    const { data } = await supabase.from("posts").select("slug").eq("is_published", true);
    if (data) {
      const dynamicSlugs = data.map((p) => ({ slug: p.slug }));
      slugs = [...slugs, ...dynamicSlugs];
    }
  } catch (e) {
    console.warn("Could not fetch dynamic slugs during build:", e);
  }

  return slugs;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
