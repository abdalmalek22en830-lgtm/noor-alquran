import type { PrayerTimes } from "@/types/quran";

export async function getPrayerTimesByCoords(
  lat: number,
  lng: number
): Promise<PrayerTimes> {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`
  );
  if (!res.ok) throw new Error("Prayer times API error");
  const json = await res.json();
  return json.data.timings as PrayerTimes;
}

export async function getPrayerTimesByCity(
  city: string,
  country: string
): Promise<PrayerTimes> {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=4`
  );
  if (!res.ok) throw new Error("Prayer times API error");
  const json = await res.json();
  return json.data.timings as PrayerTimes;
}
