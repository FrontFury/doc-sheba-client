'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Activity,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Building2,
  Syringe,
  Microscope,
  Pill,
} from 'lucide-react';
import { Button } from '@heroui/react';

// Clinical Departments Dataset
const DEPARTMENTS_DATA = [
  {
    id: 'pulmonology-respiratory',
    name: 'Pulmonology & Respiratory Care',
    category: 'Internal Medicine',
    icon: Activity,
    doctorCount: 14,
    description:
      'Specialized pathways for COPD, asthma, bronchial thermoplasty, post-viral pulmonary fibrosis, and sleep apnea care.',
    commonTreatments: ['Bronchoscopy', 'Spirometry', 'Nebulization Care', 'Sleep Apnea Study'],
    popularSpecialist: 'Prof. Dr. Rawshan Jahan',
  },
  {
    id: 'radiation-clinical-oncology',
    name: 'Radiation & Clinical Oncology',
    category: 'Oncology',
    icon: Microscope,
    doctorCount: 18,
    description:
      'Precision radiotherapy, photon beam simulation, targeted chemotherapy, and comprehensive cancer care protocols.',
    commonTreatments: ['IMRT Radiation', 'Chemotherapy Protocols', 'Tumor Board Review'],
    popularSpecialist: 'Dr. Biswajit Bhattacharjee',
  },
  {
    id: 'pediatrics-neonatology',
    name: 'Pediatrics & Neonatology',
    category: 'Pediatrics',
    icon: Baby,
    doctorCount: 12,
    description:
      'Dedicated child health unit covering infant nutrition, developmental delays, pediatric neurology, and vaccinations.',
    commonTreatments: ['Infant Nutrition Sync', 'NICU Consultation', 'Vaccination Schedule'],
    popularSpecialist: 'Dr. Sabina Sultana',
  },
  {
    id: 'orthopedics-joint-surgery',
    name: 'Orthopedics & Joint Surgery',
    category: 'Surgical',
    icon: Bone,
    doctorCount: 16,
    description:
      'Minimally invasive arthroscopic joint repair, complex pelvic trauma surgery, and rapid post-op mobility rehab.',
    commonTreatments: ['Joint Replacement', 'Arthroscopy', 'Fracture Management'],
    popularSpecialist: 'Dr. A.T.M. Zulfiqur Rahman',
  },
  {
    id: 'cardiology-vascular',
    name: 'Cardiology & Vascular Medicine',
    category: 'Internal Medicine',
    icon: Heart,
    doctorCount: 22,
    description:
      'Comprehensive heart health care including angiograms, hypertension management, and preventative cardiac care.',
    commonTreatments: ['ECG & Echo', 'Angiography', 'Hypertension Profiling'],
    popularSpecialist: 'Dr. Sarah Ahmed',
  },
  {
    id: 'neurology-neurosurgery',
    name: 'Neurology & Neurosurgery',
    category: 'Internal Medicine',
    icon: Brain,
    doctorCount: 11,
    description:
      'Diagnosis and advanced management of stroke, epilepsy, migraine, neuropathy, and spinal cord disorders.',
    commonTreatments: ['EEG & EMG', 'Stroke Management', 'Migraine Care'],
    popularSpecialist: 'Dr. Syed Kabir Hossain',
  },
  {
    id: 'gynecology-obstetrics',
    name: 'Gynecology & Women’s Health',
    category: 'Surgical',
    icon: Users,
    doctorCount: 15,
    description:
      'Hormonal profiling, PCOS management, prenatal care, high-risk pregnancy monitoring, and fertility guidance.',
    commonTreatments: ['PCOS Management', 'Antenatal Care', 'Infertility Screening'],
    popularSpecialist: 'Dr. Sayeda Sanjid Ara Nupur',
  },
  {
    id: 'gastroenterology-hepatology',
    name: 'Gastroenterology & Hepatology',
    category: 'Internal Medicine',
    icon: Pill,
    doctorCount: 10,
    description:
      'Screening and treatment for Hepatitis B/C, fatty liver disease, IBS, acid reflux, and endoscopic procedures.',
    commonTreatments: ['Endoscopy', 'Colonoscopy', 'Liver Function Screening'],
    popularSpecialist: 'Dr. Iqbal Murshid Kabir',
  },
];

const CATEGORIES = ['All', 'Internal Medicine', 'Oncology', 'Surgical', 'Pediatrics'];

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Logic
  const filteredDepartments = DEPARTMENTS_DATA.filter((dept) => {
    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-24 pb-20 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* 1. BREADCRUMB & ACCREDITATION BADGE */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-[#0F766E] transition-colors">
              DocSheba Home
            </Link>
            <span>/</span>
            <span className="font-extrabold text-[#0F766E] dark:text-teal-400">
              Clinical Departments
            </span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>28 Specialized Clinical Wings Available</span>
          </div>
        </div>

        {/* 2. HERO TITLE SECTION */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F766E]/10 dark:bg-teal-500/10 text-[#0F766E] dark:text-teal-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>SPECIALIZED MEDICAL CARE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#12343B] dark:text-white tracking-tight font-[#Manrope] leading-tight">
            Explore Popular{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-500">
              Clinical Departments
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Every clinical discipline is governed by certified senior specialists adhering to international healthcare delivery benchmarks and zero-wait OPD scheduling.
          </p>
        </div>

        {/* 3. SEARCH & CATEGORY FILTER */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search department or treatment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0F766E] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 4. DEPARTMENT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDepartments.map((dept) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:border-[#0F766E]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Header: Icon & Doctor Count */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl border border-teal-100 dark:border-teal-900/60 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-full">
                        {dept.doctorCount} Doctors
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#0F766E] dark:text-teal-400">
                        {dept.category}
                      </span>
                      <h3 className="text-base font-extrabold text-[#12343B] dark:text-white leading-snug group-hover:text-[#0F766E] transition-colors mt-0.5">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 line-clamp-3">
                        {dept.description}
                      </p>
                    </div>

                    {/* Common Treatments Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Featured Pathways
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.commonTreatments.map((treatment, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                          >
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-bold">Key Consultant:</span>
                      <span className="font-extrabold text-[#12343B] dark:text-slate-200 truncate max-w-[150px]">
                        {dept.popularSpecialist}
                      </span>
                    </div>

                    <Button
                      as={Link}
                      href={`/doctors?department=${encodeURIComponent(dept.name)}`}
                      className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-2.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>View Specialists</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 5. HERO CALL TO ACTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F766E] via-teal-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-teal-100 border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Zero-Wait OPD OPD Chamber Queue</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-[#Manrope] leading-snug">
              Need Help Choosing the Right Department?
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 font-normal">
              Use our interactive symptom router or directly browse accredited senior consultants.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              as={Link}
              href="/doctors"
              className="bg-white text-[#0F766E] hover:bg-teal-50 font-extrabold text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              Find Doctors
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}