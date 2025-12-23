"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Save,
  X,
  Image as ImageIcon,
  Type,
  Globe,
  Lock,
  Loader2,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import ImageUpload from "@/components/ui/ImageUpload";

interface BlogEditorProps {
  postId?: string;
}

export default function BlogEditor({ postId }: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Güncelleme");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState(""); // Comma separated string
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    setFetching(true);
    const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();

    if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setCategory(data.category);
      setImageUrl(data.image_url);
      setIsPublished(data.is_published);
      if (data.published_at) {
        // Format for datetime-local: yyyy-MM-ddThh:mm (Local Time)
        const date = new Date(data.published_at);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
        setPublishedAt(localISOTime);
      }
      setShortCode(data.short_code || "");
      if (data.tags && Array.isArray(data.tags)) {
        setTags(data.tags.join(", "));
      }
    }
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Generate short code if missing
    const finalShortCode = shortCode || Math.random().toString(36).substring(2, 8);

    const postData = {
      title,
      slug,
      excerpt,
      content,
      category,
      image_url: imageUrl,
      is_published: isPublished,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
      tags: tagsArray,
      short_code: finalShortCode,
    };

    let error;
    if (postId) {
      const { error: err } = await supabase.from("posts").update(postData).eq("id", postId);
      error = err;
    } else {
      const { error: err } = await supabase.from("posts").insert([postData]);
      error = err;
    }

    if (!error) {
      router.push("/admin/blog");
    } else {
      alert("Hata oluştu: " + error.message);
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500 font-bold">Yazı yükleniyor...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-10 border-b border-gray-100 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm border border-transparent hover:border-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-black text-gray-900">
            {postId ? "Yazıyı Düzenle" : "Yeni Yazı Oluştur"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            className="rounded-2xl font-bold"
          >
            İptal
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 rounded-2xl px-8 shadow-lg shadow-blue-500/20 font-bold gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                Başlık
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all text-xl font-bold text-gray-900"
                placeholder="Yazı başlığını girin..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                Slug (URL)
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/ /g, "-"))}
                  className="w-full pl-20 pr-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm"
                  placeholder="yazi-slug-formati"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                Kısa Özet
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all h-24 resize-none text-gray-600"
                placeholder="Yazının kısa özetini buraya yazın..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                İçerik (HTML desteklenir)
              </label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all h-[400px] font-mono text-sm leading-relaxed"
                placeholder="Yazı içeriğini buraya girin (HTML formatında)..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6 text-gray-900">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg">Yayın Ayarları</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Güncelleme">Güncelleme</option>
                  <option value="Duyuru">Duyuru</option>
                  <option value="Rehber">Rehber</option>
                  <option value="Teknoloji">Teknoloji</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Kapak Görseli URL
                </label>
                <div className="mt-1 relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={
                      imageUrl.startsWith("http") &&
                      imageUrl.includes(process.env.NEXT_PUBLIC_SUPABASE_URL || "supabase")
                    }
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="https://..."
                  />
                </div>

                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">
                    - VEYA -
                  </p>
                  <ImageUpload
                    value={imageUrl}
                    onChange={(url) => setImageUrl(url)}
                    onRemove={() => setImageUrl("")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Etiketler
                </label>
                <div className="mt-1 relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Virgülle ayırın (ör: yazılım, güncelleme)"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublished ? "bg-blue-600" : "bg-gray-200"}`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                    />
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                    Yayına Al
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Kısa Kod (Paylaşım İçin)
                </label>
                <input
                  type="text"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  placeholder="Otomatik oluşturulur..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Yayınlanma Tarihi
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  disabled={isPublished}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="mt-2 text-[10px] text-gray-400 leading-tight">
                  Gelecek bir tarih seçerseniz, yazı o tarihe kadar ziyaretçilere görünmeyecektir.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6" />
              <h3 className="font-black text-lg">Önizleme</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Yazı kaydedildiğinde anında yayına alınır ve ana sayfada görünür.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-blue-200">
                Durum
              </p>
              <p className="font-bold">{isPublished ? "🟢 Herkese Açık" : "🟠 Taslak Örneği"}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
