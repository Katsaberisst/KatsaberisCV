"use client";


import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Globe2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formState.name || !formState.email || !formState.message) return;

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setIsSubmitted(true);
      // Προστέθηκε και το subject: '' εδώ για να μην βγάζει σφάλμα TypeScript
      setFormState({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Υπήρξε σφάλμα κατά την αποστολή του μηνύματος.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Αποτυχία σύνδεσης με τον διακομιστή.');
  } finally {
    setIsSubmitting(false);
  }
};

  const mailtoLink = `mailto:${PERSONAL_INFO.contacts.email}?subject=${encodeURIComponent(
    formState.subject || `Inquiry from ${formState.name || "Portfolio Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
  )}`;

  return (
    <section id="contact" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              05 // Direct Communication
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Get in Touch
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-normal">
            Open to full-time remote engineering roles, AI/Data integration projects, and specialized IT training opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Let&apos;s start a conversation
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Whether you have an engineering opening, need consulting on educational technology, or want to discuss full-stack &amp; AI integration, feel free to reach out.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Direct Email
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.contacts.email}`}
                      className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline"
                    >
                      {PERSONAL_INFO.contacts.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href={PERSONAL_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 flex items-center justify-between gap-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Professional Network
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      LinkedIn Profile
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* GitHub Card */}
              <a
                href={PERSONAL_INFO.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 flex items-center justify-between gap-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-500/10 text-neutral-700 dark:text-neutral-300">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Source Repositories
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      GitHub Profile
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Availability Notice */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20 text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Based in Greece (GMT+3) · Seamless asynchronous overlap with US, UK, and European teams.
              </span>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    Message Prepared!
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                    Thank you, {formState.name}. You can also open your mail client to send this directly to Stelios.
                  </p>
                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="px-4 py-2 text-xs font-semibold rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Open Mail Client
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-4 py-2 text-xs font-semibold rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Subject / Role Category
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      placeholder="Remote Frontend Engineer / AI Collaboration / EdTech Training"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Hi Stelios, we would like to discuss..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Guaranteed response within 24 hours
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Send Message <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
