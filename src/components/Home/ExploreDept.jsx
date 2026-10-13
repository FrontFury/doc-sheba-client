"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Brain,
  Bone,
  Baby,
  Sparkles,
  Stethoscope,
  Loader2,
} from "lucide-react";

const getDoctorList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  throw new Error("The doctors API returned an invalid response.");
};

const getDepartmentIcon = (department) => {
  const name = department.toLowerCase();

  if (name.includes("cardio") || name.includes("heart")) {
    return { icon: Heart, iconColor: "text-rose-500" };
  }
  if (name.includes("neuro") || name.includes("brain")) {
    return { icon: Brain, iconColor: "text-pink-500" };
  }
  if (name.includes("ortho") || name.includes("bone") || name.includes("joint")) {
    return { icon: Bone, iconColor: "text-amber-500" };
  }
  if (name.includes("pediatr") || name.includes("child")) {
    return { icon: Baby, iconColor: "text-amber-600" };
  }
  if (name.includes("dermat") || name.includes("skin")) {
    return { icon: Sparkles, iconColor: "text-amber-500" };
  }

  return { icon: Stethoscope, iconColor: "text-purple-600" };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExploreDept() {
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
          console.error("Failed to fetch departments:", fetchError);
          setError("Unable to load departments right now.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, []);

  const departments = [...new Map(
    doctors
      .map((doctor) => doctor.department)
      .filter((department) => typeof department === "string" && department.trim())
      .map((department) => [department.trim().toLowerCase(), department.trim()])
  ).values()].map((name) => ({
    id: name.toLowerCase(),
    name,
    doctorsCount: `${doctors.filter(
      (doctor) =>
        typeof doctor.department === "string" &&
        doctor.department.trim().toLowerCase() === name.toLowerCase()
    ).length} Doctors`,
    ...getDepartmentIcon(name),
  }));

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
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] dark:text-teal-400 uppercase">
              SPECIALIZED CLINICAL CARE
            </span>
            <h2 className="font-[#Manrope] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
              Explore Popular Departments
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] dark:text-slate-400 leading-relaxed mt-1">
              Every clinical discipline is governed by certified specialists adhering to international healthcare delivery benchmarks.
            </p>
          </div>

          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0F766E] dark:text-teal-400 hover:text-[#0E7490] dark:hover:text-teal-300 transition-colors shrink-0 group"
            >
              <span>View all Departments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#0F766E]" />
            Loading departments…
          </div>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-sm font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        ) : departments.length === 0 ? (
          <p className="py-12 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            No departments are available yet.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="-mx-4 snap-x scroll-smooth overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [scrollbar-width:thin] [scrollbar-color:#99c8bd_transparent]"
          >
            <div className="flex w-max gap-4 sm:gap-6">
              {departments.map((dept) => {
                const IconComponent = dept.icon;
                return (
                  <motion.div
                    key={dept.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-[172px] snap-start sm:w-[210px]"
                  >
                    <Link
                      href={`/doctors?department=${encodeURIComponent(dept.name)}`}
                      className="group relative flex h-full min-h-[190px] snap-start flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-teal-400/80 hover:shadow-xl hover:shadow-teal-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/60"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/0 via-teal-500/0 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F7F4] shadow-inner dark:bg-teal-950/60"
                      >
                        <IconComponent className={`h-6 w-6 ${dept.iconColor}`} />
                      </motion.div>

                      <h3 className="relative z-10 line-clamp-2 text-base font-bold text-[#12343B] transition-colors group-hover:text-[#0F766E] dark:text-slate-100 dark:group-hover:text-teal-400">
                        {dept.name}
                      </h3>

                      <p className="relative z-10 mt-1 text-xs font-medium text-[#64748B] dark:text-slate-400">
                        {dept.doctorsCount}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          )}

      </div>
    </section>
  );
}