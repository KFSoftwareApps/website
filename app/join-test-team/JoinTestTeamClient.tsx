"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function JoinTestTeamClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        app: "all",
        device: "android",
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
                app: formData.app === "all" ? "Tümü" : formData.app,
                topic: "Test Ekibi Başvurusu",
                email: formData.email,
                message: `İsim: ${formData.name}\nCihaz: ${formData.device}`,
                status: "open",
            });

            if (error) throw error;

            setStatus("success");
            setFormData({ name: "", email: "", app: "all", device: "android" });
        } catch (error: any) {
            setStatus("error");
            console.error("Join Team Error:", error);
            setErrorMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    };

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-xl px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="h-24 w-24 rounded-[2rem] shadow-2xl overflow-hidden">
                            <img
                                src="/test-team-icon.png"
                                alt="Test Ekibi"
                                className="h-full w-full object-cover scale-125"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Test Ekibine Katılın
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Uygulamalarımızın en yeni özelliklerini herkesten önce deneyimleyin, geri
                        bildirimlerinizle geliştirmemize yardımcı olun.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="rounded-2xl bg-green-50 p-8 text-center border border-green-100">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-900 mb-2">Başvurunuz Alındı!</h3>
                        <p className="text-green-800 mb-6">
                            Test ekibi başvurunuzu aldık. Beta sürüm davetiyelerini e-posta adresinize
                            göndereceğiz. Aramıza hoş geldiniz!
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
                                <div className="text-sm text-red-800">{errorMessage}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Adınız Soyadınız
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                E-posta Adresiniz
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Davetiye gönderebileceğimiz aktif e-posta adresiniz.
                            </p>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="ornek@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="app" className="block text-sm font-medium leading-6 text-gray-900">
                                    İlgilendiğiniz Uygulama
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="app"
                                        name="app"
                                        value={formData.app}
                                        onChange={(e) => setFormData({ ...formData, app: e.target.value })}
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                    >
                                        <option value="all">Tümü</option>
                                        <option value="puantajx">PuantajX</option>
                                        <option value="fismatik">FişMatik</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="device"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Kullandığınız Cihaz
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="device"
                                        name="device"
                                        value={formData.device}
                                        onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                                    >
                                        <option value="android">Android</option>
                                        <option value="ios">iPhone (iOS)</option>
                                        <option value="both">Her İkisi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {status === "loading" ? "Gönderiliyor..." : "Test Ekibine Katıl"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
