"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronRight, Stethoscope, MapPin, Loader2 } from "lucide-react";
import { Button } from "@heroui/react";
import { hasActivePatientSession } from "@/lib/actions/appointments";

const getDoctorList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  throw new Error("The doctors API returned an invalid response.");
};

const getDoctorId = (doctor) =>
  doctor.doctorID || doctor._id?.$oid || doctor._id || doctor.id;

const getDoctorDepartment = (doctor) =>
  doctor.department || doctor.deptCategory || doctor.specialty || doctor.speciality;

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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SpecialDoc() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingDoctorId, setBookingDoctorId] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingErrorDoctorId, setBookingErrorDoctorId] = useState("");

  const handleBookAppointment = async (doctorId) => {
    const requestedDoctorId = String(doctorId);
    setBookingDoctorId(requestedDoctorId);
    setBookingError("");
    setBookingErrorDoctorId("");

    try {
      const bookingUrl = `/book-appointment?doctor=${encodeURIComponent(requestedDoctorId)}`;
      const isAuthenticated = await hasActivePatientSession();
      setBookingDoctorId("");

      router.push(
        isAuthenticated
          ? bookingUrl
          : `/auth/signin?callbackUrl=${encodeURIComponent(bookingUrl)}`
      );
    } catch (sessionError) {
      console.error("Unable to verify the patient session:", sessionError);
      setBookingError("Unable to verify your session. Please try again.");
      setBookingErrorDoctorId(requestedDoctorId);
      setBookingDoctorId("");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const fetchDoctors = async () => {
      try {
        if (!baseUrl) {
          throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
        }

        const response = await fetch(
          `${baseUrl.replace(/\/$/, "")}/api/doctors`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Failed to load doctors (${response.status}).`);
        }

        const doctorList = getDoctorList(await response.json());
        setDoctors(doctorList.filter((doctor) => doctor && typeof doctor === "object").slice(0, 6));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Failed to fetch featured doctors:", fetchError);
          setError("Unable to load featured doctors right now.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, []);

  const featuredDoctors = doctors;

  return (
    <section className="py-12 lg:py-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10"
        >
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] dark:text-teal-400 uppercase">
              DOCTORS FROM OUR DIRECTORY
            </span>
            <h2 className="font-[#Manrope] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
              Featured Medical Specialists
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-400 leading-relaxed mt-1">
              Explore doctor qualifications, specialties and consultation details shared on each profile.
            </p>
          </div>

          {!isLoading && !error && (
            <span className="shrink-0 rounded-full border border-teal-700/20 bg-teal-50 px-4 py-2 text-xs font-bold text-[#0F766E] dark:border-teal-600/30 dark:bg-teal-950/60 dark:text-teal-300">
              {featuredDoctors.length} featured {featuredDoctors.length === 1 ? "doctor" : "doctors"}
            </span>
          )}
        </motion.div>

        {isLoading ? (
          <div className="flex min-h-56 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
            Loading featured doctors…
          </div>
        ) : error ? (
          <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-10 text-center text-sm font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </p>
        ) : featuredDoctors.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No doctor profiles are available yet.
          </p>
        ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {featuredDoctors.map((doc, index) => {
              const id = getDoctorId(doc);
              const name = doc.name || "Doctor";
              const specialty = getDoctorDepartment(doc);
              const qualification =
                doc.degrees || doc.qualification || doc.qualifications || doc.designation || doc.title;
              const location = doc.hospital || doc.location;
              const rating = doc.rating ? String(doc.rating) : "";
              const image = typeof doc.image === "string" ? doc.image : "";

              return (
              <motion.div
                key={`${String(id || name)}-${index}`}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-teal-400/80 hover:shadow-xl hover:shadow-teal-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/60 group"
              >
                <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#0F766E] via-teal-600 to-emerald-500">
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      fill
                      unoptimized
                      aria-hidden="true"
                      className="object-cover opacity-20 mix-blend-screen transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute -right-5 -top-16 h-40 w-40 rounded-full border-[20px] border-white/10" />
                  <div className="absolute -bottom-10 left-1/3 h-28 w-28 rounded-full bg-emerald-300/20 blur-xl" />
                  <div className="absolute left-5 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur">
                    <Stethoscope className="h-3.5 w-3.5" />
                    Featured specialist
                  </div>
                  {rating && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-slate-950/20 px-2.5 py-1.5 text-xs font-extrabold text-white backdrop-blur">
                      <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                      {rating}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 pt-0">
                  <div className="relative -mt-9">
                    <div className="mb-4 flex items-end justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-teal-50 shadow-lg transition-transform duration-300 group-hover:-rotate-2 dark:border-slate-900 dark:bg-slate-800">
                        {image ? (
                          <Image
                            src={image}
                            alt={name}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-108 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-teal-700 dark:text-teal-300">
                            <Stethoscope className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 pb-1">
                        <h3 className="font-extrabold text-base text-[#12343B] dark:text-slate-100 leading-snug group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                          {name}
                        </h3>
                        {specialty && (
                          <p className="text-xs sm:text-sm font-semibold text-[#0F766E] dark:text-teal-400">
                            {specialty}
                          </p>
                        )}
                        {qualification && (
                          <p className="mt-0.5 text-[11px] text-[#64748B] dark:text-slate-400">
                            {qualification}
                          </p>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="w-full border-t border-slate-100 dark:border-slate-800/80 my-3.5" />

                  {(doc.experience || location || doc.visitingHours || doc.chamberFee) && (
                    <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                      {doc.experience && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                            Experience
                          </span>
                          <span className="mt-0.5 block truncate font-extrabold text-[#12343B] dark:text-slate-200">
                            {doc.experience}
                          </span>
                        </div>
                      )}
                      {location && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                            Hospital / Location
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 truncate font-extrabold text-[#12343B] dark:text-slate-200">
                            <MapPin className="h-3 w-3 shrink-0 text-teal-600" />
                            {location}
                          </span>
                        </div>
                      )}
                      {doc.visitingHours && (
                        <div className="col-span-2">
                          <span className="block text-[10px] uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                            Visiting hours
                          </span>
                          <span className="mt-0.5 block truncate font-extrabold text-[#12343B] dark:text-slate-200">
                            {doc.visitingHours}
                          </span>
                        </div>
                      )}
                      {doc.chamberFee && (
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                            Consultation fee
                          </span>
                          <span className="mt-0.5 block truncate font-extrabold text-[#12343B] dark:text-slate-200">
                            {String(doc.chamberFee).startsWith("৳") ? doc.chamberFee : `৳${doc.chamberFee}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {id ? <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onPress={() => handleBookAppointment(id)}
                    isDisabled={Boolean(bookingDoctorId)}
                    endContent={<ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />}
                    className="w-full bg-gradient-to-r from-[#0F766E] to-emerald-600 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-900/15 hover:from-[#0E7490] hover:to-teal-600"
                  >
                    {bookingDoctorId === String(id) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    {bookingDoctorId === String(id) ? "Checking session…" : "Book Appointment"}
                  </Button>
                  {bookingError && bookingErrorDoctorId === String(id) && (
                    <p role="alert" className="mt-2 text-center text-xs font-semibold text-rose-600">
                      {bookingError}
                    </p>
                  )}
                </motion.div> : (
                  <p className="text-center text-xs font-medium text-slate-500">
                    Contact the clinic to book.
                  </p>
                )}

                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}

      </div>
    </section>
  );
}