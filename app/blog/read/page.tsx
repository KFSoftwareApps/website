import { Metadata } from "next";
import BlogClient from "./BlogClient";

// Static metadata for the blog read page shell (since actual post is CSR)
export const metadata: Metadata = {
  title: "Blog Yazısı | KF Software Türkiye",
  description: "KF Software Blog - Teknoloji, Güncelleme ve Rehber içerikleri.",
  openGraph: {
    title: "Blog Yazısı | KF Software Türkiye",
    description: "En güncel teknoloji ve yazılım içerikleri için blogumuzu ziyaret edin.",
    type: "article",
  },
};

export default function BlogReadPage() {
  return <BlogClient />;
}
