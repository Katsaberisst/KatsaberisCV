import React from "react";

export default function ProjectsSkeleton() {
  return (
    <section id="projects" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 animate-pulse">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-3 w-48 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
            <div className="h-9 w-72 sm:w-96 bg-neutral-200 dark:bg-neutral-800 rounded-lg mt-1" />
          </div>
          <div className="h-4 w-64 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex items-center gap-2 mb-8 animate-pulse">
          <div className="h-8 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* 6 Grid Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/30 flex flex-col justify-between animate-pulse"
            >
              <div>
                {/* Top Row: Language badge & fork pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="h-5 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-14 rounded-md bg-neutral-100 dark:bg-neutral-800" />
                </div>

                {/* Repo Name */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                  <div className="h-5 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>

                {/* Description lines */}
                <div className="space-y-2 mt-3">
                  <div className="h-3.5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-3.5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>

              {/* Bottom Meta & Button */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
                <div className="h-10 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
