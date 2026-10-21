'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Heart,
  Activity,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Zap,
  Lock,
  Building2,
  BadgeCheck,
  Microscope,
  ChevronDown,
  PhoneCall,
  Globe,
  Star,
  Layers,
  FileText,
} from 'lucide-react';
import { Button } from '@heroui/react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// High Impact Stats
const STATS = [
  { label: 'Accredited Faculty', value: '500+', sub: 'BMDC Registered Specialists' },
  { label: 'Patient Encounters', value: '10,000+', sub: 'Zero Wait Uncertainty' },
  { label: 'Queue Tracking Precision', value: '99.8%', sub: 'ShebaFlow™ Live Serial' },
  { label: 'Clinical Specialty Wings', value: '28+', sub: 'Comprehensive Care Units' },
];

// Care Pillars Tab Data
const PILLARS_DATA = [
  {
    id: 'patient-care',
    label: 'Patient-First Care',
    summary: 'Designed around your time and dignity',
    icon: Heart,
    title: 'Putting Patient Time & Dignity at the Center',
    desc: 'We built DocSheba to eliminate hours lost in waiting rooms. Through real-time chamber queue visibility, patients receive live updates and arrive exactly when their consultation begins.',
    points: [
      'Live Queue Progress Bar on Patient Dashboard',
      'Instant SMS & Notification Alerts for Delay',
      'Transparent Doctor Ratings & Patient Reviews',
    ],
    image: '/images/HeroBanner.jpg',
  },
  {
    id: 'technology',
    label: 'ShebaFlow™ Engine',
    summary: 'Smarter, more predictable visits',
    icon: Zap,
    title: 'Real-Time Chamber Queue Intelligence',
    desc: 'Our proprietary ShebaFlow™ engine synchronizes doctors OPD chambers across Dhaka. It calculates average consultation speeds and predicts exact chamber entry times.',
    points: [
      'Sub-15 Minute Average Queue Waiting Time',
      'Automated Doctor Check-in & Serial Routing',
      'Seamless E-Prescription Sync to Patient Records',
    ],
    image: '/images/HeroBanner.jpg',
  },
  {
    id: 'accreditation',
    label: 'Clinical Governance',
    summary: 'Care guided by trusted standards',
    icon: ShieldCheck,
    title: '100% BMDC Verification Standards',
    desc: 'We uphold strict clinical compliance. Every single doctor on our platform is cross-verified with Bangladesh Medical & Dental Council (BMDC) records.',
    points: [
      'Direct BMDC Reg Number Verification',
      'Audit of Senior Hospital Affiliations',
      'HIPAA-Compliant Encrypted Medical Vault',
    ],
    image: '/images/HeroBanner.jpg',
  },
];

// Leadership / Faculty
const LEADERSHIP = [
  {
    name: 'Dr. Sarah Ahmed',
    role: 'Chief Medical Officer & Co-Founder',
    dept: 'Department of Cardiology',
    title: 'Senior Cardiologist, Dhaka Medical College',
    bmdc: 'BMDC Reg: A-24109',
    image: '/images/about/Sarah.jpg',
  },
  {
    name: 'Prof. Dr. Rawshan Jahan',
    role: 'Head of Clinical Governance',
    dept: 'Pulmonology & Critical Care',
    title: 'Professor & Senior Consultant',
    bmdc: 'BMDC Reg: A-18401',
    image: '/images/about/Rowshan.jpg',
  },
  {
    name: 'Dr. A.T.M. Zulfiqur Rahman',
    role: 'Director of Surgery & OPD Wings',
    dept: 'Orthopedics & Joint Surgery',
    title: 'Coordinator & Sr. Specialist',
    bmdc: 'BMDC Reg: A-19210',
    image: '/images/about/Zulfiqer.jpg',
  },
  {
    name: 'Dr. Biswajit Bhattacharjee',
    role: 'Lead, Oncology & Radiotherapy',
    dept: 'Radiation Oncology Wing',
    title: 'Associate Professor & Head',
    bmdc: 'BMDC Reg: A-30113',
    image: '/images/about/Biswajit.jpg',
  },
];

// FAQ List
const FAQS = [
  {
    question: 'How does the ShebaFlow™ zero-wait queue tracking work?',
    answer:
      'When you book an appointment on DocSheba, you receive a digital serial number. As the doctor sees patients, our live queue updates on your patient dashboard. You can leave home or work knowing your exact estimated entry time.',
  },
  {
    question: 'Are all doctors on DocSheba BMDC verified?',
    answer:
      'Yes! 100% of specialists on DocSheba undergo strict BMDC registration audits and verification before their profiles go live.',
  },
  {
    question: 'How does the Interactive Anatomy Symptom Router work?',
    answer:
      'Our 2D vector body map allows you to click directly on the area of discomfort (e.g., Chest, Knee, Lower Back). The engine automatically routes you to the exact clinical department and verified specialist.',
  },
  {
    question: 'Can I manage family appointments from one patient account?',
    answer:
      'Yes, your DocSheba Patient Dashboard allows you to manage appointments, prescription histories, and live queue tracking for multiple family members.',
  },
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('patient-care');
  const [openFaq, setOpenFaq] = useState(null);

  const activePillar = PILLARS_DATA.find((p) => p.id === activeTab);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_#e6f7f3_0%,_#f8fafc_36%,_#f8fafc_100%)] pt-24 pb-24 font-sans text-slate-800 dark:bg-[radial-gradient(ellipse_at_top,_#123b3a_0%,_#020617_36%,_#020617_100%)] dark:text-slate-200">
      
      {/* GLOW DECORATION */}
      <div className="pointer-events-none absolute -left-48 top-[36rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-teal-300/15 blur-[120px] dark:bg-teal-500/5" />
      <div className="pointer-events-none absolute -right-48 top-[90rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-emerald-300/15 blur-[120px] dark:bg-emerald-500/5" />

      <div className="mx-auto w-full max-w-[1600px] space-y-20 px-4 sm:space-y-24 sm:px-8 lg:px-12">
        
        {/* 1. HERO BANNER */}
        <div className="relative isolate grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-teal-900/5 bg-gradient-to-br from-white via-teal-50/80 to-emerald-100/60 p-5 shadow-xl shadow-teal-950/[0.06] sm:gap-12 sm:rounded-[2.5rem] sm:p-8 lg:grid-cols-12 lg:p-12 dark:border-white/5 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/60">
          <div className="pointer-events-none absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full border border-teal-900/[0.06] shadow-[0_0_0_28px_rgba(15,118,110,0.025),0_0_0_56px_rgba(15,118,110,0.02)] dark:border-white/[0.04] dark:shadow-[0_0_0_28px_rgba(255,255,255,0.015)]" />
          
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="space-y-6 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#0F766E] shadow-sm backdrop-blur dark:border-teal-800/80 dark:bg-slate-900/80 dark:text-teal-300 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>CARE, WITH CLARITY AND COMPASSION</span>
            </div>

            <h1 className="max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] text-[#12343B] dark:text-white sm:text-5xl lg:text-[3.75rem]">
              Better healthcare
              <span className="block">starts with <span className="bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">feeling informed.</span></span>
            </h1>

            <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              DocSheba brings trusted specialists, thoughtful technology, and clearer appointment journeys together—so you can focus on what matters most: your health.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
              <Button
                as={Link}
                href="/doctors"
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0F766E] to-emerald-600 px-6 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-teal-900/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-900/20 sm:text-sm"
              >
                <span>Find a specialist</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                as={Link}
                href="/departments"
                variant="bordered"
                className="rounded-xl border-slate-300/80 bg-white/60 px-6 py-3.5 text-xs font-extrabold text-[#12343B] transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800 sm:text-sm"
              >
                Explore departments
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 sm:text-xs">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#0F766E] dark:text-teal-400" /> Verified specialists</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#0F766E] dark:text-teal-400" /> Smarter queue updates</span>
            </div>
          </motion.div>

          {/* Hero Visual Box */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="relative lg:col-span-5"
          >
            <div className="relative rounded-[1.75rem] border border-white/80 bg-white/75 p-2.5 shadow-2xl shadow-teal-950/15 ring-1 ring-teal-900/5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 dark:ring-white/5 sm:p-3">
              <div className="relative h-[340px] overflow-hidden rounded-[1.3rem] bg-slate-800 sm:h-[440px]">
                <Image
                  src="/images/AboutUs.jpg"
                  alt="DocSheba Healthcare"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062f32]/95 via-[#12343B]/15 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-6 sm:top-6 sm:text-[10px]">
                  <Heart className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" />
                  Your health comes first
                </div>

                {/* Floating Badge 1 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute right-3 top-14 flex items-center gap-2.5 rounded-2xl border border-white/40 bg-white/95 p-3 text-xs shadow-xl shadow-slate-950/15 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 sm:right-5 sm:top-6 sm:gap-3 sm:p-3.5"
                >
                  <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#12343B] dark:text-slate-100">100% BMDC Audited</p>
                    <p className="text-[10px] text-slate-400">Verified Clinical Faculty</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <div                 className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl border border-white/50 bg-white/95 p-3 shadow-xl shadow-slate-950/15 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#0F766E] p-2.5 text-white shadow-md shadow-teal-900/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#12343B] dark:text-slate-100">ShebaFlow™ Live Queue</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Serial #08 • Active Chamber Tracking</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 2. STATS GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.025] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/[0.08] dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/15 dark:ring-white/[0.03] sm:rounded-3xl sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 opacity-70 transition-opacity group-hover:opacity-100" />
              <h3 className="font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-[#0F766E] dark:text-teal-400 sm:text-4xl">
                {stat.value}
              </h3>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-[#12343B] dark:text-slate-100 sm:text-sm">
                  {stat.label}
                </p>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. INTERACTIVE PILLARS TABS (OUR CARE MODEL) */}
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              OUR CARE MODEL
            </span>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-[#12343B] dark:text-white sm:text-4xl">
              Built On Three Unshakable Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click through our operational pillars to see how we deliver precision healthcare.
            </p>
          </div>

          {/* Tab Selection Controls */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {PILLARS_DATA.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`group flex min-h-[88px] items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/20 sm:min-h-[142px] sm:flex-col sm:items-start sm:justify-between sm:rounded-3xl sm:p-5 ${
                    isActive
                      ? 'border-[#0F766E] bg-gradient-to-br from-[#0F766E] to-emerald-600 text-white shadow-xl shadow-teal-900/15 ring-1 ring-teal-700/20 dark:border-teal-400 dark:from-teal-500 dark:to-emerald-500 dark:text-slate-950'
                      : 'border-slate-200/80 bg-white/85 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:border-teal-700'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3 sm:w-full sm:justify-between">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12 sm:rounded-2xl ${
                      isActive
                        ? 'bg-white/15 text-white dark:bg-slate-950/10 dark:text-slate-950'
                        : 'bg-teal-50 text-[#0F766E] dark:bg-teal-950/70 dark:text-teal-300'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`hidden text-xs font-black tracking-[0.16em] sm:inline ${
                      isActive ? 'text-white/65 dark:text-slate-950/55' : 'text-slate-300 dark:text-slate-700'
                    }`}>
                      0{index + 1}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 sm:flex-none">
                    <span className="block text-sm font-extrabold sm:text-base">{pillar.label}</span>
                    <span className={`mt-1 block text-[11px] font-medium leading-snug sm:text-xs ${
                      isActive ? 'text-teal-50/80 dark:text-slate-950/70' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {pillar.summary}
                    </span>
                  </span>
                  <ArrowRight className={`ml-auto h-4 w-4 shrink-0 transition-transform sm:hidden ${
                    isActive ? 'translate-x-0.5 text-white dark:text-slate-950' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 items-center gap-8 rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.025] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/15 dark:ring-white/[0.03] sm:rounded-[2rem] sm:p-8 lg:grid-cols-12 lg:p-10"
            >
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-[#0F766E] dark:text-teal-400 uppercase tracking-widest">
                  {activePillar.label}
                </span>
                <h3 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold leading-snug text-[#12343B] dark:text-white sm:text-3xl">
                  {activePillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {activePillar.desc}
                </p>

                <div className="space-y-2.5 pt-2">
                  {activePillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 rounded-xl bg-teal-50/80 px-3 py-2.5 text-xs font-bold text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F766E] dark:text-teal-400" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg shadow-teal-950/10 dark:border-slate-700 dark:bg-slate-800 sm:h-80 lg:col-span-5">
                <Image
                  src={activePillar.image}
                  alt={activePillar.label}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. CLINICAL LEADERSHIP TEAM */}
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              ACCREDITED MEDICAL FACULTY
            </span>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-[#12343B] dark:text-white sm:text-4xl">
              Senior Clinical Governance Board
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Directed by senior professors and OPD coordinators across leading medical institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {LEADERSHIP.map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group flex flex-col justify-between space-y-4 rounded-[1.5rem] border border-white/80 bg-white/90 p-4 shadow-lg shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.025] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/[0.08] dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/15 dark:ring-white/[0.03] sm:rounded-3xl sm:p-5"
              >
                <div className="space-y-3">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 sm:h-52">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#0F766E] dark:text-teal-400 sm:text-[10px]">
                      {doc.role}
                    </span>
                    <h3 className="mt-1 text-sm font-extrabold text-[#12343B] dark:text-slate-100">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {doc.title}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{doc.bmdc}</span>
                  <BadgeCheck className="w-4 h-4 text-[#0F766E]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. INTERACTIVE FAQ ACCORDION */}
        <div className="space-y-7 rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.025] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/15 dark:ring-white/[0.03] sm:space-y-8 sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-[#12343B] dark:text-white sm:text-4xl">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 transition-colors dark:border-slate-800 dark:bg-slate-950/30"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-xs font-extrabold text-[#12343B] transition-colors hover:bg-teal-50/70 dark:text-slate-100 dark:hover:bg-slate-800/60 sm:p-5 sm:text-sm"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0F766E] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-100 px-4 pb-5 pt-3 text-xs leading-relaxed text-slate-500 dark:border-slate-800/60 dark:text-slate-400 sm:px-5"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. HERO CALL TO ACTION */}
        <div className="relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#073b3b] via-[#0F766E] to-emerald-600 p-6 text-white shadow-2xl shadow-teal-950/20 sm:flex-row sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full border border-white/10 shadow-[0_0_0_24px_rgba(255,255,255,0.025),0_0_0_48px_rgba(255,255,255,0.02)]" />
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-teal-100 backdrop-blur-md sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>BMDC Verified & HIPAA Compliant Protocol</span>
            </div>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold leading-snug sm:text-4xl">
              Experience Zero-Wait Healthcare Today.
            </h2>
            <p className="text-xs font-normal text-teal-50/85 sm:text-sm">
              Book your doctor appointment or explore our interactive anatomical symptom finder.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              as={Link}
              href="/doctors"
              className="rounded-xl bg-white px-7 py-3.5 text-xs font-extrabold text-[#0F766E] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-50 sm:px-8 sm:py-4 sm:text-sm"
            >
              Book Specialist OPD
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}