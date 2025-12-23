import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-static";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kfsoftware.app";

  // 1. Static Pages
  const staticPages = [
    "/",
    "/apps/",
    "/apps/puantajx/",
    "/apps/fismatik/",
    "/blog/",
    "/contact/",
    "/about/",
    "/support/",
    "/privacy/",
    "/terms/",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  let blogRoutes: any[] = [];
  try {
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    if (posts) {
      // Use the new CSR reader structure
      blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap generation error:", e);
  }

  return [...staticPages, ...blogRoutes];
}
