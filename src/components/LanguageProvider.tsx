"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { Locale, defaultLocale, getLocaleFromCookie } from "../i18n/config";

interface LanguageContextType {
  currentLanguage: Locale;
  changeLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Read locale from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return undefined;
    };

    const cookieLocale = getCookie("locale");
    const locale = getLocaleFromCookie(cookieLocale);
    setCurrentLanguage(locale);
  }, []);

  const changeLanguage = (lang: Locale) => {
    setCurrentLanguage(lang);

    document.cookie = `locale=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    localStorage.setItem("locale", lang);
  };

  const value = useMemo(() => ({ currentLanguage, changeLanguage }), [currentLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
