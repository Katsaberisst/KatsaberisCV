"use client";

import React from "react";
import { GraduationCap, Award, Compass, Sparkles, BookOpen, Layers } from "lucide-react";
import { EDUCATION_LIST, PERSONAL_INFO } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              01 // Background & Trajectory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              About & Academic Roots
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            Bridging rigorous computer systems engineering, international economic strategy, and cutting-edge postgraduate AI research.
          </p>
        </div>

        {/* Narrative & Focus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Narrative Bio */}
          <div className="lg:col-span-7 space-y-5 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
            {PERSONAL_INFO.bio.map((paragraph, index) => (
              <p key={index} className="font-normal">
                {paragraph}
              </p>
            ))}

            {/* Remote Work & AI Focus Box */}
            <div className="mt-6 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Remote Readiness & Autonomous Execution
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-normal">
                Equipped for asynchronous team workflows, clear written documentation, and self-directed sprint execution. Accustomed to taking complex requirements from ideation to production-ready deployments.
              </p>
            </div>
          </div>

          {/* Right Highlights Matrix */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Full-Stack Architecture
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-9">
                Modern Next.js (App Router), React ecosystem, custom PHP/MySQL backend services, and REST APIs.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  AI & Data Integration
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-9">
                Applying advanced digital technologies, intelligent data handling, and automated processing pipelines.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Pedagogy & Training
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-9">
                10+ years distilling complex CS concepts into clear mental models for students, educators, and cross-functional teams.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Credentials Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-neutral-500" />
            Formal Education & Degrees
          </h3>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EDUCATION_LIST.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {edu.period}
                  </span>
                  {edu.status === "In Progress" ? (
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                      In Progress
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Graduated
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {edu.degree}
                </h4>
                <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                  {edu.field}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                  {edu.institution}
                </p>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
