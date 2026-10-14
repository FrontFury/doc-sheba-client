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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-24 pb-16 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Banner Section */}
        <section className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#073b3b] via-[#0f766e] to-[#14a98b] px-6 py-9 text-white shadow-xl shadow-teal-950/15 sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border-[40px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-44 right-1/4 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-teal-50 backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Doctor directory · Care starts with the right specialist
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl font-[#Manrope]">
                  Find care that
                  <span className="block text-emerald-200">fits your needs.</span>
                </h1>
                <p className="max-w-xl text-sm leading-6 text-teal-50/85 sm:text-base">
                  Explore doctor profiles, compare specialties and consultation details, then connect with the right care for you.
                </p>
              </div>
              <a
                href="#doctor-directory"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#0F766E] shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Browse specialists <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:p-5">
                <Stethoscope className="mb-4 h-5 w-5 text-emerald-200" />
                <p className="text-3xl font-black">{isLoading ? '—' : doctors.length}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Doctor profiles</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:p-5">
                <GraduationCap className="mb-4 h-5 w-5 text-emerald-200" />
                <p className="text-3xl font-black">{isLoading ? '—' : categories.length}</p>
                <p className="mt-1 text-xs font-semibold text-teal-50/75">Specialty areas</p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-300/15 p-2.5 text-amber-200">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Patient ratings</p>
                    <p className="text-xs text-teal-50/75">
                      {ratingCount ? `Average across ${ratingCount} rated profiles` : 'Ratings shown when available'}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-black">{averageRating || '—'}{averageRating && <span className="text-sm text-teal-50/75"> / 5</span>}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100"
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
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-md shadow-teal-900/15 dark:bg-teal-400 dark:text-slate-950'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-[#0F766E] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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

          {/* 💡 EVERY ROW 2 CARDS GRID HERE (grid-cols-1 md:grid-cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-md transition-all hover:border-teal-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="space-y-4">
                      {/* Doctor Avatar & Information Header */}
                      <div className="flex items-start gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800">
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
                              <Stethoscope className="h-8 w-8" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0F766E] dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            <BadgeCheck className="h-3 w-3 shrink-0 text-[#0F766E] dark:text-teal-400" />
                            <span className="truncate">{doc.designation || 'Consultant Specialist'}</span>
                          </span>

                          <h3 className="truncate text-lg sm:text-xl font-extrabold text-[#12343B] dark:text-slate-100 group-hover:text-[#0F766E] transition-colors">
                            {doctorName}
                          </h3>

                          <p className="truncate text-xs font-black uppercase tracking-widest text-[#0F766E] dark:text-teal-400">
                            {department}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {degrees !== 'Qualifications not listed' && (
                              <span className="truncate text-[11px]">{degrees}</span>
                            )}
                            {rating > 0 && (
                              <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                                <Star className="h-3.5 w-3.5 fill-amber-400" /> {rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Article Guidance Brief / Insight Box */}
                      {(doc.articleTitle || doc.articleDesc) && (
                        <div className="bg-[#F8FAFC] dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
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
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                            Chamber Fee
                          </span>
                          <span className="font-black text-lg text-[#12343B] dark:text-slate-100">
                            {chamberFee}
                          </span>
                        </div>

                        {doc.avgQueueTime && (
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              Avg Queue
                            </span>
                            <span className="font-extrabold text-xs text-[#0F766E] dark:text-teal-400">
                              {doc.avgQueueTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {doc.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0F766E] dark:text-teal-400" />
                          <span className="truncate">{doc.location}</span>
                        </div>
                      )}

                      {doctorId ? (
                        <Button
                          type="button"
                          onPress={() => handleBookAppointment(doctorId)}
                          isDisabled={Boolean(bookingDoctorId)}
                          className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-extrabold text-xs py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
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