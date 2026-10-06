"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Identity & Copyright */}
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                Portfolio &amp; Interactive CV
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              © {new Date().getFullYear()} Stelios Katsaberis. All rights reserved.
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.contacts.email}`}
                aria-label="Send direct email"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="h-4 w-px bg-neutral-200 dark:border-neutral-800" />

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stack info */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-2">
          <div>
            Built with Next.js 16 (App Router), React 19 &amp; Tailwind CSS
          </div>
          <div>
            Designed for 100% Remote Engineering &amp; EdTech Roles
          </div>
        </div>
      </div>
    </footer>
  );
}
