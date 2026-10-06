"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, FileText, CheckCircle2, BookOpen, ExternalLink, Download } from "lucide-react";
import { EducationalMaterial } from "@/data/lmsData";
import { useLMS } from "@/context/LMSContext";

interface MaterialViewerModalProps {
  material: EducationalMaterial | null;
  onClose: () => void;
}

export default function MaterialViewerModal({ material, onClose }: MaterialViewerModalProps) {
  const { recordMaterialView, currentUser } = useLMS();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (material) {
      setCurrentSlideIndex(0);
      // Record view in database/store
      recordMaterialView(material.id);
    }
  }, [material, recordMaterialView]);

  if (!material) return null;

  const slides = material.slideDeck || [];
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10131c] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                  {material.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  View Tracked
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 line-clamp-1">
                {material.title}
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

        {/* Modal Content / Slide Viewer */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {slides.length > 0 && currentSlide ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
                <span>
                  Slide {currentSlideIndex + 1} of {slides.length}
                </span>
                <span>Instructor: {material.author}</span>
              </div>

              <div className="p-6 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/30 min-h-[220px] flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    {currentSlide.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {currentSlide.content}
                  </p>
                </div>

                {currentSlide.codeSnippet && (
                  <div className="mt-4 p-3 rounded-lg bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto border border-neutral-800">
                    <pre>
                      <code>{currentSlide.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-neutral-400 mx-auto" />
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Resource Ready for Download &amp; Review
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                {material.description}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {currentUser ? `Logged view for ${currentUser.name}` : "Viewing as guest"}
          </div>

          <div className="flex items-center gap-2">
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentSlideIndex === slides.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Done Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
