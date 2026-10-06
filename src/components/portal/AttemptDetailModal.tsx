"use client";

import React from "react";
import { X, CheckCircle2, XCircle, Award, Calendar, User, Sparkles } from "lucide-react";
import { QuizAttemptRecord } from "@/data/lmsData";

interface AttemptDetailModalProps {
  attempt: QuizAttemptRecord | null;
  onClose: () => void;
}

export default function AttemptDetailModal({ attempt, onClose }: AttemptDetailModalProps) {
  if (!attempt) return null;

  const dateFormatted = new Date(attempt.completedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10131c] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`p-2.5 rounded-xl ${
                attempt.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              <Award className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                  {attempt.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  Attempt #{attempt.attemptNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                {attempt.quizTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Attempt Meta Strip */}
        <div className="px-5 py-3 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <User className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold">{attempt.studentName}</span>
            <span className="text-neutral-400">({attempt.studentEmail})</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <Calendar className="w-3.5 h-3.5" />
              {dateFormatted}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-bold ${
                attempt.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
              }`}
            >
              Score: {attempt.score}% ({attempt.correctCount}/{attempt.totalQuestions})
            </span>
          </div>
        </div>

        {/* Itemized Questions Breakdown */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Itemized Question Analysis
          </div>

          {attempt.answers.map((ans, idx) => (
            <div
              key={ans.questionId}
              className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm ${
                ans.isCorrect
                  ? "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : "border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {idx + 1}. {ans.questionText}
                </span>
                {ans.isCorrect ? (
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Correct
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 flex items-center gap-1 font-semibold shrink-0">
                    <XCircle className="w-4 h-4" /> Incorrect
                  </span>
                )}
              </div>

              {/* Options display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div
                  className={`p-2 rounded-lg border ${
                    ans.isCorrect
                      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200"
                      : "border-rose-500/40 bg-rose-500/5 text-rose-800 dark:text-rose-200"
                  }`}
                >
                  <span className="text-neutral-400 block text-[10px] uppercase">Student&apos;s Answer:</span>
                  {ans.selectedOption >= 0 ? ans.options[ans.selectedOption] : "Unanswered"}
                </div>

                {!ans.isCorrect && (
                  <div className="p-2 rounded-lg border border-emerald-500/40 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200">
                    <span className="text-neutral-400 block text-[10px] uppercase">Correct Answer:</span>
                    {ans.options[ans.correctOption]}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Explanation:</span>{" "}
                {ans.explanation}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}
