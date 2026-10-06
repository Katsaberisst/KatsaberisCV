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
  title: "Stelios Katsaberis | Remote Software Engineer & EdTech Specialist",
  description:
    "Personal portfolio and interactive CV of Stelios Katsaberis. Computer Science (B.Sc.) and International Business (M.Sc.) graduate, currently pursuing postgraduate studies in Advanced Digital Technologies (focusing on AI and Data). Experienced in full-stack web development (React, Next.js, PHP, MySQL), e-commerce administration, and computer science education.",
  keywords: [
    "Stelios Katsaberis",
    "Remote Software Engineer",
    "Next.js Developer",
    "React Developer",
    "EdTech Specialist",
    "IT Training Specialist",
    "AI and Data",
    "Full-Stack Web Development",
    "Computer Science Education",
  ],
  authors: [{ name: "Stelios Katsaberis" }],
  creator: "Stelios Katsaberis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stelios-katsaberis.dev",
    title: "Stelios Katsaberis | Remote Software Engineer & EdTech Specialist",
    description:
      "Interactive CV and Portfolio — Next.js, React, Tailwind CSS, AI/Data, and EdTech Leadership.",
    siteName: "Stelios Katsaberis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stelios Katsaberis | Remote Software Engineer & EdTech Specialist",
    description:
      "Interactive CV and Portfolio — Next.js, React, Tailwind CSS, AI/Data, and EdTech Leadership.",
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
