"use client";
import { useState, useEffect, useCallback } from "react";
import type { Bookmark } from "@/types/quran";

const KEY = "quran_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
  }, []);

  const save = useCallback((updated: Bookmark[]) => {
    setBookmarks(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  }, []);

  const addBookmark = useCallback(
    (bookmark: Omit<Bookmark, "savedAt">) => {
      const updated = [
        ...bookmarks.filter(
          (b) =>
            !(
              b.surahNumber === bookmark.surahNumber &&
              b.ayahNumber === bookmark.ayahNumber
            )
        ),
        { ...bookmark, savedAt: new Date().toISOString() },
      ];
      save(updated);
    },
    [bookmarks, save]
  );

  const removeBookmark = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      save(
        bookmarks.filter(
          (b) =>
            !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
        )
      );
    },
    [bookmarks, save]
  );

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) =>
      bookmarks.some(
        (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
      ),
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
