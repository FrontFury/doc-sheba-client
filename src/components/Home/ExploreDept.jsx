"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Heart, Brain, Bone, Baby, Sparkles, Stethoscope } from "lucide-react";

export default function ExploreDept() {
  const departments = [
    {
      id: "cardiology",
      name: "Cardiology",
      doctorsCount: "24 Doctors",
      icon: Heart,
      iconColor: "text-rose-500",
      href: "/departments/cardiology",
    },
    {
      id: "neurology",
      name: "Neurology",
      doctorsCount: "18 Doctors",
      icon: Brain,
      iconColor: "text-pink-500",
      href: "/departments/neurology",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      doctorsCount: "15 Doctors",
      icon: Bone,
      iconColor: "text-amber-500",
      href: "/departments/orthopedics",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      doctorsCount: "21 Doctors",
      icon: Baby,
      iconColor: "text-amber-600",
      href: "/departments/pediatrics",
    },
    {
      id: "dermatology",
      name: "Dermatology",
      doctorsCount: "12 Doctors",
      icon: Sparkles,
      iconColor: "text-amber-500",
      href: "/departments/dermatology",
    },
    {
      id: "internal-med",
      name: "Internal Med",
      doctorsCount: "30 Doctors",
      icon: Stethoscope,
      iconColor: "text-purple-600",
      href: "/departments/internal-medicine",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
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

          {/* Top Right Navigation Link */}
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0F766E] dark:text-teal-400 hover:text-[#0E7490] dark:hover:text-teal-300 transition-colors shrink-0 group"
          >
            <span>View all 28 Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {departments.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Link
                key={dept.id}
                href={dept.href}
                className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700/60 transition-all duration-300 text-center"
              >
                {/* Soft Mint Circle Container */}
                <div className="w-14 h-14 rounded-full bg-[#E8F7F4] dark:bg-teal-950/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className={`w-6 h-6 ${dept.iconColor}`} />
                </div>

                {/* Department Name */}
                <h3 className="font-bold text-base text-[#12343B] dark:text-slate-100 group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                  {dept.name}
                </h3>

                {/* Doctor Count */}
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 mt-1 font-medium">
                  {dept.doctorsCount}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}