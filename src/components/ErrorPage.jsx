"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, HeartPulse, Home, RefreshCw, SearchX } from "lucide-react";

export default function ErrorPage({ error, retry, notFound = false }) {
  useEffect(() => {
    if (error) {
      console.error("Application rendering error:", error);
    }
  }, [error]);

  const Icon = notFound ? SearchX : HeartPulse;

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#F4FAF9] px-4 py-16 text-[#12343B] dark:bg-slate-950 dark:text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-500/10" />

      <div
        role="alert"
        className="relative w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/85 p-8 text-center shadow-2xl shadow-teal-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:p-12"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-[#0F766E] dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300">
          <Icon className="h-8 w-8" />
        </div>

        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#0F766E] dark:text-teal-400">
          {notFound ? "Page not found" : "Something went wrong"}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {notFound ? "We can’t find that page." : "Let’s get you back on track."}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {notFound
            ? "The page may have moved or the link may be incorrect. You can return home and find the care you need."
            : "The page couldn’t load as expected. Please try again, or return home and continue browsing DocSheba."}
        </p>

        {error?.digest && (
          <p className="mt-4 text-xs font-medium text-slate-400 dark:text-slate-500">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {!notFound && retry && (
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-900/15 transition hover:bg-[#0B5F59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 py-3 text-sm font-extrabold text-[#0F766E] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
          >
            {notFound ? <Home className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
