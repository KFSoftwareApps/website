"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Zap, Shield, Layout, ArrowRight, Construction } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AboutClient({ initialLang }: { initialLang?: string }) {
  const { t, locale, setLocale } = useTranslation();

  useEffect(() => {
    if (initialLang && (initialLang === "tr" || initialLang === "en")) {
      setLocale(initialLang as "tr" | "en");
    }
  }, [initialLang, setLocale]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8 gap-2">
          <Link
            href="/about/tr/"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === "tr" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
          >
            TR
          </Link>
          <Link
            href="/about/en/"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
          >
            EN
          </Link>
        </div>

        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-black leading-7 text-blue-600 uppercase tracking-widest">
            {t("about.whoWeAre")}
          </h2>
          <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
            {locale === "tr" ? (
              <>
                Karmaşıklığı <span className="text-blue-600">{t("about.simplify")}</span>
              </>
            ) : (
              <>
                We <span className="text-blue-600">Simplify</span> Complexity.
              </>
            )}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">{t("about.subtitle")}</p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
              <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-gray-900">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Zap className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                </div>
                {t("about.speed")}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{t("about.speedDesc")}</p>
              </dd>
            </div>
            <div className="flex flex-col p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
              <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-gray-900">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Shield className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                </div>
                {t("about.reliability")}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{t("about.reliabilityDesc")}</p>
              </dd>
            </div>
            <div className="flex flex-col p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
              <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-gray-900">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Layout className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                </div>
                {t("about.design")}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{t("about.designDesc")}</p>
              </dd>
            </div>
          </dl>
        </div>

        {/* Portfolio Section */}
        <div className="mt-32 sm:mt-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2rem] blur-2xl opacity-50 -z-10"></div>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                  {t("about.ourApps")}
                </h3>
                <div className="space-y-6">
                  {/* PuantajX */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
                    <div className="h-14 w-14 bg-white rounded-lg p-2 border border-gray-200 flex-shrink-0">
                      <Image
                        src="/apps/puantajx/logo.png"
                        alt="PuantajX"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-900">PuantajX</h4>
                      <p className="text-sm text-gray-600 truncate">
                        {locale === "tr"
                          ? "Şantiye ve personel yönetimi."
                          : "Construction and personnel management."}
                      </p>
                      <div className="flex gap-3 mt-2 md:hidden">
                        <Link href="/apps/puantajx/" className="text-xs font-medium text-blue-600">
                          {t("about.review")}
                        </Link>
                        <Link
                          href="/support/?app=puantajx"
                          className="text-xs font-medium text-gray-500"
                        >
                          {t("about.support")}
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                      <Link href="/support/?app=puantajx">
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          {t("about.support")}
                        </Button>
                      </Link>
                      <Link href="/apps/puantajx/">
                        <Button variant="outline" size="sm">
                          {t("about.review")}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* FişMatik */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors group">
                    <div className="h-14 w-14 bg-white rounded-lg p-2 border border-gray-200 flex-shrink-0">
                      <Image
                        src="/apps/fismatik/logo.png"
                        alt="FişMatik"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-900">FişMatik</h4>
                      <p className="text-sm text-gray-600 truncate">
                        {locale === "tr"
                          ? "Harcamalarınızı tek dokunuşla yönetin."
                          : "Manage your expenses with one touch."}
                      </p>
                      <div className="flex gap-3 mt-2 md:hidden">
                        <Link href="/apps/fismatik/" className="text-xs font-medium text-purple-600">
                          {t("about.review")}
                        </Link>
                        <Link
                          href="/support/?app=fismatik"
                          className="text-xs font-medium text-gray-500"
                        >
                          {t("about.support")}
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                      <Link href="/support/?app=fismatik">
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          {t("about.support")}
                        </Button>
                      </Link>
                      <Link href="/apps/fismatik/">
                        <Button variant="outline" size="sm">
                          {t("about.review")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/apps/">
                    <Button className="w-full sm:w-auto">
                      {t("about.exploreAll")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Roadmap - Right Column */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 flex items-center gap-2">
                <Construction className="h-6 w-6 text-gray-400" /> {t("about.roadmap")}
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> PuantajX
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-1">
                      <li>{t("about.roadmapPuantajX_1")}</li>
                      <li>{t("about.roadmapPuantajX_2")}</li>
                      <li>{t("about.roadmapPuantajX_3")}</li>
                    </ul>
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> FişMatik
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-1">
                      <li>{t("about.roadmapFisMatik_1")}</li>
                      <li>{t("about.roadmapFisMatik_2")}</li>
                      <li>{t("about.roadmapFisMatik_3")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
