"use client";

import { Button } from "@/components/ui/Button";
import { useState, useEffect, Suspense } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  X,
  Paperclip,
  Trash2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { useTranslation } from "@/lib/i18n";

const generalFAQs = {
  tr: [
    {
      question: "Şifremi unuttum, ne yapmalıyım?",
      answer:
        "Uygulama giriş ekranındaki 'Şifremi Unuttum' linkini kullanarak şifre sıfırlama e-postası alabilirsiniz. Eğer e-posta gelmezse destek ekibimizle iletişime geçin.",
    },
    {
      question: "Verilerim cihazımı değiştirdiğimde kaybolur mu?",
      answer:
        "Hayır, verileriniz bulut tabanlı olarak saklanır. Yeni cihazınızda aynı hesapla giriş yaptığınızda tüm verileriniz otomatik olarak senkronize edilir.",
    },
    {
      question: "Uygulamalar tamamen ücretsiz mi?",
      answer:
        "Uygulamalarımızın temel özellikleri ücretsizdir. Bazı gelişmiş özellikler (örn: sınırsız proje veya OCR limiti) için paket satın almanız gerekebilir.",
    },
    {
      question: "Veri güvenliği konusunda ne gibi önlemler alıyorsunuz?",
      answer:
        "Tüm verileriniz modern şifreleme yöntemleriyle korunur ve 256-bit SSL sertifikalı sunucularda saklanır. Verileriniz asla üçüncü şahıslarla paylaşılmaz.",
    },
  ],
  en: [
    {
      question: "I forgot my password, what should I do?",
      answer:
        "You can receive a password reset email using the 'Forgot Password' link on the app login screen. If you don't receive an email, contact our support team.",
    },
    {
      question: "Will my data be lost when I change my device?",
      answer:
        "No, your data is stored cloud-based. When you log in with the same account on your new device, all your data is automatically synchronized.",
    },
    {
      question: "Are the apps completely free?",
      answer:
        "The basic features of our apps are free. You may need to purchase a package for some advanced features (e.g. unlimited projects or OCR limit).",
    },
    {
      question: "What measures do you take regarding data security?",
      answer:
        "All your data is protected with modern encryption methods and stored on 256-bit SSL certified servers. Your data is never shared with third parties.",
    },
  ],
};

// Helper component to wrap useSearchParams logic
function SupportForm() {
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();
  const appFromUrl = searchParams.get("app");

  const [formData, setFormData] = useState({
    app: "PuantajX",
    topic: "Hesap / Giriş",
    email: "",
    message: "",
    privacy: false,
    confirm_email: "", // Honeypot field
    attachment: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  // Auto-select app from URL
  useEffect(() => {
    if (appFromUrl) {
      const formattedApp = appFromUrl.toLowerCase() === "fismatik" ? "FişMatik" : "PuantajX";
      setFormData((prev) => ({ ...prev, app: formattedApp }));
    }
  }, [appFromUrl]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [ticketId, setTicketId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, attachment: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getPlaceholder = () => {
    switch (formData.topic) {
      case "Hesap / Giriş":
      case "Account / Login":
        return t("support.placeholders.account");
      case "Ödeme / Abonelik":
      case "Payment / Subscription":
        return t("support.placeholders.payment");
      case "Hata / Bug":
      case "Error / Bug":
        return t("support.placeholders.bug");
      case "Öneri / İstek":
      case "Suggestion / Request":
        return t("support.placeholders.request");
      default:
        return t("support.placeholders.default");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      alert(
        locale === "tr"
          ? "Lütfen Gizlilik Politikasını onaylayın."
          : "Please confirm the Privacy Policy."
      );
      return;
    }
    if (formData.message.length < 20) {
      alert(
        locale === "tr"
          ? "Lütfen mesajınızı biraz daha detaylandırın (en az 20 karakter)."
          : "Please detail your message a little more (at least 20 characters)."
      );
      return;
    }

    setStatus("loading");
    setResponseMessage("");

    try {
      // Dynamic Import
      const { supabase } = await import("@/lib/supabase");

      let attachmentUrl = null;

      // Upload file if exists
      if (formData.attachment) {
        setUploading(true);
        const fileExt = formData.attachment.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("support-attachments")
          .upload(filePath, formData.attachment);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("support-attachments").getPublicUrl(filePath);

        attachmentUrl = publicUrl;
        setUploading(false);
      }

      const { data, error } = await supabase
        .from("support_tickets")
        .insert({
          app: formData.app,
          topic: formData.topic,
          email: formData.email,
          message: formData.message,
          status: "open",
          attachment_url: attachmentUrl,
        })
        .select()
        .single();

      if (error) throw error;

      // Send auto-reply email
      try {
        await fetch("/send-mail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: formData.email,
            topic: formData.topic,
            appName: formData.app,
            ticketId: data.id.split("-")[0].toUpperCase(),
          }),
        });
      } catch (emailError) {
        console.error("Auto-reply email failed:", emailError);
      }

      setStatus("success");
      setResponseMessage(t("support.successTitle"));
      setTicketId(data.id.split("-")[0].toUpperCase()); // Simple partial ID
      setFormData((prev) => ({ ...prev, message: "", privacy: false, attachment: null }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      setStatus("error");
      console.error("Support Error:", error);
      setResponseMessage(t("support.error"));
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white px-6 py-12 shadow-sm rounded-lg border border-gray-100 sm:px-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("support.successTitle")} ✅</h3>
        <p className="text-gray-600 mb-6">{t("support.successDesc")}</p>
        {ticketId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8 inline-block border border-gray-200">
            <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
              {t("support.ticketNo")}
            </span>
            <span className="text-xl font-mono font-bold text-primary-600">{ticketId}</span>
          </div>
        )}
        <Button onClick={() => setStatus("idle")} variant="outline" className="w-full">
          {t("support.newTicket")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-6 py-8 shadow-sm rounded-lg border border-gray-100 sm:px-10 space-y-6"
    >
      {status === "error" && (
        <div className="rounded-md bg-red-50 p-4 flex items-center gap-3 text-red-700 border border-red-100">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{responseMessage || t("common.error")}</p>
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden">
        <input
          type="text"
          name="confirm_email"
          value={formData.confirm_email}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="app" className="block text-sm font-medium leading-6 text-gray-900">
            {t("support.app")} <span className="text-red-500">*</span>
          </label>
          <select
            id="app"
            name="app"
            value={formData.app}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
          >
            <option>PuantajX</option>
            <option>FişMatik</option>
            <option>{locale === "tr" ? "Genel / Diğer" : "General / Other"}</option>
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
            {t("support.topic")} <span className="text-red-500">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
          >
            <option value={t("support.topics.account")}>{t("support.topics.account")}</option>
            <option value={t("support.topics.payment")}>{t("support.topics.payment")}</option>
            <option value={t("support.topics.bug")}>{t("support.topics.bug")}</option>
            <option value={t("support.topics.data")}>{t("support.topics.data")}</option>
            <option value={t("support.topics.request")}>{t("support.topics.request")}</option>
            <option value={t("support.topics.other")}>{t("support.topics.other")}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {t("support.email")} <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
          {t("support.message")} <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={20}
            value={formData.message}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
          <p className="mt-1 text-xs text-gray-500 text-right">
            {locale === "tr" ? "En az 20 karakter" : "At least 20 characters"}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {locale === "tr"
            ? "Ekran Görüntüsü / Dosya (İsteğe Bağlı)"
            : "Screenshot / File (Optional)"}
        </label>
        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
            <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 gap-2">
              <Paperclip className="h-4 w-4" />
              {locale === "tr" ? "Dosya Seç" : "Choose File"}
            </span>
            <input
              name="attachment"
              type="file"
              className="sr-only"
              onChange={handleChange}
              accept="image/*,.pdf"
            />
          </label>
          {formData.attachment && (
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
              <span className="truncate max-w-[150px]">{formData.attachment.name}</span>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, attachment: null }))}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {locale === "tr" ? "PNG, JPG, PDF (Maks. 5MB)" : "PNG, JPG, PDF (Max 5MB)"}
        </p>
      </div>

      <div className="pt-2">
        <div className="flex items-start gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              required
              checked={formData.privacy}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor="privacy" className="font-medium text-gray-900">
              {t("support.kvkk")} <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500">
              {t("support.privacyText").split("Gizlilik Politikası")[0]}
              <Link
                href="/privacy"
                className="font-semibold text-primary-600 hover:text-primary-500 hover:underline"
              >
                {locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
              </Link>
              {t("support.privacyText").split("Gizlilik Politikası")[1]}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          className="w-full h-11 text-base shadow-md bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:opacity-70"
          disabled={status === "loading" || !formData.privacy}
        >
          {status === "loading" ? t("support.sending") : t("support.send")}
        </Button>
        <p className="mt-3 text-xs text-center text-gray-500">
          {locale === "tr"
            ? "Yanıtlar info@kfsoftware.app adresi üzerinden iletilir. Lütfen spam kutunu kontrol etmeyi unutma."
            : "Responses are sent via info@kfsoftware.app. Please remember to check your spam box."}
        </p>
      </div>
    </form>
  );
}

function SupportContent() {
  const { t, locale } = useTranslation();
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { supabase } = await import("@/lib/supabase");
      const { data } = await supabase
        .from("faqs")
        .select("question, answer")
        .eq("is_published", true)
        .order("display_order");

      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        setFaqs(generalFAQs[locale] as any[]);
      }
    };
    fetchFaqs();
  }, [locale]);

  return (
    <div className="bg-gray-50 py-16 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("support.title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{t("support.subtitle")}</p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                  {locale === "tr" ? "Yükleniyor..." : "Loading..."}
                </div>
              }
            >
              <SupportForm />
            </Suspense>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Box */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {t("support.contact")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t("support.email")}</p>
                    <a
                      href="mailto:info@kfsoftware.app"
                      className="text-sm text-primary-600 hover:underline"
                    >
                      info@kfsoftware.app
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t("support.response")}</p>
                    <p className="text-sm text-gray-500">{t("support.avgResponse")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {t("support.links")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="flex items-center text-sm text-gray-600 hover:text-primary-600"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />{" "}
                    {locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="flex items-center text-sm text-gray-600 hover:text-primary-600"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />{" "}
                    {locale === "tr" ? "Kullanım Şartları" : "Terms of Use"}
                  </Link>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-900">{t("support.urgent")}</span>{" "}
                  {t("support.urgentDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("support.faqsTitle")}
            </h2>
            <p className="mt-4 text-gray-600">{t("support.faqsDesc")}</p>
          </div>
          {faqs.length > 0 ? (
            <FAQAccordion items={faqs} />
          ) : (
            <div className="text-center text-gray-500">
              {locale === "tr" ? "Yükleniyor..." : "Loading..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SupportClient() {
  return <SupportContent />;
}
