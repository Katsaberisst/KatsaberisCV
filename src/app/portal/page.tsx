"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { useLMS } from "@/context/LMSContext";

export default function PortalIndexPage() {
  const router = useRouter();
  const { currentUser, loginAsDemo } = useLMS();

  const handleEnterAs = (role: "student" | "teacher") => {
    loginAsDemo(role);
    if (role === "teacher") {
      router.push("/portal/teacher");
    } else {
      router.push("/portal/student");
    }
  };

  return (
    <div className="py-8 sm:py-16 max-w-4xl mx-auto space-y-12">
      {/* Hero Welcome */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Interactive EdTech Ecosystem
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Student &amp; Teacher LMS Portal
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          A minimalist learning management platform designed for Informatics &amp; Web Engineering courses. Choose a portal role below to explore student learning resources or inspect detailed teacher analytics.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Hub Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#10131c] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-2xs group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div>
              <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                Role: Student
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                Student Learning Hub
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore interactive slide decks on Algorithmic Complexity, Next.js architecture, and Scratch pedagogy. Take timed quizzes with instant grading and itemized explanations.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Interactive slide deck presentation viewer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Real-time view tracking for attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Instant quiz scoring with detailed reviews</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80">
            <button
              type="button"
              onClick={() => handleEnterAs("student")}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Enter as Student (Alex Morgan)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Teacher Analytics Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#10131c] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-2xs group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <div className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">
                Role: Teacher / Admin
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                Teacher &amp; Admin Analytics
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Verify if specific students have viewed course presentations, monitor attempt counters, and inspect full itemized breakdowns of student answers.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Live student material view tracking matrix</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Quiz attempt timestamps and scoring rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Itemized question analysis per student</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80">
            <button
              type="button"
              onClick={() => handleEnterAs("teacher")}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Enter as Teacher (Stelios)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Return to Portfolio Link */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Katsaberis Portfolio &amp; CV
        </Link>
      </div>
    </div>
  );
}
