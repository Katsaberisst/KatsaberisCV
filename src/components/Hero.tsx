"use client";

import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Terminal,
  Cpu,
  GraduationCap,
  Globe2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle ambient grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e2430_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 mb-8 shadow-2xs">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{PERSONAL_INFO.availability}</span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden xs:inline">•</span>
          <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px] hidden xs:inline">100% Remote Global</span>
        </div>

        {/* Main Title & Headline */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.15]">
            Hello, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="relative z-10 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-8 decoration-2">
                {PERSONAL_INFO.name}
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-neutral-700 dark:text-neutral-200 leading-snug">
            {PERSONAL_INFO.headline}
          </p>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-normal">
            {PERSONAL_INFO.summary}
          </p>
        </div>

        {/* Key Focus Tags */}
        <div className="flex flex-wrap gap-2.5 mt-8 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60">
            <Terminal className="w-3.5 h-3.5 text-blue-500" /> Full-Stack &amp; Next.js
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60">
            <Cpu className="w-3.5 h-3.5 text-purple-500" /> AI &amp; Data Integration
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60">
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" /> EdTech &amp; IT Instruction
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60">
            <Globe2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Remote Workflow
          </span>
        </div>

        {/* Action CTAs and Social Links */}
        <div className="flex flex-wrap items-center gap-4 pt-10">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm group"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          </a>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block mx-1" />

          {/* Social Quick Links */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden sm:inline">{PERSONAL_INFO.contacts.email}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
              </button>
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono shadow-md animate-fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-base sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
