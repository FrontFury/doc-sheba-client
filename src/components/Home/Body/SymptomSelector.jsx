"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENTS_BY_PART, DOCTORS_BY_DEPT } from "@/data/bodyData";
import BodyModelSvg from "./BodyModelSvg";
import { User, UserCheck, Stethoscope, Star, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";

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
  const [selectedDept, setSelectedDept] = useState("Cardiology");

  const activeDepartments = DEPARTMENTS_BY_PART[selectedPart] || [];
  const activeDoctors = selectedDept ? DOCTORS_BY_DEPT[selectedDept] || [] : [];

  const handlePartSelect = (partId) => {
    // Map SVG specific sub-parts to high-level clinical categories
    let mappedPart = partId;
    if (["elbow", "arm"].includes(partId)) mappedPart = "arms";
    if (["thigh", "knee", "foot"].includes(partId)) mappedPart = "legs";
    if (partId === "neck") mappedPart = "head";

    setSelectedPart(mappedPart);
    const firstDept = DEPARTMENTS_BY_PART[mappedPart]?.[0] || null;
    setSelectedDept(firstDept);
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
              {activeDepartments.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">
                  No departments available for this area.
                </p>
              ) : (
                activeDepartments.map((dept) => {
                  const isSelected = selectedDept === dept;
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
                {activeDoctors.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-slate-500 py-8 text-center"
                  >
                    No specialists available for {selectedDept}.
                  </motion.p>
                ) : (
                  activeDoctors.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      variants={itemVariants}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#12343B] dark:text-white">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-[#64748B] dark:text-slate-400">
                            {doc.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-500">
                            <span className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400" /> {doc.rating}
                            </span>
                            <span>•</span>
                            <span>BMDC: {doc.bmdc}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        as={Link}
                        href={`/book-appointment?doctor=${doc.id}`}
                        className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all"
                      >
                        Book Appointment
                      </Button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}