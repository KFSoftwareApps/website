"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    ChevronLeft
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [ticketCount, setTicketCount] = useState(0);

    useEffect(() => {
        fetchTicketCount();
    }, []);

    const fetchTicketCount = async () => {
        const { count } = await supabase
            .from("support_tickets")
            .select("*", { count: "exact", head: true })
            .neq("status", "closed");

        if (count !== null) setTicketCount(count);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen shrink-0">
            <div className="p-6 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                        <LayoutDashboard className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-black text-gray-900 tracking-tight">KF ADMIN</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-3 p-3 rounded-2xl font-bold transition-all ${isActive("/admin/dashboard")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                >
                    <LayoutDashboard className="h-5 w-5" />
                    Genel Bakış
                </Link>
                <Link
                    href="/admin/blog"
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive("/admin/blog") || pathname.startsWith("/admin/blog")
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-500 hover:bg-gray-50 font-medium"
                        }`}
                >
                    <FileText className="h-5 w-5" />
                    Blog Yazıları
                </Link>
                <Link
                    href="/admin/support"
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${isActive("/admin/support")
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-500 hover:bg-gray-50 font-medium"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5" />
                        Destek Talepleri
                    </div>
                    {ticketCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {ticketCount}
                        </span>
                    )}
                </Link>
                <Link
                    href="/admin/subscribers"
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive("/admin/subscribers")
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-500 hover:bg-gray-50 font-medium"
                        }`}
                >
                    <Users className="h-5 w-5" />
                    Aboneler
                </Link>
                <Link
                    href="/admin/settings"
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive("/admin/settings")
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-500 hover:bg-gray-50 font-medium"
                        }`}
                >
                    <Settings className="h-5 w-5" />
                    Site Ayarları
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 p-3 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold"
                >
                    <LogOut className="h-5 w-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
