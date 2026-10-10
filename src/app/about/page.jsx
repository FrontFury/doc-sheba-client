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
    image: '/images/HeroBanner.jpg',
  },
  {
    name: 'Prof. Dr. Rawshan Jahan',
    role: 'Head of Clinical Governance',
    dept: 'Pulmonology & Critical Care',
    title: 'Professor & Senior Consultant',
    bmdc: 'BMDC Reg: A-18401',
    image: '/images/HeroBanner.jpg',
  },
  {
    name: 'Dr. A.T.M. Zulfiqur Rahman',
    role: 'Director of Surgery & OPD Wings',
    dept: 'Orthopedics & Joint Surgery',
    title: 'Coordinator & Sr. Specialist',
    bmdc: 'BMDC Reg: A-19210',
    image: '/images/HeroBanner.jpg',
  },
  {
    name: 'Dr. Biswajit Bhattacharjee',
    role: 'Lead, Oncology & Radiotherapy',
    dept: 'Radiation Oncology Wing',
    title: 'Associate Professor & Head',
    bmdc: 'BMDC Reg: A-30113',
    image: '/images/HeroBanner.jpg',
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-24 pb-24 font-sans overflow-hidden">
      
      {/* GLOW DECORATION */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-teal-500/10 via-emerald-500/10 to-transparent blur-[130px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-24">
        
        {/* 1. HERO BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800/80 shadow-sm text-[#0F766E] dark:text-teal-300 text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>THE FUTURE OF CLINICAL CONCIERGE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#12343B] dark:text-white tracking-tight font-[#Manrope] leading-[1.15]">
              Redefining Healthcare Delivery With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-500">
                Zero Uncertainty.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
              DocSheba bridges Bangladesh’s healthcare gaps by uniting accredited senior specialists, interactive vector body diagnostics, and real-time live OPD queue tracking on a single seamless platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                as={Link}
                href="/doctors"
                className="bg-[#0F766E] hover:bg-[#0E7490] text-white font-extrabold text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-lg shadow-teal-950/20 transition-all flex items-center gap-2.5"
              >
                <span>Find Senior Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                as={Link}
                href="/departments"
                variant="bordered"
                className="border-slate-300 dark:border-slate-700 text-[#12343B] dark:text-slate-200 font-extrabold text-xs sm:text-sm px-7 py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Explore Departments
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual Box */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl">
              <div className="relative h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-slate-800">
                <Image
                  src="/images/AboutUs.jpg"
                  alt="DocSheba Healthcare"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12343B]/90 via-[#12343B]/20 to-transparent" />

                {/* Floating Badge 1 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs"
                >
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#12343B] dark:text-slate-100">100% BMDC Audited</p>
                    <p className="text-[10px] text-slate-400">Verified Clinical Faculty</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0F766E] text-white">
                      <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#12343B] dark:text-slate-100">ShebaFlow™ Live Queue</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Serial #08 • Active Chamber Tracking</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <h3 className="text-3xl sm:text-5xl font-black text-[#0F766E] dark:text-teal-400 tracking-tight font-[#Manrope]">
                {stat.value}
              </h3>
              <div className="mt-4">
                <p className="text-xs sm:text-sm font-extrabold text-[#12343B] dark:text-slate-100">
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
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              OUR CARE MODEL
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Built On Three Unshakable Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click through our operational pillars to see how we deliver precision healthcare.
            </p>
          </div>

          {/* Tab Selection Controls */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {PILLARS_DATA.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{pillar.label}</span>
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
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-[#0F766E] dark:text-teal-400 uppercase tracking-widest">
                  {activePillar.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12343B] dark:text-white leading-snug">
                  {activePillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {activePillar.desc}
                </p>

                <div className="space-y-2.5 pt-2">
                  {activePillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
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
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              ACCREDITED MEDICAL FACULTY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Senior Clinical Governance Board
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Directed by senior professors and OPD coordinators across leading medical institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase text-[#0F766E] dark:text-teal-400 tracking-wider block">
                      {doc.role}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#12343B] dark:text-slate-100 mt-0.5">
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-extrabold text-xs sm:text-sm text-[#12343B] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
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
                        className="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3"
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F766E] via-teal-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-teal-100 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>BMDC Verified & HIPAA Compliant Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-[#Manrope] leading-snug">
              Experience Zero-Wait Healthcare Today.
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 font-normal">
              Book your doctor appointment or explore our interactive anatomical symptom finder.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              as={Link}
              href="/doctors"
              className="bg-white text-[#0F766E] hover:bg-teal-50 font-extrabold text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              Book Specialist OPD
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}