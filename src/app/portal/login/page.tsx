"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Sparkles,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useLMS } from "@/context/LMSContext";
import { UserRole } from "@/data/lmsData";

export default function PortalLoginPage() {
  const router = useRouter();
  const { loginAsDemo, registerUser, users, loginAs } = useLMS();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [error, setError] = useState("");

  const handleDemoLogin = (selectedRole: UserRole) => {
    loginAsDemo(selectedRole);
    if (selectedRole === "teacher") {
      router.push("/portal/teacher");
    } else {
      router.push("/portal/student");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      if (!name.trim() || !email.trim()) {
        setError("Please enter your name and email.");
        return;
      }
      const newUser = await registerUser(name.trim(), email.trim(), role);
      if (newUser.role === "teacher") {
        router.push("/portal/teacher");
      } else {
        router.push("/portal/student");
      }
    } else {
      // Find existing user or log in
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }
      const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        loginAs(existing);
        if (existing.role === "teacher") {
          router.push("/portal/teacher");
        } else {
          router.push("/portal/student");
        }
      } else {
        // Auto-create as demo
        const fallback = await registerUser(email.split("@")[0], email.trim(), role);
        if (fallback.role === "teacher") {
          router.push("/portal/teacher");
        } else {
          router.push("/portal/student");
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="w-10 h-10 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 inline-flex items-center justify-center text-sm font-mono font-bold mx-auto mb-2 shadow-xs">
          SK
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {isRegister ? "Create Portal Account" : "Sign In to LMS Portal"}
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Access student learning slide decks or teacher evaluation analytics
        </p>
      </div>

      {/* One-Click Quick Demo Profiles */}
      <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10131c] space-y-2.5 shadow-2xs">
        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          Instant Demo Access (Recommended)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("student")}
            className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                Student
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              Alex Morgan (Student Hub)
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("teacher")}
            className="p-3 rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                Teacher
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              Stelios (Admin Analytics)
            </p>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
        <span className="bg-[#fafafa] dark:bg-[#090a0f] px-3 text-[11px] font-mono text-neutral-400 uppercase">
          Or Enter Credentials
        </span>
      </div>

      {/* Form */}
      <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10131c] shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
              {error}
            </div>
          )}

          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@student.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              User Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === "student"
                    ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === "teacher"
                    ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Teacher
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs cursor-pointer mt-2"
          >
            {isRegister ? "Complete Registration" : "Continue to Portal"}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Need a new account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
