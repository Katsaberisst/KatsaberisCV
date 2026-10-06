"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : "system";
  const activeResolved = mounted ? resolvedTheme : "dark";

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
        className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        title={`Current: ${activeResolved} mode. Click to toggle.`}
      >
        {activeResolved === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-neutral-700" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-2xs">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          currentTheme === "light"
            ? "bg-white text-neutral-950 shadow-xs"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        }`}
        title="Light theme"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System preference"
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          currentTheme === "system"
            ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-neutral-100"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        }`}
        title="Sync with system"
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          currentTheme === "dark"
            ? "bg-neutral-800 text-neutral-100 shadow-xs"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        }`}
        title="Dark theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
