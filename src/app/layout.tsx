import type { Metadata } from "next";
import { Amiri, Cairo, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri-loaded",
  display: "swap",
});

const cairo = Cairo({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo-loaded",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "نور القرآن | Noor Al-Quran",
  description: "منصة قرآنية شاملة — تلاوة، بحث، مفضلة، ومواقيت الصلاة",
  keywords: ["قرآن", "quran", "islam", "prayer times", "surah"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${cairo.variable} ${inter.variable}`}>
      <head>
        <style>{`
          :root {
            --font-amiri: var(--font-amiri-loaded, "Amiri", serif);
            --font-cairo: var(--font-cairo-loaded, "Cairo", sans-serif);
            --font-inter: var(--font-inter-loaded, "Inter", sans-serif);
          }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gold-200/30 dark:border-gold-800/20 py-6 text-center text-sm text-slate-400 dark:text-slate-500 font-cairo">
            <p>بسم الله الرحمن الرحيم — Made with ❤️ for Muslims worldwide</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
