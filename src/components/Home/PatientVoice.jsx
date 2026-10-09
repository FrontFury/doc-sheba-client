"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const starVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export default function PatientVoice() {
  const testimonials = [
    {
      id: "tanvir-chowdhury",
      quote:
        "\"Booking Dr. Sarah on DocSheba was seamless. I avoided the hospital wait room chaos, and the live queue tracking gave my mother immense peace of mind.\"",
      rating: 5,
      author: "Tanvir Chowdhury",
      meta: "Cardiology Patient • Banani",
    },
    {
      id: "farhana-yasmin",
      quote:
        "\"The digital prescription was sent immediately into my portal. Finding a genuine pediatric expert on a Friday afternoon used to be impossible.\"",
      rating: 5,
      author: "Farhana Yasmin",
      meta: "Mother of Ayan (4 yrs) • Dhanmondi",
    },
    {
      id: "kazi-rafiqul-islam",
      quote:
        "\"Verified BMDC registration gives me real confidence. Knowing that all doctors are thoroughly credentialed makes DocSheba our family's first choice.\"",
      rating: 5,
      author: "Kazi Rafiqul Islam",
      meta: "Neurology Follow-up • Uttara",
    },
    {
      id: "sabrina-akter",
      quote:
        "\"The video consultation quality was crystal clear. Getting a follow-up prescription without leaving work saved me hours of Dhaka traffic.\"",
      rating: 5,
      author: "Sabrina Akter",
      meta: "Dermatology Patient • Gulshan",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 lg:mb-12"
        >
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] dark:text-teal-400 uppercase mb-1.5">
            PATIENT VOICES
          </span>
          <h2 className="font-[#Manrope] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
            Clinical Excellence With Compassion
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-400/80 dark:hover:border-teal-500/60 transition-colors duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 dark:text-slate-800/40 -z-0 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={starVariants}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#12343B] dark:text-slate-300 italic leading-relaxed mb-6 font-normal group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {item.quote}
                </p>
              </div>

              <div className="relative z-10">
                <div className="w-full border-t border-slate-100 dark:border-slate-800/80 my-3.5 group-hover:border-teal-500/20 transition-colors" />
                <h3 className="font-bold text-sm sm:text-base text-[#12343B] dark:text-slate-100 group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                  {item.author}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5 font-medium">
                  {item.meta}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}