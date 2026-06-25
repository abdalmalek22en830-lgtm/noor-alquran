"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = {
  ar: [
    { href: "/", label: "الرئيسية" },
    { href: "/surah", label: "السور" },
    { href: "/search", label: "بحث" },
    { href: "/bookmarks", label: "المفضلة" },
    { href: "/prayer-times", label: "أوقات الصلاة" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/surah", label: "Surahs" },
    { href: "/search", label: "Search" },
    { href: "/bookmarks", label: "Bookmarks" },
    { href: "/prayer-times", label: "Prayer Times" },
  ],
};

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navLinks[lang];

  return (
    <header className="sticky top-0 z-50 border-b border-gold-200/30 dark:border-gold-800/20 bg-cream/90 dark:bg-slate-950/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">☪</span>
          <span className="font-amiri text-xl text-emerald-700 dark:text-emerald-400 font-bold hidden sm:block">
            {lang === "ar" ? "نور القرآن" : "Noor Al-Quran"}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-sm font-semibold rounded-full border border-gold-300 dark:border-gold-700 text-gold-700 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><path d="M4 6h16M4 12h16M4 18h16"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gold-200/30 dark:border-gold-800/20 bg-cream dark:bg-slate-950 px-4 py-3">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
