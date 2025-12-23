"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Search,
  ChevronLeft,
  MoreVertical,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminBlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (!error) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Reuse Sidebar / Layout could be extracted but keeping it simple for now */}
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Blog Yazıları</h1>
            <p className="text-gray-500">Toplam {posts.length} yazı bulunmaktadır.</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-blue-600 rounded-2xl px-6 gap-2">
              <Plus className="h-5 w-5" /> Yeni Yazı Ekle
            </Button>
          </Link>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Başlığa göre ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Başlık / Slug</th>
                  <th className="px-8 py-4">Kategori</th>
                  <th className="px-8 py-4">Durum</th>
                  <th className="px-8 py-4">Tarih</th>
                  <th className="px-8 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-gray-400">
                        Yazılar yükleniyor...
                      </td>
                    </tr>
                  ) : filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-gray-400">
                        Yazı bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post, i) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-8 py-4">
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-400 font-mono">/{post.slug}</p>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2">
                            {post.is_published ? (
                              new Date(post.published_at) > new Date() ? (
                                <>
                                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                  <span className="text-xs font-bold text-blue-600">Planlandı</span>
                                </>
                              ) : (
                                <>
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <span className="text-xs font-bold text-green-600">Yayında</span>
                                </>
                              )
                            ) : (
                              <>
                                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                <span className="text-xs font-bold text-orange-600">Taslak</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-4 text-xs text-gray-500 font-medium">
                          {new Date(post.published_at || post.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/blog/edit?id=${post.id}`}>
                              <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 shadow-sm transition-all">
                                <Edit2 className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-red-600 shadow-sm transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
