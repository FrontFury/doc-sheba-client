'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Video,
  ShieldCheck,
  CheckCircle2,
  Star,
  ThumbsUp,
  Sparkles,
} from 'lucide-react';
import { Button } from '@heroui/react';

// Sample Doctors Data
const DOCTORS_DATA = [
  {
    id: 'dr-bm-abdullah',
    name: 'Dr. BM Abdullah-Al-Mamun',
    title: 'MBBS, FCPS, MD, FCCP (USA)',
    designation: 'Senior Consultant & Coordinator',
    department: 'Respiratory & Pulmonology',
    deptCategory: 'Pulmonology & Respiratory',
    bmdcReg: 'BMDC: A-31043',
    rating: '4.9',
    reviews: '1.2k',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Lung Diseases & Modern Treatment Pathways',
    articleDesc:
      'Clinical pathways on managing chronic obstructive pulmonary disease (COPD) and nebulization.',
    chamberFee: '৳1,500',
    nextSlot: 'Today at 5:15 PM',
    queueTime: '< 12 mins',
  },
  {
    id: 'prof-dr-rawshan',
    name: 'Prof. Dr. Rawshan Jahan',
    title: 'MBBS, FCPS, MD, FCCP (USA)',
    designation: 'Senior Consultant & HOD',
    department: 'Pulmonology & Critical Care',
    deptCategory: 'Pulmonology & Respiratory',
    bmdcReg: 'BMDC: A-18401',
    rating: '5.0',
    reviews: '980',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Causes, Symptoms & Modern Ventilation',
    articleDesc:
      'Early diagnostics for persistent adult wheeze, bronchial thermoplasty, and non-invasive ventilation.',
    chamberFee: '৳1,600',
    nextSlot: 'Today at 6:30 PM',
    queueTime: '< 15 mins',
  },
  {
    id: 'dr-biswajit',
    name: 'Dr. Biswajit Bhattacharjee',
    title: 'MBBS, MD (Radiation Oncology)',
    designation: 'Associate Professor & Head',
    department: 'Radiation Oncology Wing',
    deptCategory: 'Oncology & Radiotherapy',
    bmdcReg: 'BMDC: A-30113',
    rating: '4.8',
    reviews: '1.5k',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Precision Radiotherapy Protocols for Cancer',
    articleDesc:
      'Demystifying targeted photon beams, IMRT protocols, and how precision radiotherapy spares healthy cells.',
    chamberFee: '৳1,800',
    nextSlot: 'Tomorrow at 11:00 AM',
    queueTime: '< 10 mins',
  },
  {
    id: 'dr-arman-reza',
    name: 'Dr. Arman Reza Chowdhury',
    title: 'MBBS, FCPS (Radiotherapy)',
    designation: 'Senior Consultant',
    department: 'Radiation & Clinical Oncology',
    deptCategory: 'Oncology & Radiotherapy',
    bmdcReg: 'BMDC: A-27484',
    rating: '4.9',
    reviews: '850',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Radiotherapy Patient Care & Simulation',
    articleDesc:
      'What patients must expect during simulation, skin care guidelines during fractions, and fatigue management.',
    chamberFee: '৳1,400',
    nextSlot: 'Today at 7:00 PM',
    queueTime: '< 8 mins',
  },
  {
    id: 'dr-sabina',
    name: 'Dr. Sabina Sultana',
    title: 'MBBS, DCH, FCPS (Pediatrics)',
    designation: 'Associate Professor',
    department: 'Pediatrics & Neonatology',
    deptCategory: 'Pediatrics & Neurology',
    bmdcReg: 'BMDC: A-22018',
    rating: '4.9',
    reviews: '2.1k',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Infant Nutrition & Immunity Development',
    articleDesc:
      'Essential immunoglobulins, maternal microbiome transfer, and cognitive development in early child care.',
    chamberFee: '৳1,200',
    nextSlot: 'Today at 6:30 PM',
    queueTime: '< 15 mins',
  },
  {
    id: 'dr-zulfiqur',
    name: 'Dr. A.T.M. Zulfiqur Rahman',
    title: 'MBBS, MS (Ortho), FICS',
    designation: 'Coordinator & Sr. Consultant',
    department: 'Orthopedics & Joint Surgery',
    deptCategory: 'Orthopedics & Spine',
    bmdcReg: 'BMDC: A-19210',
    rating: '5.0',
    reviews: '1.8k',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Advanced Arthroscopic Joint & Pelvic Surgery',
    articleDesc:
      'Minimally invasive arthroscopic joint repair, complex pelvic fractures, and rapid post-surgical mobility.',
    chamberFee: '৳2,000',
    nextSlot: 'Today at 8:00 PM',
    queueTime: '< 20 mins',
  },
  {
    id: 'dr-quazi-smita',
    name: 'Dr. Quazi Smita Haq',
    title: 'MBBS, FCPS (Hematology)',
    designation: 'Consultant & Program Lead',
    department: 'Hematology & Stem Cell',
    deptCategory: 'Oncology & Radiotherapy',
    bmdcReg: 'BMDC: A-33421',
    rating: '4.8',
    reviews: '620',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Blood Cancer: Symptoms & Stem Cell Therapy',
    articleDesc:
      'Understanding unexplained anemia, enlarged lymph nodes, and curative allogeneic stem cell therapies.',
    chamberFee: '৳1,500',
    nextSlot: 'Tomorrow at 10:30 AM',
    queueTime: '< 10 mins',
  },
  {
    id: 'dr-sayeda-nupur',
    name: 'Dr. Sayeda Sanjid Ara Nupur',
    title: 'MBBS, FCPS (Obs & Gynae)',
    designation: 'Consultant Specialist',
    department: 'Fertility & Women’s Health',
    deptCategory: 'Pediatrics & Neurology',
    bmdcReg: 'BMDC: A-28700',
    rating: '4.9',
    reviews: '1.4k',
    image: '/images/HeroBanner.jpg',
    articleTitle: 'Expert Guidance on PCOS & Hormonal Health',
    articleDesc:
      'Hormonal profiling, metabolic insulin regulation, fertility conservation therapies, and diet management.',
    chamberFee: '৳1,600',
    nextSlot: 'Today at 9:00 PM',
    queueTime: '< 12 mins',
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Specialists (54)' },
  { id: 'Pulmonology & Respiratory', label: 'Pulmonology & Respiratory' },
  { id: 'Oncology & Radiotherapy', label: 'Oncology & Radiotherapy' },
  { id: 'Pediatrics & Neurology', label: 'Pediatrics & Neurology' },
  { id: 'Orthopedics & Spine', label: 'Orthopedics & Spine' },
];

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedWing, setSelectedWing] = useState('Central Dhaka Main');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilterPill, setSelectedFilterPill] = useState('today');

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesTab = activeTab === 'all' || doc.deptCategory === activeTab;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.articleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F6] dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-24 pb-16 font-sans">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* 1. HERO HEADER (CLEAN & SMOOTH MATCHING LANDING HERO) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F766E]/10 dark:bg-teal-500/10 border border-[#0F766E]/20 text-[#0F766E] dark:text-teal-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Care You Can Count On • Accredited Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#12343B] dark:text-white tracking-tight font-[#Manrope] leading-tight">
              Find Trusted Doctors & <br />
              <span className="text-[#0F766E] dark:text-teal-400">
                Expert Medical Insights.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Find the right doctor, choose your preferred time, and manage your healthcare — all in one place with zero wait uncertainty.
            </p>

            {/* Quick Stats Line */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                <span>500+ Specialists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                <span>10k+ Patients Served</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                <span>24/7 Sheba Support</span>
              </div>
            </div>
          </div>

          {/* Floating Trust Card */}
          <div className="hidden lg:flex items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300 rounded-2xl">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-extrabold text-[#12343B] dark:text-white">
                99.4% Positive
              </p>
              <p className="text-xs text-slate-400 font-medium">Over 1,200 Verified Reviews</p>
            </div>
          </div>
        </div>

        {/* 2. MINIMALIST & SMOOTH SEARCH BAR */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            
            <div className="lg:col-span-5 relative">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Specialist, Symptoms or Condition
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, disease (e.g. Lung disease, Radiotherapy, PCOS)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Clinical Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              >
                <option value="all">All Departments</option>
                <option value="Pulmonology & Respiratory">Pulmonology & Respiratory</option>
                <option value="Oncology & Radiotherapy">Oncology & Radiotherapy</option>
                <option value="Pediatrics & Neurology">Pediatrics & Neurology</option>
                <option value="Orthopedics & Spine">Orthopedics & Spine</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Hospital Wing / OPD
              </label>
              <select
                value={selectedWing}
                onChange={(e) => setSelectedWing(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              >
                <option value="Central Dhaka Main">Central Dhaka Main</option>
                <option value="Dhanmondi OPD">Dhanmondi OPD</option>
                <option value="Uttara Sector 4">Uttara Sector 4</option>
              </select>
            </div>

            <div className="lg:col-span-2 flex items-end pt-2 lg:pt-0">
              <Button
                className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Find Doctors</span>
              </Button>
            </div>

          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-[#0F766E]" /> Quick Filters:
            </span>

            <button
              onClick={() => setSelectedFilterPill('today')}
              className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                selectedFilterPill === 'today'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Available Today (18)
            </button>

            <button
              onClick={() => setSelectedFilterPill('video')}
              className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all flex items-center gap-1 ${
                selectedFilterPill === 'video'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Video className="w-3 h-3" />
              Video Consult Available
            </button>
          </div>
        </div>

        {/* 3. CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-full font-extrabold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4. SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] dark:text-teal-400">
              SPECIALIZED CLINICAL CARE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Verified Specialist Directory
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold">Sort By:</span>
            <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none">
              <option>Highest Patient Trust Rating</option>
              <option>Earliest Available Slot</option>
            </select>
          </div>
        </div>

        {/* 5. SMOOTH 4-COLUMN CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-lg hover:border-[#0F766E]/30 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Doctor Profile Header */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#0F766E] dark:text-teal-400 uppercase tracking-wider block truncate">
                        {doc.department}
                      </span>
                      <h3 className="font-extrabold text-sm text-[#12343B] dark:text-slate-100 truncate group-hover:text-[#0F766E] transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate font-medium">
                        {doc.designation}
                      </p>
                      <div className="flex items-center gap-2 pt-0.5 text-[10px]">
                        <span className="flex items-center gap-0.5 font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400" /> {doc.rating}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 font-medium">{doc.bmdcReg}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Guide Brief */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-1">
                    <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-200 line-clamp-1 leading-tight">
                      {doc.articleTitle}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {doc.articleDesc}
                    </p>
                  </div>

                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Chamber Fee</span>
                      <span className="font-black text-sm text-[#12343B] dark:text-slate-100">
                        {doc.chamberFee}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Avg Queue Time</span>
                      <span className="font-extrabold text-xs text-teal-600 dark:text-teal-400">
                        {doc.queueTime}
                      </span>
                    </div>
                  </div>

                  <Button
                    as={Link}
                    href={`/book-appointment?doctor=${doc.id}`}
                    className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-2.5 rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 6. PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-xs">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-800 dark:text-slate-200 font-bold">1-8</span> of{' '}
            <span className="text-slate-800 dark:text-slate-200 font-bold">54</span> accredited medical specialists
          </p>

          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-[#0F766E] text-white font-bold text-xs">
              1
            </button>
            <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100">
              2
            </button>
            <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100">
              3
            </button>
            <span className="px-1 text-slate-400 font-bold">...</span>
            <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100">
              6
            </button>
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}