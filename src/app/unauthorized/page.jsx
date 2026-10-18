'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Home, LogIn } from 'lucide-react';
import { Button } from '@heroui/react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Aesthetic Ornaments */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 rounded-[32px] shadow-2xl shadow-teal-950/5 text-center relative z-10"
      >
        {/* Warning Badge Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 shadow-inner">
          <ShieldAlert className="w-10 h-10" strokeWidth={2} />
        </div>

        {/* Text Details */}
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/80 px-3 py-1 rounded-full border border-rose-200/60 dark:border-rose-800">
          Access Denied
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-[#12343B] dark:text-white mt-4 mb-3 tracking-tight font-sans">
          Unauthorized Access
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Apnar ei page-ti access korar porjapto permission nei. Doya kore login korun othoba apnar account role check করুন.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            as={Link}
            href="/"
            variant="flat"
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;