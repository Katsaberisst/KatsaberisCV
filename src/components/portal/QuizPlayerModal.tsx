"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Quiz, QuizAttemptRecord } from "@/data/lmsData";
import { useLMS } from "@/context/LMSContext";

interface QuizPlayerModalProps {
  quiz: Quiz | null;
  onClose: () => void;
  onCompleted?: (attempt: QuizAttemptRecord) => void;
}

export default function QuizPlayerModal({ quiz, onClose, onCompleted }: QuizPlayerModalProps) {
  const { submitQuiz, currentUser } = useLMS();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttemptRecord | null>(null);

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (attemptResult) return; // Prevent modifying after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitQuiz(quiz.id, selectedAnswers);
      setAttemptResult(result);
      if (onCompleted) onCompleted(result);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setAttemptResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10131c] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                {quiz.category}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Passing: {quiz.passingScore}%
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 line-clamp-1">
              {quiz.title}
            </h3>
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!attemptResult ? (
            /* Active Quiz Taking Interface */
            <div className="space-y-6">
              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">
                  <span>
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <span>
                    {answeredCount}/{totalQuestions} Answered
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 font-medium ring-1 ring-blue-500"
                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                            isSelected
                              ? "bg-blue-600 text-white font-bold"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Results & Itemized Breakdown View */
            <div className="space-y-6">
              {/* Score Summary Banner */}
              <div
                className={`p-6 rounded-2xl border text-center space-y-3 ${
                  attemptResult.passed
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-100"
                }`}
              >
                <div className="inline-flex p-3 rounded-full bg-white dark:bg-neutral-900 shadow-sm mx-auto">
                  <Award
                    className={`w-8 h-8 ${
                      attemptResult.passed ? "text-emerald-500" : "text-rose-500"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-black">
                    {attemptResult.passed ? "Quiz Passed!" : "Review Required"}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium mt-1 opacity-80">
                    You scored {attemptResult.score}% ({attemptResult.correctCount} of{" "}
                    {attemptResult.totalQuestions} questions correct). Attempt #{attemptResult.attemptNumber} logged.
                  </p>
                </div>
              </div>

              {/* Itemized Questions Breakdown */}
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  Detailed Question Breakdown
                </div>

                {attemptResult.answers.map((ans, idx) => (
                  <div
                    key={ans.questionId}
                    className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
                      ans.isCorrect
                        ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10"
                        : "border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Q{idx + 1}. {ans.questionText}
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

                    <div className="text-xs space-y-1 pt-1 font-mono">
                      <div>
                        Your answer:{" "}
                        <span className={ans.isCorrect ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold"}>
                          {ans.selectedOption >= 0 ? ans.options[ans.selectedOption] : "None"}
                        </span>
                      </div>
                      {!ans.isCorrect && (
                        <div>
                          Correct answer:{" "}
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            {ans.options[ans.correctOption]}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                      💡 {ans.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between">
          {!attemptResult ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
                <button
                  type="button"
                  disabled={currentIndex === totalQuestions - 1}
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitQuiz}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Scoring..." : `Submit Quiz (${answeredCount}/${totalQuestions})`}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 cursor-pointer"
              >
                Close &amp; Return to Hub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
