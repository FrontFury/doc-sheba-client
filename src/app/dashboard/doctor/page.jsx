'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  Stethoscope,
  Activity,
  Plus,
  ArrowRight,
  Sparkles,
  PhoneCall,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  Star,
  Search,
} from 'lucide-react';
import { Button } from '@heroui/react';
import CustomLoader from '@/components/CustomLoader';
import { useSession } from '@/lib/auth-client';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

// Sample OPD Queue Data for Doctors
const TODAY_PATIENTS = [
  {
    serial: '#01',
    name: 'Tanvir Hossain',
    age: 34,
    gender: 'Male',
    time: '04:00 PM',
    type: 'In-Person OPD',
    status: 'Completed',
    symptom: 'Chest tightness & fatigue',
  },
  {
    serial: '#02',
    name: 'Nusrat Jahan',
    age: 28,
    gender: 'Female',
    time: '04:15 PM',
    type: 'In-Person OPD',
    status: 'In Chamber',
    symptom: 'Persistent dry cough',
  },
  {
    serial: '#03',
    name: 'Anisur Rahman',
    age: 52,
    gender: 'Male',
    time: '04:30 PM',
    type: 'Tele-Consultation',
    status: 'Next In Queue',
    symptom: 'Hypertension follow-up',
  },
  {
    serial: '#04',
    name: 'Farhana Chowdhury',
    age: 41,
    gender: 'Female',
    time: '04:45 PM',
    type: 'In-Person OPD',
    status: 'Waiting',
    symptom: 'Palpitations & dizziness',
  },
  {
    serial: '#05',
    name: 'Kamrul Islam',
    age: 60,
    gender: 'Male',
    time: '05:00 PM',
    type: 'In-Person OPD',
    status: 'Waiting',
    symptom: 'Post-CABG routine checkup',
  },
];

export default function DoctorDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [currentQueueIndex, setCurrentQueueIndex] = useState(1); // #02 Nusrat Jahan

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <CustomLoader text="Loading your clinical console..." />
      </div>
    );
  }

  const activePatient = TODAY_PATIENTS[currentQueueIndex];

  const handleCallNextPatient = () => {
    if (currentQueueIndex < TODAY_PATIENTS.length - 1) {
      setCurrentQueueIndex((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12 font-sans"
    >
      {/* 1. HERO CLINICAL WELCOME BANNER */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12343B] via-[#0F766E] to-teal-800 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-teal-950/10"
      >
        {/* Background Glow Accents */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>DocSheba Faculty Console • BMDC Verified</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-[#Manrope]">
              Welcome, <span className="text-teal-200">{user?.name || 'Dr. Sarah Ahmed'}</span> 🩺
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed font-normal">
              Chamber Wing: <span className="font-bold text-white">Central Dhaka Main OPD</span> • ShebaFlow™ Live Serial Counter: <span className="font-bold text-emerald-200">#02 Active</span>.
            </p>
          </div>

          {/* Quick Doctor Actions */}
          <div className="shrink-0 flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                as={Link}
                href="/dashboard/prescriptions/new"
                startContent={<Plus className="w-4 h-4" />}
                className="bg-white text-[#0F766E] hover:bg-teal-50 font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-lg transition-all"
              >
                Create Prescription
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 2. CLINICAL METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Today&apos;s Patients
            </p>
            <h3 className="text-2xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              18 Patients
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
              5 In-person, 13 Scheduled
            </span>
          </div>
          <div className="p-3.5 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl border border-teal-100 dark:border-teal-900/60">
            <Users className="w-6 h-6" />
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
              Tele-Consultations
            </p>
            <h3 className="text-2xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              4 Calls
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              High definition active
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
            <Video className="w-6 h-6" />
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
              Avg Consult Time
            </p>
            <h3 className="text-2xl font-black text-[#12343B] dark:text-slate-100 mt-1">
              11.5 Mins
            </h3>
            <span className="text-[11px] font-semibold text-amber-500">
              Optimal OPD speed
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-100 dark:border-amber-900/60">
            <Clock className="w-6 h-6" />
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
              Trust Rating
            </p>
            <h3 className="text-2xl font-black text-[#12343B] dark:text-slate-100 mt-1 flex items-center gap-1">
              4.95 <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
              1,240 Verified reviews
            </span>
          </div>
          <div className="p-3.5 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl border border-teal-100 dark:border-teal-900/60">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* 3. MAIN WORKSPACE: ACTIVE CHAMBER CONTROLLER & QUEUE LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: ShebaFlow™ Active Patient Controller (7 Cols) */}
        <motion.div variants={cardVariants} className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#12343B] dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
              <span>ShebaFlow™ Live Chamber Controller</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Chamber Live
            </span>
          </div>

          {/* Active Patient Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/10 dark:bg-teal-500/20 border-2 border-[#0F766E]/30 text-[#0F766E] dark:text-teal-300 flex items-center justify-center font-black text-xl shrink-0">
                  {activePatient.serial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-[#12343B] dark:text-slate-100">
                      {activePatient.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">
                      ({activePatient.age} yrs, {activePatient.gender})
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0F766E] dark:text-teal-400 mt-0.5">
                    Symptom: {activePatient.symptom}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Slot Time: {activePatient.time} • Type: {activePatient.type}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-[#0F766E] dark:text-teal-300 text-xs font-bold w-fit">
                {activePatient.status}
              </span>
            </div>

            {/* Quick Consultation Notes Input Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quick Clinical Observation / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Type preliminary diagnosis or vital notes..."
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            {/* Controller Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                onClick={handleCallNextPatient}
                className="w-full sm:w-auto flex-1 bg-[#0F766E] hover:bg-[#0E7490] text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Call Next Patient ({TODAY_PATIENTS[currentQueueIndex + 1]?.serial || "End"})</span>
              </Button>

              <Button
                as={Link}
                href={`/dashboard/prescriptions/new?patient=${encodeURIComponent(activePatient.name)}`}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Issue E-Prescription</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Today's Complete Queue List (5 Cols) */}
        <motion.div variants={cardVariants} className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#12343B] dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
              <span>Today&apos;s OPD Queue</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">
              Total {TODAY_PATIENTS.length} Serials
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5 max-h-[460px] overflow-y-auto scrollbar-thin">
            {TODAY_PATIENTS.map((pt, idx) => {
              const isCurrent = idx === currentQueueIndex;
              return (
                <div
                  key={pt.serial}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? "bg-teal-50/80 dark:bg-teal-950/60 border-[#0F766E] shadow-sm"
                      : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-xl ${
                        isCurrent
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {pt.serial}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-100 truncate">
                        {pt.name}
                      </h4>
                      <p className="text-[10.5px] text-slate-400 truncate">
                        {pt.time} • {pt.type}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      pt.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : isCurrent
                        ? 'bg-teal-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {pt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}