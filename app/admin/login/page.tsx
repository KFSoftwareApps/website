"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Shield, Lock, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
            <Shield className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900">KF Admin Panel</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Sadece yetkili personel girişi</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-[2.5rem] border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-gray-700">E-posta</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50/50"
                  placeholder="admin@kfsoftware.app"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">Şifre</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Giriş Yap"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
