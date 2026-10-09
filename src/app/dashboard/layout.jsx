"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  Bell,
  Calendar,
  LayoutDashboard,
  UserSearch,
  CalendarCheck,
  FileText,
  Pill,
  User,
  LogOut,
  Headphones,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Find Doctor", href: "/dashboard/find-doctor", icon: UserSearch },
    { name: "MyAppointments", href: "/dashboard/appointments", icon: CalendarCheck },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Prescriptions", href: "/dashboard/prescriptions", icon: Pill },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 3 },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* TOP NAVBAR */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <Image
                src="/Just-Logo.png"
                alt="DocSheba"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-black text-[#12343B] dark:text-white tracking-tight">
              Doc<span className="text-[#0F766E] dark:text-teal-400">Sheba</span>
            </span>
          </Link>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search appointments, prescriptions, specialists..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 transition-all"
            />
          </div>
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Notification Button */}
          <button className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Date Indicator Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />
            <span>12 Oct 2026</span>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-teal-500/30">
              <Image
                src="/images/HeroBanner.jpg"
                alt="Tasin Ahmed"
                fill
                className="object-cover"
              />
            </div>
            <span className="hidden md:inline-block text-xs font-bold text-slate-800 dark:text-slate-200">
              Tasin A.
            </span>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER: SIDEBAR + CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between shrink-0 hidden lg:flex">
          
          <div className="space-y-5">
            
            {/* User Patient Mini Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-teal-500/30 shrink-0">
                <Image
                  src="/images/HeroBanner.jpg"
                  alt="Tasin Ahmed"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-100 truncate">
                  Tasin Ahmed
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  PAT-2026-00125
                </p>
                <span className="inline-block mt-1 text-[9px] font-extrabold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                  Blood: B+
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#E8F7F4] dark:bg-teal-950/80 text-[#0F766E] dark:text-teal-300"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSideNav"
                        className="absolute inset-0 bg-[#E8F7F4] dark:bg-teal-950/80 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#0F766E] dark:text-teal-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

          </div>

          {/* Bottom Logout & Care Concierge */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            
            {/* Logout Button */}
            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            {/* Care Concierge Badge */}
            <div className="p-3.5 rounded-2xl bg-[#E8F7F4]/60 dark:bg-slate-800/80 border border-teal-200/60 dark:border-slate-700/80 text-left">
              <div className="flex items-center gap-2 text-[#0F766E] dark:text-teal-400 font-extrabold text-xs mb-1">
                <Headphones className="w-4 h-4" />
                <span>Care Concierge 24/7</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Direct hospital helpline: 1800-SHEBA-CARE
              </p>
            </div>

          </div>

        </aside>

        {/* RIGHT MAIN CONTENT AREA ({children}) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}