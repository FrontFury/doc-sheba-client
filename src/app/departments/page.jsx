'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Bone,
  Activity,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Microscope,
  Pill,
  Loader2,
} from 'lucide-react';
import { Button } from '@heroui/react';

const getDoctorList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  throw new Error('The doctors API returned an invalid response.');
};

const getDepartmentIcon = (department) => {
  const name = department.toLowerCase();

  if (name.includes('cardio') || name.includes('heart')) return Heart;
  if (name.includes('neuro') || name.includes('brain')) return Brain;
  if (name.includes('pediatr') || name.includes('child')) return Baby;
  if (name.includes('ortho') || name.includes('bone') || name.includes('joint')) return Bone;
  if (name.includes('respir') || name.includes('pulmon') || name.includes('lung')) return Activity;
  if (name.includes('onco') || name.includes('cancer')) return Microscope;
  if (name.includes('gyne') || name.includes('obstet')) return Users;
  if (name.includes('gastro') || name.includes('digest') || name.includes('liver')) return Pill;
  if (name.includes('skin') || name.includes('dermat')) return Sparkles;

  return Stethoscope;
};

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const fetchDoctors = async () => {
      try {
        if (!baseUrl) {
          throw new Error('NEXT_PUBLIC_BASE_URL is not configured.');
        }

        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/doctors`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to load departments (${response.status}).`);
        }

        const data = getDoctorList(await response.json());
        setDoctors(data.filter((doctor) => doctor && typeof doctor === 'object'));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          console.error('Failed to fetch departments:', fetchError);
          setError('Unable to load departments right now. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, []);

  const departments = useMemo(() => {
    const departmentMap = new Map();

    doctors.forEach((doctor) => {
      if (typeof doctor.department !== 'string' || !doctor.department.trim()) return;

      const name = doctor.department.trim();
      const key = name.toLowerCase();
      if (!departmentMap.has(key)) {
        departmentMap.set(key, { id: key, name, doctors: [] });
      }
      departmentMap.get(key).doctors.push(doctor);
    });

    return [...departmentMap.values()].map((department) => {
      const categories = [...new Set(
        department.doctors
          .map((doctor) => doctor.deptCategory)
          .filter((category) => typeof category === 'string' && category.trim())
          .map((category) => category.trim())
      )];
      const qualifications = [...new Set(
        department.doctors
          .map((doctor) => doctor.degrees)
          .filter((degrees) => typeof degrees === 'string' && degrees.trim())
          .map((degrees) => degrees.trim())
      )].slice(0, 3);
      const description = department.doctors.find(
        (doctor) => typeof doctor.articleDesc === 'string' && doctor.articleDesc.trim()
      )?.articleDesc;

      return {
        ...department,
        category: categories[0] || 'Specialty',
        categories,
        description: description || `${department.doctors.length} doctor ${department.doctors.length === 1 ? 'profile is' : 'profiles are'} listed in this department.`,
        qualifications,
        popularSpecialist: department.doctors.find(
          (doctor) => typeof doctor.name === 'string' && doctor.name.trim()
        )?.name,
        icon: getDepartmentIcon(department.name),
      };
    });
  }, [doctors]);

  const categories = useMemo(
    () => ['All', ...new Set(departments.flatMap((department) => department.categories))],
    [departments]
  );

  const filteredDepartments = departments.filter((department) => {
    const matchesCategory =
      selectedCategory === 'All' || department.categories.includes(selectedCategory);
    const searchableText = [
      department.name,
      department.description,
      ...department.categories,
      ...department.doctors.flatMap((doctor) => [
        doctor.name,
        doctor.degrees,
        doctor.designation,
        doctor.location,
      ]),
    ]
      .filter((value) => typeof value === 'string')
      .join(' ')
      .toLowerCase();
    return matchesCategory && searchableText.includes(searchQuery.toLowerCase());
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
            <span>
              {isLoading ? 'Loading departments…' : `${departments.length} Departments · ${doctors.length} Doctor Profiles`}
            </span>
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
            Browse departments based on the specialties represented in our doctor directory, and view the doctors and qualifications listed for each one.
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
              {categories.map((cat) => (
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
        {isLoading ? (
          <div className="flex min-h-56 items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
            Loading department directory…
          </div>
        ) : error ? (
          <p role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-10 text-center text-sm font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </p>
        ) : departments.length === 0 ? (
          <p className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No departments are available yet.
          </p>
        ) : filteredDepartments.length === 0 ? (
          <p className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No departments match your search. Try another search term or category.
          </p>
        ) : (
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
                        {dept.doctors.length} {dept.doctors.length === 1 ? 'Doctor' : 'Doctors'}
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

                    {dept.qualifications.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Doctor qualifications
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dept.qualifications.map((qualification) => (
                            <span
                              key={qualification}
                              className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                            >
                              {qualification}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    {dept.popularSpecialist && (
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="shrink-0 text-slate-400 font-bold">Listed doctor:</span>
                        <span className="max-w-[180px] truncate font-extrabold text-[#12343B] dark:text-slate-200">
                          {dept.popularSpecialist}
                        </span>
                      </div>
                    )}

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
        )}

        {/* 5. HERO CALL TO ACTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F766E] via-teal-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-teal-100 border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Find care that fits your needs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-[#Manrope] leading-snug">
              Need Help Choosing the Right Department?
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 font-normal">
              Browse the doctor profiles and specialties currently listed in our directory.
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