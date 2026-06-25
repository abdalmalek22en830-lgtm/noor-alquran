"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import type { SurahDetail } from "@/types/quran";
import { getSurah, RECITERS, type ReciterId } from "@/lib/quran-api";
import { VerseCard } from "@/components/VerseCard";
import { AudioPlayer } from "@/components/AudioPlayer";
import { IslamicPattern } from "@/components/IslamicPattern";
import { useLanguage } from "@/hooks/useLanguage";
import { toArabicNumerals } from "@/lib/utils";

export default function SurahClient() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [currentAyahIdx, setCurrentAyahIdx] = useState<number>(-1);
  const [reciter, setReciter] = useState<ReciterId>("ar.alafasy");

  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setCurrentAudio(null);
    setCurrentAyahIdx(-1);
    getSurah(id, reciter)
      .then(setSurah)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id, reciter]);

  const playAudio = useCallback(
    (audio: string) => {
      if (!surah) return;
      const idx = surah.ayahs.findIndex((a) => a.audio === audio);
      setCurrentAudio(audio);
      setCurrentAyahIdx(idx);
    },
    [surah]
  );

  const onAudioEnded = useCallback(() => {
    if (!surah) return;
    const next = currentAyahIdx + 1;
    if (next < surah.ayahs.length && surah.ayahs[next].audio) {
      setCurrentAudio(surah.ayahs[next].audio!);
      setCurrentAyahIdx(next);
    } else {
      setCurrentAudio(null);
      setCurrentAyahIdx(-1);
    }
  }, [surah, currentAyahIdx]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="font-cairo text-slate-400">
            {lang === "ar" ? "جارٍ التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="font-cairo text-slate-500 dark:text-slate-400">
            {lang === "ar" ? "تعذّر تحميل السورة" : "Failed to load surah"}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 rounded-full bg-emerald-600 text-white font-cairo text-sm hover:bg-emerald-700 transition-colors"
          >
            {lang === "ar" ? "عودة" : "Go back"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="relative overflow-hidden py-12 px-4 border-b border-gold-200/30 dark:border-gold-800/20 bg-gradient-to-b from-emerald-50/50 dark:from-emerald-900/10 to-transparent">
        <IslamicPattern opacity={0.04} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push("/surah")}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-cairo transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              {lang === "ar" ? "السور" : "Surahs"}
            </button>
            <div className="flex gap-2">
              {id > 1 && (
                <button
                  onClick={() => router.push(`/surah/${id - 1}`)}
                  className="px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-cairo transition-colors"
                >
                  {lang === "ar" ? "السابقة ←" : "← Prev"}
                </button>
              )}
              {id < 114 && (
                <button
                  onClick={() => router.push(`/surah/${id + 1}`)}
                  className="px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-cairo transition-colors"
                >
                  {lang === "ar" ? "→ التالية" : "Next →"}
                </button>
              )}
            </div>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-6" />
          <p className="font-amiri text-5xl text-slate-800 dark:text-slate-100 mb-2" dir="rtl">
            {surah.name}
          </p>
          <p className="font-cairo text-lg text-emerald-700 dark:text-emerald-400 mb-1">
            {surah.englishName} — {surah.englishNameTranslation}
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-inter">
            {surah.numberOfAyahs} verses •{" "}
            {surah.revelationType === "Meccan" ? "Meccan" : "Medinan"} •{" "}
            Surah {surah.number}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mt-6" />

          {surah.number !== 9 && (
            <p className="font-amiri text-3xl text-gold-600 dark:text-gold-400 mt-8 mb-2" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          )}
        </div>
      </div>

      <div className="sticky top-16 z-30 bg-cream/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gold-200/20 dark:border-gold-800/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-cairo">
              {lang === "ar" ? "الخط" : "Font"}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize((s) => Math.max(18, s - 2))}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors"
              >A-</button>
              <span className="text-xs text-slate-400 w-8 text-center">{fontSize}</span>
              <button
                onClick={() => setFontSize((s) => Math.min(48, s + 2))}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors"
              >A+</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-cairo">
              {lang === "ar" ? "القارئ" : "Reciter"}
            </span>
            <div className="flex rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-cairo">
              {RECITERS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setReciter(r.id)}
                  className={
                    reciter === r.id
                      ? "px-3 py-1.5 bg-emerald-600 text-white transition-colors"
                      : "px-3 py-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  }
                >
                  {lang === "ar" ? r.nameAr : r.nameEn}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              const first = surah.ayahs.find((a) => a.audio);
              if (first?.audio) playAudio(first.audio);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-cairo transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            {lang === "ar"
              ? `استمع • ${toArabicNumerals(surah.numberOfAyahs)} آية`
              : `Play All • ${surah.numberOfAyahs} verses`}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        {surah.ayahs.map((ayah) => (
          <VerseCard
            key={ayah.numberInSurah}
            ayah={ayah}
            surahNumber={surah.number}
            surahName={surah.name}
            surahEnglishName={surah.englishName}
            fontSize={fontSize}
            onPlayAudio={playAudio}
            currentAudio={currentAudio ?? undefined}
          />
        ))}
      </div>

      <AudioPlayer src={currentAudio} onEnded={onAudioEnded} />
    </div>
  );
}
