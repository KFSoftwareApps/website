"use client";

import { AppCard } from "@/components/ui/AppCard";
import { appsContent } from "@/lib/content";
import { useTranslation } from "@/lib/i18n";

export default function AppsClient() {
  const { t } = useTranslation();
  const apps = Object.values(appsContent);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("common.apps")}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">{t("home.solutionsLead")}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              name={app.name}
              tagline={app.tagline}
              href={`/apps/${app.id}`}
              iconPath={`/apps/${app.id}/logo.png`}
              chips={app.chips}
              targetAudience={app.targetAudience}
              webUrl={app.storeLinks?.web}
              storeLinks={app.storeLinks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
