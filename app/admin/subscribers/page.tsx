"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  ChevronLeft,
  Mail,
  Trash2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSubscribersList() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSubscribers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu aboneyi silmek istediğinize emin misiniz?")) {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (!error) {
        setSubscribers(subscribers.filter((s) => s.id !== id));
      }
    }
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    alert("E-posta kopyalandı!");
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
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-gray-900 tracking-tight">ABONELER</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/subscribers"
            className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold"
          >
            <Users className="h-5 w-5" />
            Aboneler
          </Link>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Bölten Aboneleri</h1>
            <p className="text-gray-500">Toplam {subscribers.length} abone bulunmaktadır.</p>
          </div>
          <Button
            onClick={() => {
              const allEmails = subscribers.map((s) => s.email).join(",");
              navigator.clipboard.writeText(allEmails);
              alert("Tüm e-postalar kopyalandı!");
            }}
            className="bg-blue-600 rounded-2xl px-6 gap-2"
          >
            <Copy className="h-5 w-5" /> Listeyi Kopyala
          </Button>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-4">E-posta Adresi</th>
                  <th className="px-8 py-4">Kayıt Tarihi</th>
                  <th className="px-8 py-4">Durum</th>
                  <th className="px-8 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-gray-400">
                        Aboneler yükleniyor...
                      </td>
                    </tr>
                  ) : subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-gray-400">
                        Henüz abone yok.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                              <Mail className="h-4 w-4" />
                            </div>
                            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {sub.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-xs text-gray-500 font-medium font-mono">
                          {new Date(sub.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-8 py-4">
                          <span
                            className={`px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase`}
                          >
                            Aktif
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => copyToClipboard(sub.email)}
                              className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 shadow-sm transition-all"
                              title="Kopyala"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(sub.id)}
                              className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-red-600 shadow-sm transition-all"
                              title="Sil"
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
