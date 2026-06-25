"use client";
import { useState, useEffect } from "react";
import type { Language } from "@/types/quran";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("quran_lang") as Language | null;
    if (stored) setLang(stored);
  }, []);

  const toggleLang = () => {
    const next: Language = lang === "ar" ? "en" : "ar";
    setLang(next);
    localStorage.setItem("quran_lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, toggleLang, isRTL: lang === "ar" };
}
