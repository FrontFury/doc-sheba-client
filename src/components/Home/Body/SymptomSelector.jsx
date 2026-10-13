"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import BodyModelSvg from "./BodyModelSvg";
import {
  User,
  UserCheck,
  Stethoscope,
  Star,
  ArrowRight,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@heroui/react";

const BODY_PART_SPECIALTY_TERMS = {
  head: [
    "neurolog", "brain", "ophthalm", "eye", "ent", "ear", "nose", "throat",
    "dent", "oral", "psychiatr", "mental",
  ],
  chest: [
    "cardio", "heart", "cardiac", "respir", "pulmon", "lung", "thoracic",
  ],
  abdomen: [
    "gastro", "digest", "hepat", "liver", "nephro", "kidney", "urolog",
    "general surgery",
  ],
  pelvis: [
    "gyne", "gynae", "obstet", "reproduct", "uro", "pelvic",
  ],
  arms: [
    "orthop", "bone", "joint", "rheumat", "physical medicine", "rehab",
    "musculoskeletal",
  ],
  legs: [
    "orthop", "bone", "joint", "vascular", "physical medicine", "rehab",
    "musculoskeletal",
  ],
};

const getDoctorList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  throw new Error("The doctors API returned an invalid response.");
};

const getDoctorSpecialty = (doctor) => {
  const specialty =
    doctor.department ||
    doctor.deptCategory ||
    doctor.specialty ||
    doctor.speciality;
  return typeof specialty === "string" ? specialty : "";
};

const getDepartmentsForPart = (doctors, part) => {
  const terms = BODY_PART_SPECIALTY_TERMS[part] || [];
  const matches = new Map();

  doctors.forEach((doctor) => {
    const specialty = getDoctorSpecialty(doctor);
    if (
      specialty &&
      terms.some((term) => specialty.toLowerCase().includes(term))
    ) {
      const key = specialty.trim().toLowerCase();
      if (!matches.has(key)) matches.set(key, specialty.trim());
    }
  });

  return [...matches.values()];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SymptomSelector() {
  const [gender, setGender] = useState("male");
  const [selectedPart, setSelectedPart] = useState("chest");
  const [selectedDept, setSelectedDept] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        setDoctors(doctorList.filter((doctor) => doctor && typeof doctor === "object"));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Failed to fetch doctors for symptom selector:", fetchError);
          setError("Unable to load doctor information. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, []);

  const activeDepartments = useMemo(
    () => getDepartmentsForPart(doctors, selectedPart),
    [doctors, selectedPart]
  );
  const activeDepartment = activeDepartments.includes(selectedDept)
    ? selectedDept
    : activeDepartments[0] || "";
  const activeDoctors = useMemo(
    () => doctors.filter((doctor) => {
      const specialty = getDoctorSpecialty(doctor);
      return (
        activeDepartment &&
        specialty.trim().toLowerCase() === activeDepartment.trim().toLowerCase()
      );
    }),
    [doctors, activeDepartment]
  );

  const handlePartSelect = (partId) => {
    // Map SVG specific sub-parts to high-level clinical categories
    let mappedPart = partId;
    if (["elbow", "arm"].includes(partId)) mappedPart = "arms";
    if (["thigh", "knee", "foot"].includes(partId)) mappedPart = "legs";
    if (partId === "neck") mappedPart = "head";

    setSelectedPart(mappedPart);
    const matchingDepartments = getDepartmentsForPart(doctors, mappedPart);
    setSelectedDept(matchingDepartments[0] || "");
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    if (newGender === "male" && selectedPart === "pelvis") {
      handlePartSelect("chest");
    } else {
      handlePartSelect(selectedPart);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-[#172033] dark:text-slate-200 transition-colors overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 lg:mb-14"
        >
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] dark:text-teal-400 uppercase mb-2">
            INTERACTIVE CLINICAL SELECTOR
          </span>
          <h2 className="font-[#Manrope] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
            Find Specialists by Anatomy
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-400 mt-2">
            Click on any body region or symptom label below to automatically route to expert medical specialists.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: SVG Model */}
          <div className="lg:col-span-4 bg-[#F8FAFC] dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center shadow-sm">
            {/* Gender Switch Toggle */}
            <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6 w-full max-w-xs shadow-inner relative">
              <button
                type="button"
                onClick={() => handleGenderChange("male")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors z-10 ${
                  gender === "male"
                    ? "text-white"
                    : "text-[#64748B] hover:text-[#12343B] dark:text-slate-400"
                }`}
              >
                {gender === "male" && (
                  <motion.div
                    layoutId="activeGenderPill"
                    className="absolute inset-0 bg-[#0F766E] rounded-xl -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <User className="w-4 h-4" />
                <span>Male</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange("female")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors z-10 ${
                  gender === "female"
                    ? "text-white"
                    : "text-[#64748B] hover:text-[#12343B] dark:text-slate-400"
                }`}
              >
                {gender === "female" && (
                  <motion.div
                    layoutId="activeGenderPill"
                    className="absolute inset-0 bg-[#0F766E] rounded-xl -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <UserCheck className="w-4 h-4" />
                <span>Female</span>
              </button>
            </div>

            {/* Interactive Anatomical SVG Diagram */}
            <BodyModelSvg
              gender={gender}
              selectedPart={selectedPart}
              onSelectPart={handlePartSelect}
            />
          </div>

          {/* Column 2: Specialty Departments */}
          <div className="lg:col-span-4 bg-[#F8FAFC] dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col shadow-sm h-full">
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#12343B] dark:text-slate-200">
                Specialty Departments
              </h3>
            </div>

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              key={selectedPart}
              className="flex flex-col gap-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 py-4 text-xs font-medium text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin text-[#0F766E]" />
                  Loading specialties…
                </div>
              ) : error ? (
                <p role="alert" className="py-4 text-xs text-rose-600 dark:text-rose-400">
                  {error}
                </p>
              ) : doctors.length === 0 ? (
                <p className="py-4 text-xs text-slate-500">
                  No doctor profiles are available yet.
                </p>
              ) : activeDepartments.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">
                  No listed specialties match this body area yet.
                </p>
              ) : (
                activeDepartments.map((dept) => {
                  const isSelected = activeDepartment === dept;
                  return (
                    <motion.button
                      key={dept}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={`p-4 rounded-2xl border text-left font-bold text-sm transition-colors duration-200 flex items-center justify-between ${
                        isSelected
                          ? "border-[#0F766E] bg-white dark:bg-slate-800 text-[#0F766E] dark:text-teal-300 shadow-md ring-1 ring-[#0F766E]"
                          : "border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-800/40 hover:bg-white text-[#12343B] dark:text-slate-300"
                      }`}
                    >
                      <span>{dept}</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? "translate-x-1 text-[#0F766E]" : "opacity-30"
                        }`}
                      />
                    </motion.button>
                  );
                })
              )}
            </motion.div>
          </div>

          {/* Column 3: Doctors List */}
          <div className="lg:col-span-4 bg-[#F8FAFC] dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#12343B] dark:text-slate-200">
                Available Doctors
              </h3>
              <motion.span
                key={activeDoctors.length}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xs text-[#0F766E] dark:text-teal-400 font-bold bg-[#E8F7F4] dark:bg-slate-800 px-2.5 py-1 rounded-md"
              >
                {activeDoctors.length} Doctors
              </motion.span>
            </div>

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              key={selectedDept}
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 py-8 text-xs font-medium text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin text-[#0F766E]" />
                    Loading doctors…
                  </div>
                ) : error ? (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-xs text-rose-600 dark:text-rose-400"
                  >
                    {error}
                  </motion.p>
                ) : doctors.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-xs text-slate-500"
                  >
                    No doctor profiles are available yet.
                  </motion.p>
                ) : activeDoctors.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-slate-500 py-8 text-center"
                  >
                    No doctors are listed for {activeDepartment || "this specialty"}.
                  </motion.p>
                ) : (
                  activeDoctors.map((doc, index) => {
                    const doctorId = doc.doctorID || doc._id?.$oid || doc._id || doc.id;
                    const doctorName = doc.name || "Doctor";
                    const specialty = getDoctorSpecialty(doc);
                    const qualifications = doc.degrees || doc.qualification || doc.qualifications || doc.designation || doc.title;
                    const image = typeof doc.image === "string" ? doc.image : "";

                    return (
                    <motion.div
                      key={`${String(doctorId || doctorName)}-${index}`}
                      layout
                      variants={itemVariants}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative flex w-14 h-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-teal-50 text-teal-700 dark:border-slate-700 dark:bg-slate-700 dark:text-teal-200">
                          {image ? (
                            <Image
                              src={image}
                              alt={doctorName}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <Stethoscope className="h-6 w-6" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-[#12343B] dark:text-white">
                            {doctorName}
                          </h4>
                          {qualifications && (
                            <p className="truncate text-xs text-[#64748B] dark:text-slate-400">
                              {qualifications}
                            </p>
                          )}
                          {specialty && (
                            <p className="truncate text-[11px] font-semibold text-[#0F766E] dark:text-teal-400">
                              {specialty}
                            </p>
                          )}
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500">
                            {doc.rating && (
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="h-3 w-3 fill-amber-400" /> {doc.rating}
                              </span>
                            )}
                            {doc.bmdcReg && <span>BMDC: {doc.bmdcReg}</span>}
                            {doc.experience && <span>{doc.experience} experience</span>}
                          </div>
                        </div>
                      </div>

                      {(doc.location || doc.hospital) && (
                        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {doc.hospital || doc.location}
                        </p>
                      )}
                      {doc.chamberFee && (
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          Consultation fee: {String(doc.chamberFee).startsWith("৳") ? doc.chamberFee : `৳${doc.chamberFee}`}
                        </p>
                      )}

                      {doctorId ? (
                        <Button
                          as={Link}
                          href={`/book-appointment?doctor=${encodeURIComponent(String(doctorId))}`}
                          className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all"
                        >
                          Book Appointment
                        </Button>
                      ) : (
                        <p className="text-center text-xs text-slate-500">
                          Contact the clinic to book.
                        </p>
                      )}
                    </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}