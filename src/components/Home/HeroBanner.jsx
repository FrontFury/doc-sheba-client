"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
  Search,
  Calendar,
  CheckCircle2,
  ThumbsUp,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative pt-16 pb-14 lg:pt-28 lg:pb-24 bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden transition-colors">
      
      {/* Expanded Background Glow Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[1700px] h-[500px] bg-gradient-to-tr from-[#0F766E]/15 via-[#E8F7F4]/50 to-transparent dark:from-teal-900/25 dark:to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Fluid Container (max-w-[1700px]) */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 xl:gap-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-400 text-xs sm:text-sm font-semibold border border-teal-100 dark:border-slate-700 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
              <span>Care You Can Count On • Accredited Network</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-[#Manrope] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#12343B] dark:text-white tracking-tight leading-[1.15] sm:leading-[1.1]">
              Trusted Healthcare, <br />
              <span className="text-[#0F766E] dark:text-teal-400">Made Simple.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg lg:text-xl text-[#64748B] dark:text-slate-300 leading-relaxed max-w-2xl xl:max-w-3xl">
              Find the right doctor, choose your preferred time, and manage your healthcare — all in one place with zero wait uncertainty.
            </p>

            {/* Eye-Catching Mobile Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <Button
                as={Link}
                href="/doctors"
                startContent={<Search className="w-5 h-5 text-white" />}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0E7490] hover:to-[#0F766E] text-white font-bold text-base px-8 py-6 sm:py-4 rounded-xl shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 active:scale-[0.98] transition-all duration-200"
              >
                Find a Doctor
              </Button>

              <Button
                as={Link}
                href="/book-appointment"
                startContent={<Calendar className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />}
                endContent={<ArrowRight className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />}
                className="w-full sm:w-auto bg-[#E8F7F4] hover:bg-teal-100/80 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-[#0F766E] dark:text-teal-300 font-bold text-base px-8 py-6 sm:py-4 rounded-xl border border-teal-200/80 dark:border-slate-700 active:scale-[0.98] transition-all duration-200"
              >
                Book Appointment
              </Button>
            </div>

            {/* Full-width Section Divider */}
            <div className="w-full border-t border-slate-200/80 dark:border-slate-800 my-1 sm:my-2" />

            {/* Verified Key Indicators */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-8 text-xs sm:text-sm lg:text-base font-semibold text-[#172033] dark:text-slate-200 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>500+ Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>10k+ Patients</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>24/7 Sheba Support</span>
              </div>
            </div>

          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end mt-2 lg:mt-0">
            
            {/* Visual Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl lg:shadow-2xl bg-white dark:bg-slate-900 w-full max-w-xl aspect-[4/3] sm:aspect-[1.15]">
              <Image
                src="/images/HeroBanner.jpg"
                alt="DocSheba Doctor Consultation"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />

              {/* Doctor Info Card Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 sm:p-6 text-white flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Tele-consultation Available
                </div>
                <h3 className="font-bold text-lg sm:text-2xl leading-tight">Dr. Sarah Ahmed</h3>
                <p className="text-xs sm:text-sm text-slate-300">Senior Cardiologist, Dhaka Medical Center</p>
              </div>
            </div>

            {/* Desktop Floating Badges (Visible on SM screens and above) */}
            <div className="hidden sm:flex absolute -top-5 left-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl items-center gap-3.5 z-10">
              <div className="p-3 bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-400 rounded-xl">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-[#12343B] dark:text-slate-100">99.4% Positive</p>
                <p className="text-xs text-[#64748B] dark:text-slate-400">Over 1,200 Reviews</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 right-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl items-center gap-3.5 z-10">
              <div className="p-3 bg-[#0F766E] text-white rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-[#12343B] dark:text-slate-100">Queue Time: &lt; 12 mins</p>
                <p className="text-xs text-[#64748B] dark:text-slate-400">Verified Journey Tracking</p>
              </div>
            </div>

            {/* Mobile Stacked Badges (Fixes Image Overlay Issue on Mobile) */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4 sm:hidden">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                <div className="p-2 bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-400 rounded-lg shrink-0">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#12343B] dark:text-slate-100">99.4% Positive</p>
                  <p className="text-[10px] text-[#64748B] dark:text-slate-400">1,200+ Reviews</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
                <div className="p-2 bg-[#0F766E] text-white rounded-lg shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#12343B] dark:text-slate-100">Queue: &lt; 12 mins</p>
                  <p className="text-[10px] text-[#64748B] dark:text-slate-400">Live Tracking</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}