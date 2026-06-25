"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string | null;
  onEnded?: () => void;
  className?: string;
}

export function AudioPlayer({ src, onEnded, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { lang } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    audio.src = src;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); onEnded?.(); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDur);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (!src) return null;

  return (
    <div className={cn("sticky bottom-0 z-40 border-t border-gold-200/40 dark:border-gold-800/30 bg-cream/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-3", className)}>
      <audio ref={audioRef} />
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-colors"
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>

        <span className="text-xs text-slate-500 dark:text-slate-400 w-10 shrink-0 text-center">
          {fmt(progress)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={seek}
          className="flex-1 accent-emerald-600 h-1.5 rounded-full cursor-pointer"
        />

        <span className="text-xs text-slate-500 dark:text-slate-400 w-10 shrink-0 text-center">
          {fmt(duration)}
        </span>

        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-cairo shrink-0">
          {lang === "ar" ? "جارٍ التشغيل" : "Now Playing"}
        </p>
      </div>
    </div>
  );
}
