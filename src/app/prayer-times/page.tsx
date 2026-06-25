"use client";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrayerTime } from "@/lib/utils";
import { IslamicPattern } from "@/components/IslamicPattern";

const prayerInfo = {
  Fajr:    { ar: "الفجر",   en: "Fajr",    icon: "🌙" },
  Sunrise: { ar: "الشروق",  en: "Sunrise",  icon: "🌅" },
  Dhuhr:   { ar: "الظهر",   en: "Dhuhr",   icon: "☀️" },
  Asr:     { ar: "العصر",   en: "Asr",     icon: "🌤" },
  Maghrib: { ar: "المغرب",  en: "Maghrib",  icon: "🌇" },
  Isha:    { ar: "العشاء",  en: "Isha",    icon: "🌃" },
} as const;

export default function PrayerTimesPage() {
  const { times, loading, error, city } = usePrayerTimes();
  const { lang } = useLanguage();

  const now = new Date();
  const today = now.toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden py-14 px-4 border-b border-gold-200/30 dark:border-gold-800/20">
        <IslamicPattern opacity={0.04} />
        <div className="relative max-w-xl mx-auto text-center">
          <h1 className="font-amiri text-4xl text-slate-800 dark:text-slate-100 mb-2" dir="rtl">
            أوقات الصلاة
          </h1>
          <p className="text-slate-400 font-inter text-sm mb-2">Prayer Times</p>
          <p className="text-sm font-cairo text-slate-500 dark:text-slate-400">{today}</p>
          {city && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-cairo mt-1">📍 {city}</p>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-12">
        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="font-cairo text-slate-400">
              {lang === "ar" ? "جارٍ تحديد موقعك..." : "Getting your location..."}
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📍</p>
            <p className="font-cairo text-slate-500 dark:text-slate-400 mb-2">
              {lang === "ar"
                ? "يرجى السماح بالوصول إلى موقعك"
                : "Please allow location access"}
            </p>
            <p className="text-xs font-inter text-slate-400">
              We need your location to show accurate prayer times
            </p>
          </div>
        )}

        {times && !loading && (
          <div className="flex flex-col gap-3">
            {(Object.keys(prayerInfo) as (keyof typeof prayerInfo)[]).map((key) => {
              const info = prayerInfo[key];
              const time = times[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-2xl border border-gold-200/50 dark:border-gold-800/30 bg-white/70 dark:bg-slate-900/60 px-6 py-4 hover:border-gold-400/60 dark:hover:border-gold-600/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="font-amiri text-xl text-slate-800 dark:text-slate-100" dir="rtl">
                        {info.ar}
                      </p>
                      <p className="text-xs text-slate-400 font-inter">{info.en}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="font-cairo text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                      {lang === "ar" ? formatPrayerTime(time) : time}
                    </p>
                  </div>
                </div>
              );
            })}

            <p className="text-xs text-center text-slate-300 dark:text-slate-600 font-inter mt-4">
              Times calculated using Umm Al-Qura University method • Updated daily
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
