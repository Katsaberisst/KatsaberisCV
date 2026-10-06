import React from "react";
import { Metadata } from "next";
import { LMSProvider } from "@/context/LMSContext";
import PortalHeader from "@/components/portal/PortalHeader";

export const metadata: Metadata = {
  title: "EdTech LMS Portal | Stelios Katsaberis",
  description:
    "Integrated Student & Teacher LMS Portal featuring tracked educational slide decks, interactive algorithmic quizzes, and comprehensive teacher analytics.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <LMSProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-200">
        <PortalHeader />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
          {children}
        </main>
      </div>
    </LMSProvider>
  );
}
