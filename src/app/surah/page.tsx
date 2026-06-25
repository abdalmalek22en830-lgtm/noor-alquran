import { getSurahs } from "@/lib/quran-api";
import { SurahGrid } from "@/components/SurahGrid";
import { IslamicPattern } from "@/components/IslamicPattern";

export const revalidate = 86400;

export default async function SurahsPage() {
  let surahs: Awaited<ReturnType<typeof getSurahs>> = [];
  try {
    surahs = await getSurahs();
  } catch {}

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden py-14 px-4 border-b border-gold-200/30 dark:border-gold-800/20">
        <IslamicPattern opacity={0.04} />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="font-amiri text-4xl sm:text-5xl text-slate-800 dark:text-slate-100 mb-3" dir="rtl">
            سور القرآن الكريم
          </h1>
          <p className="text-slate-400 font-inter text-sm">114 Surahs of the Holy Quran</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {surahs.length > 0 ? (
          <SurahGrid surahs={surahs} />
        ) : (
          <div className="text-center py-24 text-slate-400 font-cairo">
            <p className="text-4xl mb-4">⚠️</p>
            <p>تعذّر تحميل السور. يرجى التحقق من اتصالك بالإنترنت.</p>
            <p className="text-sm font-inter mt-2">Failed to load surahs. Check your internet connection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
