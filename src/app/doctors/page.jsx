'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Star,
  Loader2,
  Stethoscope,
  GraduationCap,
  BadgeCheck,
  UsersRound,
  X,
  Clock,
  MapPin,
} from 'lucide-react';
import { Button } from '@heroui/react';
import { hasActivePatientSession } from '@/lib/actions/appointments';

export default function FindDoctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedWing, setSelectedWing] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [bookingDoctorId, setBookingDoctorId] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingErrorDoctorId, setBookingErrorDoctorId] = useState('');

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
          throw new Error(`Failed to load doctors (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('The doctors API returned an invalid response.');
        }

        setDoctors(data.map((doctor, index) => {
          const mongoId = doctor._id?.$oid || doctor._id;
          const id = mongoId || doctor.id || doctor.doctorID || `${doctor.name || 'doctor'}-${index}`;

          return { ...doctor, directoryKey: `${String(id)}-${index}` };
        }));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          console.error('Failed to fetch doctors:', fetchError);
          setError('Unable to load doctors right now. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, []);

  const departments = [...new Set(doctors.map((doc) => doc.department).filter(Boolean))];
  const locations = [...new Set(doctors.map((doc) => doc.location).filter(Boolean))];
  const categories = [...new Set(doctors.map((doc) => doc.deptCategory || doc.department).filter(Boolean))];
  const categoryTabs = [
    { id: 'all', label: `All Specialists (${doctors.length})` },
    ...categories.map((category) => ({ id: category, label: category })),
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const category = doc.deptCategory || doc.department;
    const matchesTab = activeTab === 'all' || category === activeTab;
    const matchesDepartment =
      selectedDepartment === 'all' || doc.department === selectedDepartment;
    const matchesLocation = selectedWing === 'all' || doc.location === selectedWing;
    const matchesSearch =
      [doc.name, doc.department, doc.deptCategory, doc.designation, doc.articleTitle, doc.articleDesc, doc.degrees, doc.location]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesDepartment && matchesLocation && matchesSearch;
  });

  const sortedDoctors = [...filteredDoctors].sort((first, second) => {
    if (sortBy === 'rating') {
      return (Number(second.rating) || 0) - (Number(first.rating) || 0);
    }
    if (sortBy === 'fee') {
      const fee = (doctor) => Number(String(doctor.chamberFee || '').replace(/[^\d.]/g, '')) || Infinity;
      return fee(first) - fee(second);
    }
    return String(first.name || '').localeCompare(String(second.name || ''));
  });

  const ratingCount = doctors.filter((doctor) => Number(doctor.rating) > 0).length;

  const handleBookAppointment = async (doctorId) => {
    const requestedDoctorId = String(doctorId);
    setBookingDoctorId(requestedDoctorId);
    setBookingError('');
    setBookingErrorDoctorId('');

    try {
      const bookingUrl = `/book-appointment?doctor=${encodeURIComponent(requestedDoctorId)}`;
      const isAuthenticated = await hasActivePatientSession();
      setBookingDoctorId('');

      if (isAuthenticated) {
        router.push(bookingUrl);
      } else {
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(bookingUrl)}`);
      }
    } catch (bookingError) {
      console.error('Unable to verify the patient session:', bookingError);
      setBookingError('Unable to verify your session. Please try again.');
      setBookingErrorDoctorId(requestedDoctorId);
      setBookingDoctorId('');
    }
  };
  const averageRating = ratingCount
    ? (doctors.reduce((total, doctor) => total + (Number(doctor.rating) || 0), 0) /
        ratingCount).toFixed(1)
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_#e6f7f3_0%,_#f8fafc_42%,_#f8fafc_100%)] pt-24 pb-16 font-sans text-slate-800 dark:bg-[radial-gradient(ellipse_at_top,_#123b3a_0%,_#020617_42%,_#020617_100%)] dark:text-slate-200">
      <div className="pointer-events-none absolute -left-48 top-[28rem] h-96 w-96 rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-500/5" />
      <div className="pointer-events-none absolute -right-48 top-[64rem] h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/5" />
      <div className="relative mx-auto w-full max-w-[1600px] space-y-10 px-4 sm:px-8 lg:px-12">
        
        {/* Banner Section */}
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#062f32] via-[#0F766E] to-[#12a889] px-6 py-9 text-white shadow-2xl shadow-teal-950/20 sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-[27rem] w-[27rem] rounded-full border-[1px] border-white/10 shadow-[0_0_0_32px_rgba(255,255,255,0.025),0_0_0_64px_rgba(255,255,255,0.02)]" />
          <div className="pointer-events-none absolute -bottom-44 right-1/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white/[0.06] to-transparent lg:block" />
          <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.8fr] lg:items-center">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-teal-50 shadow-sm backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-emerald-200" />
                DOCTOR DIRECTORY <span className="text-white/50">/</span> CARE, MADE PERSONAL
              </div>
              <div className="space-y-3">
                <h1 className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[3.75rem]">
                  The right doctor
                  <span className="mt-1 block text-emerald-200">changes everything.</span>
                </h1>
                <p className="max-w-xl text-sm leading-6 text-teal-50/85 sm:text-base sm:leading-7">
                  Meet trusted specialists, compare the details that matter, and take the next step toward feeling better.
                </p>
              </div>
              <a
                href="#doctor-directory"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#0F766E] shadow-lg shadow-teal-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Browse specialists <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:p-5">
                <div className="mb-4 inline-flex rounded-xl bg-emerald-200/15 p-2.5 text-emerald-200">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{isLoading ? '—' : doctors.length}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Doctor profiles</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:p-5">
                <div className="mb-4 inline-flex rounded-xl bg-cyan-200/15 p-2.5 text-cyan-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{isLoading ? '—' : categories.length}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Specialty areas</p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.09] p-4 shadow-lg shadow-teal-950/5 backdrop-blur-md sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-300/15 p-2.5 text-amber-200 shadow-inner">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Patient ratings</p>
                    <p className="text-xs text-teal-50/75">
                      {ratingCount ? `Average across ${ratingCount} rated profiles` : 'Ratings shown when available'}
                    </p>
                  </div>
                </div>
                <span className="whitespace-nowrap text-2xl font-black">{averageRating || '—'}{averageRating && <span className="text-sm text-teal-50/75"> / 5</span>}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/10 dark:ring-white/[0.03] sm:rounded-[2rem] sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-xl bg-teal-50 p-2 text-[#0F766E] dark:bg-teal-950 dark:text-teal-300">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#12343B] dark:text-white">Find your specialist</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Search profiles and narrow by department or location.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Search doctors
              </label>
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Name, specialty, qualification or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/90 bg-slate-50/80 py-3 pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 rounded-full p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Clinical Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
              >
                <option value="all">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Location
              </label>
              <select
                value={selectedWing}
                onChange={(e) => setSelectedWing(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end lg:col-span-2">
              <Button
                as="a"
                href="#doctor-directory"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] hover:bg-[#0E7490] py-3.5 text-sm font-extrabold text-white shadow-md transition-all"
              >
                <Search className="h-4 w-4" />
                <span>Find doctors</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Directory Listings */}
        <section id="doctor-directory" className="scroll-mt-28 space-y-5">
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-lg shadow-teal-900/20 ring-1 ring-teal-700 dark:bg-teal-400 dark:text-slate-950'
                      : 'border border-slate-200/80 bg-white/85 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:text-[#0F766E] dark:border-slate-800 dark:bg-slate-900/85 dark:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.035] ring-1 ring-slate-900/[0.03] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/90 dark:ring-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.75rem] sm:px-6">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#0F766E] dark:text-teal-300">
                Specialist directory
              </p>
              <h2 className="text-2xl font-black tracking-tight text-[#12343B] dark:text-white">
                Meet your care team
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isLoading ? 'Finding available profiles…' : `${filteredDoctors.length} matching ${filteredDoctors.length === 1 ? 'doctor' : 'doctors'} from ${doctors.length} profiles`}
              </p>
            </div>

            <label className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[#0F766E] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="name">Name</option>
                <option value="rating">Highest rating</option>
                <option value="fee">Consultation fee</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <div className="col-span-full flex min-h-64 items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                  <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
                  Loading doctor profiles…
                </div>
              ) : error ? (
                <div className="col-span-full rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                  {error}
                </div>
              ) : sortedDoctors.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] dark:bg-teal-950 dark:text-teal-300">
                    <UsersRound className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">No matching doctors</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                    Try another name or specialty, or clear your filters to see all available profiles.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDepartment('all');
                      setSelectedWing('all');
                      setActiveTab('all');
                    }}
                    className="mt-5 rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0E7490] dark:bg-teal-400 dark:text-slate-950"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : sortedDoctors.map((doc, index) => {
                const doctorId = doc.doctorID || doc._id?.$oid || doc._id || doc.id;
                const doctorName = doc.name || 'Doctor';
                const degrees = doc.degrees || 'Qualifications not listed';
                const department = doc.department || doc.deptCategory || 'Medical specialist';
                const rating = Number(doc.rating);
                const chamberFee = doc.chamberFee
                  ? String(doc.chamberFee).startsWith('৳')
                    ? String(doc.chamberFee)
                    : `৳${doc.chamberFee}`
                  : 'Contact for fee';

                return (
                  <motion.article
                    key={doc.directoryKey || `${String(doc._id || doc.doctorID || doc.id || doctorName)}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.045] ring-1 ring-slate-900/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 dark:ring-white/[0.03]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-teal-50 via-emerald-50/80 to-cyan-50/70 dark:from-teal-950/70 dark:via-slate-800/50 dark:to-cyan-950/30" />
                    <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-teal-900/[0.045] shadow-[0_0_0_18px_rgba(15,118,110,0.025)] dark:border-white/[0.04] dark:shadow-[0_0_0_18px_rgba(255,255,255,0.015)]" />
                    <div className="relative space-y-4 px-5 pt-5 sm:px-6 sm:pt-6">
                      {/* Doctor Avatar & Information Header */}
                      <div className="flex items-start gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.5rem] border-4 border-white bg-slate-100 shadow-lg shadow-teal-950/10 ring-1 ring-teal-900/5 dark:border-slate-800 dark:bg-slate-800 dark:ring-white/10">
                          {doc.image ? (
                            <Image
                              src={doc.image}
                              alt={doctorName}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-400">
                              <Stethoscope className="h-9 w-9" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-teal-200/80 bg-white/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#0F766E] shadow-sm dark:border-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                            <BadgeCheck className="h-3 w-3 shrink-0 text-[#0F766E] dark:text-teal-400" />
                            <span className="truncate">{doc.designation || 'Consultant Specialist'}</span>
                          </span>

                          <h3 className="truncate text-lg font-extrabold tracking-tight text-[#12343B] transition-colors group-hover:text-[#0F766E] dark:text-slate-100 sm:text-xl">
                            {doctorName}
                          </h3>

                          <p className="truncate text-[11px] font-black uppercase tracking-[0.13em] text-[#0F766E] dark:text-teal-400">
                            {department}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                            {degrees !== 'Qualifications not listed' && (
                              <span className="truncate text-[11px]">{degrees}</span>
                            )}
                            {rating > 0 && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 font-extrabold text-amber-700 ring-1 ring-amber-200/70 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/20">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-500" /> {rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Article Guidance Brief / Insight Box */}
                      {(doc.articleTitle || doc.articleDesc) && (
                        <div className="space-y-1 rounded-2xl border border-teal-100/80 bg-white/80 p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                          {doc.articleTitle && (
                            <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-100 truncate">
                              {doc.articleTitle}
                            </h4>
                          )}
                          {doc.articleDesc && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                              {doc.articleDesc}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata: Chamber Fee, Location & Action Button */}
                    <div className="mt-5 space-y-4 border-t border-slate-100/90 px-5 pb-5 pt-4 dark:border-slate-800 sm:px-6 sm:pb-6">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                            Chamber Fee
                          </span>
                          <span className="font-[family-name:var(--font-manrope)] text-xl font-extrabold tracking-tight text-[#12343B] dark:text-slate-100">
                            {chamberFee}
                          </span>
                        </div>

                        {doc.avgQueueTime && (
                          <div className="text-right">
                            <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                              Avg Queue
                            </span>
                            <span className="font-extrabold text-sm text-[#0F766E] dark:text-teal-400">
                              {doc.avgQueueTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {doc.location && (
                        <div className="flex items-center gap-1.5 truncate rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0F766E] dark:text-teal-400" />
                          <span className="truncate">{doc.location}</span>
                        </div>
                      )}

                      {doctorId ? (
                        <Button
                          type="button"
                          onPress={() => handleBookAppointment(doctorId)}
                          isDisabled={Boolean(bookingDoctorId)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F766E] to-emerald-600 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-teal-900/15 transition-all duration-200 hover:from-[#0E7490] hover:to-teal-600 hover:shadow-xl hover:shadow-teal-900/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25"
                        >
                          {bookingDoctorId === String(doctorId) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                          <span>{bookingDoctorId === String(doctorId) ? 'Checking session…' : 'Book Appointment'}</span>
                        </Button>
                      ) : (
                        <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 py-2">
                          Contact clinic to book
                        </p>
                      )}
                      {bookingError && bookingErrorDoctorId === String(doctorId) && (
                        <p role="alert" className="text-center text-xs font-semibold text-rose-600">
                          {bookingError}
                        </p>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
}