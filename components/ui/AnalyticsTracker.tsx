"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Use a ref to prevent double firing in React Strict Mode dev
  const processedPath = useRef<string | null>(null);

  useEffect(() => {
    const handlePageView = async () => {
      const currentPath =
        pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      // Prevent duplicate hits for same path render (simple debounce)
      if (processedPath.current === currentPath) return;
      processedPath.current = currentPath;

      try {
        // Determine if this is an admin page or not to avoid polluting stats with admin views?
        // For now, let's track everything or maybe exclude /admin
        if (pathname.startsWith("/admin")) return;

        await supabase.from("page_views").insert({
          path: pathname,
          user_agent: window.navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        console.error("Analytics Error:", error);
      }
    };

    handlePageView();
  }, [pathname, searchParams]);

  return null;
}
