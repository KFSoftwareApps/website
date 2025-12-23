"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Settings,
  Database,
  Plus,
  Trash2,
  Save,
  HelpCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Types
type PricingSettings = {
  puantajx_monthly: number;
  puantajx_yearly: number;
  fismatik_lifetime: number;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
};

export default function AdminSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "faq">("general");
  const [loading, setLoading] = useState(false);

  // Pricing State
  const [pricing, setPricing] = useState<PricingSettings>({
    puantajx_monthly: 0,
    puantajx_yearly: 0,
    fismatik_lifetime: 0,
  });

  // FAQ State
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "general" });

  useEffect(() => {
    fetchSettings();
    fetchFaqs();
  }, []);

  const fetchSettings = async () => {
    const { data: pData } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "pricing_puantajx")
      .single();
    const { data: fData } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "pricing_fismatik")
      .single();

    setPricing({
      puantajx_monthly: pData?.value?.monthly || 150,
      puantajx_yearly: pData?.value?.yearly || 1500,
      fismatik_lifetime: fData?.value?.lifetime || 499,
    });
  };

  const fetchFaqs = async () => {
    const { data } = await supabase
      .from("faqs")
      .select("*")
      .order("category")
      .order("display_order");
    if (data) setFaqs(data);
  };

  const handleSavePricing = async () => {
    setLoading(true);
    await supabase.from("site_settings").upsert({
      key: "pricing_puantajx",
      value: { monthly: pricing.puantajx_monthly, yearly: pricing.puantajx_yearly },
      description: "PuantajX Abonelik Fiyatları",
    });
    await supabase.from("site_settings").upsert({
      key: "pricing_fismatik",
      value: { lifetime: pricing.fismatik_lifetime },
      description: "FişMatik Tek Seferlik Fiyat",
    });
    setLoading(false);
    alert("Fiyatlar güncellendi!");
  };

  const handleAddFaq = async () => {
    if (!newFaq.question || !newFaq.answer) return alert("Lütfen soru ve cevap giriniz.");

    await supabase.from("faqs").insert({
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category,
      display_order: faqs.length + 1,
    });

    setShowFaqForm(false);
    setNewFaq({ question: "", answer: "", category: "general" });
    fetchFaqs();
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Bu soruyu silmek istiyor musunuz?")) {
      await supabase.from("faqs").delete().eq("id", id);
      fetchFaqs();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-50">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-4 text-sm font-bold"
          >
            <ChevronLeft className="h-4 w-4" /> Dashboard'a Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-gray-900 tracking-tight">AYARLAR</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all font-bold ${activeTab === "general" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <CreditCard className="h-5 w-5" /> Fiyatlandırma
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all font-bold ${activeTab === "faq" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <HelpCircle className="h-5 w-5" /> SSS Yönetimi
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">
            {activeTab === "general" ? "Fiyatlandırma Ayarları" : "Sıkça Sorulan Sorular"}
          </h1>
          <p className="text-gray-500">
            {activeTab === "general"
              ? "Uygulama fiyatlarını buradan yönetebilirsiniz."
              : "Destek sayfasında görünecek soruları düzenleyin."}
          </p>
        </header>

        {activeTab === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-2xl"
          >
            {/* PuantajX Pricing */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">PuantajX Fiyatları</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Aylık Abonelik (₺)
                  </label>
                  <input
                    type="number"
                    value={pricing.puantajx_monthly}
                    onChange={(e) =>
                      setPricing({ ...pricing, puantajx_monthly: Number(e.target.value) })
                    }
                    className="w-full p-4 bg-gray-50 rounded-xl font-mono font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Yıllık Abonelik (₺)
                  </label>
                  <input
                    type="number"
                    value={pricing.puantajx_yearly}
                    onChange={(e) =>
                      setPricing({ ...pricing, puantajx_yearly: Number(e.target.value) })
                    }
                    className="w-full p-4 bg-gray-50 rounded-xl font-mono font-bold text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* FişMatik Pricing */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">FişMatik Fiyatları</h3>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tek Seferlik Ömür Boyu (₺)
                </label>
                <input
                  type="number"
                  value={pricing.fismatik_lifetime}
                  onChange={(e) =>
                    setPricing({ ...pricing, fismatik_lifetime: Number(e.target.value) })
                  }
                  className="w-full p-4 bg-gray-50 rounded-xl font-mono font-bold text-gray-900"
                />
              </div>
            </div>

            <Button
              onClick={handleSavePricing}
              disabled={loading}
              className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg shadow-green-200"
            >
              {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </motion.div>
        )}

        {activeTab === "faq" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            {!showFaqForm ? (
              <button
                onClick={() => setShowFaqForm(true)}
                className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all mb-8 flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" /> Yeni Soru Ekle
              </button>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 mb-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Yeni Soru Ekle</h3>
                <div className="space-y-4">
                  <select
                    className="w-full p-3 bg-gray-50 rounded-xl"
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                  >
                    <option value="general">Genel</option>
                    <option value="puantajx">PuantajX</option>
                    <option value="fismatik">FişMatik</option>
                  </select>
                  <input
                    placeholder="Soru..."
                    className="w-full p-3 bg-gray-50 rounded-xl font-bold"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  />
                  <textarea
                    placeholder="Cevap..."
                    rows={4}
                    className="w-full p-3 bg-gray-50 rounded-xl"
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <Button onClick={handleAddFaq} className="flex-1 bg-blue-600">
                      Kaydet
                    </Button>
                    <Button
                      onClick={() => setShowFaqForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      İptal
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-md mb-2 inline-block">
                        {faq.category}
                      </span>
                      <h4 className="font-bold text-gray-900">{faq.question}</h4>
                      <p className="text-gray-500 mt-2 text-sm">{faq.answer}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
