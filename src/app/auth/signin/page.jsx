"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import {
  Mail,
  Lock,
  Loader2,
  LogIn,
  Activity,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (authError)
        setError(authError.message || "Invalid email or password.");
      else router.push("/");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 relative pt-12 md:pt-20 pb-12 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* LEFT: Branding Banner */}
      <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-12 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800/80 z-10 overflow-hidden rounded-3xl ml-6 shadow-xl dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F766E] to-emerald-400 p-[1px] shadow-lg shadow-teal-900/20">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Image
                src="/Just-Logo.png"
                alt="DocSheba Logo"
                width={160}
                height={40}
                priority
                className="h-24 md:h-48 w-auto object-contain"
              />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Doc<span className="text-[#0F766E] dark:text-teal-400">Sheba</span>
          </span>
        </div>

        <div className="space-y-8 relative my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-xs font-bold text-[#0F766E] dark:text-teal-300 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Secure Access Control</span>
          </div>

          <h2 className="text-4xl font-black leading-[1.15] text-slate-900 dark:text-white tracking-tight">
            Welcome Back to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 dark:from-emerald-300 dark:via-teal-300 dark:to-white">
              Your Health Command
            </span>
          </h2>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-500/20 backdrop-blur-xl shadow-md dark:shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-[#0F766E] dark:text-teal-300 font-extrabold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>MongoDB & Better Auth Engine</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your sessions and data are protected with high-grade encryption
              and isolated workspace routes.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800/80 pt-6">
          <span>Protected Area</span>
          <span>© DocSheba Platform</span>
        </div>
      </div>

      {/* RIGHT: Form Panel */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-lg space-y-7 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl p-8 sm:p-11 rounded-3xl border border-slate-200 dark:border-slate-800/90 shadow-2xl relative">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#0F766E] dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-500/10 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-500/20">
                Authenticate
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Sign In
              </h1>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              Close ✕
            </Link>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 animate-ping shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#0F766E] dark:group-focus-within:text-teal-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexander@docsheba.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#0F766E] dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#0F766E] dark:text-teal-400 hover:underline font-bold"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#0F766E] dark:group-focus-within:text-teal-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#0F766E] dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 dark:to-emerald-500 hover:opacity-95 text-white font-extrabold text-sm py-4 rounded-2xl shadow-xl shadow-teal-900/20 dark:shadow-teal-950/50 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
            Need an account?{" "}
            <Link
              href="/auth/signup"
              className="font-extrabold text-[#0F766E] dark:text-teal-400 hover:underline"
            >
              Create One Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
