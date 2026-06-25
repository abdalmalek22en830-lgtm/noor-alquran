"use client";
import { useState, useEffect } from "react";
import type { PrayerTimes } from "@/types/quran";
import { getPrayerTimesByCoords } from "@/lib/prayer-api";

export function usePrayerTimes() {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getPrayerTimesByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setTimes(data);
          // Reverse geocode city name
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const geo = await res.json();
          setCity(
            geo.address?.city || geo.address?.town || geo.address?.state || ""
          );
        } catch {
          setError("Failed to load prayer times");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  }, []);

  return { times, loading, error, city };
}
