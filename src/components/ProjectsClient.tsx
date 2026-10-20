"use client";

import React, { useState, useMemo } from "react";
import {
  ExternalLink,
  FolderGit2,
  GitFork,
  Star,
  Clock,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import {
  GitHubRepo,
  getLanguageInfo,
  getRepoDescription,
  formatRepoDate,
  GITHUB_USERNAME,
} from "@/data/github";
import { PROJECTS_LIST, Project } from "@/data/portfolio";

interface ProjectsClientProps {
  initialRepos: GitHubRepo[];
  error?: string | null;
  isFallback?: boolean;
  rateLimitRemaining?: string | null;
}

export default function ProjectsClient({
  initialRepos,
  error = null,
  isFallback = false,
  rateLimitRemaining = null,
}: ProjectsClientProps) {
  const [activeTab, setActiveTab] = useState<"github" | "case-studies">("github");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [caseStudyFilter, setCaseStudyFilter] = useState<string>("all");

  // Dynamically extract unique languages from fetched repositories
  const languageOptions = useMemo(() => {
    const langs = new Set<string>();
    initialRepos.forEach((repo) => {
      const info = getLanguageInfo(repo);
      if (info.label) langs.add(info.label);
    });
    return ["all", ...Array.from(langs)];
  }, [initialRepos]);

  // Filtered GitHub repositories
  const filteredRepos = useMemo(() => {
    if (selectedLanguage === "all") return initialRepos;
    return initialRepos.filter((repo) => {
      const info = getLanguageInfo(repo);
      return info.label.toLowerCase() === selectedLanguage.toLowerCase();
    });
  }, [initialRepos, selectedLanguage]);

  // Case study filters
  const caseStudyCategories = [
    { id: "all", label: "All Projects" },
    { id: "React / Full-Stack", label: "React & REST" },
    { id: "Vanilla JS", label: "Pure JavaScript" },
    { id: "AngularJS", label: "AngularJS" },
    { id: "WordPress & PHP", label: "WordPress & PHP" },
  ];

  const filteredCaseStudies = useMemo(() => {
    if (caseStudyFilter === "all") return PROJECTS_LIST;
    return PROJECTS_LIST.filter((p) => p.category === caseStudyFilter);
  }, [caseStudyFilter]);

  return (
    <section id="projects" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              04 // Codebases &amp; Open Source
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Featured Projects &amp; Repositories
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            Public repositories fetched directly from the GitHub API with Next.js ISR caching, alongside architectural case studies.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab("github")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "github"
                  ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Live GitHub Repositories</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                {initialRepos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("case-studies")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "case-studies"
                  ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Case Studies</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                {PROJECTS_LIST.length}
              </span>
            </button>
          </div>

          {/* Cache & API Status Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Next.js ISR: 3600s cache
            </span>
            {rateLimitRemaining && (
              <span className="hidden lg:inline-block text-[11px] text-neutral-400">
                API limit remaining: {rateLimitRemaining}
              </span>
            )}
          </div>
        </div>

        {/* Error / Fallback Alert Banner */}
        {error && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold">GitHub API Notice</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                  {error}. Serving verified cached repositories without interruption.
                </p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-900 dark:text-amber-200 hover:underline shrink-0"
            >
              <span>Inspect on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* TAB 1: LIVE GITHUB REPOSITORIES */}
        {activeTab === "github" && (
          <div>
            {/* Filter Pills for Languages */}
            <div className="w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {languageOptions.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedLanguage === lang
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                      : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800"
                  }`}
                >
                  {lang === "all" ? "All Languages" : lang}
                </button>
              ))}
            </div>

            {/* Repositories Grid */}
            {filteredRepos.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <FolderGit2 className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  No repositories match the &ldquo;{selectedLanguage}&rdquo; filter.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("all")}
                  className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono"
                >
                  Reset filter to all
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo) => {
                  const langInfo = getLanguageInfo(repo);
                  const description = getRepoDescription(repo);

                  return (
                    <div
                      key={repo.id}
                      className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-xs"
                    >
                      <div>
                        {/* Top Meta: Primary Language Badge + Fork Indicator */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${langInfo.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${langInfo.dotColor}`} />
                            {langInfo.label}
                          </span>

                          {repo.fork && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
                              Forked
                            </span>
                          )}
                        </div>

                        {/* Repository Name */}
                        <div className="flex items-center gap-2 mt-2 mb-2.5">
                          <FolderGit2 className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors shrink-0" />
                          <h3
                            className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate"
                            title={repo.name}
                          >
                            {repo.name}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-3 min-h-[4rem]">
                          {description}
                        </p>
                      </div>

                      {/* Card Bottom: Metadata and Direct Link */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                        {/* Metrics Bar */}
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-4 font-mono">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {formatRepoDate(repo.updated_at)}
                          </span>
                          <div className="flex items-center gap-3">
                            <span
                              className="flex items-center gap-1 text-[11px]"
                              title="Stargazers"
                            >
                              <Star className="w-3 h-3 text-neutral-400" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 text-[11px]" title="Forks">
                              <GitFork className="w-3 h-3 text-neutral-400" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>

                        {/* Direct Link to GitHub ("View on GitHub") */}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 border border-neutral-200/80 dark:border-neutral-700/80 transition-all group/btn shadow-2xs"
                        >
                          <GithubIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/btn:text-current transition-colors" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARCHITECTURAL CASE STUDIES */}
        {activeTab === "case-studies" && (
          <div>
            {/* Filters for Case Studies */}
            <div className="w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {caseStudyCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCaseStudyFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    caseStudyFilter === cat.id
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                      : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCaseStudies.map((project: Project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        {project.category}
                      </span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                        Key Highlights:
                      </div>
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300"
                        >
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
          </div>
        )}

        {/* GitHub Repository Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Explore all open repositories
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Check commits, pull requests, and additional codebases on Katsaberisst&apos;s profile.
              </div>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Visit github.com/{GITHUB_USERNAME}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
