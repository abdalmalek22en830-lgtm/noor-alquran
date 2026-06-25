"use client";
import { useState } from "react";
import type { Ayah } from "@/types/quran";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, toArabicNumerals } from "@/lib/utils";

interface VerseCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  fontSize?: number;
  onPlayAudio?: (audio: string) => void;
  currentAudio?: string;
  showSurahName?: boolean;
}

export function VerseCard({
  ayah,
  surahNumber,
  surahName,
  surahEnglishName,
  fontSize = 28,
  onPlayAudio,
  currentAudio,
  showSurahName = false,
}: VerseCardProps) {
  const { lang } = useLanguage();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [copied, setCopied] = useState(false);

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const isPlaying = currentAudio === ayah.audio;

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(surahNumber, ayah.numberInSurah);
    } else {
      addBookmark({
        surahNumber,
        surahName,
        surahEnglishName,
        ayahNumber: ayah.numberInSurah,
        text: ayah.text,
        translation: ayah.translation ?? "",
      });
    }
  };

  const handleCopy = async () => {
    const content = `${ayah.text}\n\n${ayah.translation ?? ""}\n\n— ${surahName} (${surahEnglishName}) ${ayah.numberInSurah}`;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl border border-gold-200/50 dark:border-gold-800/30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-6 hover:border-gold-400/60 dark:hover:border-gold-600/40 hover:shadow-lg hover:shadow-gold-100/50 dark:hover:shadow-gold-900/20 transition-all duration-300">
      {/* Ayah number badge */}
      <div className="absolute top-4 end-4 w-9 h-9 rounded-full border-2 border-gold-400/60 dark:border-gold-600/40 flex items-center justify-center">
        <span className="text-xs font-bold text-gold-600 dark:text-gold-400 font-cairo">
          {lang === "ar" ? toArabicNumerals(ayah.numberInSurah) : ayah.numberInSurah}
        </span>
      </div>

      {/* Surah name (optional) */}
      {showSurahName && (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-3 font-cairo">
          {lang === "ar" ? surahName : surahEnglishName}
        </p>
      )}

      {/* Arabic text */}
      <p
        className="text-slate-800 dark:text-slate-100 leading-loose text-right mb-4 font-amiri"
        style={{ fontSize: `${fontSize}px`, lineHeight: "2" }}
        dir="rtl"
      >
        {ayah.text}
      </p>

      {/* Divider */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-4" />

      {/* Translation */}
      {ayah.translation && (
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-left font-inter" dir="ltr">
          {ayah.translation}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-lg transition-colors",
              bookmarked
                ? "text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/30"
                : "text-slate-400 hover:text-gold-600 hover:bg-gold-50 dark:hover:text-gold-400 dark:hover:bg-gold-900/20"
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
            aria-label="Copy verse"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            )}
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${surahName} - آية ${ayah.numberInSurah}`,
                  text: `${ayah.text}\n\n${ayah.translation ?? ""}`,
                });
              } else {
                handleCopy();
              }
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
            </svg>
          </button>
        </div>

        {/* Audio play button */}
        {ayah.audio && onPlayAudio && (
          <button
            onClick={() => onPlayAudio(ayah.audio!)}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              isPlaying
                ? "bg-emerald-600 text-white"
                : "border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            )}
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
                <span>{lang === "ar" ? "يعزف" : "Playing"}</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>{lang === "ar" ? "استمع" : "Listen"}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
