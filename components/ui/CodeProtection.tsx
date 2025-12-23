"use client";

import { useEffect } from "react";

export default function CodeProtection() {
  useEffect(() => {
    // Sadece production ortamında veya genel olarak koruma sağlar
    const isProduction = process.env.NODE_ENV === "production";

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 engelleme
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I (İncele)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      // Ctrl+Shift+J (Konsol)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
      }
      // Ctrl+U (Kaynağı Görüntüle)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
    };

    // Dinleyicileri ekle
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Bileşen kaldırıldığında temizle
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
