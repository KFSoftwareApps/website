"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          // Unique violation
          setStatus("success"); // Treat duplicate as success to not leak info
          setMessage("Listemizde zaten varsınız! 🚀");
        } else {
          throw error;
        }
      } else {
        setStatus("success");
        setMessage("Harika! Bültenimize kayıt oldunuz. 🎉");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -ml-16 -mb-16"></div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="inline-flex p-3 bg-yellow-50 rounded-2xl mb-6 text-yellow-600">
          <Mail className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">Gelişmeleri Kaçırmayın!</h3>
        <p className="text-gray-600 mb-8">
          Yeni özellikler, ipuçları ve güncellemelerden haberdar olmak için bültenimize katılın.
          Spam yok, söz! 🤞
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-2xl text-green-700 animate-in fade-in zoom-in">
            <CheckCircle className="h-12 w-12 mb-3" />
            <p className="font-bold text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-auto py-4 px-8 rounded-xl bg-gray-900 hover:bg-black text-white font-bold shadow-lg"
            >
              {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "Abone Ol"}
            </Button>
          </form>
        )}
        {status === "error" && <p className="text-red-500 text-sm mt-3 font-medium">{message}</p>}
      </div>
    </div>
  );
}
