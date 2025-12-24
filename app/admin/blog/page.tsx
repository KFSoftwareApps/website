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
  GripVertical,
  Save,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminBlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"All" | "tr" | "en">("All");
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedPosts, setOrderedPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (data) {
      setPosts(data);
      // Don't set orderedPosts here, set it when entering reorder mode based on filters
    }
    setLoading(false);
  };

  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    try {
      // Update each post with its new index
      const updates = orderedPosts.map((post, index) => ({
        id: post.id,
        display_order: index,
        updated_at: new Date().toISOString(), // Keep it fresh
      }));

      // Use Promise.all to update independently (partial updates)
      // Upsert fails because it tries to INSERT first and hits NOT NULL constraints on other columns.
      console.log("Updating posts order:", updates);

      const promises = updates.map(u =>
        supabase
          .from("posts")
          .update({ display_order: u.display_order }) // Removed updated_at to avoid RLS/Permission issues
          .eq("id", u.id)
          .select()
      );

      const results = await Promise.all(promises);
      const errors = results.filter(r => r.error);

      if (errors.length > 0) {
        console.error("Some updates failed:", errors);
        throw new Error("Bazı güncellemeler başarısız oldu.");
      }

      await fetchPosts(); // Refetch to ensure truth
      setIsReorderMode(false);
      alert("Sıralama başarıyla kaydedildi!");
    } catch (e) {
      console.error("Save order error:", e);
      alert("Sıralama kaydedilirken hata oluştu. Lütfen konsolu kontrol edin.");
    } finally {
      setIsSavingOrder(false);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (!error) {
        setPosts(posts.filter((p) => p.id !== id));
        setOrderedPosts(orderedPosts.filter((p) => p.id !== id));
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === "All" || post.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

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
          <div className="flex items-center gap-3">
            {isReorderMode ? (
              <>
                <Button
                  onClick={() => {
                    setIsReorderMode(false);
                    // No need to reset filteredPosts as it's derived
                  }}
                  variant="secondary"
                  className="rounded-2xl px-6 gap-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <X className="h-5 w-5" /> İptal ET
                </Button>
                <Button
                  onClick={handleSaveOrder}
                  className="bg-green-600 hover:bg-green-700 rounded-2xl px-6 gap-2 text-white"
                  disabled={isSavingOrder}
                >
                  <Save className="h-5 w-5" /> {isSavingOrder ? "Kaydediliyor..." : "Sıralamayı Kaydet"}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setOrderedPosts(filteredPosts);
                  setIsReorderMode(true);
                }}
                disabled={selectedLanguage === "All"}
                variant="secondary"
                className={`bg-white border border-gray-200 text-gray-700 rounded-2xl px-6 gap-2 ${selectedLanguage === "All" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                title={selectedLanguage === "All" ? "Sıralama yapmak için lütfen listeden bir dil (TR veya EN) seçiniz." : ""}
              >
                <ArrowUpDown className="h-5 w-5" />
                {selectedLanguage === "All" ? "Dil Seçiniz" : "Sıralamayı Düzenle"}
              </Button>
            )}

            <Link href="/admin/blog/new">
              <Button className="bg-blue-600 rounded-2xl px-6 gap-2">
                <Plus className="h-5 w-5" /> Yeni Yazı Ekle
              </Button>
            </Link>
          </div>
        </header>

        {isReorderMode ? (
          <div className="bg-gray-50 rounded-[2.5rem] border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-800 text-sm">
              <ArrowUpDown className="h-5 w-5" />
              <p>
                Şu an sadece <strong>{selectedLanguage === 'en' ? 'İngilizce' : 'Türkçe'}</strong> yazılarını sıralıyorsunuz. Sürükleyip bırakarak yeni sıralamayı belirleyin ve <strong>"Sıralamayı Kaydet"</strong> butonuna basın.
              </p>
            </div>

            <Reorder.Group axis="y" values={orderedPosts} onReorder={setOrderedPosts} className="flex flex-col gap-3">
              {orderedPosts.map((post) => (
                <Reorder.Item
                  key={post.id}
                  value={post}
                  className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors"
                >
                  <div className="text-gray-400 cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg">
                    <GripVertical className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{post.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${post.language === "en" ? "bg-indigo-50 text-indigo-600" : "bg-red-50 text-red-600"
                        }`}>
                        {post.language === "en" ? "EN" : "TR"}
                      </span>
                      <span className="text-xs text-gray-400">/{post.slug}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                    Sıra: {orderedPosts.indexOf(post) + 1}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ) : (

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

            <div className={`px-6 pb-6 border-b border-gray-50 flex flex-wrap gap-2 ${isReorderMode ? 'opacity-50 pointer-events-none' : ''}`}>
              {[
                { id: "All", label: "Hepsi", count: posts.length },
                { id: "tr", label: "Türkçe (TR)", count: posts.filter((p) => p.language === "tr").length },
                { id: "en", label: "İngilizce (EN)", count: posts.filter((p) => p.language === "en").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedLanguage(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedLanguage === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Başlık / Slug</th>
                    <th className="px-8 py-4 text-center">Dil</th>
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
                          <td className="px-8 py-4 text-center">
                            <span
                              className={`px-2 py-1 rounded text-[10px] font-black uppercase ${post.language === "en"
                                ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                : "bg-red-50 text-red-600 border border-red-100"
                                }`}
                            >
                              {post.language === "en" ? "🇺🇸 EN" : "🇹🇷 TR"}
                            </span>
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
        )}
      </main>
    </div>
  );
}
