export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
  audio?: string;
  surah?: {
    number: number;
    name: string;
    englishName: string;
  };
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahNumber: number;
  text: string;
  translation: string;
  savedAt: string;
}

export type Language = "ar" | "en";

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}
