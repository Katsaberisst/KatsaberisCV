"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Filter,
  FileText,
  Play,
  RotateCcw,
  Presentation,
  Check,
  Eye,
  GraduationCap,
} from "lucide-react";
import { EducationalMaterial, Quiz } from "@/data/lmsData";
import { useLMS } from "@/context/LMSContext";
import MaterialViewerModal from "@/components/portal/MaterialViewerModal";
import QuizPlayerModal from "@/components/portal/QuizPlayerModal";

export default function StudentDashboardPage() {
  const { currentUser, materials, quizzes, viewRecords, attemptRecords } = useLMS();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeMaterial, setActiveMaterial] = useState<EducationalMaterial | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Student's specific analytics
  const studentViews = useMemo(() => {
    if (!currentUser) return [];
    return viewRecords.filter((v) => v.userId === currentUser.id);
  }, [viewRecords, currentUser]);

  const studentAttempts = useMemo(() => {
    if (!currentUser) return [];
    return attemptRecords.filter((a) => a.userId === currentUser.id);
  }, [attemptRecords, currentUser]);

  const materialsViewedCount = studentViews.length;
  const totalQuizzesAttempted = studentAttempts.length;
  const avgScore = useMemo(() => {
    if (studentAttempts.length === 0) return 0;
    const sum = studentAttempts.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / studentAttempts.length);
  }, [studentAttempts]);

  // Categories
  const categories = [
    { id: "all", name: "All Topics" },
    { id: "Algorithms & Logic", name: "Algorithms & Logic" },
    { id: "Web Development", name: "Web Development" },
    { id: "EdTech & Robotics", name: "EdTech & Robotics" },
    { id: "Data & Databases", name: "Data & Databases" },
  ];

  const filteredMaterials = useMemo(() => {
    if (activeCategory === "all") return materials;
    return materials.filter((m) => m.category === activeCategory);
  }, [materials, activeCategory]);

  return (
    <div className="space-y-12 pb-16">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-3.5 h-3.5" />
              Student Learning Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Welcome back, {currentUser?.name || "Student"}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Access curated computer science slide decks, architectural guides, and interactive quizzes. Your progress and comprehension are recorded in real-time.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {materialsViewedCount}/{materials.length}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Materials Viewed
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {totalQuizzesAttempted}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Quizzes Taken
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {avgScore}%
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Avg. Score
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Educational Materials Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              01 // Learning Resources
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Curated Educational Materials
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Clicking any material tracks your attendance and engagement for your teacher.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMaterials.map((mat) => {
            const viewRecord = studentViews.find((v) => v.materialId === mat.id);
            const isViewed = !!viewRecord;

            return (
              <div
                key={mat.id}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                      {mat.category}
                    </span>

                    {isViewed ? (
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Viewed ({viewRecord.viewCount}x)
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                        Not viewed yet
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {mat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Presentation className="w-3.5 h-3.5 text-blue-500" />
                    <span>{mat.duration}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveMaterial(mat)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open Material
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive Quizzes Section */}
      <section className="space-y-6 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              02 // Knowledge Assessment
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Interactive Multiple-Choice Quizzes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Test algorithmic reasoning and modern web fundamentals with instant scoring and itemized explanations.
          </p>
        </div>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quizzes.map((quiz) => {
            const attempts = studentAttempts.filter((a) => a.quizId === quiz.id);
            const highestAttempt =
              attempts.length > 0
                ? [...attempts].sort((a, b) => b.score - a.score)[0]
                : null;

            return (
              <div
                key={quiz.id}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      {quiz.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {quiz.questions.length} Questions
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1 leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">
                    {quiz.description}
                  </p>

                  {/* Past performance */}
                  <div className="mt-4 p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800/60">
                    {highestAttempt ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500 dark:text-neutral-400">Best Score:</span>
                        <span
                          className={`font-mono font-bold ${
                            highestAttempt.passed
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {highestAttempt.score}% ({attempts.length} attempts)
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-neutral-400 font-mono text-center">
                        No attempts yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveQuiz(quiz)}
                    className="w-full py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {highestAttempt ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retake Quiz
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Start Quiz
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modals */}
      <MaterialViewerModal
        material={activeMaterial}
        onClose={() => setActiveMaterial(null)}
      />

      <QuizPlayerModal
        quiz={activeQuiz}
        onClose={() => setActiveQuiz(null)}
      />
    </div>
  );
}
