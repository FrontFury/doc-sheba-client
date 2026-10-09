'use client';

import CustomLoader from '@/components/CustomLoader';
import { useSession } from '@/lib/auth-client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Activity,
  FileText,
  User,
  ArrowRight,
  Plus,
  TrendingUp,
  Heart,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { Button } from '@heroui/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PatientDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <CustomLoader text="Loading your health portal..." />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* 1. HERO WELCOME BANNER */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F766E] via-teal-700 to-emerald-800 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-teal-950/10"
      >
        {/* Decorative Background Patterns */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>DocSheba Patient Care Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-[#Manrope]">
              Welcome back, <span className="text-teal-200">{user?.name || 'Patient'}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed font-normal">
              Your next appointment with <span className="font-bold text-white">Dr. Sarah Ahmed</span> is scheduled for today at <span className="font-bold text-emerald-200">4:30 PM</span>.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="shrink-0">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                as={Link}
                href="/dashboard/find-doctor"
                startContent={<Plus className="w-4 h-4" />}
                className="bg-white text-[#0F766E] hover:bg-teal-50 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all"
              >
                Book New Appointment
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 2. STATS & METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Upcoming Visit
            </p>
            <h3 className="text-xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              Today, 4:30 PM
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">Cardiology Dept</span>
          </div>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl border border-teal-100 dark:border-teal-900/60">
            <Calendar className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Prescriptions
            </p>
            <h3 className="text-xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              3 Medications
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">All updated</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
            <FileText className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Heart Rate (Avg)
            </p>
            <h3 className="text-xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              72 BPM
            </h3>
            <span className="text-[11px] font-semibold text-rose-500">Normal range</span>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/60">
            <Heart className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Verification
            </p>
            <h3 className="text-xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              Protected
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">BMDC & HIPAA</span>
          </div>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl border border-teal-100 dark:border-teal-900/60">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* 3. MAIN SECTION: UPCOMING APPOINTMENT & HEALTH RECORDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upcoming Appointments (8 Cols) */}
        <motion.div variants={cardVariants} className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#12343B] dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
              <span>Upcoming Appointments</span>
            </h2>
            <Link
              href="/dashboard/appointments"
              className="text-xs font-bold text-[#0F766E] dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Appointment Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-500/20 shrink-0">
                  <Image
                    src="/images/HeroBanner.jpg"
                    alt="Dr. Sarah Ahmed"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#12343B] dark:text-slate-100">
                    Dr. Sarah Ahmed
                  </h3>
                  <p className="text-xs font-semibold text-[#0F766E] dark:text-teal-400">
                    Cardiologist • Dhaka Med Center
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Serial: #08 • Live Queue Tracking Active
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Confirmed Today
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date</span>
                <span className="font-extrabold text-[#12343B] dark:text-slate-200 mt-0.5 block">12 Oct 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Time Slot</span>
                <span className="font-extrabold text-[#12343B] dark:text-slate-200 mt-0.5 block">04:30 PM</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultation Type</span>
                <span className="font-extrabold text-[#0F766E] dark:text-teal-400 mt-0.5 block">In-Person Visit</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Button
                as={Link}
                href="/dashboard/appointments/dr-sarah-ahmed"
                className="w-full sm:w-auto flex-1 bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-3 rounded-xl transition-all"
              >
                Join Live Queue Tracker
              </Button>
              <Button
                variant="bordered"
                className="w-full sm:w-auto border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Reschedule
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Quick Care Concierge & Recent Records (4 Cols) */}
        <motion.div variants={cardVariants} className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-extrabold text-[#12343B] dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
            <span>Recent Medical Records</span>
          </h2>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-[#0F766E] dark:text-teal-400">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#12343B] dark:text-slate-100">ECG & Blood Test</h4>
                  <p className="text-[10px] text-slate-400">Uploaded Oct 08, 2026</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0F766E] dark:text-teal-400">PDF</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#12343B] dark:text-slate-100">Dermatology Prescription</h4>
                  <p className="text-[10px] text-slate-400">Uploaded Sep 24, 2026</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0F766E] dark:text-teal-400">PDF</span>
            </div>

            <Button
              as={Link}
              href="/dashboard/records"
              variant="flat"
              className="w-full bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-300 font-bold text-xs py-2.5 rounded-xl mt-2"
            >
              Upload New Record
            </Button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}