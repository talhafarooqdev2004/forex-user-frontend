"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLanguage } from "./LanguageProvider";
import { useEffect, useState } from "react";

import en from "../messages/en.json";
import ru from "../messages/ru.json";
import zh from "../messages/zh.json";
import es from "../messages/es.json";

const messages = { en, ru, zh, es };

interface IntlProviderProps {
  children: React.ReactNode;
  initialLocale: string;
}

export function IntlProvider({ children, initialLocale }: IntlProviderProps) {
  const { currentLanguage } = useLanguage();
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    setLocale(currentLanguage);
  }, [currentLanguage]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale as keyof typeof messages]}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
}
