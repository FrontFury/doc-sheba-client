"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ShortDes() {
  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-16 lg:gap-24">
        
        {/* Block 1: Healing starts here */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
            className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-5"
          >
            <h2 className="font-[#Manrope] text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#12343B] dark:text-white tracking-tight">
              Healing starts here
            </h2>

            <div className="flex flex-col gap-1.5 mt-1">
              <h3 className="font-bold text-sm sm:text-base text-[#12343B] dark:text-slate-200">
                The right answers the first time
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                Effective treatment depends on getting the right diagnosis. Our expert clinicians and multidisciplinary boards diagnose and treat the toughest medical challenges across Bangladesh and beyond.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-sm sm:text-base text-[#12343B] dark:text-slate-200">
                The nation&apos;s most trusted hospital network
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                DocSheba is accredited for clinical excellence and patient safety benchmarks.{" "}
                <Link
                  href="/specialties"
                  className="font-bold text-[#0F766E] dark:text-teal-400 hover:underline decoration-2"
                >
                  Learn more about our top-ranked specialties.
                </Link>
              </p>
            </div>

            {/* Animated Pill Button */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/why-docsheba"
                className="inline-block mt-3 px-6 py-2.5 rounded-full border border-[#0F766E]/40 text-[#0F766E] dark:text-teal-300 dark:border-teal-500/50 hover:bg-[#E8F7F4] dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                Why choose DocSheba
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={imageVariants}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800 group">
              <Image
                src="/images/Des1.jpg" 
                alt="Doctor consultation at DocSheba"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>

        {/* Block 2: World-class care for global & regional patients */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Image Frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={imageVariants}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800 group">
              <Image
                src="/images/Des2.jpg" 
                alt="Pediatrician specialist at DocSheba"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
            className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-5 order-1 lg:order-2"
          >
            <h2 className="font-[#Manrope] text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#12343B] dark:text-white tracking-tight leading-snug">
              World-class care for global & regional patients
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed max-w-xl">
              We make it seamless for international patients, expatriates, and regional visitors to access world-class consultations, remote multi-specialty opinions, and priority medical coordination.
            </p>

            {/* Animated Pill Button */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/international-services"
                className="inline-block mt-2 px-6 py-2.5 rounded-full border border-[#0F766E]/40 text-[#0F766E] dark:text-teal-300 dark:border-teal-500/50 hover:bg-[#E8F7F4] dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                International & Remote Services
              </Link>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}