"use client";
import Link from "next/link";
import type { Surah } from "@/types/quran";
import { useLanguage } from "@/hooks/useLanguage";
import { toArabicNumerals } from "@/lib/utils";

const revelationColors = {
  Meccan: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Medinan: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
};

export function SurahGrid({ surahs }: { surahs: Surah[] }) {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {surahs.map((surah) => (
        <Link
          key={surah.number}
          href={`/surah/${surah.number}`}
          className="group relative rounded-2xl border border-gold-200/50 dark:border-gold-800/30 bg-white/70 dark:bg-slate-900/60 p-5 hover:border-gold-400/60 dark:hover:border-gold-600/40 hover:shadow-lg hover:shadow-gold-100/50 dark:hover:shadow-gold-900/20 transition-all duration-300 flex flex-col gap-3"
        >
          {/* Number */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full border-2 border-gold-400/60 dark:border-gold-600/40 flex items-center justify-center bg-gold-50/50 dark:bg-gold-900/10">
              <span className="text-sm font-bold text-gold-600 dark:text-gold-400 font-cairo">
                {lang === "ar" ? toArabicNumerals(surah.number) : surah.number}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${revelationColors[surah.revelationType]}`}>
              {lang === "ar"
                ? surah.revelationType === "Meccan" ? "مكية" : "مدنية"
                : surah.revelationType}
            </span>
          </div>

          {/* Names */}
          <div>
            <p className="font-amiri text-xl text-slate-800 dark:text-slate-100 text-right leading-snug">
              {surah.name}
            </p>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 font-cairo mt-0.5">
              {lang === "ar" ? surah.englishName : surah.englishName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-inter mt-0.5 italic">
              {surah.englishNameTranslation}
            </p>
          </div>

          {/* Ayah count */}
          <p className="text-xs text-slate-400 dark:text-slate-500 font-cairo">
            {lang === "ar"
              ? `${toArabicNumerals(surah.numberOfAyahs)} آية`
              : `${surah.numberOfAyahs} verses`}
          </p>

          {/* Hover arrow */}
          <div className="absolute bottom-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 dark:text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
