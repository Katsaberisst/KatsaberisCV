"use client";

import React, { useState, useMemo } from "react";
import { Filter, Search, CheckCircle2, Sparkles } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolio";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Competencies" },
      ...SKILL_CATEGORIES.map((cat) => ({ id: cat.id, name: cat.name })),
    ];
  }, []);

  const filteredSkills = useMemo(() => {
    let result = SKILL_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        categoryId: category.id,
        categoryName: category.name,
      }))
    );

    if (activeCategory !== "all") {
      result = result.filter((item) => item.categoryId === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          (item.note && item.note.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              02 // Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Filterable Skills Grid
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            Modular competencies spanning modern frontend architectures, CMS/data synchronization, EdTech leadership, and professional languages.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="w-full min-w-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                    : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. React, PHP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.categoryId}-${skill.name}-${index}`}
              className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      skill.level === "Advanced"
                        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
                        : skill.level === "Proficient"
                        ? "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5"
                        : "border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-neutral-500/5"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                {skill.note && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                    {skill.note}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>{skill.categoryName}</span>
                <CheckCircle2 className="w-3 h-3 text-neutral-300 dark:text-neutral-700 group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No skills found matching &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
