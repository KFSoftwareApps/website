"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import tr from "../messages/tr.json";
import en from "../messages/en.json";

type Translations = typeof tr;

interface TranslationOptions {
  defaultValue?: string;
  replace?: Record<string, string>;
}

interface LanguageContextType {
  locale: "tr" | "en";
  setLocale: (locale: "tr" | "en") => void;
  t: (path: string, options?: TranslationOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries = { tr, en };

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<"tr" | "en">("tr");

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as "tr" | "en";
    if (savedLocale && (savedLocale === "tr" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: "tr" | "en") => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (path: string, options?: TranslationOptions): string => {
    const keys = path.split(".");
    let result: any = dictionaries[locale];

    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        result = undefined;
        break;
      }
    }

    let finalString = typeof result === "string" ? result : options?.defaultValue || path;

    // Simple template variable replacement
    if (options?.replace) {
      Object.entries(options.replace).forEach(([key, value]) => {
        finalString = finalString.replace(`{${key}}`, value);
      });
    }

    return finalString;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
