"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
  TrendingUp,
  Users,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    traffic: "0",
    errors: "0",
    status: "Kontrol ediliyor...",
    chartData: [] as any[],
    subData: [] as any[],
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [healthStatus, setHealthStatus] = useState<
    "healthy" | "degraded" | "unhealthy" | "checking"
  >("checking");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
        fetchDashboardData();
        setHealthStatus("healthy");
        setStats((prev) => ({
          ...prev,
          status: "Aktif ✓",
        }));
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const fetchDashboardData = async () => {
    // 1. Fetch Total Posts
    const { count } = await supabase.from("posts").select("*", { count: "exact", head: true });

    // 2. Fetch Recent Posts
    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

    // 3. Fetch Site Traffic (Page Views)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: pageViews } = await supabase
      .from("page_views")
      .select("created_at")
      .gte("created_at", thirtyDaysAgo.toISOString());

    // Process Page Views for Chart
    const viewsMap = new Map();
    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
      viewsMap.set(dateStr, 0);
    }

    if (pageViews) {
      pageViews.forEach((view: any) => {
        const dateStr = new Date(view.created_at).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "short",
        });
        if (viewsMap.has(dateStr)) {
          viewsMap.set(dateStr, viewsMap.get(dateStr) + 1);
        }
      });
    }

    const chartData = Array.from(viewsMap).map(([name, views]) => ({ name, views }));

    // 4. Fetch Subscribers
    const { data: subscribers } = await supabase
      .from("newsletter_subscribers")
      .select("created_at")
      .gte("created_at", thirtyDaysAgo.toISOString());

    // Process Subscribers for Chart
    const subsMap = new Map();
    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
      subsMap.set(dateStr, 0);
    }

    if (subscribers) {
      subscribers.forEach((sub: any) => {
        const dateStr = new Date(sub.created_at).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "short",
        });
        if (subsMap.has(dateStr)) {
          subsMap.set(dateStr, subsMap.get(dateStr) + 1);
        }
      });
    }

    const subData = Array.from(subsMap).map(([name, subscribers]) => ({ name, subscribers }));

    // 5. Fetch Open Support Tickets
    const { count: ticketCount } = await supabase
      .from("support_tickets")
      .select("*", { count: "exact", head: true })
      .neq("status", "closed");

    setStats((prev) => ({
      ...prev,
      totalPosts: count || 0,
      traffic: pageViews?.length.toLocaleString("tr-TR") || "0",
      errors: ticketCount ? ticketCount.toString() : "0",
      chartData,
      subData,
    }));

    if (posts) {
      setRecentPosts(
        posts.map((post) => ({
          id: post.id,
          title: post.title,
          date: new Date(post.created_at).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          category: post.category || "Güncelleme",
        }))
      );
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Hoş Geldiniz, Admin</h1>
            <p className="text-gray-500">Sitenizi buradan yönetebilirsiniz.</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-blue-600 rounded-2xl px-6 gap-2">
              <Plus className="h-5 w-5" /> Yeni Yazı Ekle
            </Button>
          </Link>
        </header>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Traffic Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Günlük Trafik</h3>
                <p className="text-sm text-gray-400 font-medium">Son 30 gün</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                    minTickGap={30}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ stroke: "#2563eb", strokeWidth: 1, strokeDasharray: "4 4" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTraffic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subscribers Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Abone Artışı</h3>
                <p className="text-sm text-gray-400 font-medium">Son 30 gün</p>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.subData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                    minTickGap={30}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dx={-10}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6", radius: 8 }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="subscribers" fill="#9333ea" radius={[6, 6, 6, 6]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Son Blog Yazıları</h3>
            <div className="space-y-4">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <Link href={`/admin/blog/edit?id=${post.id}`} key={post.id}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center font-bold text-blue-600 shadow-sm uppercase">
                          {post.category?.charAt(0) || "Y"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                          <p className="text-xs text-gray-400">{post.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-all" />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Henüz yazı yok.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
