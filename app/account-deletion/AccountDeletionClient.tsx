"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function AccountDeletionClient() {
    const [formData, setFormData] = useState({
        app: "puantajx",
        email: "",
        reason: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const { supabase } = await import("@/lib/supabase");

            const { error } = await supabase.from("support_tickets").insert({
                app: formData.app,
                topic: "Hesap Silme Talebi",
                email: formData.email,
                message: `Silme Nedeni: ${formData.reason || "Belirtilmedi"}`,
                status: "open",
            });

            if (error) throw error;

            setStatus("success");
            setFormData({ app: "puantajx", email: "", reason: "" });
        } catch (error: any) {
            setStatus("error");
            console.error("Deletion Error:", error);
            setErrorMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    };

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-xl px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Hesap Silme Talebi
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Hesabınızı ve verilerinizi silmek için aşağıdaki formu doldurun. Talebiniz işleme
                        alındığında size e-posta ile bilgi verilecektir.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="rounded-2xl bg-green-50 p-8 text-center border border-green-100">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-900 mb-2">Talebiniz Alındı</h3>
                        <p className="text-green-800 mb-6">
                            Hesap silme talebiniz başarıyla bize ulaştı. En kısa sürede e-posta adresiniz
                            üzerinden sizinle iletişime geçeceğiz.
                        </p>
                        <Link href="/">
                            <Button variant="outline">Ana Sayfaya Dön</Button>
                        </Link>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-gray-50/50 p-8 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        {status === "error" && (
                            <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3 border border-red-100">
                                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                <div className="text-sm text-red-800">{errorMessage}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="app" className="block text-sm font-medium leading-6 text-gray-900">
                                Uygulama Seçin
                            </label>
                            <div className="mt-2">
                                <select
                                    id="app"
                                    name="app"
                                    required
                                    value={formData.app}
                                    onChange={(e) => setFormData({ ...formData, app: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                >
                                    <option value="puantajx">PuantajX - Şantiye Yönetimi</option>
                                    <option value="fismatik">FişMatik - Bütçe Takibi</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-posta Adresiniz
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Hesabınıza kayıtlı e-posta adresinizi girin.
                            </p>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="ornek@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                Silme Nedeni (Opsiyonel)
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="reason"
                                    name="reason"
                                    rows={4}
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    placeholder="Neden ayrılmak istediğinizi bize bildirin..."
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full justify-center bg-red-600 hover:bg-red-700 text-white"
                            >
                                {status === "loading" ? "Gönderiliyor..." : "Hesabı Silme Talebi Gönder"}
                            </Button>
                            <p className="mt-4 text-center text-xs text-gray-500">
                                Bu işlem geri alınamaz ancak veri güvenliğiniz için manuel doğrulama gerektirir.
                                <br />
                                Daha fazla bilgi için{" "}
                                <Link href="/privacy" className="underline hover:text-gray-900">
                                    Gizlilik Politikamızı
                                </Link>{" "}
                                inceleyin.
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
