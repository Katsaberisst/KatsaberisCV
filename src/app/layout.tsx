import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stelios Katsaberis | Web Developer & IT Education Professional",
  description:
    "Personal portfolio and interactive CV of Stelios Katsaberis. Computer Science graduate (B.Sc. in Digital Systems, University of Piraeus) and International Business (M.Sc., DUTH). Experienced in web development (React, Next.js, PHP, MySQL), AI-assisted tools (Codex, Anti-gravity), e-commerce administration, and informatics education.",
  keywords: [
    "Stelios Katsaberis",
    "Web Developer",
    "IT Education Professional",
    "Informatics Teacher",
    "React Developer",
    "Next.js Developer",
    "Codex",
    "Anti-gravity",
    "PHP MySQL",
    "E-Commerce Administration",
    "Computer Science Education",
  ],
  authors: [{ name: "Stelios Katsaberis" }],
  creator: "Stelios Katsaberis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://katsaberis-cv.vercel.app",
    title: "Stelios Katsaberis | Web Developer & IT Education Professional",
    description:
      "Interactive CV and Portfolio — Web Development, React, Next.js, AI Tools (Codex, Anti-gravity), and IT Education.",
    siteName: "Stelios Katsaberis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stelios Katsaberis | Web Developer & IT Education Professional",
    description:
      "Interactive CV and Portfolio — Web Development, React, Next.js, AI Tools (Codex, Anti-gravity), and IT Education.",
  },
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
