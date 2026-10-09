"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Star, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";

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
  const [activeFilter, setActiveFilter] = useState("All Available");
  const filterOptions = ["All Available", "Available Today", "Top Rated"];

  const doctors = [
    {
      id: "dr-sarah-ahmed",
      name: "Dr. Sarah Ahmed",
      specialty: "Cardiologist",
      degree: "MBBS, FCPS (Cardiology)",
      rating: "4.9",
      experience: "12 Yrs Exp",
      hospital: "Dhaka Med Center",
      availability: "Available Today",
      availabilityColor: "bg-emerald-500",
      nextSlot: "Next: 4:30 PM",
      image: "/images/HeroBanner.jpg",
      isToday: true,
      isTopRated: true,
    },
    {
      id: "dr-mohammad-hasan",
      name: "Dr. Mohammad Hasan",
      specialty: "Neurologist",
      degree: "MBBS, MD (Neurology)",
      rating: "4.8",
      experience: "15 Yrs Exp",
      hospital: "Neuro Care Institute",
      availability: "Available Tomorrow",
      availabilityColor: "bg-slate-400",
      nextSlot: "Next: 10:00 AM",
      image: "/images/HeroBanner.jpg",
      isToday: false,
      isTopRated: false,
    },
    {
      id: "dr-nusrat-jahan",
      name: "Dr. Nusrat Jahan",
      specialty: "Pediatrician",
      degree: "MBBS, DCH (Pediatrics)",
      rating: "5.0",
      experience: "9 Yrs Exp",
      hospital: "Children's Wellness Hub",
      availability: "Available Today",
      availabilityColor: "bg-emerald-500",
      nextSlot: "Next: 6:00 PM",
      image: "/images/HeroBanner.jpg",
      isToday: true,
      isTopRated: true,
    },
    {
      id: "dr-tanvir-rahman",
      name: "Dr. Tanvir Rahman",
      specialty: "Dermatologist",
      degree: "MBBS, DDV (Skin & Sex)",
      rating: "4.9",
      experience: "11 Yrs Exp",
      hospital: "Square Hospital",
      availability: "Available Today",
      availabilityColor: "bg-emerald-500",
      nextSlot: "Next: 5:15 PM",
      image: "/images/HeroBanner.jpg",
      isToday: true,
      isTopRated: true,
    },
  ];

  const filteredDoctors = doctors.filter((doc) => {
    if (activeFilter === "Available Today") return doc.isToday;
    if (activeFilter === "Top Rated") return doc.isTopRated;
    return true;
  });

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
              BOARD-CERTIFIED CLINICIANS
            </span>
            <h2 className="font-[#Manrope] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
              Featured Medical Specialists
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-400 leading-relaxed mt-1">
              Directly vetted credentials, verified patient reviews, and real-time appointment availability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? "text-[#0F766E] dark:text-teal-300 border-[#0F766E]/40 dark:border-teal-600/60 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#E8F7F4] dark:bg-teal-950/80 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  {filter}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-400/80 dark:hover:border-teal-500/60 transition-colors duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-[#E8F7F4] dark:border-slate-800 group-hover:border-teal-400 transition-colors duration-300">
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-900 rounded-full p-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400 fill-teal-100 dark:fill-slate-900" />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-base text-[#12343B] dark:text-slate-100 leading-snug group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#0F766E] dark:text-teal-400">
                          {doc.specialty}
                        </p>
                        <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">
                          {doc.degree}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <div className="w-full border-t border-slate-100 dark:border-slate-800/80 my-3.5" />

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <span className="text-[#64748B] dark:text-slate-400 block text-[10px] uppercase tracking-wider font-medium">
                        Experience
                      </span>
                      <span className="font-extrabold text-[#12343B] dark:text-slate-200 mt-0.5 block truncate">
                        {doc.experience}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#64748B] dark:text-slate-400 block text-[10px] uppercase tracking-wider font-medium">
                        Hospital
                      </span>
                      <span className="font-extrabold text-[#12343B] dark:text-slate-200 mt-0.5 block truncate">
                        {doc.hospital}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] sm:text-xs font-medium mb-4 border border-transparent group-hover:border-teal-500/20 transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className={`w-2 h-2 rounded-full ${doc.availabilityColor} animate-pulse`} />
                      <span>{doc.availability}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400">
                      {doc.nextSlot}
                    </span>
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    as={Link}
                    href={`/doctors/${doc.id}`}
                    endContent={<ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />}
                    className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-900/10"
                  >
                    Book Consultation
                  </Button>
                </motion.div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}