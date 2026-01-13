"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AppCard } from "@/components/ui/AppCard";
import Testimonials from "@/components/home/Testimonials";
import BlogShowcase from "@/components/home/BlogShowcase";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { appsContent } from "@/lib/content";
import { Zap, Shield, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomeClient() {
  const { t } = useTranslation();
  const featuredApps = [appsContent.puantajx, appsContent.fismatik];

  return (
    <div className="bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "KF Software",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "TRY",
            },
            softwareHelp: {
              "@type": "CreativeWork",
              url: "https://kfsoftware.app/support",
            },
            author: {
              "@type": "Organization",
              name: "KF Software",
              url: "https://kfsoftware.app",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="relative isolate pt-14">
        {/* Animated Background Gradients */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="py-20 sm:py-24 text-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-black tracking-tight text-gray-900 sm:text-7xl mb-6 lg:px-20"
              >
                {t("home.solutionsLead")} <br className="hidden sm:inline" />{" "}
                <span className="text-primary-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {t("home.smartSolutions")}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
              >
                {t("home.mainLead")} <br className="hidden sm:inline" /> {t("home.secondaryLead")}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <Link href="/apps/">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 rounded-full px-10 h-14 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300 text-white"
                  >
                    {t("home.ctaViewApps")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Personal Brand Block - Animated Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-12 border-b border-gray-100"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center uppercase tracking-widest text-[10px] sm:text-xs font-bold text-gray-400">
          "{t("home.brandMessage")}"
        </div>
      </motion.div>

      {/* Why Section - Staggered reveal on scroll */}
      <div className="py-20 sm:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {t("home.whyTitle")}
            </h2>
            <p className="mt-4 text-lg text-gray-500">{t("home.whySubtitle")}</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: t("home.fastTitle"),
                desc: t("home.fastDesc"),
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: t("home.secureTitle"),
                desc: t("home.secureDesc"),
                color: "bg-green-100 text-green-600",
              },
              {
                icon: "🚀",
                title: t("home.growthTitle"),
                desc: t("home.growthDesc"),
                color: "bg-purple-100 text-2xl",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} mb-6 group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Apps Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {t("home.featuredApps")}
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {featuredApps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <AppCard
                  name={app.name}
                  tagline={app.tagline}
                  href={`/apps/${app.id}/`}
                  iconPath={`/apps/${app.id}/logo.png`}
                  chips={app.chips ? app.chips.slice(0, 3) : []}
                  targetAudience={app.targetAudience}
                  webUrl={app.storeLinks?.web}
                  storeLinks={app.storeLinks}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Blog Showcase Section */}
      <BlogShowcase />

      {/* Newsletter Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
