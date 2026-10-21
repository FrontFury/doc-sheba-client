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
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_#e6f7f3_0%,_#f8fafc_40%,_#f8fafc_100%)] pt-24 pb-20 font-sans text-slate-800 dark:bg-[radial-gradient(ellipse_at_top,_#123b3a_0%,_#020617_40%,_#020617_100%)] dark:text-slate-200">
      <div className="pointer-events-none absolute -left-48 top-[36rem] h-96 w-96 rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-500/5" />
      <div className="pointer-events-none absolute -right-48 top-[80rem] h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/5" />
      <div className="relative mx-auto w-full max-w-[1600px] space-y-9 px-4 sm:space-y-10 sm:px-8 lg:px-12">
        
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

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1.5 text-[10px] font-bold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-slate-900/80 dark:text-emerald-300 sm:text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isLoading ? 'Loading departments…' : `${departments.length} Departments · ${doctors.length} Doctor Profiles`}
            </span>
          </div>
        </div>

        {/* 2. HERO TITLE SECTION */}
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#062f32] via-[#0F766E] to-[#14a98b] px-6 py-8 text-white shadow-2xl shadow-teal-950/15 sm:rounded-[2.5rem] sm:px-10 sm:py-11 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute -right-20 -top-32 h-[27rem] w-[27rem] rounded-full border border-white/10 shadow-[0_0_0_32px_rgba(255,255,255,0.025),0_0_0_64px_rgba(255,255,255,0.02)]" />
          <div className="pointer-events-none absolute -bottom-44 right-1/4 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />
          <div className="relative grid gap-9 lg:grid-cols-[1.3fr_0.8fr] lg:items-center">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-black tracking-wide text-teal-50 shadow-sm backdrop-blur sm:text-xs">
                <Sparkles className="h-4 w-4 text-amber-300" />
                SPECIALIZED CARE, ALL IN ONE PLACE
              </div>
              <h1 className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[3.75rem]">
                Care for every
                <span className="block text-emerald-200">part of your health.</span>
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-teal-50/85 sm:text-base sm:leading-7">
                Explore the specialties in our doctor directory, discover listed qualifications, and find a team that fits your needs.
              </p>
              <a
                href="#department-directory"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#0F766E] shadow-lg shadow-teal-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Explore departments <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:p-5">
                <div className="mb-4 inline-flex rounded-xl bg-emerald-200/15 p-2.5 text-emerald-200">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{isLoading ? '—' : departments.length}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Departments</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:p-5">
                <div className="mb-4 inline-flex rounded-xl bg-cyan-200/15 p-2.5 text-cyan-100">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{isLoading ? '—' : categories.length - 1}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Specialty areas</p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-300/15 p-2.5 text-amber-200">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Doctor profiles</p>
                    <p className="text-xs text-teal-50/75">Listed across our departments</p>
                  </div>
                </div>
                <span className="text-2xl font-black">{isLoading ? '—' : doctors.length}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEARCH & CATEGORY FILTER */}
        <section id="department-directory" className="scroll-mt-28 space-y-5">
        <div className="space-y-4 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/10 dark:ring-white/[0.03] sm:rounded-[2rem] sm:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md md:flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search department or treatment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/80 py-3 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
              />
            </div>

            <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 md:w-auto [scrollbar-width:thin]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0F766E] text-white shadow-lg shadow-teal-900/20 ring-1 ring-teal-700 dark:bg-teal-400 dark:text-slate-950'
                      : 'border border-slate-200/80 bg-white text-slate-600 shadow-sm hover:border-teal-300 hover:text-[#0F766E] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 4. DEPARTMENT CARDS GRID */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0F766E] dark:text-teal-300">Find your specialty</p>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-[#12343B] dark:text-white sm:text-3xl">
              Explore departments
            </h2>
          </div>
          {!isLoading && !error && (
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing {filteredDepartments.length} of {departments.length} {departments.length === 1 ? 'department' : 'departments'}
            </p>
          )}
        </div>
        {isLoading ? (
          <div className="flex min-h-56 items-center justify-center gap-3 rounded-3xl border border-slate-200/80 bg-white/90 text-sm font-medium text-slate-500 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
            Loading department directory…
          </div>
        ) : error ? (
          <p role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-10 text-center text-sm font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </p>
        ) : departments.length === 0 ? (
          <p className="rounded-3xl border border-slate-200/80 bg-white/90 px-5 py-10 text-center text-sm font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No departments are available yet.
          </p>
        ) : filteredDepartments.length === 0 ? (
          <p className="rounded-3xl border border-slate-200/80 bg-white/90 px-5 py-10 text-center text-sm font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No departments match your search. Try another search term or category.
          </p>
        ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.045] ring-1 ring-slate-900/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 dark:ring-white/[0.03]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-teal-50 via-emerald-50/80 to-cyan-50/70 dark:from-teal-950/70 dark:via-slate-800/50 dark:to-cyan-950/30" />
                  <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-teal-900/[0.045] shadow-[0_0_0_18px_rgba(15,118,110,0.025)] dark:border-white/[0.04] dark:shadow-[0_0_0_18px_rgba(255,255,255,0.015)]" />
                  <div className="relative space-y-4 px-5 pt-5 sm:px-6 sm:pt-6">
                    
                    {/* Header: Icon & Doctor Count */}
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border border-teal-100/80 bg-white/90 p-3.5 text-[#0F766E] shadow-md shadow-teal-950/5 transition-colors group-hover:bg-[#0F766E] group-hover:text-white dark:border-teal-900/60 dark:bg-teal-950/80 dark:text-teal-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="rounded-full border border-emerald-200/80 bg-white/80 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/80 dark:text-emerald-300 sm:text-[11px]">
                        {dept.doctors.length} {dept.doctors.length === 1 ? 'Doctor' : 'Doctors'}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#0F766E] dark:text-teal-400 sm:text-[10px]">
                        {dept.category}
                      </span>
                      <h3 className="mt-1 font-[family-name:var(--font-manrope)] text-lg font-extrabold leading-snug tracking-tight text-[#12343B] transition-colors group-hover:text-[#0F766E] dark:text-white">
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
                              className="rounded-lg border border-slate-200/70 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                            >
                              {qualification}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Footer Action Bar */}
                  <div className="mt-4 space-y-3 border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-800 sm:px-6 sm:pb-6">
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F766E] to-emerald-600 py-3 text-xs font-extrabold text-white shadow-lg shadow-teal-900/15 transition-all duration-200 hover:from-[#0E7490] hover:to-teal-600 hover:shadow-xl hover:shadow-teal-900/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25"
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
        </section>

        {/* 5. HERO CALL TO ACTION */}
        <div className="relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#073b3b] via-[#0F766E] to-emerald-600 p-6 text-white shadow-2xl shadow-teal-950/20 sm:flex-row sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full border border-white/10 shadow-[0_0_0_24px_rgba(255,255,255,0.025),0_0_0_48px_rgba(255,255,255,0.02)]" />
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-teal-100 backdrop-blur-md sm:text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Find care that fits your needs</span>
            </div>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold leading-snug sm:text-4xl">
              Need Help Choosing the Right Department?
            </h2>
            <p className="text-xs font-normal text-teal-50/85 sm:text-sm">
              Browse the doctor profiles and specialties currently listed in our directory.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              as={Link}
              href="/doctors"
              className="rounded-xl bg-white px-7 py-3.5 text-xs font-extrabold text-[#0F766E] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-50 sm:px-8 sm:py-4 sm:text-sm"
            >
              Find Doctors
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}