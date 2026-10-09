"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Activity,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // 'patient' or 'doctor'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // Pass role to Better Auth
        callbackURL: "/",
      });

      if (authError) setError(authError.message || "Failed to create account.");
      else router.push("/");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLengthOk = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 relative pt-12 md:pt-20 pb-12 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* LEFT: Visual Showcase Panel */}
      <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-12 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800/80 z-10 overflow-hidden rounded-3xl ml-6 shadow-xl dark:shadow-none">
        {/* Brand Header */}
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

        {/* Hero Interactive Area */}
        <div className="space-y-8 relative my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-xs font-bold text-[#0F766E] dark:text-teal-300 backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI-Powered Clinical Ecosystem</span>
          </div>

          <h2 className="text-4xl font-black leading-[1.15] text-slate-900 dark:text-white tracking-tight">
            Next-Gen Portal for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-600 dark:from-teal-300 dark:via-emerald-400 dark:to-teal-100">
              Interactive Patient Care
            </span>
          </h2>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-500/20 backdrop-blur-xl shadow-md dark:shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-[#0F766E] dark:text-teal-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    HIPAA & GDPR Compliant
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Encrypted Better Auth Pipeline
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-md dark:shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  SVG Symptom Mapper
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Precision Anatomical Specialist Routing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800/80 pt-6">
          <span>© DocSheba Health</span>
        </div>
      </div>

      {/* RIGHT: Form Panel */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-lg space-y-7 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl p-8 sm:p-11 rounded-3xl border border-slate-200 dark:border-slate-800/90 shadow-2xl relative">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#0F766E] dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-500/10 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-500/20">
                Register Account
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
                Create Account
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ROLE SELECTION CARDS */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                I am registering as a
              </label>
              <div className="grid grid-cols-2 gap-3 relative">
                
                {/* Patient Role Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect("patient")}
                  className={`relative p-3.5 rounded-2xl border text-left font-bold text-xs transition-all flex items-center gap-3 z-10 ${
                    formData.role === "patient"
                      ? "text-[#0F766E] dark:text-teal-300"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {formData.role === "patient" && (
                    <motion.div
                      layoutId="activeAuthRole"
                      className="absolute inset-0 bg-teal-50 dark:bg-teal-950/60 border-2 border-[#0F766E] dark:border-teal-500 rounded-2xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <div className={`p-2 rounded-xl ${formData.role === "patient" ? "bg-[#0F766E] text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm">Patient</p>
                    <p className="text-[10px] opacity-75 font-normal">Seek care & appointments</p>
                  </div>
                </button>

                {/* Doctor Role Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect("doctor")}
                  className={`relative p-3.5 rounded-2xl border text-left font-bold text-xs transition-all flex items-center gap-3 z-10 ${
                    formData.role === "doctor"
                      ? "text-[#0F766E] dark:text-teal-300"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {formData.role === "doctor" && (
                    <motion.div
                      layoutId="activeAuthRole"
                      className="absolute inset-0 bg-teal-50 dark:bg-teal-950/60 border-2 border-[#0F766E] dark:border-teal-500 rounded-2xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <div className={`p-2 rounded-xl ${formData.role === "doctor" ? "bg-[#0F766E] text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm">Doctor</p>
                    <p className="text-[10px] opacity-75 font-normal">Provide clinical care</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Doctor Verification Note */}
            <AnimatePresence>
              {formData.role === "doctor" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-amber-700 dark:text-amber-400 text-[11px] font-medium flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Doctors require BMDC verification after initial registration.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#0F766E] dark:group-focus-within:text-teal-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.role === "doctor" ? "Dr. Alexander Vance" : "Alexander Vance"}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#0F766E] dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
                />
              </div>
            </div>

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
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
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

              {formData.password && (
                <div className="flex items-center gap-4 mt-2 px-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                    <CheckCircle2
                      className={`w-3 h-3 ${isLengthOk ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600"}`}
                    />
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                    <CheckCircle2
                      className={`w-3 h-3 ${hasNumber ? "text-emerald-600 dark:text-emerald-400" : "text-slate-300 dark:text-slate-600"}`}
                    />
                    <span>At least 1 number</span>
                  </div>
                </div>
              )}
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
                  <span>Create {formData.role === "doctor" ? "Doctor" : "Patient"} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-extrabold text-[#0F766E] dark:text-teal-400 hover:underline"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}