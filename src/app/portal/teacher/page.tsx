"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Users,
  Eye,
  Award,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  RotateCcw,
} from "lucide-react";
import { useLMS } from "@/context/LMSContext";
import { QuizAttemptRecord } from "@/data/lmsData";
import AttemptDetailModal from "@/components/portal/AttemptDetailModal";

export default function TeacherDashboardPage() {
  const { users, materials, quizzes, viewRecords, attemptRecords, resetDemoData } = useLMS();

  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>("all");
  const [selectedQuizFilter, setSelectedQuizFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttemptRecord | null>(null);

  const studentUsers = useMemo(() => {
    return users.filter((u) => u.role === "student");
  }, [users]);

  // Aggregate metrics
  const totalStudents = studentUsers.length;
  const totalViews = viewRecords.reduce((acc, v) => acc + v.viewCount, 0);
  const totalAttempts = attemptRecords.length;
  const avgClassScore = useMemo(() => {
    if (attemptRecords.length === 0) return 0;
    const sum = attemptRecords.reduce((acc, a) => acc + a.score, 0);
    return Math.round(sum / attemptRecords.length);
  }, [attemptRecords]);

  // Filtered Quiz Attempts
  const filteredAttempts = useMemo(() => {
    return attemptRecords.filter((a) => {
      const matchesStudent =
        selectedStudentFilter === "all" || a.userId === selectedStudentFilter;
      const matchesQuiz = selectedQuizFilter === "all" || a.quizId === selectedQuizFilter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.quizTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStudent && matchesQuiz && matchesSearch;
    });
  }, [attemptRecords, selectedStudentFilter, selectedQuizFilter, searchQuery]);

  // Filtered Material Views
  const filteredMaterialViews = useMemo(() => {
    // Generate full matrix of student x material so the teacher can see who has NOT viewed too!
    const rows: {
      studentId: string;
      studentName: string;
      studentEmail: string;
      materialId: string;
      materialTitle: string;
      category: string;
      hasViewed: boolean;
      viewCount: number;
      lastViewedAt: string | null;
    }[] = [];

    studentUsers.forEach((student) => {
      materials.forEach((mat) => {
        const record = viewRecords.find(
          (v) => v.userId === student.id && v.materialId === mat.id
        );
        rows.push({
          studentId: student.id,
          studentName: student.name,
          studentEmail: student.email,
          materialId: mat.id,
          materialTitle: mat.title,
          category: mat.category,
          hasViewed: !!record,
          viewCount: record ? record.viewCount : 0,
          lastViewedAt: record ? record.lastViewedAt : null,
        });
      });
    });

    return rows.filter((r) => {
      const matchesStudent =
        selectedStudentFilter === "all" || r.studentId === selectedStudentFilter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.materialTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStudent && matchesSearch;
    });
  }, [studentUsers, materials, viewRecords, selectedStudentFilter, searchQuery]);

  return (
    <div className="space-y-12 pb-16">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Teacher &amp; Admin Analytics Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Class Activity &amp; Quiz Analytics
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Track student engagement with educational slide decks, inspect individual quiz attempt counts, and drill down into question-by-question response items.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {totalStudents}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Students
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {totalViews}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Material Views
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {totalAttempts}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Quiz Attempts
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {avgClassScore}%
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Class Avg.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Filters Bar */}
      <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by student or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden"
            />
          </div>

          {/* Student Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-neutral-400">Student:</span>
            <select
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
            >
              <option value="all">All Students ({studentUsers.length})</option>
              {studentUsers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quiz Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-neutral-400">Quiz:</span>
            <select
              value={selectedQuizFilter}
              onChange={(e) => setSelectedQuizFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
            >
              <option value="all">All Quizzes ({quizzes.length})</option>
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={resetDemoData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          title="Reset back to default seed records"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>

      {/* 1. Student Material Engagement Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              01 // Attendance &amp; Material Tracking
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Student Activity Overview
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {filteredMaterialViews.length} Matrix Records
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800/80 font-mono text-neutral-500 dark:text-neutral-400">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Educational Material</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Views</th>
                  <th className="py-3 px-4">Last Opened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-sans">
                {filteredMaterialViews.map((row, idx) => {
                  const lastOpenedFormatted = row.lastViewedAt
                    ? new Date(row.lastViewedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  return (
                    <tr
                      key={`${row.studentId}-${row.materialId}-${idx}`}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {row.studentName}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          {row.studentEmail}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-neutral-800 dark:text-neutral-200 max-w-xs truncate">
                        {row.materialTitle}
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                          {row.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        {row.hasViewed ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Viewed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                            <Clock className="w-3.5 h-3.5" />
                            Unopened
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">
                        {row.viewCount > 0 ? `${row.viewCount}x` : "0"}
                      </td>

                      <td className="py-3 px-4 font-mono text-neutral-500 dark:text-neutral-400">
                        {lastOpenedFormatted}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Comprehensive Quiz Analytics Section */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              02 // Performance &amp; Evaluation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Comprehensive Quiz Analytics
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {filteredAttempts.length} Attempts Logged
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#10131c] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800/80 font-mono text-neutral-500 dark:text-neutral-400">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Quiz Title</th>
                  <th className="py-3 px-4 text-center">Attempt #</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Result</th>
                  <th className="py-3 px-4">Completed Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-sans">
                {filteredAttempts.length > 0 ? (
                  filteredAttempts.map((attempt) => {
                    const completedFormatted = new Date(attempt.completedAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                    return (
                      <tr
                        key={attempt.id}
                        className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {attempt.studentName}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            {attempt.studentEmail}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-medium text-neutral-800 dark:text-neutral-200 max-w-xs truncate">
                            {attempt.quizTitle}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400">
                            {attempt.category}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                          #{attempt.attemptNumber}
                        </td>

                        <td className="py-3 px-4 text-center font-mono">
                          <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                            {attempt.score}%
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            ({attempt.correctCount}/{attempt.totalQuestions})
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          {attempt.passed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                              <XCircle className="w-3.5 h-3.5" />
                              Review
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono text-neutral-500 dark:text-neutral-400">
                          {completedFormatted}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedAttempt(attempt)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
                          >
                            <span>Breakdown</span>
                            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-400 font-mono text-xs">
                      No quiz attempts match the selected filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Itemized Modal */}
      <AttemptDetailModal
        attempt={selectedAttempt}
        onClose={() => setSelectedAttempt(null)}
      />
    </div>
  );
}
