import type { Surah, SurahDetail, Ayah } from "@/types/quran";

const BASE = "https://api.alquran.cloud/v1";

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export async function getSurahs(): Promise<Surah[]> {
  return fetchJSON<Surah[]>("/surah");
}

interface RawAyah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
  surah?: { number: number; name: string; englishName: string };
}

interface RawSurahEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  ayahs: RawAyah[];
}

export type ReciterId = "ar.alafasy" | "ar.minshawi";

export const RECITERS: { id: ReciterId; nameAr: string; nameEn: string }[] = [
  { id: "ar.alafasy",  nameAr: "مشاري العفاسي",          nameEn: "Mishary Al-Afasy"    },
  { id: "ar.minshawi", nameAr: "محمد صديق المنشاوي",     nameEn: "M. S. Al-Minshawi"   },
];

export async function getSurah(id: number, reciter: ReciterId = "ar.alafasy"): Promise<SurahDetail> {
  const [arabic, english] = await Promise.all([
    fetchJSON<RawSurahEdition>(`/surah/${id}/${reciter}`),
    fetchJSON<RawSurahEdition>(`/surah/${id}/en.sahih`),
  ]);

  return {
    number: arabic.number,
    name: arabic.name,
    englishName: arabic.englishName,
    englishNameTranslation: arabic.englishNameTranslation,
    numberOfAyahs: arabic.numberOfAyahs,
    revelationType: arabic.revelationType,
    ayahs: arabic.ayahs.map((ayah, i) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      translation: english.ayahs[i]?.text ?? "",
      audio: ayah.audio,
    })),
  };
}

interface RandomAyahRaw {
  number: number;
  numberInSurah: number;
  text: string;
  surah: { number: number; name: string; englishName: string };
}

export async function getRandomVerse(): Promise<Ayah> {
  const ayah = await fetchJSON<RandomAyahRaw>("/ayah/random/ar.alafasy");
  const translation = await fetchJSON<RandomAyahRaw>(
    `/ayah/${ayah.number}/en.sahih`
  );
  return {
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    text: ayah.text,
    translation: translation.text,
    surah: ayah.surah,
  };
}

interface SearchResult {
  count: number;
  matches: Array<{
    number: number;
    text: string;
    numberInSurah: number;
    surah: { number: number; name: string; englishName: string };
    edition: { identifier: string };
  }>;
}

export async function searchQuran(query: string): Promise<Ayah[]> {
  if (!query.trim()) return [];
  const data = await fetchJSON<SearchResult>(
    `/search/${encodeURIComponent(query)}/all/en`
  );
  return data.matches.slice(0, 30).map((m) => ({
    number: m.number,
    numberInSurah: m.numberInSurah,
    text: "",
    translation: m.text,
    surah: m.surah,
  }));
}
