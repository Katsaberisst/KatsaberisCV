"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText, GraduationCap, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#090a0f]/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#"
          className="group flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs font-mono font-bold tracking-tighter group-hover:scale-105 transition-transform">
            SK
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight leading-none text-neutral-900 dark:text-neutral-100">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 leading-tight flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Remote Available
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100/60 dark:bg-neutral-900/60 p-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors hover:bg-white/80 dark:hover:bg-neutral-800/80"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 rounded-full hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-2xs group"
            title="Interactive Student & Teacher LMS Portal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>LMS Portal</span>
          </Link>
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Get in Touch
            <ArrowUpRight className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2 shrink-0">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#090a0f]/95 backdrop-blur-md px-6 py-4 space-y-3">
          <Link
            href="/portal"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border-b border-neutral-100 dark:border-neutral-900"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              LMS Portal (Student &amp; Teacher)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              Interactive
            </span>
          </Link>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white border-b border-neutral-100 dark:border-neutral-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
