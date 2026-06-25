import Link from "next/link";
import { getRandomVerse } from "@/lib/quran-api";
import { IslamicPattern, IslamicBorder } from "@/components/IslamicPattern";

export const revalidate = 86400;

const features = [
  {
    icon: "📖",
    titleAr: "تصفح السور",
    titleEn: "Browse Surahs",
    descAr: "اقرأ القرآن كاملاً مع ترجمة إنجليزية",
    descEn: "Read the full Quran with English translation",
    href: "/surah",
    color: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
    border: "border-emerald-200/60 dark:border-emerald-800/30",
  },
  {
    icon: "🔍",
    titleAr: "بحث في القرآن",
    titleEn: "Search Quran",
    descAr: "ابحث عن أي آية أو كلمة في القرآن الكريم",
    descEn: "Find any verse or word in the Holy Quran",
    href: "/search",
    color: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    border: "border-blue-200/60 dark:border-blue-800/30",
  },
  {
    icon: "🔖",
    titleAr: "المفضلة",
    titleEn: "Bookmarks",
    descAr: "احفظ الآيات التي تؤثر في قلبك",
    descEn: "Save the verses that touch your heart",
    href: "/bookmarks",
    color: "from-gold-50 to-amber-50 dark:from-gold-900/20 dark:to-amber-900/20",
    border: "border-gold-200/60 dark:border-gold-800/30",
  },
  {
    icon: "🕌",
    titleAr: "أوقات الصلاة",
    titleEn: "Prayer Times",
    descAr: "مواقيت الصلاة حسب موقعك الجغرافي",
    descEn: "Prayer times based on your location",
    href: "/prayer-times",
    color: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
    border: "border-purple-200/60 dark:border-purple-800/30",
  },
];

export default async function HomePage() {
  let verseOfDay = null;
  try {
    verseOfDay = await getRandomVerse();
  } catch {}

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-4">
        <IslamicPattern opacity={0.05} />
        {/* Gradient orbs */}
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-sm font-cairo mb-8">
            <span>✨</span>
            <span>بسم الله الرحمن الرحيم</span>
          </div>

          <h1 className="font-amiri text-5xl sm:text-7xl text-slate-800 dark:text-slate-100 mb-6 leading-tight" dir="rtl">
            نور القرآن
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-cairo mb-3 max-w-2xl mx-auto" dir="rtl">
            منصتك الشاملة للقرآن الكريم — تلاوة، بحث، ترجمة، ومواقيت الصلاة
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-inter mb-10">
            Your complete Quran companion — recitation, search, translation & prayer times
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/surah"
              className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-cairo font-semibold text-base transition-all hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
            >
              ابدأ القراءة
            </Link>
            <Link
              href="/search"
              className="px-8 py-3.5 rounded-full border border-gold-300 dark:border-gold-700 text-gold-700 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-cairo font-semibold text-base transition-colors"
            >
              ابحث في القرآن
            </Link>
          </div>
        </div>
      </section>

      <IslamicBorder className="max-w-4xl mx-auto w-full px-4 text-gold-400" />

      {/* ── Verse of the Day ── */}
      {verseOfDay && (
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-amiri text-3xl text-slate-800 dark:text-slate-100" dir="rtl">
                آية اليوم
              </h2>
              <p className="text-sm text-slate-400 font-inter mt-1">Verse of the Day</p>
            </div>

            <div className="relative rounded-3xl border border-gold-200/50 dark:border-gold-800/30 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm p-8 sm:p-12 overflow-hidden">
              <IslamicPattern opacity={0.04} />
              <div className="relative">
                {/* Decorative quote mark */}
                <div className="text-6xl text-gold-200 dark:text-gold-900/60 font-amiri leading-none mb-4 text-right" aria-hidden>
                  ❝
                </div>
                <p
                  className="font-amiri text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 text-right leading-loose mb-6"
                  dir="rtl"
                >
                  {verseOfDay.text}
                </p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-6" />
                <p className="text-base text-slate-500 dark:text-slate-400 font-inter text-left leading-relaxed mb-4" dir="ltr">
                  {verseOfDay.translation}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-cairo text-center">
                  {verseOfDay.surah?.name} • {verseOfDay.surah?.englishName} ({verseOfDay.numberInSurah})
                </p>

                <div className="mt-6 flex justify-center">
                  <Link
                    href={`/surah/${verseOfDay.surah?.number}`}
                    className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline font-cairo"
                  >
                    اقرأ السورة كاملة ←
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-amiri text-3xl text-slate-800 dark:text-slate-100 mb-2" dir="rtl">
              كل ما تحتاجه
            </h2>
            <p className="text-slate-400 text-sm font-inter">Everything you need in one place</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={`group rounded-2xl border p-6 bg-gradient-to-br ${f.color} ${f.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-3`}
              >
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold font-cairo text-slate-800 dark:text-slate-100 text-lg" dir="rtl">
                    {f.titleAr}
                  </h3>
                  <p className="text-xs text-slate-400 font-inter mt-0.5">{f.titleEn}</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-cairo" dir="rtl">
                  {f.descAr}
                </p>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium font-cairo group-hover:underline mt-auto">
                  اذهب ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-4 border-t border-gold-200/30 dark:border-gold-800/20">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: "١١٤", label: "سورة", en: "Surahs" },
            { num: "٦٢٣٦", label: "آية", en: "Verses" },
            { num: "٣٠", label: "جزء", en: "Juz" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-amiri text-4xl sm:text-5xl text-gold-500 mb-1">{s.num}</p>
              <p className="font-cairo text-slate-600 dark:text-slate-400 text-sm">{s.label}</p>
              <p className="font-inter text-slate-400 text-xs">{s.en}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
