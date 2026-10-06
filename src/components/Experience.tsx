"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle } from "lucide-react";
import { EXPERIENCE_LIST } from "@/data/portfolio";

export default function Experience() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_LIST[0].id);

  return (
    <section id="experience" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              03 // Career Path
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Interactive Experience Timeline
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            A decade-long track record spanning public informatics education, competitive programming coaching, and high-volume e-commerce administration.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
          {EXPERIENCE_LIST.map((exp) => {
            const isSelected = selectedId === exp.id;
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    exp.isCurrent
                      ? "bg-emerald-500 border-white dark:border-[#090a0f] ring-4 ring-emerald-500/20"
                      : "bg-neutral-300 dark:bg-neutral-700 border-white dark:border-[#090a0f]"
                  }`}
                />

                {/* Experience Card */}
                <div
                  onClick={() => setSelectedId(exp.id)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                    isSelected
                      ? "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 shadow-xs"
                      : "border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/20 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {exp.period}
                      </span>
                      {exp.isCurrent && (
                        <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Current Role
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location} • {exp.type}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-3">
                    {exp.organization}
                  </div>

                  {/* Short Narrative */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Responsibilities list */}
                  <div className="space-y-2 mb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Key Highlights & Contributions:
                    </div>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
