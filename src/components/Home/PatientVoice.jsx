"use client";

import React from "react";
import { Star } from "lucide-react";

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
    <section className="py-12 lg:py-16 bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0F766E] dark:text-teal-400 uppercase mb-1.5">
            PATIENT VOICES
          </span>
          <h2 className="font-[#Manrope] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12343B] dark:text-white tracking-tight">
            Clinical Excellence With Compassion
          </h2>
        </div>

        {/* 4 Cards Grid Layout (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating Indicator */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Patient Review Text */}
                <p className="text-xs sm:text-sm text-[#12343B] dark:text-slate-300 italic leading-relaxed mb-6 font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Author Details Footer */}
              <div>
                <div className="w-full border-t border-slate-100 dark:border-slate-800 my-3.5" />
                <h3 className="font-bold text-sm sm:text-base text-[#12343B] dark:text-slate-100">
                  {item.author}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5 font-medium">
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}