"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { toArabicNumerals } from "@/lib/utils";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-14 px-4 border-b border-gold-200/30 dark:border-gold-800/20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-amiri text-4xl text-slate-800 dark:text-slate-100 mb-2" dir="rtl">
            آياتي المفضلة
          </h1>
          <p className="text-slate-400 font-inter text-sm">
            {bookmarks.length} saved verse{bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-6">🔖</p>
            <p className="font-amiri text-2xl text-slate-400 dark:text-slate-500 mb-3" dir="rtl">
              لا توجد آيات محفوظة بعد
            </p>
            <p className="text-sm font-inter text-slate-400 mb-6">
              Start reading and bookmark verses that touch your heart
            </p>
            <Link
              href="/surah"
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-cairo text-sm font-medium transition-colors"
            >
              {lang === "ar" ? "ابدأ القراءة" : "Start Reading"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookmarks
              .slice()
              .reverse()
              .map((b) => (
                <div
                  key={`${b.surahNumber}-${b.ayahNumber}`}
                  className="rounded-2xl border border-gold-200/50 dark:border-gold-800/30 bg-white/70 dark:bg-slate-900/60 p-6"
                >
                  {/* Surah + Ayah ref */}
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href={`/surah/${b.surahNumber}`}
                      className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      <span className="font-amiri text-lg">{b.surahName}</span>
                      <span className="text-xs font-inter text-slate-400">
                        {b.surahEnglishName} • {lang === "ar" ? toArabicNumerals(b.ayahNumber) : b.ayahNumber}
                      </span>
                    </Link>
                    <button
                      onClick={() => removeBookmark(b.surahNumber, b.ayahNumber)}
                      className="p-2 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Remove bookmark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>

                  {/* Arabic text */}
                  <p
                    className="font-amiri text-2xl text-slate-800 dark:text-slate-100 text-right leading-loose mb-4"
                    dir="rtl"
                  >
                    {b.text}
                  </p>

                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-4" />

                  {/* Translation */}
                  {b.translation && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-inter leading-relaxed" dir="ltr">
                      {b.translation}
                    </p>
                  )}

                  {/* Saved date */}
                  <p className="text-xs text-slate-300 dark:text-slate-600 font-inter mt-3">
                    Saved {new Date(b.savedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
