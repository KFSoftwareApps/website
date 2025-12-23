"use client";

import Link from "next/link";
import { Beaker } from "lucide-react";

import { useTranslation } from "@/lib/i18n";

export default function TestTeamWidget() {
  const { t } = useTranslation();

  return (
    <Link
      href="/join-test-team"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-white rounded-[1.25rem] shadow-2xl hover:scale-110 transition-all duration-300 group overflow-hidden"
      aria-label={t("common.testTeam")}
    >
      <img
        src="/test-team-icon.png"
        alt="Test Team"
        className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-300"
      />
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t("common.testTeam")}
      </span>
    </Link>
  );
}
