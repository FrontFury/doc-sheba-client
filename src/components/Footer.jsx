"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  HeartPulse
} from "lucide-react";
import { Button } from "@heroui/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#F8FAFC] dark:bg-slate-950 text-[#172033] dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      
      {/* Banner */}
      <div className="bg-[#0F766E] text-white py-6 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
              <HeartPulse className="w-6 h-6 text-[#E8F7F4] animate-pulse" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">Need Immediate Health Guidance?</h4>
              <p className="text-xs sm:text-sm text-[#E8F7F4]/90">Subscribe to get verified doctor recommendations & priority booking alerts.</p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/70 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-72"
            />
            <Button
              type="submit"
              className="bg-white text-[#0F766E] font-semibold hover:bg-[#E8F7F4] px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm"
            >
              {subscribed ? "Joined!" : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="DocSheba Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed max-w-md">
              Clinical precision with empathetic care. DocSheba bridges certified medical expertise with modern digital access for patients across the nation.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F7F4] dark:bg-slate-800/80 text-[#0F766E] dark:text-teal-400 text-xs font-medium border border-teal-100 dark:border-teal-900/50">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>BMDC Certified Network</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F7F4] dark:bg-slate-800/80 text-[#0F766E] dark:text-teal-400 text-xs font-medium border border-teal-100 dark:border-teal-900/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* Clinical Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#12343B] dark:text-slate-100 uppercase tracking-wider mb-4">
              Clinical Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Find Doctors", href: "/doctors" },
                { name: "Specialty Departments", href: "/departments" },
                { name: "Appointment Journey", href: "/journey" },
                { name: "Tele-Consultations", href: "/telehealth" },
                { name: "Hospital Partners", href: "/partners" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#64748B] dark:text-slate-400 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthcare Providers */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[#12343B] dark:text-slate-100 uppercase tracking-wider mb-4">
              For Healthcare Providers
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Doctor Registry & Portal", href: "/doctor/login" },
                { name: "Clinical Staff Operations", href: "/assistant/login" },
                { name: "Credentialing Protocols", href: "/credentialing" },
                { name: "Clinical Research & Data", href: "/research" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#64748B] dark:text-slate-400 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 24/7 Support */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#12343B] dark:text-slate-100 uppercase tracking-wider mb-2">
              24/7 Support & Care
            </h3>

            <a
              href="tel:10678"
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-800 shadow-sm hover:shadow-md transition-all block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Emergency Hotline
                </span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <PhoneCall className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-bold text-red-600 font-mono tracking-tight">
                  10678
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ambulance & Emergency Response
              </p>
            </a>

            <div className="text-xs text-[#64748B] dark:text-slate-400 space-y-1.5 mt-1">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
                <span>Helpdesk: </span>
                <a href="mailto:support@docsheba.com" className="hover:underline text-[#12343B] dark:text-slate-200 font-medium">
                  support@docsheba.com
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
                <span>Hours: 24 Hours, 7 Days a Week</span>
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200/80 dark:border-slate-800 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} DocSheba Healthcare Technologies. Clinical precision with empathetic care. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors">
              Privacy Protocol
            </Link>
            <span>•</span>
            <Link href="/hipaa" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors">
              HIPAA Compliance
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/emergency" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors">
              Emergency Guidelines
            </Link>
            <span>•</span>
            <Link href="/credentials" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors">
              Medical Board Credentials
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}