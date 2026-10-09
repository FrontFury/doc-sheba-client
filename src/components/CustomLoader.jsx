"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function CustomLoader({ text = "Connecting to DocSheba Sheba Care..." }) {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm rounded-3xl">
      
      {/* Background Animated Teal Ambient Glow */}
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-48 h-48 bg-teal-500/20 dark:bg-teal-400/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Center Spinner Ring & Logo Box */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-6">
        
        {/* Outer Rotating Medical Gradient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0F766E] border-r-emerald-400 dark:border-t-teal-400 dark:border-r-teal-300 shadow-md"
        />

        {/* Inner Counter-Rotating Dotted Accent Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full border border-dashed border-teal-600/30 dark:border-teal-400/30"
        />

        {/* Centered Brand Logo with Pulse Scale */}
        <motion.div
          animate={{
            scale: [0.92, 1.05, 0.92],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg shadow-teal-900/10 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden"
        >
          <Image
            src="/Just-Logo.png"
            alt="DocSheba Loader Logo"
            width={48}
            height={48}
            priority
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Loading Status Text & Animated Dots */}
      <div className="flex flex-col items-center gap-2 text-center relative z-10">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#12343B] dark:text-slate-200 tracking-wide">
          <span>{text}</span>
          <span className="flex items-center gap-1 ml-1">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400"
            />
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400"
            />
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400"
            />
          </span>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0F766E] dark:text-teal-400/80 bg-teal-50 dark:bg-teal-950/80 px-3 py-1 rounded-full border border-teal-100 dark:border-teal-900/60">
          Secured Health Network
        </span>
      </div>

    </div>
  );
}