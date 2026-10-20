"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useSession } from "@/lib/auth-client";
import { getCurrentPatientSummary } from "@/lib/actions/patients";
import ThemeToggle from "@/components/ThemeToggle";
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
  Users,
  LogOut,
  Headphones,
  Home,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const [patient, setPatient] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isDoctor = session?.user?.role === "doctor";
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (user?.role !== "patient") return;

    let isCurrent = true;
    getCurrentPatientSummary()
      .then((profile) => {
        if (isCurrent) setPatient(profile);
      })
      .catch((error) => {
        console.error("Failed to load dashboard patient profile:", error);
      });

    return () => {
      isCurrent = false;
    };
  }, [user?.id, user?.role]);

  const profileName =
    patient?.name || user?.name || (isDoctor ? "Doctor" : isAdmin ? "Admin" : "Patient");
  const profileImage =
    typeof patient?.image === "string" && patient.image
      ? patient.image
      : typeof user?.image === "string"
        ? user.image
        : "";
  const profileSubtitle =
    user?.role === "patient"
      ? patient?.patientID || "Patient profile not set up"
      : isDoctor
        ? "Doctor account"
        : isAdmin
          ? "Administrator"
          : "";

  const navItems = [
    {
      name: "Dashboard",
      href: isAdmin
        ? "/dashboard/admin"
        : isDoctor
          ? "/dashboard/doctor"
          : "/dashboard/patient",
      icon: LayoutDashboard,
    },
    ...(isAdmin
      ? [{ name: "Users", href: "/dashboard/admin/users", icon: Users }]
      : isDoctor
      ? [
          { name: "Doctor Profile", href: "/dashboard/doctor/doctor-profile", icon: UserSearch },
          { name: "Doctor Appointments", href: "/dashboard/doctor/all-appointments", icon: CalendarCheck },
        ]
      : [
          { name: "My Appointments", href: "/dashboard/patient/my-appointments", icon: CalendarCheck },
          { name: "Medical Records", href: "/dashboard/records", icon: FileText },
          { name: "Prescriptions", href: "/dashboard/prescriptions", icon: Pill },
          { name: "Profile", href: "/dashboard/patient/profile", icon: User }
        ]),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* TOP NAVBAR */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Mobile Menu and Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
            aria-label={isMobileNavOpen ? "Close dashboard menu" : "Open dashboard menu"}
            aria-expanded={isMobileNavOpen}
            aria-controls="dashboard-mobile-navigation"
            className="rounded-xl p-2 text-[#12343B] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          >
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-2.5 py-2 text-xs font-bold text-[#0F766E] transition hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300 dark:hover:bg-teal-950 sm:px-3"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <ThemeToggle />
          
          {/* Notification Button */}
          <button className="relative hidden rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:block">
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
                src={profileImage || "/images/HeroBanner.jpg"}
                alt={profileName}
                fill
                className="object-cover"
                unoptimized={Boolean(profileImage)}
              />
            </div>
            <span className="hidden md:inline-block text-xs font-bold text-slate-800 dark:text-slate-200">
              {profileName}
            </span>
          </div>

        </div>
      </header>

      {isMobileNavOpen && (
        <nav
          id="dashboard-mobile-navigation"
          aria-label="Dashboard navigation"
          className="space-y-1 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#E8F7F4] text-[#0F766E] dark:bg-teal-950/80 dark:text-teal-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* MAIN CONTAINER: SIDEBAR + CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between shrink-0 hidden lg:flex">
          
          <div className="space-y-5">
            
            {/* User Patient Mini Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-teal-500/30 shrink-0">
                <Image
                  src={profileImage || "/images/HeroBanner.jpg"}
                  alt={profileName}
                  fill
                  className="object-cover"
                  unoptimized={Boolean(profileImage)}
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-100 truncate">
                  {profileName}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {profileSubtitle}
                </p>
                {user?.role === "patient" && (
                  <span className="inline-block mt-1 text-[9px] font-extrabold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                    Blood: {patient?.bloodGroup || "Not set"}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.name === "Dashboard" && pathname === "/");

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