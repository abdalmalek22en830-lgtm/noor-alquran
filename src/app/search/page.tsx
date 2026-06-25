"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import type { Ayah } from "@/types/quran";
import { searchQuran } from "@/lib/quran-api";
import { useLanguage } from "@/hooks/useLanguage";

export default function SearchPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Ayah[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    startTransition(async () => {
      const data = await searchQuran(q);
      setResults(data);
      setSearched(true);
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-14 px-4 border-b border-gold-200/30 dark:border-gold-800/20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-amiri text-4xl text-slate-800 dark:text-slate-100 mb-3" dir="rtl">
            البحث في القرآن
          </h1>
          <p className="text-slate-400 font-inter text-sm mb-8">Search the Holy Quran in English</p>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              placeholder={lang === "ar" ? "ابحث بالإنجليزية... مثال: mercy, paradise" : "Search in English... e.g. mercy, paradise"}
              className="w-full px-6 py-4 pe-14 rounded-full border-2 border-gold-200/60 dark:border-gold-800/40 bg-white/80 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 font-cairo text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-600 transition-colors"
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={isPending}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {searched && results.length === 0 && !isPending && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-cairo text-slate-400">
              {lang === "ar" ? "لا توجد نتائج" : "No results found"}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-slate-400 font-cairo mb-6">
              {lang === "ar"
                ? `${results.length} نتيجة لـ "${query}"`
                : `${results.length} results for "${query}"`}
            </p>
            <div className="flex flex-col gap-4">
              {results.map((ayah) => (
                <Link
                  key={ayah.number}
                  href={`/surah/${ayah.surah?.number}#ayah-${ayah.numberInSurah}`}
                  className="group rounded-2xl border border-gold-200/50 dark:border-gold-800/30 bg-white/70 dark:bg-slate-900/60 p-5 hover:border-gold-400/60 dark:hover:border-gold-600/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400 font-cairo">
                        {ayah.surah?.name}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400 font-inter">
                        {ayah.surah?.englishName} {ayah.numberInSurah}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-gold-300 dark:border-gold-700 flex items-center justify-center shrink-0">
                      <span className="text-xs text-gold-600 dark:text-gold-400 font-cairo">{ayah.numberInSurah}</span>
                    </div>
                  </div>
                  <p
                    className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-inter text-left"
                    dir="ltr"
                  >
                    {ayah.translation}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="text-center py-16">
            <p className="text-5xl mb-6">📖</p>
            <p className="font-amiri text-2xl text-slate-400 dark:text-slate-500 mb-2" dir="rtl">
              ابحث في كتاب الله
            </p>
            <p className="text-sm font-inter text-slate-400">
              Search through 6236 verses of the Holy Quran
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
