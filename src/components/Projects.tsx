"use client";

import React, { useState } from "react";
import { ExternalLink, Code2, Sparkles, FolderGit2, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";
import { PROJECTS_LIST, Project } from "@/data/portfolio";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "React / Full-Stack", label: "React & REST" },
    { id: "Vanilla JS", label: "Pure JavaScript" },
    { id: "AngularJS", label: "AngularJS" },
    { id: "WordPress & PHP", label: "WordPress & PHP" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              04 // Featured Engineering Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Featured Projects &amp; Codebases
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            Selected repositories demonstrating component architectures, algorithm design, relational database integration, and collaborative Git practices.
          </p>
        </div>

        {/* Project Filters */}
        <div className="w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === cat.id
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                      title="View code on GitHub (opens in new tab)"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Architectural Highlights */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Key Highlights:
                  </div>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Repository Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Explore more open repositories
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Check commits, code architecture, and additional projects on GitHub.
              </div>
            </div>
          </div>
          <a
            href="https://github.com/stelios-katsaberis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Visit github.com/stelios-katsaberis
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
