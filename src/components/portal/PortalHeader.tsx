"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
  LogOut,
  RotateCcw,
  Sparkles,
  BookOpen,
  BarChart3,
  Users,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLMS } from "@/context/LMSContext";

export default function PortalHeader() {
  const pathname = usePathname();
  const { currentUser, loginAsDemo, logout, resetDemoData } = useLMS();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-[#090a0f]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Return to Portfolio */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            title="Return to main Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          <Link href="/portal" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center text-xs font-mono font-bold shadow-xs">
              SK
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 leading-tight">
                LMS Portal
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700">
                  EdTech
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation tabs between Student and Teacher */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/70 dark:border-neutral-800/70 text-xs font-medium">
          <Link
            href="/portal/student"
            className={`px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              pathname.includes("/student")
                ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Student Hub</span>
          </Link>

          <Link
            href="/portal/teacher"
            className={`px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              pathname.includes("/teacher")
                ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
            <span>Teacher Analytics</span>
          </Link>
        </nav>

        {/* Right: Active Role, Demo Switcher, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* User badge */}
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] font-mono font-bold flex items-center justify-center">
                  {currentUser.avatar || "U"}
                </span>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 max-w-[110px] truncate">
                  {currentUser.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                    currentUser.role === "teacher"
                      ? "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10"
                      : "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10"
                  }`}
                >
                  {currentUser.role === "teacher" ? "Teacher" : "Student"}
                </span>
              </div>

              {/* Quick switch button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSwitchModal(!showSwitchModal)}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Switch Role or Demo User"
                >
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden sm:inline">Switch Role</span>
                </button>

                {showSwitchModal && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#11131a] shadow-lg p-2 z-50 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Switch Demo Profile
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        loginAsDemo("student");
                        setShowSwitchModal(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-neutral-800 dark:text-neutral-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                        Demo Student (Alex)
                      </span>
                      {currentUser.role === "student" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        loginAsDemo("teacher");
                        setShowSwitchModal(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-neutral-800 dark:text-neutral-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                        Demo Teacher (Stelios)
                      </span>
                      {currentUser.role === "teacher" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </button>

                    <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                      <button
                        type="button"
                        onClick={() => {
                          resetDemoData();
                          setShowSwitchModal(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3 text-neutral-400" />
                        Reset All Demo Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/portal/login"
              className="px-3 py-1.5 text-xs font-semibold rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
            >
              Sign In
            </Link>
          )}

          <ThemeToggle compact />
        </div>
      </div>
    </header>
  );
}
