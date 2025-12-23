"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  MessageSquare,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Send,
  X,
  ChevronLeft,
  AlertCircle,
  Archive,
  Paperclip,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "closed">("open");
  const [user, setUser] = useState<any>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const getReplyTemplate = (topic: string) => {
    switch (topic) {
      case "Hesap / Giriş":
        return "Merhaba,\n\nYaşadığınız giriş sorunu için üzgünüz. Sorunu çözmek için...\n\nLütfen tekrar dener misiniz?";
      case "Ödeme / Abonelik":
        return "Merhaba,\n\nÖdeme işleminiz ile ilgili olarak...\n\nSipariş numaranızı (GPA veya fatura no) paylaşabilir misiniz?";
      case "Hata / Bug":
        return "Merhaba,\n\nBildirdiğiniz hata ile ilgili teknik ekibimiz incelemelere başladı. En kısa sürede düzeltilecektir.\n\nDesteğiniz için teşekkürler.";
      case "Veri / Yedekleme":
        return "Merhaba,\n\nVerilerinizin güvenliği bizim için öncelikli. İstediğiniz yedekleme işlemi için...\n\nSize nasıl yardımcı olabiliriz?";
      case "Öneri / İstek":
        return "Merhaba,\n\nDeğerli öneriniz için çok teşekkürler! Bunu gelecek güncellemelerimizde mutlaka değerlendireceğiz.\n\nSevgiler.";
      default:
        return "Merhaba,\n\nMesajınız için teşekkürler.\n\n";
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    setLoading(true);
    let query = supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter === "open") {
      query = query.neq("status", "closed");
    } else if (filter === "closed") {
      query = query.eq("status", "closed");
    }

    const { data } = await query;
    if (data) setTickets(data);
    setLoading(false);
  };

  const handleCloseTicket = async (id: string) => {
    if (confirm("Bu talebi kapatmak istediğinize emin misiniz?")) {
      const { error } = await supabase
        .from("support_tickets")
        .update({ status: "closed" })
        .eq("id", id);

      if (!error) {
        if (filter === "open") {
          setTickets(tickets.filter((t) => t.id !== id));
        } else {
          setTickets(tickets.map((t) => (t.id === id ? { ...t, status: "closed" } : t)));
        }
      }
    }
  };

  const handleSendReply = async (ticket: any) => {
    if (!replyMessage.trim()) {
      alert("Lütfen bir mesaj yazın.");
      return;
    }

    setSending(true);
    try {
      const subject = `Re: Destek Talebi #${ticket.id.split("-")[0].toUpperCase()}`;
      const body = replyMessage;

      const response = await fetch("/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: ticket.email,
          type: "reply",
          message: replyMessage,
          ticketId: ticket.id.split("-")[0].toUpperCase(),
          appName:
            ticket.app === "puantajx"
              ? "PuantajX"
              : ticket.app === "fismatik"
                ? "FişMatik"
                : ticket.app,
        }),
      });

      if (!response.ok) {
        try {
          const data = await response.json();
          throw new Error(data.error || "Email gönderilemedi");
        } catch (parseError) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      alert("Email başarıyla gönderildi!");
      setReplyingTo(null);
      setReplyMessage("");
    } catch (error: any) {
      console.error("Send reply error:", error);
      alert("Hata: " + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleAccept = async (ticket: any) => {
    const link = prompt("Beta uygulama indirme linkini girin:", "https://example.com/download");
    if (link && confirm("Test ekibi başvurusunu KABUL ET?")) {
      try {
        const userName = ticket.message.match(/İsim: (.+)/)?.[1] || "";
        const response = await fetch("/send-mail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: ticket.email,
            topic: ticket.topic,
            appName: ticket.app,
            ticketId: ticket.id.split("-")[0].toUpperCase(),
            userName,
            downloadLink: link,
            type: "test-team-accepted",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Email gönderilemedi");
        }

        await handleCloseTicket(ticket.id);
        alert("Kabul emaili gönderildi!");
      } catch (error: any) {
        console.error("Accept error:", error);
        alert("Email gönderilemedi: " + error.message);
      }
    }
  };

  const handleReject = async (ticket: any) => {
    if (confirm("Test ekibi başvurusunu REDDET?")) {
      try {
        const userName = ticket.message.match(/İsim: (.+)/)?.[1] || "";
        const response = await fetch("/send-mail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: ticket.email,
            topic: ticket.topic,
            appName: ticket.app,
            ticketId: ticket.id.split("-")[0].toUpperCase(),
            userName,
            type: "test-team-rejected",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Email gönderilemedi");
        }

        await handleCloseTicket(ticket.id);
        alert("Red emaili gönderildi!");
      } catch (error: any) {
        console.error("Reject error:", error);
        alert("Email gönderilemedi: " + error.message);
      }
    }
  };

  const handleDeleteAccount = async (ticket: any) => {
    if (confirm("Hesap silme onayı gönder?")) {
      try {
        const response = await fetch("/send-mail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: ticket.email,
            topic: ticket.topic,
            appName: ticket.app,
            ticketId: ticket.id.split("-")[0].toUpperCase(),
            type: "account-deletion",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Email gönderilemedi");
        }

        await handleCloseTicket(ticket.id);
        alert("Hesap silme onayı gönderildi!");
      } catch (error: any) {
        console.error("Delete error:", error);
        alert("Email gönderilemedi: " + error.message);
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">Destek Talepleri</h1>
          <p className="text-gray-500">
            {filter === "open"
              ? "Henüz çözülmemiş talepler listeleniyor."
              : filter === "closed"
                ? "Kapatılmış talepler listeleniyor."
                : "Tüm destek talepleri listeleniyor."}
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-gray-100/50 p-2 rounded-2xl w-fit">
          <button
            onClick={() => setFilter("open")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${filter === "open"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
          >
            <AlertCircle className="h-4 w-4" />
            Açık Talepler
            <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs ${filter === "open" ? "bg-blue-50" : "bg-gray-200"}`}>
              {tickets.filter((t) => t.status !== "closed").length}
            </span>
          </button>

          <button
            onClick={() => setFilter("closed")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${filter === "closed"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Çözülenler
            <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs ${filter === "closed" ? "bg-green-50" : "bg-gray-200"}`}>
              {tickets.filter((t) => t.status === "closed").length}
            </span>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${filter === "all"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
          >
            <Filter className="h-4 w-4" />
            Tümü
            <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs ${filter === "all" ? "bg-gray-100" : "bg-gray-200"}`}>
              {tickets.length}
            </span>
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          <AnimatePresence>
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-600">
                          #{ticket.id.split("-")[0].toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-600">
                          {ticket.app}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(ticket.created_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{ticket.topic}</p>
                    </div>
                  </div>
                  {ticket.status === "closed" && (
                    <span className="px-4 py-2 rounded-xl bg-green-100 text-green-600 text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Çözüldü
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{ticket.email}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {ticket.message}
                  </p>

                  {ticket.attachment_url && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={ticket.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
                      >
                        <Paperclip className="h-4 w-4" />
                        Ekli Dosyayı Görüntüle
                        <ExternalLink className="h-3 w-3 ml-1 text-gray-400" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  {/* Quick Template Buttons */}
                  {ticket.topic === "Test Ekibi Başvurusu" && ticket.status !== "closed" && (
                    <>
                      <button
                        onClick={() => handleAccept(ticket)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors"
                      >
                        ✓ Kabul Et
                      </button>
                      <button
                        onClick={() => handleReject(ticket)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                      >
                        ✗ Reddet
                      </button>
                    </>
                  )}

                  {ticket.topic === "Hesap Silme Talebi" && ticket.status !== "closed" && (
                    <button
                      onClick={() => handleDeleteAccount(ticket)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                    >
                      🗑️ Hesabı Sil
                    </button>
                  )}

                  {/* Reply Button */}
                  {ticket.status !== "closed" && (
                    <button
                      onClick={() => {
                        if (replyingTo === ticket.id) {
                          setReplyingTo(null);
                          setReplyMessage("");
                        } else {
                          setReplyingTo(ticket.id);
                          setReplyMessage(getReplyTemplate(ticket.topic));
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Yanıtla
                    </button>
                  )}

                  {/* Close Button */}
                  {ticket.status !== "closed" && (
                    <button
                      onClick={() => handleCloseTicket(ticket.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Çözüldü Olarak İşaretle
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === ticket.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Yanıtınızı yazın..."
                      className="w-full p-4 rounded-2xl border border-gray-300 bg-white text-gray-900 font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                      rows={6}
                    />
                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyMessage("");
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => handleSendReply(ticket)}
                        disabled={sending}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                        {sending ? "Gönderiliyor..." : "Email Gönder"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {tickets.length === 0 && (
            <div className="text-center py-20">
              <Archive className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold">Henüz talep yok</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
